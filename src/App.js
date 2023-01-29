import React, { useEffect } from "react";
import "./App.css";
import UserState from "./context/user/UserState";
import MessageState from "./context/message/MessageState";
import CommonState from "./context/common/CommonState";
import PaymentState from "./context/payment/PaymentState";
import RouteIndex from "./Route";
import { SnackbarProvider } from "notistack";
import { socket } from "./common/socket";

const App = () => {
  global.domainURL = process.env.REACT_APP_DOMAIN;
  global.UserToken = localStorage.getItem("UserToken");
  global.limit = 7;
  // useEffect(() => {
  //   socket.emit("data_send", { message: "Hello server" });
  // }, []);

  return (
    <div className="App">
      <SnackbarProvider>
        <CommonState>
          <UserState>
            <PaymentState>
              <MessageState>
                <RouteIndex />
              </MessageState>
            </PaymentState>
          </UserState>
        </CommonState>
      </SnackbarProvider>
    </div>
  );
};

export default App;
