/**
 * Formats an ISO date string into a specified format.
 * 
 * @param {string} isoDateString - The ISO date string to be formatted (e.g., '2024-10-29T12:34:56Z').
 * @param {'date' | 'time' | 'datetime'} [format='datetime'] - The desired format of the output:
 *   - 'date': returns the date in 'dd-mm-yyyy' format.
 *   - 'time': returns the time in 'hh:mm AM/PM' format.
 *   - 'datetime': returns the date and time in 'dd-mm-yyyy hh:mm AM/PM' format.
 * @returns {string} The formatted date/time string based on the specified format.
 */
export const formatDateTime = (isoDateString: string, format: 'date' | 'time' | 'datetime' = 'datetime'): string => {
    // Create a new Date object from the ISO date string
    const date = new Date(isoDateString);

    // Get the day (dd), month (mm), and year (yyyy)
    const day = String(date.getDate()).padStart(2, '0'); // Day with leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month with leading zero
    const year = date.getFullYear(); // Full year (yyyy)

    // Get the hours and minutes
    let hours = date.getHours(); // Hours in 24-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutes with leading zero

    // Determine AM/PM and convert hours to 12-hour format
    const amPm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
    hours = hours % 12 || 12; // Convert to 12-hour format, converting 0 to 12

    // Return the formatted date/time based on the specified format
    switch (format) {
        case 'date':
            return `${day}-${month}-${year}`; // Format as dd-mm-yyyy
        case 'time':
            return `${hours}:${minutes} ${amPm}`; // Format as hh:mm AM/PM
        case 'datetime':
        default:
            return `${day}-${month}-${year} ${hours}:${minutes} ${amPm}`; // Format as dd-mm-yyyy hh:mm AM/PM
    }
};

