import { colorKeyType } from '../../../../constants/colors';
import { ColorSelector, ColorBoxDisplay, Toast, ErrorMessage } from "../../../ui";
import { useForm, useWatch, SubmitHandler } from 'react-hook-form';
import { ListActions } from '../../../../database/actions';
import useToast from '../../../../hooks/useToast';

// Define the shape of the form fields
type FormFields = {
  listName: string;
  selectedColor: colorKeyType;
};

function ListForm() {
  const { register, handleSubmit, control, setError, reset, formState: { errors, isSubmitting } } = useForm<FormFields>({
    defaultValues: { listName: '', selectedColor: "red" },
  });

  const { isVisible: toastVisible, showToast, hideToast } = useToast();

  // Handle form submission
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const isListExists = await ListActions.isListNameExists(data.listName);

      if (isListExists) {
        setError("listName", { type: "manual", message: "List name already exists" });
        return;
      }

      // Add a new list to the database
      await ListActions.add({
        id: crypto.randomUUID(),
        title: data.listName,
        color: data.selectedColor,
        createdAt: new Date().toISOString(),
      });

      reset(); // Reset the form after successful submission
    } catch (error) {
      showToast(); // Show toast on error
    }
  };

  // Watch the current selected color
  const currentColor = useWatch({
    control,
    name: "selectedColor",
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 grid gap-2 border-default rounded">
        {/* Input field for the list name */}
        <div className="px-2 py-1 border-default flex items-center gap-2 rounded">
          <ColorBoxDisplay color={currentColor} /> {/* Display selected color */}
          <label htmlFor="list-name" className="sr-only">List Name</label>
          <input
            id="list-name"
            type="text"
            placeholder="List Name"
            {...register('listName', {
              required: "List name is required",
              maxLength: { value: 20, message: "Max length is 20 characters" }
            })}
            className="text-default text-sm border-none bg-transparent outline-none"
          />
        </div>
        {errors.listName && <ErrorMessage message={errors.listName.message} />} {/* List name validation error */}

        {/* Color selector */}
        <div className="flex justify-between flex-wrap">
          <ColorSelector 
            register={register} 
            name="selectedColor" 
            label="Select Color" 
            required={true} 
          />
        </div>
        {errors.selectedColor && <ErrorMessage message={errors.selectedColor.message} />} {/* Color validation error */}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-1 py-1 border-none text-xs bg-green-400 text-black rounded mt-2 disabled:opacity-10"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* Display toast for errors */}
      {toastVisible && (
        <Toast 
          isVisible={toastVisible}
          message="An error occurred. Please try again."
          duration={2000}
          onClose={hideToast} 
        />
      )}
    </>
  );
}

export default ListForm;
