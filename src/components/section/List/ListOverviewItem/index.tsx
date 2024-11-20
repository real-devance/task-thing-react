import { ListItemType } from "../__types__"; 
import { ColorBoxDisplay } from "../../../ui"; 
import { useLiveQuery } from "dexie-react-hooks"; // Hook to listen to live database changes
import { TaskActions } from "../../../../database/actions"; // Database actions for task operations

type ListOverviewItemProps = {
  list: ListItemType; // Props to pass the list item details
};

function ListOverviewItem({ list }: ListOverviewItemProps) {
  // Fetch and update the task count dynamically for the given list ID
  const taskCount = useLiveQuery(async () => TaskActions.count(list.id), [], 0);

  return (
    <li className="flex gap-1 justify-between items-center">
      {/* Display list details */}
      <div className="flex items-center gap-2">
        <ColorBoxDisplay color={list.color} /> {/* Display list color */}
        <p className="text-default text-sm">{list.title}</p> {/* Display list title */}
      </div>

      {/* Show the count of tasks associated with the list */}
      <p 
        className="px-2 py-1 aspect-square text-xs font-medium text-gray-900 
        bg-gray-200 flex items-center rounded-md"
      >
        {taskCount} {/* Display the live-updated task count */}
      </p>
    </li>
  );
}

export default ListOverviewItem;
