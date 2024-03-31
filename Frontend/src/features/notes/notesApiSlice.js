import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdaptor = createEntityAdapter({
  selectId: (note) => note.id,
  sortComparer: (a, b) => b.ticket - a.ticket,
});

const initialState = notesAdaptor.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      keepUnusedDataFor: 10,
      transformResponse: (responsData) => {
        const data = responsData.map((data) => {
          data.id = data._id;
          return data;
        });
        return notesAdaptor.setAll(initialState, data);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "note", id: "LIST" },
            ...result.ids.map((id) => ({ type: "note", id })),
          ];
        } else {
          return [{ type: "note", id: "LIST" }];
        }
      },
    }),

    addNote: builder.mutation({
      query: (body) => ({
        url: "/notes",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "note", id: "LIST" }],
    }),

    updateNote: builder.mutation({
      query: (body) => ({ url: "/notes", method: "PATCH", body }),
      invalidatesTags: (result, error, arg) => [{ type: "note", id: arg._id }],
    }),

    deleteNote: builder.mutation({
      query: (id) => ({ url: "/notes", method: "DELETE", body: id }),
      invalidatesTags: (result, error, arg) => [{ type: "note", id: arg._id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

export const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data
);

export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectUNoteIds,
} = notesAdaptor.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);
