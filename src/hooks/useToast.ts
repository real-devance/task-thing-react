import { useState } from "react";

const useToast = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showToast = () => setIsVisible(true);
  const hideToast = () => setIsVisible(false);

  return { isVisible, showToast, hideToast };
};

export default useToast;
