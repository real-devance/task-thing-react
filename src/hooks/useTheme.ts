import { useEffect } from 'react';
import { toggleTheme as toggleThemeAction } from '../store/features/theme/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';


const useTheme = () => {
  const theme = useSelector((state: RootState) => state.theme.theme); // Get current theme from Redux store
  const dispatch = useDispatch<AppDispatch>(); // Dispatch function for Redux actions

  // Function to toggle the theme
  const toggleTheme = () => {
    dispatch(toggleThemeAction()); // Dispatch the toggleTheme action
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme); // Sync theme with document body

    return () => {
      document.body.removeAttribute('data-theme'); // Cleanup on unmount
    };
  }, [theme]); // Re-run effect when theme changes

  return [theme, toggleTheme] as const; // Return theme and toggle function
};

export default useTheme;
