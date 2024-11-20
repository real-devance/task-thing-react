/**
 * Capitalizes the first character of a string.
 * 
 * @param str - The string to be modified.
 * @returns A new string with the first character capitalized, or an empty string if the input is empty.
 */


export const capitalizeFirstChar = (str: string): string => 
  str ? str[0].toUpperCase() + str.slice(1) : ''; // Capitalizes the first character, returns empty string if input is empty
