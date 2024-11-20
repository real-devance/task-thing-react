import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

import { Outlet } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { MAX_QUERY } from "../constants/mediaQuery";

function HomePage() {
  // Determine if the screen is mobile-sized based on the media query
  const isMobile = useMediaQuery(MAX_QUERY);

  // State to control the visibility of the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Adjust sidebar visibility based on screen size
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="min-h-[100dvh] max-h-[100dvh] grid grid-rows-[auto_1fr] bg-default overflow-hidden">
      {/* Header at the top, with a handler to open the sidebar */}
      <Header onSidebarOpen={() => setIsSidebarOpen(true)} />

      <main
        className={`grid ${
          isMobile ? "grid-cols-[1fr]" : "grid-cols-[auto_1fr]"
        } overflow-auto`}
      >
        {/* Sidebar is conditionally rendered based on state */}
        {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}

        {/* Outlet for rendering nested routes */}
        <Outlet />
      </main>
    </div>
  );
}

export default HomePage;
