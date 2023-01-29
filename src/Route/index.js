import React, { useEffect, useContext } from "react";
import { Route, Routes, Redirect } from "react-router-dom";
import SignUp from "../view/signup";
import Login from "../view/login";
import Chat from "../view/chat";
import PrivateRoute from "./PrivateRoute";
import ReversePrivateRoute from "./ReversePrivateRoute";
import UserContext from "../context/user/UserContext";
import { useSelector } from "react-redux";
import Payment from "../view/payment";

const RouteIndex = () => {
  const { VerifyUser, isAuthenticated } = useContext(UserContext);
  const ReduxAuth = useSelector(
    (state) => state.userAthenticated.isAuthenticated
  );

  useEffect(() => {
    if (global.UserToken && !isAuthenticated) {
      VerifyUser({ userId: global.UserToken });
    }
  }, [isAuthenticated, global.UserToken]);

  console.log("Redux console", ReduxAuth);

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
        <Route
          path="/payment/:token/:status"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default RouteIndex;
