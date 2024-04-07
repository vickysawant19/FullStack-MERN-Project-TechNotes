import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthToken, clearAuthToken } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    let token = getState().auth.authToken?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else {
      // console.log("no token");
    }
    return headers;
  },
});

const baseQueryWithReauth = async (arg, api, extraOptions) => {
  let result = await baseQuery(arg, api, extraOptions);
  //403 || 401
  if (result?.error?.status === 403) {
    //send refresh token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      //store new token
      api.dispatch(setAuthToken({ ...refreshResult.data }));
      //retry original query with new access token
      result = await baseQuery(arg, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your Login has expired";
      }
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["note", "user"],
  endpoints: (builder) => ({}),
});
