import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  Theme,
  Divider,
} from "@mui/material";
import loginBanner from "../../assets/loginBanner.png";

export const Login = () => {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
          <form onSubmit={handleLogin}>
            <Box
              display="flex"
              flexDirection="column"
              gap="2.5rem"
              padding="2rem"
            >
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
              <TextField label="Digite o seu email" variant="outlined" />
              <TextField label="Digite a sua senha" variant="outlined" />

              <Button
                type="submit"
                variant="contained"
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
                Não tem uma conta? Registre-se
              </Typography>
            </Box>
          </form>
        </Box>
        <Typography>&#169; ControlAÍ</Typography>
      </Box>
    </Box>
  );
};
