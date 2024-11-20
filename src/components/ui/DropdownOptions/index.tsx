import { useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { capitalizeFirstChar } from "../../../utils/capitalizeFirstChar";

type DropdownOptionsProps = {
  menuBtn: "vertical" | "horizontal"; // Defines the button style
  options: string[]; // List of options in the dropdown
  color?: "black"; // Optionally color the button in black
  onOption: (option: string) => void; // Function when an option is clicked
  position?: "top" | "bottom" | "left" | "right"; // Dropdown position relative to button
};

// Defines the positioning styles for the dropdown based on position prop
const positionClass = {
  top: "bottom-full right-0 mb-2",
  bottom: "top-full right-0 mt-2",
  left: "top-0 right-full mr-2",
  right: "top-0 left-full ml-2",
};

function DropdownOptions({ options, onOption, menuBtn = "vertical", color, position = "bottom" }: DropdownOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Hook to close the dropdown if clicked outside
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  // Handle option selection and close dropdown
  const handleOptionClick = (option: string) => {
    onOption(option);
    setIsOpen(false);
  };

  // Get the appropriate position class for the dropdown
  const positionStyles = positionClass[position];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)} // Toggle dropdown visibility
        aria-label="Options Button"
        aria-haspopup="true" // Indicates the button controls a menu
        aria-expanded={isOpen} // Reflects dropdown visibility
        className="flex items-center"
      >
        <span className={`material-symbols-outlined text-base ${color === "black" && "!text-black"}`}>
          {menuBtn === "vertical" ? "more_vert" : "more_horiz"} {/* Display icon based on button style */}
        </span>
      </button>

      {isOpen && (
        <ul
          className={`absolute z-10 p-2 text-default text-sm bg-default border-default rounded space-y-1 ${positionStyles}`}
          aria-label="Options List" // Accessible label for the options
          role="menu"
        >
          {options.map((option) => (
            <li key={option} role="none">
              <button
                type="button"
                onClick={() => handleOptionClick(option)} // Trigger option selection
                className="w-full text-left rounded"
                role="menuitem" // Role for menu items
              >
                {capitalizeFirstChar(option)} {/* Capitalize and display option */}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownOptions;
