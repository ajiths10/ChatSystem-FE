import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
// import SendIcon from "@material-ui/icons/Send";
import { randomColor } from "../../common/common";
import UserContext from "../../context/user/UserContext";
import ChatForm from "./ChatForm";
import MessageContext from "../../context/message/MessageContext";
import moment from "moment";
import { socket } from "../../common/socket";
import { Typography } from "@mui/material";
import SideBar from "./SideBar";

const useStyles = makeStyles({
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  list_items: {
    backgroundColor: "#eeeeee",
    margin: "2px",
    borderRadius: "1rem",
    // minWidth: "auto",
    // maxWidth: "500px",
    padding: "5px",
    // height: "150px",
  },
  messageArea: {
    height: "80vh",
    overflowY: "auto",
  },
});

const Chat = () => {
  const classes = useStyles();

  const { user } = useContext(UserContext);
  const { user_messages } = useContext(MessageContext);

  const [isUser, setUser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userMessages, setUserMessages] = useState([]);
  const [commonUserKey, setCommonUserId] = useState(0);
  const [reload, setReload] = useState(false);
  const [tabValue, setTabValue] = useState("user");

  const lastChildRef = useRef(null);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (user_messages && user_messages.data) {
      if (commonUserKey && commonUserKey != user_messages.userData.common_key) {
        socket.emit("disconnect_room", { key: commonUserKey });
      }
      setUserMessages(user_messages.data);
      setCommonUserId(user_messages.userData.common_key);
      setReload(!reload);
    }
  }, [user_messages]);

  useEffect(() => {
    if (commonUserKey) {
      setTimeout(() => {
        socket.emit("join_room", { key: commonUserKey });
      }, 1000);
    }
    setReload(!reload);
  }, [commonUserKey]);

  useEffect(() => {
    if (socket) {
      socket.on("RECEIVE_MESSAGE", function (data) {
        setUserMessages(data.response);

        socket.emit("ACKNOWLEDGEMENT", {
          key: data.key,
          limit: global.limit,
        });
      });

      socket.on("ACKNOWLEDGEMENT_RESPONSE", (data) => {
        setUserMessages(data.newData);
      });
    }
    setReload(!reload);
  }, [socket, commonUserKey]);

  //Always point towards the last message element
  useEffect(() => {
    if (lastChildRef && lastChildRef.current) {
      lastChildRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setReload(!reload);
  }, [userMessages]);

  return (
    <div>
      {reload ? null : null}
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            {selectedUserId ? selectedUserId.name : "Loading"}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container className={classes.chatSection}>
        <SideBar
          isUser={isUser}
          setSelectedUserId={setSelectedUserId}
          selectedUserId={selectedUserId}
          tabValue={tabValue}
          setTabValue={setTabValue}
        />
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {userMessages.map((spacedog, index) => {
              return (
                <ListItem key={spacedog.id}>
                  <Grid container className={classes.list_items}>
                    <Grid item xs={12}>
                      <ListItemText
                        align={isUser.id === spacedog.userid ? "right" : "left"}
                      >
                        <Typography variant="overline">
                          {spacedog.name}
                        </Typography>
                      </ListItemText>
                      <ListItemText
                        align={isUser.id === spacedog.userid ? "right" : "left"}
                      >
                        <Typography variant="button">
                          {spacedog.message}
                        </Typography>
                      </ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align={isUser.id === spacedog.userid ? "right" : "left"}
                      >
                        <Typography variant="caption">
                          {isUser.id === spacedog.userid
                            ? moment(spacedog.created_at).format("hh:mm a") +
                              " " +
                              spacedog.status
                            : moment(spacedog.created_at).format("hh:mm a")}
                        </Typography>
                        {userMessages.length === index + 1 ? (
                          <div ref={lastChildRef} />
                        ) : (
                          <></>
                        )}
                      </ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
          </List>
          <Divider />
          <ChatForm
            recipientId={selectedUserId.id}
            commonUserKey={commonUserKey}
            userId={isUser.id}
            tabValue={tabValue}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
