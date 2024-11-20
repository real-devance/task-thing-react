import { COLORS, colorKeyType } from "../../../constants/colors"; 

type ColorBoxDisplayProps = {
    color: colorKeyType; // Color key for mapping to COLORS
}

function ColorBoxDisplay({ color }: ColorBoxDisplayProps) {
    return (
        // Apply color class based on the COLORS mapping, fallback to transparent if color is invalid
        <span className={`w-4 h-4 aspect-square border-0 rounded ${COLORS[color] || "bg-transparent border-default"}`}></span> 
    );
}

export default ColorBoxDisplay;
