import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";

// Configure the Redux store with the specified reducer(s)
export const store = configureStore({
  reducer: {
    // Add the theme reducer to manage theme-related state
    theme: themeReducer,
  },
});

// Define the RootState type to represent the structure of the Redux store's state
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type to represent the dispatch function from the store
export type AppDispatch = typeof store.dispatch;
