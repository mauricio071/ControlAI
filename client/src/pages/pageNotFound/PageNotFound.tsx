import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { auth } from "../../config/firebaseConfig";
import { User } from "firebase/auth";

export const PageNotFound = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const verifyLogin = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => verifyLogin();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="1rem"
      minHeight="100vh"
    >
      <Typography variant="h1" color="primary">
        404
      </Typography>
      <Typography variant="h4" fontWeight="bold" marginBottom="1rem">
        Oops... Página não encontrada!
      </Typography>
      <Link to={user ? "/dashboard" : "/login"}>
        <Button variant="contained" disableElevation>
          Voltar
        </Button>
      </Link>
    </Box>
  );
};
