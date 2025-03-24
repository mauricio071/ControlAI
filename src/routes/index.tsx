import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import {
  AdicionarTransacao,
  Dashboard,
  Historico,
  Login,
  MinhasFinancas,
  PageNotFound,
} from "../pages";
import { useDrawerContext } from "../shared/contexts";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

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
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/minhas-financas" element={<MinhasFinancas />} />
        <Route path="/adicionar-transacao" element={<AdicionarTransacao />} />
        <Route path="/historico" element={<Historico />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
