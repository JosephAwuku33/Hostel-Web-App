import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "./types/authTypes";

const initialState: UserInfo = {
  token:  null,
  googleUser: null,
  isAuthenticated: sessionStorage.getItem("isLoggedIn") === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
      state.isAuthenticated = true;
      sessionStorage.setItem("isLoggedIn", "true");
    },
    setGoogleCredentials: (state, action) => {
      const { user } = action.payload;
      state.googleUser = user;
      state.isAuthenticated = true;
      sessionStorage.setItem("isLoggedIn", "true");
    },
    logout: (state) => {
      state.token = null;
      state.googleUser = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("isLoggedIn");
    },
  },
});

export const { setCredentials, logout, setGoogleCredentials } = authSlice.actions;

export default authSlice.reducer;

