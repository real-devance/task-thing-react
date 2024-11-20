import { useState, useEffect } from 'react';

/**
 * Custom hook to check if a media query matches the current viewport.
 *
 * @param query - A media query string (e.g., '(max-width: 700px)')
 * @returns {boolean} - Returns `true` if the query matches, `false` otherwise.
 *
 * This hook listens for changes to the media query and updates the component
 * dynamically when the viewport changes (e.g., resizing the window).
 * 
 * Example usage:
 * const isMobile = useMediaQuery('(max-width: 700px)');
 */

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create a MediaQueryList object based on the given query
    const media = window.matchMedia(query);

    // Function to update the 'matches' state when the query result changes
    const updateMatch = () => setMatches(media.matches);

    // Run the function once to set the initial value
    updateMatch();

    // Add the event listener for when the media query matches change
    media.addEventListener('change', updateMatch);

    // Clean up the event listener when the component unmounts or the query changes
    return () => {
      media.removeEventListener('change', updateMatch);
    };
  }, [query]); // Re-run effect if the query string changes

  return matches;
};

export default useMediaQuery;
