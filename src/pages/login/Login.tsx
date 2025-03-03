import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  Theme,
  Divider,
  Icon,
  IconButton,
} from "@mui/material";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import loginBanner from "../../assets/loginBanner.png";
import { auth, googleProvider } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { GoogleIcon } from "../../shared/components/icons/GoogleIcon";

interface FormData {
  email: string;
  password: string;
}

export const Login = () => {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

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
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [formType, setFormType] = useState<"login" | "registrar">("login");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (data: FormData) => {
    if (formType === "login") {
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
    }

    if (formType === "registrar") {
      setLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        enqueueSnackbar("Conta criada com sucesso!", {
          variant: "success",
        });
        setFormType("login");
      } catch (error) {
        enqueueSnackbar("Erro ao criar conta. Tente novamente.", {
          variant: "error",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const signGoogle = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithPopup(auth, googleProvider);
      enqueueSnackbar("Login realizado com sucesso!", {
        variant: "success",
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
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

  useEffect(() => {
    reset();
  }, [formType, reset]);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box display="flex" padding="1rem">
      <Box
        height="calc(100vh - 2rem)"
        width={lgDown ? "0" : "50%"}
        borderRadius="0.5rem"
        sx={{
          backgroundImage: `url(${loginBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
      <Box
        width={lgDown ? "100%" : "50%"}
        paddingLeft={lgDown ? "0" : "1rem"}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <Box
          width="100%"
          maxWidth="35rem"
          bgcolor="white"
          textAlign="center"
          boxShadow="0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
          borderRadius="0.5rem"
        >
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box
              display="flex"
              flexDirection="column"
              gap="2.5rem"
              padding="2rem"
            >
              <Typography variant="h4" color="primary" fontWeight="bold">
                {formType === "login" ? "Login" : "Registrar"}
                <Divider
                  sx={{
                    marginTop: "1rem",
                    marginBottom: "0.5rem",
                    borderColor: "#f4a36153",
                  }}
                />
              </Typography>
              {formType === "login" && (
                <>
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
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
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
                  <Typography
                    textAlign="start"
                    marginTop="-1rem"
                    sx={{ color: "gray" }}
                  >
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
                    color="inherit"
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
                    Fazer login com o Google
                  </Button>
                </>
              )}
              {formType === "registrar" && (
                <>
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
                </>
              )}
            </Box>
          </form>
        </Box>
        <Typography>&#169; ControlAÍ</Typography>
      </Box>
    </Box>
  );
};
