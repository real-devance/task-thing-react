import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import { COLORS, colorKeyType } from '../../../constants/colors';


type ColorSelectorProps<TFieldValues extends FieldValues> = {
  register: UseFormRegister<TFieldValues>; 
  name: Path<TFieldValues>;               
  label: string;                           
  required?: boolean;                   
};

function ColorSelector<TFieldValues extends FieldValues>({
  register,
  name,
  label,
  required = false,
}: ColorSelectorProps<TFieldValues>) {
  return (
    <>
      <label className="sr-only">{label}</label>
      {/* Map over COLORS and render a radio button for each color */}
      {Object.keys(COLORS).map((key) => {
        const color = key as colorKeyType;
        return (
          <label key={color} className="cursor-pointer">
            <input
              aria-label={color}
              type="radio"
              value={color}
              {...register(name, {
                required: required ? 'Color selection is required' : false, // Validation rule if required
              })}
              className="sr-only peer" // Screen-reader only, styled through peer selector
            />
            <span
              className={`block w-4 h-4 rounded
                ${COLORS[color]} 
                peer-checked:ring
                peer-checked:ring-blue-100 `}
              title={color} // Tooltip with color name
            />
          </label>
        );
      })}
    </>
  );
}

export default ColorSelector;
