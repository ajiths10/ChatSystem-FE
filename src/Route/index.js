import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../view/signup";
import Login from "../view/login";

const RouteIndex = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default RouteIndex;
