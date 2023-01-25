import {
  GET_ALL_MESSAGES,
  GET_ALL_RESPONSE,
  GET_NEW_GROUP_RESPONSE,
  GET_ALL_GROUPS,
  GET_ALL_GROUP_MESSAGES,
  CLEAR_ALL,
} from "./MessageType";

const MessageReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return {
        ...state,
        user_messages: action.data,
      };
    case GET_ALL_RESPONSE:
      return {
        ...state,
        response: action.data,
      };
    case GET_NEW_GROUP_RESPONSE:
      return {
        ...state,
        newGroupeResponse: action.data,
      };
    case GET_ALL_GROUPS:
      return {
        ...state,
        user_groups: action.data,
      };
    case GET_ALL_GROUP_MESSAGES:
      return {
        ...state,
        group_messages: action.data,
      };

    case CLEAR_ALL:
      return (state = "");
    default:
      throw new Error("Unexpected action");
  }
};

export default MessageReducer;
