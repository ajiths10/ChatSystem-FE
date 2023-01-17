import { configureStore } from "@reduxjs/toolkit";

import userAthenticate from "./userAthenticate";

const reduxStore = configureStore({
  reducer: {
    userAthenticated: userAthenticate,
  },
});

export default reduxStore;
