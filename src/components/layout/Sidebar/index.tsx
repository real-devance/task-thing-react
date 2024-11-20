import { ListOverviewItemList } from "../../section/List";
import SideMenuItem from './SideMenuItem';
import Overlay from "./Overlay";
import { NavLink } from 'react-router-dom';
import useMediaQuery from "../../../hooks/useMediaQuery";
import useClickOutside from "../../../hooks/useClickOutside";
import { ListActions } from '../../../database/actions';
import { useLiveQuery } from 'dexie-react-hooks';
import { MAX_QUERY } from "../../../constants/mediaQuery";
import UserCard from "./UserCard";

type SidebarProps = {
  onClose: () => void;
}

function Sidebar({ onClose }: SidebarProps) {
  // Fetch lists from the database using live query
  const lists = useLiveQuery(async () => await ListActions.getAll(), [], []);

  // Close sidebar when clicking outside
  const ref = useClickOutside(onClose);

  // Determine if the viewport matches the mobile query
  const isMobile = useMediaQuery(MAX_QUERY);

  return (
    <>
      {/* Show an overlay for mobile screens */}
      {isMobile && <Overlay />}

      <aside
        className={`px-3 py-2 h min-w-60
        w-full max-w-72 overflow-y-scroll
        ${isMobile && "fixed top-0 left-0 h-full bg-default z-50"}
        grid grid-rows-[auto_1fr_auto] gap-2 border-default`}
        ref={isMobile ? ref : undefined}
      >
        {/* Menu header */}
        <div className="flex justify-between items-center">
          <h2 className="text-default text-xl">Menu</h2>
          {/* Close button for mobile view */}
          {isMobile && (
            <button className="border-none" onClick={onClose}>
              <span className="material-symbols-outlined text-xl">menu_open</span>
            </button>
          )}
        </div>

        {/* Navigation section */}
        <nav className="flex flex-col overflow-y-scroll">
          {/* To-Do List Section */}
          <div className="grid grid-rows-[auto_1fr] overflow-y-scroll">
            <h3 className="text-xs text-gray-600 dark:text-gray-300 mb-2">To Do List</h3>
            <div className="flex flex-col overflow-y-scroll max-h-96 [&>*:first-child]:max-h-[20vh]">
              <ListOverviewItemList items={lists} />
            </div>
          </div>

          {/* Notes Link */}
          <NavLink
            to="notes"
            className={({ isActive }) =>
              `w-full block rounded-md px-2 py-1 ${isActive ? 'bg-gray-200 dark:bg-gray-600' : ''} self-start`
            }
          >
            <SideMenuItem menuIcon="note_stack" menuTitle="Notes" />
          </NavLink>
        </nav>

        {/* User profile section */}
        <UserCard />
      </aside>
    </>
  );
}

export default Sidebar;
