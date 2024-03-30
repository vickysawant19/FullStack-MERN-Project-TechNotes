import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdaptor = createEntityAdapter({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a._id.localeCompare(b._id),
});

const initialState = usersAdaptor.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      keepUnusedDataFor: 5,
      transformResponse: (responsData) => {
        const data = responsData.map((data) => {
          data.id = data._id;
          return data;
        });
        return usersAdaptor.setAll(initialState, data);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "user", id: "LIST" },
            ...result.ids.map((id) => ({ type: "user", id })),
          ];
        } else {
          return [{ type: "user", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

export const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdaptor.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
