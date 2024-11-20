import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { ListActions } from '../../../../database/actions';
import { Toast } from '../../../ui';
import useToast from '../../../../hooks/useToast';

type FormFields = {
  listTitle: string; // Define the form field type for the list title
 
};

type ListTitleFormProps = {
  listId: string; // List ID
  initialTitle: string; // Initial title passed as prop
  isEditing: boolean;  // Whether the title is being edited or not
  onSuccessful? : () => void; // Callback for a successful operation
  onError? : () => void; // Callback for an error
};

function ListTitle({ initialTitle, isEditing,onSuccessful, onError, listId }: ListTitleFormProps) {
  const { register, handleSubmit, setFocus, reset, formState: { errors } } = useForm<FormFields>({
    defaultValues: { listTitle: initialTitle }, // Set the initial value of the list title
  });

  const {isVisible: toastVisible, showToast, hideToast } = useToast(); // Custom hook for showing toast notifications

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await ListActions.update(listId, { title: data.listTitle }); 
      onSuccessful && onSuccessful(); // Callback for successful operation
    } catch (error) {
      showToast()
      onError && onError(); // Callback for error
    }
  };

  // Reset form value if initialTitle prop changes
  useEffect(() => {
    if (initialTitle) {
      reset({ listTitle: initialTitle });
    }
  }, [initialTitle]);

  // Focus on the input field when editing starts
  useEffect(() => {
    if (isEditing) {
      setFocus("listTitle");
    }
  }, [isEditing]);

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="text-default text-2xl bg-transparent outline-none"
        readOnly={!isEditing} // Input is readonly when not editing
        {...register("listTitle", {
          required: "List name is required", // Validation for required field
          maxLength: {
            value: 40,
            message: "List name must be less than 40 characters", // Max length validation
          },
          pattern: {
            value: /\S+/,
            message: "List name should not be empty", // Pattern to prevent spaces only
          },
        })}
        onBlur={handleSubmit(onSubmit)} // Trigger onBlur to submit the form when input loses focus
      />
      
      {/* Display error message if validation fails */}
      {errors.listTitle && <p className="text-red-500 text-sm">{errors.listTitle.message}</p>}
    </form>

    {toastVisible &&
    <Toast
      isVisible={toastVisible}
      message="An error occurred updating list title"
      duration={2000}
      onClose={hideToast}/>
    }
    </>
  );
}

export default ListTitle;
