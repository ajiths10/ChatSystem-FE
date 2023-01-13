import React, { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import Commonontext from "../common/CommonContext";
import { api } from "../../common/api";
import {
  USER_REGISTER,
  USER_LOGIN,
  USER_AUTHENTICATED,
  CLEAR_ALL,
} from "./UserType";
const initialState = { isAuthenticated: false, response: "" };

const UserState = (props) => {
  const history = useNavigate();
  const { setAlert } = useContext(Commonontext);
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const VerifyUser = async (formData) => {
    const res = await api(formData, "/user/verify");

    if (res.data.status) {
      dispatch({ type: USER_AUTHENTICATED, data: true });
    } else {
      setAlert(res.data);
      dispatch({ type: USER_AUTHENTICATED, data: false });
      global.UserToken = false;
      localStorage.setItem("UserToken", "");
      history("/login");
    }
  };

  const RegisterUser = async (formData) => {
    const res = await api(formData, "/user/register");
    setAlert(res.data);
    dispatch({ type: USER_REGISTER, data: res.data });
    if (res.data.status) {
      setTimeout(() => {
        history("/login");
      }, 0);
    }
  };

  const LoginUser = async (formData) => {
    const res = await api(formData, "/user/login");
    setAlert(res.data);
    if (res.data.status) {
      localStorage.setItem("UserToken", res.data.token);
      global.UserToken = res.data.token;
      setTimeout(() => {
        history("/");
      }, 0);
    }
    dispatch({ type: USER_LOGIN, data: res.data });
  };

  const clearAll = () => {
    dispatch({ type: CLEAR_ALL });
  };

  return (
    <UserContext.Provider
      value={{
        response: state.response,
        isAuthenticated: state.isAuthenticated,
        RegisterUser,
        LoginUser,
        VerifyUser,
        clearAll,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
