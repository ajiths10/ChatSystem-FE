import React, { useEffect, useContext } from "react";
import { Route, Routes, Redirect } from "react-router-dom";
import SignUp from "../view/signup";
import Login from "../view/login";
import Chat from "../view/chat";
import PrivateRoute from "./PrivateRoute";
import ReversePrivateRoute from "./ReversePrivateRoute";
import UserContext from "../context/user/UserContext";

const RouteIndex = () => {
  const { VerifyUser } = useContext(UserContext);

  useEffect(() => {
    if (global.UserToken) {
      VerifyUser({ userId: global.UserToken });
    }
  }, [global.UserToken]);

  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={
            <ReversePrivateRoute>
              <SignUp />
            </ReversePrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ReversePrivateRoute>
              <Login />
            </ReversePrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default RouteIndex;
