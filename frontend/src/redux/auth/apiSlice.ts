/**RTK query wrapper for creating a slice dedicated to making api calls to
 *  the users endpoint */
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

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
