import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  isAuthenticated: false,
};

const userAuthenticateSlice = createSlice({
  name: "UserAthentication",
  initialState: initialValues,
  reducers: {
    Authenticate(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const authAction = userAuthenticateSlice.actions;
export default userAuthenticateSlice.reducer;
