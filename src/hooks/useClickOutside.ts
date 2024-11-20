import { useEffect, useRef, RefObject } from 'react';

/**
 * useClickOutside Hook
 *
 * Detects clicks outside a referenced DOM element and calls a callback when a click outside is detected.
 *
 * @param callback - Function to call when a click outside the element is detected.
 * @returns A ref to attach to the element that you want to monitor for outside clicks.
 */

const useClickOutside = <T extends HTMLElement>(callback: () => void): RefObject<T> => {
  const ref = useRef<T>(null); // Creates a ref to attach to the target element

  useEffect(() => {
    // Function to handle click outside the referenced element
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Check if the click target is outside the referenced element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(); // Calls the callback if the click is outside
      }
    };

    // Add event listeners for mousedown and touchstart to detect clicks or taps outside
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup the event listeners on component unmount or when dependencies change
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback]); // The effect depends on the callback, which will be updated if the callback changes

  return ref; // Returns the ref to attach to the element that you want to monitor for outside clicks
}

export default useClickOutside;
