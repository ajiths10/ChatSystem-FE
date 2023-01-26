import React, { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import MessageContext from "./MessageContext";
import MessageReducer from "./MessageReducer";
import Commonontext from "../common/CommonContext";
import { api } from "../../common/api";
import {
  GET_ALL_MESSAGES,
  GET_ALL_RESPONSE,
  GET_ALL_GROUPS,
  GET_NEW_GROUP_RESPONSE,
  GET_ALL_GROUP_MESSAGES,
  GET_SINGLE_GROUP,
  CLEAR_ALL,
} from "./MessageType";

const initialState = {
  user_messages: [],
  group_messages: [],
  user_groups: [],
  response: "",
  single_group: "",
  newGroupeResponse: "",
};

const MessageState = (props) => {
  const history = useNavigate();
  const { setAlert } = useContext(Commonontext);
  const [state, dispatch] = useReducer(MessageReducer, initialState);

  const getAllUserMessage = async (formData) => {
    const res = await api(formData, "/message/usermessage");
    //setAlert(res.data);
    dispatch({ type: GET_ALL_MESSAGES, data: res.data });
  };

  const getAllUserGroupMessage = async (formData) => {
    const res = await api(formData, "/group/groupmessage");
    //setAlert(res.data);
    dispatch({ type: GET_ALL_GROUP_MESSAGES, data: res.data });
  };

  const messageAction = async (formData) => {
    const res = await api(formData, "/message/send");
    setAlert(res.data);
    dispatch({ type: GET_ALL_RESPONSE, data: res.data });
  };

  const addNewGroup = async (formData) => {
    const res = await api(formData, "/group/newgroup");
    setAlert(res.data);
    dispatch({ type: GET_NEW_GROUP_RESPONSE, data: res.data });
  };

  const getUserGroups = async (formData) => {
    const res = await api(formData, "/group/usergroup");
    // setAlert(res.data);
    dispatch({ type: GET_ALL_GROUPS, data: res.data });
  };

  const updategroup = async (formData) => {
    const res = await api(formData, "/group/updategroup");
    setAlert(res.data);
    dispatch({ type: GET_NEW_GROUP_RESPONSE, data: res.data });
  };

  const getSingleGroup = async (formData) => {
    const res = await api(formData, "/group/getsinglegroup");
    // setAlert(res.data);
    dispatch({ type: GET_SINGLE_GROUP, data: res.data.data[0] });
  };

  const clearAll = () => {
    dispatch({ type: CLEAR_ALL });
  };

  return (
    <MessageContext.Provider
      value={{
        response: state.response,
        user_groups: state.user_groups,
        single_group: state.single_group,
        user_messages: state.user_messages,
        group_messages: state.group_messages,
        newGroupeResponse: state.newGroupeResponse,
        getAllUserGroupMessage,
        getAllUserMessage,
        getSingleGroup,
        messageAction,
        getUserGroups,
        addNewGroup,
        updategroup,
        clearAll,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageState;
