import React from "react";
import useTheme from "../../../hooks/useTheme";

function ThemeToggleButton() {
  const [theme, toggleTheme] = useTheme(); // Retrieves the current theme and toggle function

  return (
    <button
      aria-label="toggle theme" 
      onClick={toggleTheme} // Handles theme toggling
      className="px-1 aspect-square border-default rounded flex items-center justify-center"
    >
      {theme === "light" ? (
        <span className="material-symbols-outlined text-base md:text-xl">dark_mode</span> // Icon for dark mode
      ) : (
        <span className="material-symbols-outlined text-base md:text-xl">light_mode</span> // Icon for light mode
      )}
    </button>
  );
}

export default React.memo(ThemeToggleButton); // Optimizes by memoizing to prevent unnecessary re-renders
