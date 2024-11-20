import { ListItemType } from "../__types__"; 
import ListOverviewItem from "../ListOverviewItem"; 
import ListForm from "../ListForm"; 
import { useState } from "react"; 
import { NavLink } from "react-router-dom"; // For navigation between list details

type ListOverviewItemListProps = {
  items: ListItemType[]; // Array of list items to display
};

function ListOverviewItemList({ items }: ListOverviewItemListProps) {
  // State to control visibility of the "Add New List" form
  const [isAddListFormVisible, setIsAddListFormVisible] = useState(false);

  return (
    <>
      {/* Display the list of items as navigable links */}
      <ul className="overflow-y-scroll relative">
 
        {items.length > 0 && items.map(item => (
          <NavLink 
            key={item.id} 
            to={`/home/tasks/${encodeURIComponent(item.title)}`} // Navigate to the list details page
            state={{ listId: item.id, listTitle: item.title }} // Pass list ID and title as state
            className={({ isActive }) => 
              `block rounded-md px-2 py-1 
              ${isActive && 'bg-gray-200 dark:bg-gray-600'}`} // Highlight active links
          >
            {/* Render ListOverviewItem for each list */}
            <ListOverviewItem list={item} /> 
          </NavLink>
        ))}


 
  
      </ul>

      <div className="">
        {/* Button to toggle visibility of the "Add New List" form */}
        <button 
          className="flex gap-2 items-center mb-2 p-2" 
          onClick={() => setIsAddListFormVisible(!isAddListFormVisible)}
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <p className="text-default text-sm">Add New List</p>
        </button>

        {/* Conditionally render the ListForm when the state is true */}
        {isAddListFormVisible &&
 
          <ListForm />
        
      } 
        
      </div>
    </>
  );
}

export default ListOverviewItemList;
