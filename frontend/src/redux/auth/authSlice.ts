import { createSlice } from "@reduxjs/toolkit";
// import { ApiResponse } from "./types/authTypes";
import { UserInfo } from "./types/authTypes";

const initialState: UserInfo = {
  token : null,
  googleUser : null,
  isAuthenticated: localStorage.getItem('isLoggedIn') === 'true'
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
       const { accessToken } = action.payload;
       state.token = accessToken;
       state.isAuthenticated = true;
       localStorage.setItem('isLoggedIn', 'true');
    },
    setGoogleCredentials: ( state, action) => {
       const { user } = action.payload;
       state.googleUser = user;
       state.isAuthenticated = true;
       localStorage.setItem('isLoggedIn', 'true');
    },
    logout: (state) => {
      state.token = null;
      state.googleUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem('isLoggedIn');
    },
  },
});

export const { setCredentials, logout, setGoogleCredentials } = authSlice.actions;

export default authSlice.reducer;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectCurrentToken = (state: { auth: { token: any; }; }) => state.auth.token;
