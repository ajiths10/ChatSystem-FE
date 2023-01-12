import {
  USER_REGISTER,
  USER_LOGIN,
  USER_AUTHENTICATED,
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

    case CLEAR_ALL:
      return (state = "");
    default:
      throw new Error("Unexpected action");
  }
};

export default UserReducer;
