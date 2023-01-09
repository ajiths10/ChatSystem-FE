import React from "react";
import "./App.css";
import UserState from "./context/user/UserState";
import RouteIndex from "./Route";

const App = () => {
  global.domainURL = process.env.REACT_APP_DOMAIN;

  return (
    <div className="App">
      <UserState>
        <RouteIndex />
      </UserState>
    </div>
  );
};

export default App;
