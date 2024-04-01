import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.7:3000" }),
  tagTypes: ["note", "user"],
  endpoints: (builder) => ({}),
});
