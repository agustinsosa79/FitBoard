// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../src/context/authContext";

export const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const auth = useAuth();

  if (!auth || !auth.user) return <Navigate to="/Acceso" />;
  return children;
};
