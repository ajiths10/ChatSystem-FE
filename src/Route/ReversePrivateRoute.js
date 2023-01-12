import React from "react";
import { Navigate } from "react-router-dom";

const ReversePrivateRoute = ({ children }) => {
  let authLogin = global.UserToken;

  return authLogin ? <Navigate to="/" /> : children;
};

export default ReversePrivateRoute;
