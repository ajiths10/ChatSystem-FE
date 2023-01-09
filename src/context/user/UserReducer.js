import { USER_REGISTER, CLEAR_ALL } from "./UserType";

const UserReducer = (state, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return {
        ...state,
        response: action.data,
      };

    case CLEAR_ALL:
      return (state = "");
    default:
      throw new Error("Unexpected action");
  }
};

export default UserReducer;
