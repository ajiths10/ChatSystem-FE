import {
  USER_REGISTER,
  USER_LOGIN,
  USER_AUTHENTICATED,
  USER_ALL_USERS,
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
        isAuthenticated: action.data,
      };
    case USER_ALL_USERS:
      return {
        ...state,
        all_users: action.data,
      };

    case CLEAR_ALL:
      return (state = "");
    default:
      throw new Error("Unexpected action");
  }
};

export default UserReducer;
