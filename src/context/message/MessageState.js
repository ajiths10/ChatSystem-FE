import React, { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import MessageContext from "./MessageContext";
import MessageReducer from "./MessageReducer";
import Commonontext from "../common/CommonContext";
import { api } from "../../common/api";
import { GET_ALL_MESSAGES, CLEAR_ALL } from "./MessageType";
const initialState = { user_messages: [], response: "" };

const MessageState = (props) => {
  const history = useNavigate();
  const { setAlert } = useContext(Commonontext);
  const [state, dispatch] = useReducer(MessageReducer, initialState);

  const getAllUserMessage = async (formData) => {
    const res = await api(formData, "/message/user");
    setAlert(res.data);
    dispatch({ type: GET_ALL_MESSAGES, data: res.data });
    if (res.data.status) {
      setTimeout(() => {
        history("/login");
      }, 0);
    }
  };

  const messageAction = async (formData) => {
    const res = await api(formData, "/message/send");
    setAlert(res.data);
  };

  const clearAll = () => {
    dispatch({ type: CLEAR_ALL });
  };

  return (
    <MessageContext.Provider
      value={{
        response: state.response,
        getAllUserMessage,
        messageAction,
        clearAll,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageState;
