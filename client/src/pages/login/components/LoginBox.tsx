import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";

import { createAllDocuments } from "../../../services/actions/createAllDocumentsAction";
import { auth, db, googleProvider } from "../../../config/firebaseConfig";
import { GoogleIcon } from "../../../shared/components/icons/GoogleIcon";

interface LoginBoxProps {
  setFormType: (type: "login" | "registrar") => void;
}

interface FormData {
  email: string;
  password: string;
}

export const LoginBox = ({ setFormType }: LoginBoxProps) => {
  const schema = yup.object().shape({
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

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (data: FormData) => {
    setLoading(true);
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      enqueueSnackbar("Login realizado com sucesso!", {
        variant: "success",
      });
      navigate("/dashboard");
    } catch (error) {
      enqueueSnackbar("Erro ao fazer login. Verifique suas credenciais.", {
        variant: "error",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signGoogle = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      enqueueSnackbar("Login realizado com sucesso!", {
        variant: "success",
      });

      if (
        result.user.metadata.creationTime ===
        result.user.metadata.lastSignInTime
      ) {
        await createAllDocuments(db, result.user.uid);
      }

      navigate("/dashboard");
    } catch (error) {
      const err = error as { code?: string };
      if (err.code === "auth/popup-closed-by-user") {
        return;
      } else {
        enqueueSnackbar("Erro ao fazer login. Tente novamente.", {
          variant: "error",
        });
        console.error(error);
      }
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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Box display="flex" flexDirection="column" gap="2.5rem" padding="2rem">
        <Typography variant="h4" color="primary" fontWeight="bold">
          Login
          <Divider
            sx={{
              marginTop: "1rem",
              marginBottom: "0.5rem",
              borderColor: "#f4a36153",
            }}
          />
        </Typography>
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
          type={showPassword ? "text" : "password"}
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          disableElevation
          sx={{ borderRadius: "0.75rem", paddingBlock: "0.5rem" }}
        >
          Entrar
        </Button>
        <Typography textAlign="start" marginTop="-1rem">
          Não tem uma conta?
          <Typography
            onClick={() => setFormType("registrar")}
            variant="caption"
            fontSize="1rem"
            marginLeft="0.25rem"
            color="secondary"
            sx={linkStyle}
          >
            Registre-se
          </Typography>
        </Typography>
        <Divider sx={{ marginBlock: "-1rem" }}>ou</Divider>
        <Button
          onClick={signGoogle}
          variant="outlined"
          size="large"
          style={{
            textTransform: "none",
            color: "gray",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            paddingBlock: "0.75rem",
            borderColor: "lightgray",
          }}
        >
          <GoogleIcon width="25px" height="25px" />
          <Typography>Fazer login com o Google</Typography>
        </Button>
      </Box>
    </form>
  );
};
