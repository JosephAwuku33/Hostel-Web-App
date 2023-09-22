import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.ts";
import roomReducer from "../features/graph_info/roomSlice.ts";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        rooms: roomReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type
export type AppDispatch = typeof store.dispatch