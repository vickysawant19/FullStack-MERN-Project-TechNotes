import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.7:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.authToken;
      if (token) {
        console.log("token", token);
        headers.set("Authorization", `Bearer ${token}`);
      }
      console.log("no token");
      return headers;
    },
  }),

  tagTypes: ["note", "user"],
  endpoints: (builder) => ({}),
});
