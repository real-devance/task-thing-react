import { Toast, ErrorMessage } from "../../../ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserActions } from "../../../../database/actions";
import { useLiveQuery } from "dexie-react-hooks";
import { useState, useEffect } from "react";


type FormFields = { title: string }; // Form fields with their types

type UserEditFormProps = {
  isEditing: boolean; // Determines if the form is in edit mode
  onSuccessful?: () => void; // Callback for a successful operation
  onError?: () => void; // Callback for an error
};

function UserEditForm({ isEditing, onSuccessful, onError }: UserEditFormProps) {
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Fetch the user data from the database
  const user = useLiveQuery(async () => await UserActions.get(), []);

  const { register, handleSubmit, setFocus, reset, formState: { errors } } = useForm<FormFields>({
    defaultValues: { title: "" }, // Initial value for the form
  });

  // Handles form submission
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await UserActions.add(data.title.trim());
      reset(); // Reset the form after successful submission
      onSuccessful && onSuccessful();
    } catch (error) {
      setIsToastVisible(true); // Show a toast notification on error
      onError && onError();
    }
  };

  // Updates the form with the current user data when `user` changes
  useEffect(() => {
    if (user) {
      reset({ title: user.title });
    }
  }, [user]);

  // Sets focus on the input field when in edit mode
  useEffect(() => {
    if (isEditing) {
      setFocus("title");
    }
  }, [isEditing]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <label htmlFor="name" className="sr-only">Name</label>
          <input
            type="text"
            id="name"
            readOnly={!isEditing} // Input is read-only if not editing
            className="text-default text-base bg-transparent outline-none"
            {...register("title", { 
              required: "Name is required", 
              maxLength: { value: 20, message: "Name must be less than 20 characters" } 
            })}
            onBlur={handleSubmit(onSubmit)} // Submits the form when the input loses focus
          />
          {errors.title && (<ErrorMessage message={errors.title.message} />)}
        </div>
      </form>

      {/* Show a toast notification on successful user addition */}
      {isToastVisible && ( 
        <Toast 
          isVisible={isToastVisible}
          message="User added successfully" 
          duration={2000}
          onClose={() => setIsToastVisible(false)} 
        />
      )}
    </>
  );
}

export default UserEditForm;
