// Define a constant object `COLORS` with color names as keys and corresponding Tailwind CSS background classes as values
export const COLORS = {
  red: "bg-red-400",
  orange: "bg-orange-400",
  yellow: "bg-yellow-400",
  green: "bg-green-400",
  blue: "bg-blue-400",
  purple: "bg-purple-400",
  pink: "bg-pink-400",
} as const; 

// Creates a union type `colorKeyType` which is a union of the keys of the `COLORS` object (e.g., "red", "orange", etc.)
export type colorKeyType = keyof typeof COLORS;
