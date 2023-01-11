import React, { useContext, useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import Commonontext from "../common/CommonContext";
import { api } from "../../common/api";
import { USER_REGISTER, USER_LOGIN, CLEAR_ALL } from "./UserType";
const initialState = { response: "" };

const UserState = (props) => {
  const { setAlert } = useContext(Commonontext);
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const RegisterUser = async (formData) => {
    const res = await api(formData, "/user/register");
    setAlert(res.data);
    dispatch({ type: USER_REGISTER, data: res.data });
  };

  const LoginUser = async (formData) => {
    const res = await api(formData, "/user/login");
    setAlert(res.data);
    dispatch({ type: USER_LOGIN, data: res.data });
  };

  const clearAll = () => {
    dispatch({ type: CLEAR_ALL });
  };

  return (
    <UserContext.Provider
      value={{ response: state.response, RegisterUser, LoginUser, clearAll }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
