import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useDrawerContext } from "../shared/contexts";
import {
  AdicionarTransacao,
  Dashboard,
  Historico,
  Login,
  MinhasFinancas,
} from "../pages";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { enqueueSnackbar } from "notistack";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  const navigate = useNavigate();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "dashboard",
        label: "Dashboard",
        path: "/dashboard",
      },
      {
        icon: "add_circle",
        label: "Adicionar transação",
        path: "/adicionar-transacao",
      },
      {
        icon: "account_balance_wallet",
        label: "Minhas Finanças",
        path: "/minhas-financas",
      },
      {
        icon: "history",
        label: "Histórico",
        path: "/historico",
      },
      {
        icon: "logout",
        label: "Sair",
        path: "/login",
        action: async () => {
          try {
            await signOut(auth);
            console.log(auth);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/minhas-financas" element={<MinhasFinancas />} />
        <Route path="/adicionar-transacao" element={<AdicionarTransacao />} />
        <Route path="/historico" element={<Historico />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
