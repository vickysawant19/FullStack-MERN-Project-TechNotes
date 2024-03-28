import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.count++;
    },
    decriment: (state, action) => {
      state.count--;
    },
  },
});

export const selectCount = (state) => state.counter.count;

export const { increment, decriment } = counterSlice.actions;
export default counterSlice;
