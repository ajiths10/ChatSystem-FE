import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  let authLogin = global.UserToken;

  return authLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
