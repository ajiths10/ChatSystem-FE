import React, { useState, useContext, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import Tooltip from "@mui/material/Tooltip";
import "./payment.css";
import PaymentContext from "../../context/payment/PaymentContext";
import UserContext from "../../context/user/UserContext";

const ConfirmPopup = (props) => {
  const { paymentPopup, setPaymentPopup } = props;

  const { payment, response } = useContext(PaymentContext);
  const { user } = useContext(UserContext);

  const [isUser, setUser] = useState("");

  const validationSchema = yup.object({
    amount: yup.number().min(10, "min 10rs").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      payment(values);
    },
  });

  const handleClose = () => {
    setPaymentPopup(false);
    formik.handleReset();
  };

  useEffect(() => {
    setUser(user);
  }, [user]);

  useEffect(() => {
    if (response) {
      handleClose();
    }
  }, [response]);

  return (
    <>
      <Dialog
        open={paymentPopup}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <div class="container  mt-3 p-5 my-5 ">
          <h2>Buy me a coffee ❤️</h2>
          <p>Hello {isUser && isUser.name ? isUser.name : "USER"}</p>
          <form onSubmit={formik.handleSubmit}>
            <div class="form-floating mb-3 mt-3">
              <div className="row-g-0 input-group">
                <div className=" col-md-1 input-group-text amountContainer">
                  ₹
                </div>
                <div className=" col-md-11">
                  <TextField
                    sx={{ width: "100%" }}
                    //   margin="normal"
                    //   fullWidth
                    // id="email"
                    // class="form-control"
                    label="Enter Amount"
                    name="amount"
                    autoComplete="amount"
                    type="number"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.amount && Boolean(formik.errors.amount)
                    }
                    helperText={formik.touched.amount && formik.errors.amount}
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <TextField
                    margin="normal"
                    id="message"
                    fullWidth
                    multiline
                    rows={2}
                    maxRows={4}
                    label="Message "
                    name="message"
                    autoComplete="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.message && Boolean(formik.errors.message)
                    }
                    helperText={formik.touched.message && formik.errors.message}
                  />
                </div>
              </div>
            </div>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Coffee
              </Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmPopup;
