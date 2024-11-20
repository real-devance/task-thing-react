import { Navigate, Outlet } from "react-router-dom";
import { UserActions } from "../../database/actions";
import { LoadingSpinner } from "../../components/ui";
import { useEffect, useState } from "react";

function AuthHandler() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Track loading state
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false); // Track if an error occurred

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await UserActions.get();
        setUserName(user?.title || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorOccurred(true); // Set error flag when an error occurs
      } finally {
        setIsLoading(false); // Set loading to false after the fetch attempt
      }
    };

    fetchUser();
  }, []);

  // Show a loading spinner if data is still being fetched
  if (isLoading) {
    return <LoadingSpinner />; // Or any loading spinner component
  }

  // Redirect to "/" if an error occurred during the fetch
  if (errorOccurred) {
    return <Navigate to="/error" replace />;
  }

  // Check if the user is logged in or has a username
  const isLoggedIn = Boolean(userName);

  if (isLoggedIn) {
    // Redirect to the home page if the user is logged in
    return <Navigate to="/home" replace />;
  }

  // Allow access to the current route if the user is not logged in
  return <Outlet />;
}

export default AuthHandler;
