/**redux authentication slice for keeping track of authentication state info
 */
import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "./types/authTypes";

const initialState: UserInfo = {
  token: null,
  isAuthenticated: localStorage.getItem("isLoggedIn") === "true",
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
      state.last_name = last_name;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("first_name"); 
      localStorage.removeItem("last_name"); 
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

