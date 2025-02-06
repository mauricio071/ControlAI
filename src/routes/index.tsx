import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { useDrawerContext } from "../shared/contexts";
import {
  AdicionarTransacao,
  Dashboard,
  Historico,
  PerfilUsuario,
} from "../pages";

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
        icon: "person",
        label: "Perfil do usuário",
        path: "/perfil-usuario",
      },
      {
        icon: "add_circle",
        label: "Adicionar transação",
        path: "/adicionar-transacao",
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
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/perfil-usuario" element={<PerfilUsuario />} />
      <Route path="/adicionar-transacao" element={<AdicionarTransacao />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
