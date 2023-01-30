import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PaymentContext from "../../context/payment/PaymentContext";

const Payment = () => {
  const { paymentConfirmation } = useContext(PaymentContext);
  const params = useParams();

  useEffect(() => {
    if (params.status && params.token) {
      paymentConfirmation({ token: params.token, status: params.status });
    }
  }, [params]);

  return (
    <>
      <h1>{params.status}</h1>
    </>
  );
};

export default Payment;
