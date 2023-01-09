import React from "react";
import "./App.css";
import UserState from "./context/user/UserState";
import CommonState from "./context/common/CommonState";
import RouteIndex from "./Route";
import { SnackbarProvider } from "notistack";

const App = () => {
  global.domainURL = process.env.REACT_APP_DOMAIN;

  return (
    <div className="App">
      <SnackbarProvider>
        <CommonState>
          <UserState>
            <RouteIndex />
          </UserState>
        </CommonState>
      </SnackbarProvider>
    </div>
  );
};

export default App;
