import {
  USER_REGISTER,
  USER_LOGIN,
  USER_AUTHENTICATED,
  USER_ALL_USERS,
  USER_UPDATE,
  USER_LOG_OUT,
  CLEAR_ALL,
} from "./UserType";

const UserReducer = (state, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return {
        ...state,
        response: action.data,
      };
    case USER_LOGIN:
      return {
        ...state,
        response: action.data,
      };
    case USER_AUTHENTICATED:
      return {
        ...state,
        user: action.data,
        isAuthenticated: true,
      };
    case USER_ALL_USERS:
      return {
        ...state,
        all_users: action.data,
      };
    case USER_UPDATE:
      return {
        ...state,
        update_reponse: action.data,
      };
    case USER_LOG_OUT:
      return {
        isAuthenticated: false,
        user: [],
        all_users: [],
        response: "",
      };
    case CLEAR_ALL:
      return (state = "");
    default:
      throw new Error("Unexpected action");
  }
};

export default UserReducer;
