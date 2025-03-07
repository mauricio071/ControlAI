import { Box, Typography, useMediaQuery, Theme } from "@mui/material";

import loginBanner from "../../assets/loginBanner.png";
import { SignInBox } from "./components/SignInBox";
import { LoginBox } from "./components/LoginBox";
import { useState } from "react";

export const Login = () => {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  const [formType, setFormType] = useState<"login" | "registrar">("login");

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
          {formType === "login" ? (
            <LoginBox setFormType={setFormType} />
          ) : (
            <SignInBox setFormType={setFormType} />
          )}
        </Box>
        <Typography>&#169; ControlAÍ</Typography>
      </Box>
    </Box>
  );
};
