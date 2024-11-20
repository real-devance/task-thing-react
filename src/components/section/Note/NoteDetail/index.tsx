import { NoteType, NoteOptionType } from "../__types__";
import { COLORS, colorKeyType } from "../../../../constants/colors";
import { ColorSelector, DropdownOptions, ActionDialog, Toast } from "../../../ui";
import { useForm, useWatch, SubmitHandler } from "react-hook-form";
import { NoteActions } from "../../../../database/actions";
import { useState } from "react";
import { formatDateTime } from "../../../../utils/formatDateTime";
import useToast from "../../../../hooks/useToast";

type FormFields = {
  title: string;
  description: string;
  color: colorKeyType;
};

type NoteDetailProps = {
  note: NoteType; // Note object containing details like title, description, and color
  onClose: () => void; // Function to close the note detail view
};

function NoteDetail({ note, onClose }: NoteDetailProps) {
  const [selectedOption, setSelectedOption] = useState<NoteOptionType>("none"); // Tracks the selected dropdown option

  const {isVisible: toastVisible, hideToast, showToast} = useToast(); // Toast state and functions

  // Initializing the form with default values based on the note prop
  const {register,handleSubmit,control,setFocus,setError,formState: { errors, isSubmitting }} = useForm<FormFields>({
    defaultValues: { title: note.title, description: note.description, color: note.color },
  });

  const currentColor = useWatch({ control, name: "color" }); // Watches the selected color

  // Handles note deletion
  const handleDelete = async () => {
    try {
      await NoteActions.delete(note.id); // Deletes the note from the database
      setSelectedOption("none");
      onClose();
    } catch(error) {
      onClose();
      showToast(); // Displays error message on failure
    }
  };

  // Handles the selection of dropdown options (edit or delete)
  const handleOptions = (option: string) => {
    setSelectedOption(option as NoteOptionType);
    if (option === "edit") {
      setFocus("title"); // Focuses on the title input in edit mode
    }
  };

  // Submits the form to update note details
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await NoteActions.update(note.id, {
        title: data.title.trim(),
        description: data.description,
        color: data.color,
        createdAt: new Date().toISOString(),
      });
      setSelectedOption("none"); // Exits edit mode on success
    } catch (error) {
      setError("root", { type: "manual", message: "An error occurred" }); // Sets a root-level error message
    }
  };

  return (
    <div className={`w-80 xs:w-96 h-[60vh] mx-auto p-4 grid gap-2 border-none rounded-lg ${COLORS[currentColor]}`}>
      {/* Form to display and edit note details */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`grid ${selectedOption === "edit" ? "grid-rows-[auto_1fr_auto]" : "grid-rows-[auto_1fr]"} gap-2 overflow-y-scroll`}
      >
        {/* Title section with dropdown options */}
        <div>
          <div className="flex">
            <label className="sr-only">Note title</label>
            <input
              type="text"
              {...register("title", {
                required: "Title required",
                maxLength: { value: 40, message: "Title too long" },
              })}
              readOnly={selectedOption !== "edit"} // Makes input read-only unless in edit mode
              className="w-full text-lg text-black font-medium bg-transparent outline-transparent border-0 focus:outline-none"
            />
            <DropdownOptions
              menuBtn="horizontal"
              options={["edit", "delete"]}
              onOption={handleOptions}
              color="black"
            />
            <ActionDialog
              isOpen={selectedOption === "delete"}
              title="Are you sure you want to delete this note?"
              action="delete"
              onCancel={() => setSelectedOption("none")}
              onConfirm={handleDelete}
            />
          </div>
          {errors.title && <p className="text-xs text-white relative">{errors.title.message}</p>}
        </div>

        {/* Description section and creation date */}
        <div className="grid grid-rows-[1fr_auto]">
          <label className="sr-only">Note description</label>
          <textarea
            className="w-full max-h-full resize-none text-sm text-justify leading-snug bg-transparent border-0 outline-transparent focus:outline-none"
            readOnly={selectedOption !== "edit"} // Makes textarea read-only unless in edit mode
            {...register("description", {
              required: "Description required",
              maxLength: { value: 8000, message: "Description too long" },
            })}
          />
          <div className="flex justify-between mt-2">
            {errors.description && (
              <p className="text-xs text-white italic relative">{errors.description.message}</p>
            )}
            <p className="text-xs ml-auto">{formatDateTime(note.createdAt, "datetime")}</p>
          </div>
        </div>

        {/* Edit mode controls for color selection and saving */}
        {selectedOption === "edit" && (
          <div>
            <div className="bg-black bg-opacity-20 rounded-sm p-2 flex justify-between flex-wrap">
              <ColorSelector register={register} name="color" label="Select Color" required={true} />
            </div>
            <div className="flex items-center mt-2">
              {errors.root && <p className="text-xs text-white relative">{errors.root.message}</p>}
              <button
                type="submit"
                className="text-white text-xs bg-black rounded-md px-2 py-1 ml-auto"
                disabled={isSubmitting}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Toast to display error messages */}
      {toastVisible && (
        <Toast
          isVisible={toastVisible}
          duration={3000}
          onClose={hideToast}
          message="An error occurred. Please try again."
        />
      )}
    </div>
  );
}

export default NoteDetail;
