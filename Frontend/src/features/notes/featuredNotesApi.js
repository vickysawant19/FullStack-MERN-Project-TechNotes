import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

export const featuredNotesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecentNotes: builder.query({
      query: () => "/notes/recent",
    }),
    getFeaturedNotes: builder.query({
      query: () => "/notes/featured",
    }),
    getUserNotes: builder.query({
      query: (userId) => `/notes/user/${userId}`,
    }),
  }),
});

export const {
  useGetRecentNotesQuery,
  useGetFeaturedNotesQuery,
  useGetUserNotesQuery,
} = featuredNotesApiSlice;
