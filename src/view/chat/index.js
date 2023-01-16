import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
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
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
  userName: {
    fontWeight: "bold",
  },
});

const Chat = () => {
  const { getAllUSers, all_users, user, isAuthenticated } =
    useContext(UserContext);
  const { getAllUserMessage, user_messages } = useContext(MessageContext);

  const [isUser, setUser] = useState([]);
  const [allUsersState, setAllUsersState] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userMessages, setUserMessages] = useState([]);
  const [commonUserKey, setCommonUserId] = useState(0);
  const [reload, setReload] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      getAllUSers();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (all_users) {
      setAllUsersState(all_users);
      if (all_users[0] && all_users[0]) {
        setSelectedUserId(all_users[0]);
      }
    }
  }, [all_users]);

  useEffect(() => {
    if (selectedUserId) {
      getAllUserMessage({
        recipientId: selectedUserId.id,
        limit: global.limit,
      });
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (user_messages && user_messages.data) {
      socket.emit("disconnect_room", { key: commonUserKey });
      setUserMessages(user_messages.data);
      setCommonUserId(user_messages.userData.common_key);
      setReload(!reload);
    }
  }, [user_messages]);

  useEffect(() => {
    if (commonUserKey) {
      socket.emit("join_room", { key: commonUserKey });
    }
    setReload(!reload);
  }, [commonUserKey]);

  useEffect(() => {
    if (socket) {
      socket.on("RECEIVE_MESSAGE", function (data) {
        if (data.key === commonUserKey) {
          setUserMessages(data.response);
        }
      });
    }
  }, [socket, commonUserKey]);

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
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key={isUser.name}>
              <ListItemIcon>
                <Avatar
                  style={{
                    backgroundColor: randomColor(),
                  }}
                >
                  {isUser.name ? isUser.name.charAt(0) : "A"}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={isUser.name}></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            {allUsersState.map((buscat, index) => {
              return (
                <ListItem
                  button
                  key={buscat.name}
                  selected={selectedUserId.id === buscat.id ? true : false}
                  onClick={() => {
                    setSelectedUserId(buscat);
                  }}
                >
                  <ListItemIcon>
                    <Avatar
                      style={{
                        backgroundColor: randomColor(),
                      }}
                    >
                      {buscat.name.charAt(0)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={buscat.name}>
                    {buscat.name}
                  </ListItemText>
                  {/* <ListItemText secondary="online" align="right"></ListItemText> */}
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {userMessages.map((spacedog) => {
              return (
                <ListItem key={spacedog.id}>
                  <Grid container className={classes.list_items}>
                    <Grid item xs={12}>
                      <ListItemText
                        className={classes.userName}
                        align={isUser.id === spacedog.userid ? "left" : "right"}
                        primary={spacedog.name}
                      ></ListItemText>
                      <ListItemText
                        align={isUser.id === spacedog.userid ? "left" : "right"}
                        primary={spacedog.message}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align={isUser.id === spacedog.userid ? "left" : "right"}
                        secondary={
                          moment(spacedog.created_at).format("hh:mm") +
                          " " +
                          spacedog.status
                        }
                      ></ListItemText>
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
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
