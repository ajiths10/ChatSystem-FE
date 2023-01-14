import { GET_ALL_MESSAGES, CLEAR_ALL } from "./MessageType";

const MessageReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return {
        ...state,
        user_messages: action.data,
      };

    case CLEAR_ALL:
      return (state = "");
    default:
      throw new Error("Unexpected action");
  }
};

export default MessageReducer;
