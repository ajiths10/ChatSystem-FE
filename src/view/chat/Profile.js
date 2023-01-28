import React, { useState, useContext, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import UserContext from "../../context/user/UserContext";
import { randomColor } from "../../common/common";
import Tooltip from "@mui/material/Tooltip";
import "./Chat.css";

const Profile = (props) => {
  const { profilePopup, setProfilePopup } = props;
  const { user, update_reponse, updateUser } = useContext(UserContext);

  const [isUser, setUser] = useState(user);
  const [reload, setReload] = useState(false);

  const validationSchema = yup.object({
    name: yup.string().min(2, "Please enter proper name").required("Required"),
    avatar: yup
      .string()
      .min(2, "Please enter proper name")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      avatar: "",
      id: 0,
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateUser(values);
    },
  });

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  const handleClose = () => {
    setProfilePopup(false);
    formik.handleReset();
  };

  const handleColor = () => {
    let color = randomColor();
    formik.setFieldValue("avatar", color);
  };

  useEffect(() => {
    if (isUser) {
      formik.setFieldValue("id", isUser.id);
      formik.setFieldValue("email", isUser.email);
      formik.setFieldValue("name", isUser.name);
      formik.setFieldValue("avatar", isUser.avatar);
    }
    setReload(!reload);
  }, [isUser, profilePopup]);

  useEffect(() => {
    if (update_reponse) {
      handleClose();
    }
  }, [update_reponse]);

  return (
    <>
      <Dialog
        open={profilePopup}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <div class="container  mt-3 p-5 my-5 ">
          <h2>Profile Update</h2>
          <p>Hello {isUser ? isUser.name : "USER"}</p>
          <form onSubmit={formik.handleSubmit}>
            <div class="form-floating mb-3 mt-3">
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                disabled={true}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Full Name "
                name="name"
                autoComplete="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <div class="row">
                <div class="col-md-10">
                  <TextField
                    margin="normal"
                    id="avatar"
                    fullWidth
                    label="Avatar "
                    name="avatar"
                    autoComplete="avatar"
                    value={formik.values.avatar}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.avatar && Boolean(formik.errors.avatar)
                    }
                    helperText={formik.touched.avatar && formik.errors.avatar}
                  />
                </div>
                <div class="col-md-2 mt-3">
                  <Tooltip title="Generate a rondom color" placement="top">
                    <Button
                      variant="outlined"
                      onClick={handleColor}
                      size="large"
                      className="randomColorBtn"
                    >
                      <span class="material-icons">color_lens</span>
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Create
              </Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default Profile;
