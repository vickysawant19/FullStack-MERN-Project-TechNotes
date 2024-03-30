import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdaptor = createEntityAdapter({
  selectId: (note) => note.id,
  sortComparer: (a, b) => a._id.localeCompare(b._id),
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
  }),
});

export const { useGetNotesQuery } = notesApiSlice;

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
