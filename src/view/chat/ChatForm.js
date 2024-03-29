import React, { useContext, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageContext from "../../context/message/MessageContext";
import { socket } from "../../common/socket";

const ChatForm = ({ recipientId, commonUserKey, userId, tabValue }) => {
  const { getAllUserMessage, getAllUserGroupMessage, messageAction, response } =
    useContext(MessageContext);

  const validationSchema = yup.object({
    message: yup.string().min(1, "required").required("required"),
  });

  const formik = useFormik({
    initialValues: {
      message: "",
      userId: userId,
      recipientId: recipientId,
      commonUserKey: commonUserKey,
      type: tabValue,
      limit: global.limit,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      messageAction(values);
      restForm();
    },
  });

  const restForm = () => {
    formik.values.message = "";
    formik.handleReset();
  };

  useEffect(() => {
    formik.values.recipientId = recipientId;
    formik.values.commonUserKey = commonUserKey;
    formik.setFieldValue("commonUserKey", commonUserKey);
    formik.values.userId = userId;
    formik.values.type = tabValue;
    formik.setFieldValue("type", tabValue);
  }, [recipientId, commonUserKey, userId, tabValue]);

  useEffect(() => {
    if (response) {
      if (tabValue === "user") {
        getAllUserMessage({ recipientId: recipientId, limit: global.limit });
        socket.emit("MESSAGE_ACTION", {
          ...formik.values,
        });
      }
      if (tabValue === "group") {
        getAllUserGroupMessage({
          recipientId: recipientId,
          limit: global.limit,
        });
        socket.emit("GROUP_MESSAGE_ACTION", {
          ...formik.values,
        });
      }
    }
  }, [response, tabValue]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={11}>
          <TextField
            id="outlined-basic-email"
            label="Message"
            fullWidth
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
        </Grid>
        <Grid xs={1} align="right">
          <Fab aria-label="add">
            <Button type="submit">
              {" "}
              <SendIcon />
            </Button>
          </Fab>
        </Grid>
      </Grid>
    </form>
  );
};

export default ChatForm;
