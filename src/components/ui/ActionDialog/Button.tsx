type ButtonProps = {
    text: string; // Button text
    onClick: () => void; // Click handler
    variant?: 'green' | 'red' | 'blue' | 'default'; // Button color variant
  };
  
  const buttonClass = {
    green: 'bg-green-500 text-white',
    red: 'bg-red-500 text-white',
    blue: 'bg-blue-500 text-white',
    default: 'bg-default text-default', // Default color (should be specified)
  };
  
  function Button({ text, onClick, variant = 'default' }: ButtonProps) {
    const buttonColor = buttonClass[variant]; // Get button class based on variant
  
    return (
      <button
        type="button" 
        aria-label={text} 
        className={`px-2 py-1 flex items-center justify-center text-sm rounded ${buttonColor}`}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
  
  export default Button;
  