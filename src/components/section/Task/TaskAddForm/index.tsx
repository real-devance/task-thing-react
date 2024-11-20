import { Toast, ErrorMessage } from "../../../ui";  
import { useForm, SubmitHandler } from 'react-hook-form';  
import { TaskActions } from '../../../../database/actions';  
import { useState } from 'react';

// Type for the form fields
type FormFields = { taskTitle: string };

// Props for the TaskAddForm component
type TaskAddFormProps = {
  listId: string; // The ID of the list to which the task will be added
};

function TaskAddForm({ listId }: TaskAddFormProps) {

  const [isToastVisible, setIsToastVisible] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormFields>({
    defaultValues: { taskTitle: '' }, // Default value for taskTitle
  });

  // Function to handle form submission
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Add a new task with the provided title and additional metadata
      await TaskActions.add({
        id: crypto.randomUUID(), // Generate a unique ID for the task
        listId: listId, // Associate the task with the provided list ID
        title: data.taskTitle.trim(), // Trim whitespace from the task title
        done: false, // Set the initial task status to not done
        createdAt: new Date().toISOString(), // Record the task creation time
      });
      // Reset the form after successful submission
      reset();
    } catch (error) {
      // Show a toast notification in case of an error
      setIsToastVisible(true);
    }
  };

  return (
    <>
      <form className="w-full max-w-[30rem] mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex items-center">
          {/* Button to submit the form */}
          <button
            type="submit"
            className="absolute left-2 inset-y-0 cursor-pointer"
            disabled={isSubmitting} // Disable the button while submitting
          >
            <span className="material-symbols-outlined text-xl">add</span>
          </button>

          {/* Input field for the task title */}
          <label htmlFor="task-title" className="sr-only">Add New Task</label>
          <input
            type="text"
            placeholder="Add New Task"
            disabled={isSubmitting} // Disable the input while submitting
            {...register("taskTitle", {
              required: true, // Mark the field as required
              maxLength: { 
                value: 50, 
                message: "Task name must be less than 50 characters" 
              }, // Validate max length
              pattern: { 
                value: /\S+/, // Prevent empty or whitespace-only titles
                message: "Task name should not be empty" 
              }, // Provide error message for invalid input
            })}
            className="block w-full
            ps-8 pe-6 py-2
            text-default text-sm font-medium
            rounded-md bg-transparent border 
            border-default
            placeholder-gray-600 dark:placeholder-gray-400
            outline-none"
          />
        </div>
        {/* Show error message if validation fails */}
        {errors.taskTitle && <ErrorMessage message={errors.taskTitle.message} />}
      </form>

      {/* Toast to display error messages */}
      {isToastVisible && (
        <Toast 
          message="Something went wrong"
          duration={2000} 
          isVisible={isToastVisible} 
          onClose={() => setIsToastVisible(false)} 
        />
      )}
    </>
  );
}

export default TaskAddForm;
