import { useObservable } from 'dexie-react-hooks';
import DB from '../../../../database/DB';
import { resolveText, DXCUserInteraction, DXCInputField } from 'dexie-cloud-addon';
import { useForm, SubmitHandler } from 'react-hook-form';
import { capitalizeFirstChar } from '../../../../utils/capitalizeFirstChar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toast } from '../../../ui';
import useToast from '../../../../hooks/useToast';

// Define the form data type
type FormData = Record<string, string>;

export function DexieLogin() {
  // Observe the current user interaction prompt from Dexie Cloud
  const ui = useObservable(() => DB.cloud.userInteraction) as DXCUserInteraction;

  // Manage toast visibility using a custom hook
  const { isVisible: toastVisible, showToast, hideToast } = useToast();

  // Observe the current user from Dexie Cloud
  const user = useObservable(DB.cloud.currentUser);

  // React Router hook for navigation
  const navigate = useNavigate();

  // Initialize form handling with react-hook-form
  const { register, handleSubmit } = useForm<FormData>();

  

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const params: Record<string, string> = {};
      params[ui.type] = data[ui.type]; // Map form data based on interaction type
      ui.onSubmit(params); // Submit the interaction
    } catch (error) {
      showToast(); // Show a toast on submission failure
    }
  };

  // Handle cancellation of the interaction
  const handleCancel = () => {
    ui.onCancel(); // Cancel the interaction
    navigate("/"); // Redirect to the root page
  };

  // Redirect to the home page if the user is logged in
  useEffect(() => {
    if (user?.isLoggedIn) {
      navigate("/home");
    }
  }, [user]);

  // Return null if no user interaction is required
  if (!ui) return null;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        {/* Render input fields dynamically based on the interaction type */}
        {Object.entries(ui.fields).map(([fieldName, field]) => {
          const inputField = field as DXCInputField; // Cast field to DXCInputField
          return (
            <div key={fieldName} className="grid gap-1">
              {/* Label for the input field */}
              <label htmlFor={fieldName} className="text-default text-xs">
                {capitalizeFirstChar(fieldName)}
              </label>

              {/* Input field */}
              <input
                id={fieldName}
                type={inputField.type}
                placeholder={ui.title}
                className="text-default text-base bg-default border-b border-gray-400 outline-none"
                {...register(fieldName, { required: true })}
              />

              {/* Render alerts for the current field */}
              {ui.alerts.map((alert, i) => (
                <p key={i} className="text-default text-xs italic !text-red-400">
                  {resolveText(alert)}
                </p>
              ))}
            </div>
          );
        })}

        {/* Render action buttons */}
        <div className="flex justify-end gap-2">
          {/* Cancel button */}
          {ui.cancelLabel && (
            <button
              type="button"
              className="px-2 py-1 text-default text-sm border-default rounded"
              onClick={handleCancel}
            >
              {ui.cancelLabel}
            </button>
          )}

          {/* Submit button */}
          {ui.submitLabel && (
            <button
              type="submit"
              className="px-2 py-1 text-default text-sm border-default border-transparent rounded bg-blue-600"
            >
              {ui.submitLabel}
            </button>
          )}
        </div>
      </form>

      {/* Render toast notification on error */}
      {toastVisible && (
        <Toast
          isVisible={toastVisible}
          message="Login failed. Please try again."
          duration={3000} // Toast visibility duration in milliseconds
          onClose={hideToast} // Hide toast on close
        />
      )}
    </>
  );
}

export default DexieLogin;
