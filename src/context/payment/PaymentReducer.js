import { PAYMENT, CLEAR_ALL } from "./PaymentType";

const PaymentReducer = (state, action) => {
  switch (action.type) {
    case PAYMENT:
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

export default PaymentReducer;
