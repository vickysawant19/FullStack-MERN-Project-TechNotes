import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./couterSlice";

export const store = configureStore({
  reducer: {
    [counterSlice.name]: counterSlice.reducer,
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat(apiSlice.middleware),
});
