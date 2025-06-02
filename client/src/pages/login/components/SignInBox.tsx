import {
  Box,
  Button,
  Divider,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  updateProfile,
} from "firebase/auth";
import { deleteApp, FirebaseError, initializeApp } from "firebase/app";
import { yupResolver } from "@hookform/resolvers/yup";
import { getFirestore } from "firebase/firestore";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";

import { createAllDocuments } from "../../../services/actions/createAllDocumentsAction";

interface LoginBoxProps {
  setFormType: (type: "login" | "registrar") => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
}

export const SignInBox = ({ setFormType }: LoginBoxProps) => {
  const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo 6 caracteres")
      .required("Senha é obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const env = import.meta.env;

  const secondaryAppConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  };

  const createUserWithoutLogin = async (
    email: string,
    password: string,
    name: string
  ) => {
    const secondaryApp = initializeApp(secondaryAppConfig, "Secondary");

    const secondaryAuth = getAuth(secondaryApp);

    const secondaryDb = getFirestore(secondaryApp);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        password
      );

      await updateProfile(userCredential.user, { displayName: name });

      await createAllDocuments(secondaryDb, userCredential.user.uid);

      await signOut(secondaryAuth);

      return userCredential;
    } finally {
      await deleteApp(secondaryApp);
    }
  };

  const handleSubmitForm = async (data: FormData) => {
    setLoading(true);
    try {
      await createUserWithoutLogin(data.email, data.password, data.name);
      enqueueSnackbar("Conta criada com sucesso!", {
        variant: "success",
      });
      setFormType("login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage =
          error.code.includes("email-already-in-use") &&
          "Esse email já está sendo utilizado!";

        enqueueSnackbar(
          errorMessage || "Erro ao criar conta. Tente novamente.",
          {
            variant: "error",
          }
        );
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const linkStyle = {
    cursor: "pointer",
    transition: "color 300ms ease-in-out",
    "&:hover": {
      color: "#1565C0",
      textDecoration: "underline",
    },
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Box display="flex" flexDirection="column" gap="2.5rem" padding="2rem">
        <Typography variant="h4" color="primary" fontWeight="bold">
          Registrar
          <Divider
            sx={{
              marginTop: "1rem",
              marginBottom: "0.5rem",
              borderColor: "#f4a36153",
            }}
          />
        </Typography>
        <TextField
          {...register("name")}
          label="Digite o seu nome"
          variant="outlined"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register("email")}
          label="Digite o seu email"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("password")}
          label="Digite a sua senha"
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          loading={loading}
          disableElevation
          sx={{ borderRadius: "0.75rem", paddingBlock: "0.5rem" }}
        >
          Registrar
        </Button>
        <Typography
          onClick={() => setFormType("login")}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="0.5rem"
          marginTop="-1rem"
          color="secondary"
          sx={linkStyle}
        >
          <Icon>arrow_back</Icon>
          Voltar para tela de login
        </Typography>
      </Box>
    </form>
  );
};
