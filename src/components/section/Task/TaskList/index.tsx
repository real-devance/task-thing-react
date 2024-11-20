import { TaskItemType } from '../__types__'; 
import TaskItem from '../TaskItem';  

type TaskListProps = {
  items: TaskItemType[]; // List of task items to render
};

function TaskList({ items }: TaskListProps) {
  return (
    <>
      {/* Check if there are tasks to display. If not, show a fallback message. */}
      {items.length > 0 ? (
        <ul className="overflow-y-scroll">
          {/* Map through the tasks and render each as a TaskItem component */}
          {items.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} // Pass task details as props to TaskItem
            />
          ))}
        </ul>
      ) : (
        <p className="text-default text-center">No tasks available</p> 
        // Fallback message when the task list is empty
      )}
    </>
  );
}

export default TaskList;
