import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: null,
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    clearAuthToken: (state) => {
      state.authToken = null;
    },
  },
});

export default authSlice.reducer;

export const { setAuthToken, clearAuthToken } = authSlice.actions;

export const selectToken = (state) => state.auth.authToken;
