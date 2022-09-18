import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from '../view/signup';

const RouteIndex = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </>
  );
};

export default RouteIndex;
