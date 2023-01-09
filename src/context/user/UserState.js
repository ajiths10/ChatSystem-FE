import React, { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

import { api } from "../../common/api";

const initialState = {};

const UserState = (props) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const RegisterUser = async (formData) => {
    const res = await api(formData, "/register");
    console.log("hiii01", res);
  };

  return (
    <UserContext.Provider value={{ message: "hello world", RegisterUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
