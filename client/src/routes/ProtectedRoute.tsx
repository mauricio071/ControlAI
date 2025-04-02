import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { Box } from "@mui/material";

import { Loading } from "../shared/components/loading/Loading";
import { auth } from "../config/firebaseConfig";

export const ProtectedRoute = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyLogin = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => verifyLogin();
  }, []);

  if (loading) {
    return (
      <Box minHeight="100vh" display="flex" justifyContent="center">
        <Loading />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
