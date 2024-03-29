import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { randomColor } from "../../common/common";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@material-ui/core";
import UserContext from "../../context/user/UserContext";
import MessageContext from "../../context/message/MessageContext";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Fab from "@mui/material/Fab";
import NewGroupPopup from "./NewGroupPopup";
import Profile from "./Profile";
import Divider from "@material-ui/core/Divider";
import PaymentContext from "../../context/payment/PaymentContext";
import ConfirmPopup from "../payment/ConfirmPopup";

const useStyles = makeStyles({
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  profileBtn: {
    width: "100%",
    height: "100%",
  },
  messageArea: {
    overflowY: "auto",
    height: "55vh",
  },
});

const SideBar = (props) => {
  const classes = useStyles();

  const {
    isUser,
    selectedUserId,
    setSelectedUserId,
    tabValue,
    setTabValue,
    setUserMessages,
  } = props;

  const { getAllUSers, all_users, user, isAuthenticated, userLogout } =
    useContext(UserContext);
  const {
    getAllUserMessage,
    getUserGroups,
    user_groups,
    newGroupeResponse,
    getAllUserGroupMessage,
  } = useContext(MessageContext);
  const { payment } = useContext(PaymentContext);

  const [anchorElUser, setAnchorElUser] = useState(false);
  const [reload, setReload] = useState(false);
  const [allUsersState, setAllUsersState] = useState([]);
  const [profilePopup, setProfilePopup] = useState(false);
  const [paymentPopup, setPaymentPopup] = useState(false);
  const [newGroupPopup, setNewGroupPopup] = useState({
    popup: false,
    status: "new",
    id: 0,
  });

  const settings = [
    <Button className={classes.profileBtn} onClick={handleCloseUserMenu}>
      <span class="material-icons">admin_panel_settings</span>&nbsp; profile
    </Button>,
    <Button className={classes.profileBtn} onClick={userLogout}>
      <span class="material-icons">logout</span>&nbsp; Logout
    </Button>,
  ];

  function handleOpenUserMenu() {
    setAnchorElUser(true);
    setReload(!reload);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(false);
    setProfilePopup(true);
  }

  useEffect(() => {
    if (isAuthenticated) {
      getAllUSers();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (tabValue === "user") {
      if (all_users) {
        setAllUsersState(all_users);
        if (all_users[0]) {
          setSelectedUserId(all_users[0]);
        }
      }
    } else if (tabValue === "group") {
      if (user_groups && user_groups.data) {
        setAllUsersState(user_groups.data);
        if (
          user_groups.data[0] &&
          !selectedUserId.id === user_groups.data[0].id
        ) {
          setSelectedUserId(user_groups.data[0]);
        }
      }
    }
  }, [all_users, user_groups, tabValue]);

  useEffect(() => {
    if (selectedUserId && isAuthenticated && user) {
      setUserMessages([]);
      if (tabValue === "user") {
        getAllUserMessage({
          recipientId: selectedUserId.id,
          limit: global.limit,
        });
      } else if (tabValue === "group") {
        if (user_groups) {
          getAllUserGroupMessage({
            recipientId: selectedUserId.id,
            limit: global.limit,
          });
        }
      }
    }
  }, [
    selectedUserId,
    isAuthenticated,
    user_groups,
    tabValue,
    newGroupeResponse,
  ]);

  useEffect(() => {
    if (tabValue === "group") {
      getUserGroups();
    }
  }, [tabValue]);

  return (
    <>
      <Grid item xs={3} className={classes.borderRight500}>
        <List>
          <ListItem button key={isUser.id}>
            <ListItemIcon>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="profile"
                      style={{
                        backgroundColor: isUser.avatar || randomColor(),
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((buscat, index) => (
                    <MenuItem key={index}>
                      {buscat}
                      {/* <Typography textAlign="center">{buscat}</Typography> */}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </ListItemIcon>
            <ListItemText onClick={handleOpenUserMenu}>
              <Typography variant="h5" className="header-message">
                {isUser.name}
              </Typography>
            </ListItemText>
          </ListItem>
        </List>

        <Grid item xs={12} style={{ padding: "10px" }}>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            variant="circular"
            onClick={() => {
              setNewGroupPopup({ popup: true, status: "new", id: 0 });
            }}
          >
            <span class="material-icons">group_add</span>
          </Fab>{" "}
          &nbsp;
          <ToggleButtonGroup
            color="primary"
            value={tabValue}
            exclusive
            // onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton onClick={() => setTabValue("user")} value="user">
              User
            </ToggleButton>
            <ToggleButton onClick={() => setTabValue("group")} value="group">
              Group
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={12} style={{ padding: "10px" }}>
          <TextField
            id="outlined-basic-email"
            label="Search"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <List className={classes.messageArea}>
          {allUsersState.map((buscat, index) => {
            return (
              <ListItem
                button
                key={`${tabValue}${buscat.id}`}
                selected={selectedUserId.id === buscat.id ? true : false}
                onClick={() => {
                  setSelectedUserId(buscat);
                }}
              >
                <ListItemIcon>
                  <Avatar
                    style={{
                      backgroundColor: buscat.avatar || randomColor(),
                    }}
                  />
                </ListItemIcon>
                <ListItemText>{buscat.name}</ListItemText>
                {tabValue === "group" &&
                (buscat.admins
                  ? buscat.admins
                      .split(",")
                      .map((e) => Number(e))
                      .includes(isUser.id)
                  : false) ? (
                  <ListItemText align="right">
                    {" "}
                    <Button
                      onClick={() =>
                        setNewGroupPopup({
                          popup: true,
                          status: "edit",
                          id: buscat.id,
                        })
                      }
                    >
                      <span class="material-icons">edit</span>
                    </Button>
                  </ListItemText>
                ) : null}
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <Grid style={{ padding: "10px" }}>
          <Button
            variant="outlined"
            onClick={() => {
              setPaymentPopup(true);
              // payment();
            }}
          >
            Buy me a coffee ❤️
          </Button>
        </Grid>
      </Grid>

      <NewGroupPopup
        setPopup={setNewGroupPopup}
        isPopup={newGroupPopup}
        allUsersState={all_users}
        isUser={isUser}
        tabValue={tabValue}
      />
      <Profile profilePopup={profilePopup} setProfilePopup={setProfilePopup} />
      <ConfirmPopup
        paymentPopup={paymentPopup}
        setPaymentPopup={setPaymentPopup}
      />
    </>
  );
};

export default SideBar;
