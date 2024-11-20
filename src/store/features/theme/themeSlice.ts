import { createSlice } from "@reduxjs/toolkit";

// Define the type for the theme state
type ThemeState = {
  theme: "light" | "dark";  // The theme can either be "light" or "dark"
};

// Define the initial state with a default value of "dark"
// The theme is loaded from localStorage if available, otherwise defaults to "dark"
const initialState: ThemeState = {
  theme: (localStorage.getItem("theme") as "light" | "dark") || "dark",
};

// Create the theme slice using Redux Toolkit's createSlice method
const themeSlice = createSlice({
  name: "theme",  // The name of the slice, used for action types and reducers
  initialState,   // The initial state defined above
  reducers: {
    // Define the action to toggle the theme between "light" and "dark"
    toggleTheme: (state) => {
      // Toggle the theme value between "light" and "dark"
      state.theme = state.theme === "light" ? "dark" : "light";
      // Save the updated theme to localStorage to persist across sessions
      localStorage.setItem("theme", state.theme);
    },
  },
});

// Export the action so it can be dispatched in components
export const { toggleTheme } = themeSlice.actions;

// Export the reducer to be used in the store configuration
export default themeSlice.reducer;
