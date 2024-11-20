import { COLORS, colorKeyType } from "../../../../constants/colors";
import { ColorSelector } from "../../../ui";
import { useForm, useWatch, SubmitHandler } from 'react-hook-form';
import { NoteActions } from "../../../../database/actions";

type FormFields = {
  title: string; // Note title field
  description: string; // Note description field
  color: colorKeyType; // Selected color for the note
};

type NoteFormProps = {
  onClose: () => void; // Callback to close the form
};

function NoteForm({ onClose }: NoteFormProps) {
  // Initialize form control using react-hook-form
  const { 
    register, handleSubmit, control, reset, setError, 
    formState: { errors, isSubmitting } 
  } = useForm<FormFields>({
    defaultValues: { title: "", description: "", color: "green" } // Default form values
  });

  // Watch the selected color to dynamically update the form's background color
  const currentColor = useWatch({
    control,
    name: "color",
    defaultValue: "green", // Default color
  });

  // Handle form submission logic
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Add the note to the database
      await NoteActions.add({
        id: crypto.randomUUID(), // Generate a unique ID for the note
        title: data.title,
        description: data.description,
        color: data.color,
        createdAt: new Date().toISOString(), // Timestamp for note creation
      });
      reset(); // Reset the form fields
      onClose(); // Close the form after saving
    } catch (error: unknown) {
      // Handle submission errors
      setError("root", { type: "manual", message: "An error occurred" });
    }
  };

  return (
    <div className={`w-80 xs:w-96 h-[60vh] mx-auto p-4 grid gap-2 border-none rounded-lg ${COLORS[currentColor]}`}>
      {/* Form container for creating/editing notes */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-rows-[auto_1fr_auto] overflow-y-scroll gap-2">
        
        {/* Input field for the note title */}
        <div>
          <label className="sr-only">Note title</label>
          <input 
            type="text"
            placeholder="Title"
            {...register("title", {
              required: "Title required", // Validation rule: required
              maxLength: { value: 40, message: "Title too long" } // Max length validation
            })}
            className="w-full text-lg text-black font-medium bg-transparent placeholder-gray-800 outline-transparent border-0 focus:outline-none"
          />
          {/* Display validation errors for title */}
          {errors.title && <p className="text-xs text-white italic relative">{errors.title.message}</p>}
        </div>

        {/* Textarea for the note description */}
        <div className="grid grid-rows-[1fr_auto]">
          <textarea 
            aria-label="note description"
            placeholder="Description"
            {...register("description", {
              required: "Description required", // Validation rule: required
              maxLength: { value: 8000, message: "Description too long" } // Max length validation
            })}
            className="w-full max-h-full resize-none text-sm text-justify leading-snug bg-transparent placeholder-gray-800 border-0 outline-transparent focus:outline-none"
          />
          {/* Display validation errors for description */}
          {errors.description && <p className="text-xs text-white italic relative">{errors.description.message}</p>}
        </div>

        <div className="grid gap-2">
          {/* Color selection dropdown */}
          <div className="bg-black bg-opacity-20 rounded-sm p-1 flex gap-4 flex-wrap">
            <ColorSelector register={register} name="color" label="Select Color" required={true} />
          </div>

          {/* Save and Cancel action buttons */}
          <div className="flex items-center justify-between mt-2">
            {/* Display root form errors */}
            {errors.root && <p className="text-xs text-white relative">{errors.root.message}</p>}

            {/* Save button */}
            <button 
              type="submit" 
              className="text-white text-xs bg-black rounded-md px-2 py-1"
              disabled={isSubmitting} // Disable while submitting
            >
              Save
            </button>
             
            {/* Cancel button */}
            <button 
              type="button" 
              className="text-white text-xs bg-red-800 rounded-md px-2 py-1"
              onClick={onClose} // Trigger close callback
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
