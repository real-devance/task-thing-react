import { useEffect } from "react";

type ToastProps = {
  message: string; // Message to display in the toast
  duration?: number; // Duration in milliseconds for how long the toast remains visible
  isVisible: boolean; // Determines if the toast is visible
  onClose: () => void; // Function to handle the dismissal of the toast
};

const Toast = ({ message, duration = 3000, isVisible, onClose }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose(); // Auto-dismiss the toast after the specified duration
      }, duration);

      // Clear the timer if the toast is unmounted or visibility changes
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null; // Don't render the toast if it's not visible

  return (
    <div className="fixed bottom-4 right-4 bg-default border-default
    text-default text-sm px-4 py-2 rounded-md shadow-md">
      {message}
    </div>
  );
};

export default Toast;
