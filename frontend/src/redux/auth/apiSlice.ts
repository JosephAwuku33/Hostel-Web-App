import {
  fetchBaseQuery,
  createApi,
} from "@reduxjs/toolkit/query/react";
// import type { RootState } from "../store";



const baseQuery = fetchBaseQuery({
  baseUrl: "",
  credentials: "include",
});



export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: () => ({}),
});



