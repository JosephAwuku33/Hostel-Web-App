import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.ts";
import roomReducer from "./graph_info/roomSlice.ts";
import { apiSlice } from "./auth/apiSlice.ts";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    rooms: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
