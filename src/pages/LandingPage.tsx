import { DialogModal, ThemeToggleButton } from "../components/ui";
import { Link } from "react-router-dom";
import DB from "../database/DB";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function LandingPage() {
  // State to manage the visibility of the login dialog
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  // Handle the login dialog and initiate login process
  const handleLoginDialog = async () => {
    setLoginDialogOpen(true); // Open the login dialog
    await DB.cloud.login(); // Trigger login process through Dexie Cloud
  };

  return (
    <div className="min-h-dvh max-h-dvh grid place-items-center bg-default bg-default relative">
      {/* Theme toggle button at the top-right corner */}
      <div className="absolute top-2 right-2">
        <ThemeToggleButton />
      </div>

      {/* Main content section */}
      <div className="space-y-4">
        {/* App title and description */}
        <div className="text-default text-center space-y-2">
          <h1 className="text-4xl xs:text-6xl">Task Thing</h1>
          <p className="text-base">A ToDo app with sync</p>
        </div>
        
        {/* Link to the /login route and trigger login dialog */}
        <Link
          to="/login"
          onClick={handleLoginDialog}
          className="block text-center w-full border-default text-default rounded hover:bg-hover focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-focus"
        >
          Get Started
        </Link>
      </div>

      {/* Modal dialog for login */}
      <DialogModal isOpen={loginDialogOpen} onClose={() => setLoginDialogOpen(false)}>
        <Outlet /> {/* Render nested routes within the modal */}
      </DialogModal>
    </div>
  );
}

export default LandingPage;
