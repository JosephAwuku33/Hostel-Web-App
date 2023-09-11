import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.ts";
// import reducers


export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type
export type AppDispatch = typeof store.dispatch