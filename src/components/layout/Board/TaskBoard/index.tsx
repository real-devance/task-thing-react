import { TaskAddForm, TaskList } from '../../../section/Task'; 
import { DropdownOptions, LoadingSpinner, ActionDialog, Toast } from '../../../ui'; 
import ListTitle from './ListTitle'; 
import { useLocation, useNavigate } from 'react-router-dom'; 
import { ListActions, TaskActions } from "../../../../database/actions"; 
import { useLiveQuery } from 'dexie-react-hooks'; 
import { useState } from 'react'; 
import useToast from '../../../../hooks/useToast';

type OptionType = "none" | "edit" | "delete" | "clear";

type LocationState = {
  listId: string; 
  listTitle: string; 
};

function TaskBoard() {
  const location = useLocation();
  const { listId, listTitle: initialListTitle } = (location.state as LocationState); // Retrieve list details from URL state

  const TODOS = useLiveQuery(async () => TaskActions.getAllTask(listId), [listId]); // Fetch tasks for the current list
  const isLoading = !TODOS; // Check if tasks are still loading

  const { isVisible: toastVisible, showToast, hideToast } = useToast(); // Toast notification management
  const [toastMessage, setToastMessage] = useState(""); // Message displayed in the toast
  const [selectedOption, setSelectedOption] = useState<OptionType>("none"); // Tracks selected dropdown option

  const navigate = useNavigate(); // Navigation hook

  const handleClearTask = async () => {
    try {
      await TaskActions.deleteAll(listId); // Delete all tasks from the list
      setSelectedOption("none");
    } catch (error) {
      setToastMessage("Error clearing tasks");
      showToast();
      setSelectedOption("none");
    }
  };

  const handleListDelete = async () => {
    try {
      await TaskActions.deleteAll(listId); // Delete all tasks
      await ListActions.delete(listId); // Delete the list
      navigate("/home"); // Redirect to home page after deletion
    } catch (error) {
      setToastMessage("Error deleting list");
      showToast();
      setSelectedOption("none");
    }
  };

  const handleOptions = (option: string) => {
    setSelectedOption(option as OptionType); // Update the selected dropdown option
  };

  return (
    <>
      <div className="px-4 py-2 grid grid-rows-[auto_auto_1fr] gap-4 overflow-y-scroll">
        <div className="flex items-center justify-between">
          {/* Display and edit list title */}
          <ListTitle
            initialTitle={initialListTitle}
            isEditing={selectedOption === "edit"}
            listId={listId}
            onSuccessful={() => setSelectedOption("none")}
            onError={() => setSelectedOption("none")}
          />

          {/* Dropdown menu for list actions */}
          <DropdownOptions 
            menuBtn="horizontal" 
            options={["edit", "delete", "clear"]}
            onOption={handleOptions}
          />

          {/* Confirm list deletion */}
          <ActionDialog 
            isOpen={selectedOption === "delete"}
            action="delete"
            title="Are you sure you want to delete this list and all its tasks?"
            onCancel={() => setSelectedOption("none")}
            onConfirm={handleListDelete}
          />

          {/* Confirm clearing tasks */}
          <ActionDialog
            isOpen={selectedOption === "clear"}
            title="Are you sure you want to clear all tasks?"
            action="clear"
            onCancel={() => setSelectedOption("none")}
            onConfirm={handleClearTask}
          />
        </div>

        {/* Add new tasks */}
        <TaskAddForm listId={listId} />

        {/* Show loading spinner or task list */}
        {isLoading ? 
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
          :
          <TaskList items={TODOS} />
        }
      </div>

      {/* Toast notification */}
      {toastVisible &&
        <Toast
          isVisible={toastVisible}
          message={toastMessage}
          duration={2000}
          onClose={hideToast}
        />
      }
    </>
  );
}

export default TaskBoard;
