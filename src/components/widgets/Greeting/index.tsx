import { UserActions } from "../../../database/actions";  // Importing UserActions from the database actions
import { useLiveQuery } from "dexie-react-hooks";  // Importing hook to query live data from Dexie

// Define greetings based on time of day
const greetings = [
  "Night",       // 12:00 AM - 5:59 AM
  "Morning",     // 6:00 AM - 11:59 AM
  "Afternoon",   // 12:00 PM - 5:59 PM
  "Evening",     // 6:00 PM - 11:59 PM
];

function Greeting() {
  // Get the current hour to determine the appropriate greeting
  const hour = new Date().getHours();

  // Fetch the user's information from the database (asynchronous query)
  const user = useLiveQuery(() => UserActions.get(), []);  // Querying user data

  // Extract the user's name (title) if available
  const userName = user?.title;  // If user data exists, extract their title

  // Determine the greeting index based on the current hour
  const greetingIndex = 
    hour < 6 ? 0 :      // Night
    hour < 12 ? 1 :     // Morning
    hour < 18 ? 2 : 3;  // Afternoon / Evening

  return (
    <h1 className="text-default max-w-sm text-center">
      {/* Check if userName exists to personalize the greeting */}
      {userName ? (
        <span className="text-base xs:text-lg break-words">
          {greetings[greetingIndex]}! <span className="text-2xl xs:text-4xl">{userName}</span>  
        </span>
      ) : (
        <span className="text-base">
          {greetings[greetingIndex]}!
        </span>
      )}
    </h1>
  );
}

export default Greeting;
