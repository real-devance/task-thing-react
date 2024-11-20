type CheckBoxProps = {
  id: string;           // Unique identifier for the checkbox
  checked: boolean;     // Determines if the checkbox is checked
  onChange: () => void; // Function to handle checkbox state change
};

function CheckBox({ id, checked, onChange }: CheckBoxProps) {
  return (
    <>
      <input
        id={id}              // Checkbox input ID
        aria-label="checkbox" // Accessible label
        type="checkbox"      // Checkbox input type
        checked={checked}    // Checkbox checked state
        onChange={onChange}  // Checkbox state change handler
        className="w-4 aspect-square accent-green-600 bg-white cursor-pointer" // Styling
      />
    </>
  );
}

export default CheckBox;
