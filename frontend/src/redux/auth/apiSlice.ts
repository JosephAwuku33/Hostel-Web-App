import {
  fetchBaseQuery,
  createApi,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";



const baseQuery = fetchBaseQuery({
  baseUrl: "",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    console.log(`These are the ${token}`);
    return headers;
  },
});



export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: () => ({}),
});



