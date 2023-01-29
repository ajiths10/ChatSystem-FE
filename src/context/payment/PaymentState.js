import React, { useContext, useReducer } from "react";
import { useDispatch } from "react-redux";
import { authAction } from "../../redux/userAthenticate";
import { useNavigate } from "react-router-dom";
import PaymentContext from "./PaymentContext";
import PaymentReducer from "./PaymentReducer";
import Commonontext from "../common/CommonContext";
import { api } from "../../common/api";
import { PAYMENT, CLEAR_ALL } from "./PaymentType";

const initialState = {
  response: "",
};

const PaymentState = (props) => {
  const reduxDispatch = useDispatch();

  const history = useNavigate();
  const { setAlert } = useContext(Commonontext);
  const [state, dispatch] = useReducer(PaymentReducer, initialState);

  const payment = async (formData) => {
    const res = await api(formData, "/stripe/payment");
    setAlert(res.data);
    if (res.data.status && res.data.url) {
      window.open(res.data.url);
    }
    dispatch({ type: PAYMENT, data: res.data.data });
  };

  const paymentConfirmation = async (formData) => {
    const res = await api(formData, "/stripe/confirm");
    // setAlert(res.data);
    dispatch({ type: PAYMENT, data: res.data.data });
  };

  const clearAll = () => {
    dispatch({ type: CLEAR_ALL });
  };

  return (
    <PaymentContext.Provider
      value={{
        response: state.response,
        payment,
        clearAll,
        paymentConfirmation,
      }}
    >
      {props.children}
    </PaymentContext.Provider>
  );
};

export default PaymentState;
