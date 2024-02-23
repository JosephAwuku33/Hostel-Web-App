import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "./types/authTypes";

const initialState: UserInfo = {
  token:  null,
  googleUser: null,
  isAuthenticated: sessionStorage.getItem("isLoggedIn") === "true",
  first_name: localStorage.getItem("first_name") || "",
  last_name: localStorage.getItem("last_name") || ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, first_name, last_name } = action.payload;
      console.log(action.payload);
      state.token = accessToken;
      state.first_name = first_name;
      localStorage.setItem("first_name", first_name); // Save first name to local storage
      state.last_name = last_name;
      localStorage.setItem("last_name", last_name); // Save last name to local storage
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
      localStorage.removeItem("first_name"); // Remove first name from local storage
      localStorage.removeItem("last_name"); // Remove last name from local storage
    },
  },
});

export const { setCredentials, logout, setGoogleCredentials } = authSlice.actions;

export default authSlice.reducer;

