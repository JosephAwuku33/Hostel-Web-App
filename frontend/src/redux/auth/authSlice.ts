import { createSlice } from "@reduxjs/toolkit";
import { ApiResponse } from "./types/authTypes";

interface AuthState {
  userInfo: ApiResponse["user"] | null;
}

const userInfo = localStorage.getItem("userInfo");
const user = userInfo ? JSON.parse(userInfo) : null;

const initialState: AuthState = {
  userInfo: user ? user : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
