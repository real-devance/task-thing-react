import Logo from "../../ui/Logo";  
import {ThemeToggleButton} from "../../ui";  
import { Link } from "react-router-dom"; 
import useMediaQuery from "../../../hooks/useMediaQuery";  
import { MAX_QUERY } from "../../../constants/mediaQuery";  

type HeaderProps = {
  onSidebarOpen: () => void;  // Function to handle sidebar opening on mobile
};

function Header({ onSidebarOpen }: HeaderProps) {
  // Use the custom hook to check if the screen width matches the MAX_QUERY for mobile devices
  const isMobile = useMediaQuery(MAX_QUERY);
  
  return (
    <header className="px-4 py-2 flex items-center justify-between border-default">
      <div className="flex gap-4">
        {/* Conditionally render the menu button if it's a mobile screen */}
        {isMobile && 
          <button className="border-none" onClick={onSidebarOpen}>
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
        }
        
        {/* Link to the home page with Logo */}
        <Link to='/home'>
          <Logo />  {/* Display the Logo component */}
        </Link>
      </div>

      {/* Display the ThemeToggleButton for toggling light/dark themes */}
      <ThemeToggleButton />
    </header>
  );
}

export default Header;
