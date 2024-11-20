import { CheckBox, DropdownOptions, ActionDialog, Toast } from '../../../ui';
import { TaskItemType, TaskOptionType } from '../__types__';
import { TaskActions } from '../../../../database/actions';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { formatDateTime } from '../../../../utils/formatDateTime'; // Utility to format date and time

// Form field types
type FormFields = {
    title: string; // Field for the task title
};

// Props for the TaskItem component
type TaskItemProps = {
    task: TaskItemType; // Single task data
};

function TaskItem({ task }: TaskItemProps) {
    const [isToastVisible, setIsToastVisible] = useState(false); // State for toast visibility
    const [selectedOption, setSelectedOption] = useState<TaskOptionType>("none"); // State for dropdown actions

    // React Hook Form for managing form state
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors, isSubmitting }
    } = useForm<{ title: string }>({
        defaultValues: { title: task.title }, // Initialize with the task title
    });

    // Deletes the task from the database
    const handleDelete = async () => {
        try {
            await TaskActions.delete(task.id); // Delete task by ID
            setSelectedOption("none"); // Reset dropdown selection
        } catch {
            setSelectedOption("none");
            setIsToastVisible(true); // Show error toast on failure
        }
    };

    // Toggles the task's "done" status
    const handleCheckBox = async () => {
        try {
            await TaskActions.update(task.id, { done: !task.done }); // Update "done" status
        } catch {
            setIsToastVisible(true); // Show error toast on failure
        }
    };

    // Handles form submission to update the task title
    const onSubmitTitle: SubmitHandler<FormFields> = async (data) => {
        try {
            await TaskActions.update(task.id, { title: data.title.trim() }); // Update task title
            setSelectedOption("none"); // Reset dropdown selection
        } catch {
            setIsToastVisible(true); // Show error toast on failure
        }
    };

    // Handles dropdown option selection
    const handleOptions = (option: string) => {
        setSelectedOption(option as TaskOptionType); // Update dropdown selection

        if (option === "edit") {
            setFocus("title"); // Focus the input field for editing
        }
    };

    return (
        <>
            <li className="px-2 py-1 flex items-center gap-2 sm:gap-4 border-b border-gray-200 dark:border-gray-500">
                
                <div className="flex items-center gap-2 flex-grow">
                    {/* Checkbox for marking task as done */}
                    <CheckBox id={task.id} checked={task.done} onChange={handleCheckBox} />

                    {/* Form for editing task title */}
                    <form onSubmit={handleSubmit(onSubmitTitle)} className="flex-grow">
                        <input
                            id="task-title"
                            aria-label="Task Title"
                            type="text"
                            {...register("title", {
                                required: "Task name is required", // Validation: required field
                                maxLength: {
                                    value: 50,
                                    message: "Task name must be less than 50 characters"
                                }, // Validation: max length
                                pattern: {
                                    value: /\S+/,
                                    message: "Task name should not be empty"
                                }, // Validation: no whitespace-only values
                            })}
                            className={`w-full text-default font-medium bg-transparent 
                            ${errors.title ? "border border-red-500" : ""} outline-none`} // Add error styling conditionally
                            readOnly={selectedOption !== "edit"} // Editable only in edit mode
                            onBlur={handleSubmit(onSubmitTitle)} // Submit on input blur
                            disabled={isSubmitting} // Disable input during submission
                        />
                    </form>

                </div>

                {/* Display creation date of the task */}
                <p className="text-default text-xs">{formatDateTime(task.createdAt, "datetime")}</p>

                {/* Dropdown for task options */}
                <DropdownOptions
                    menuBtn="vertical"
                    options={["edit", "delete"]}
                    onOption={handleOptions}
                />
            </li>


            {/* Confirmation dialog for delete action */}
            <ActionDialog
                title="Are you sure you want to delete this task?"
                isOpen={selectedOption === "delete"}
                action="delete"
                onCancel={() => setSelectedOption("none")} // Close dialog on cancel
                onConfirm={handleDelete} // Delete task on confirm
            />

            {/* Toast for error notifications */}
            {isToastVisible && (
                <Toast
                    isVisible={isToastVisible}
                    message="An error occurred. Please try again."
                    duration={3000}
                    onClose={() => setIsToastVisible(false)} // Close toast on timeout or user action
                />
            )}
        </>
    );
}

export default TaskItem;
