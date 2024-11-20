import { Toast, ErrorMessage } from "../../../ui";
import { UserActions } from "../../../../database/actions";
import DB from "../../../../database/DB";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DexieLogin from "../DexieLogin";
import useToast from "../../../../hooks/useToast";


type FormFields = { title: string };

function UserForm() {
  const navigate = useNavigate();

  const [showDexieLogin , setShowDexieLogin] = useState(false);

  const {isVisible: toastVisible, showToast, hideToast } = useToast();

  const {register,handleSubmit,watch,setError,reset,formState: { errors, isSubmitting },} = useForm<FormFields>({
    defaultValues: { title: "" },
  });

  const name = watch("title");

  const addUser = async (title: string) => {
    try {
      await UserActions.add(title);
      reset();
    } catch (error) {
      setError("root", { type: "manual", message: "Something went wrong" });
    }
  };

  // Form submission handler: navigates on success
  // {This submit is for no synsc login}
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await addUser(data.title.trim());
      navigate("/home");
    } catch (error) {
      setError("root", { type: "manual", message: "Something went wrong" });
    }
  };

  // Sync handler: no navigation
  const handleLogin = async () => {
    try {
      await addUser(name.trim());
      DB.cloud.login(); 
      setShowDexieLogin(true);

    } catch (error) {
      showToast()
    }
  };

  return (
    <div className="grid gap-2">
      {/* Form for normal submission */}
      
      {!showDexieLogin ?  
      <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-1">
          <label htmlFor="name" className="text-default text-xs">Name</label>
          <input
            type="text"
            id="name"
            className="text-default text-base bg-default border-b border-gray-400 outline-none"
            {...register("title", { required: "Name is required", 
            maxLength: {value: 20, message: "Name must be less than 20 characters"} })}
          />

          {errors.title && <ErrorMessage message={errors.title.message} />}
          {errors.root && <ErrorMessage message={errors.root.message} />}
        </div>

        <button
          type="submit"
          className="text-default text-sm border-default rounded"
          disabled={isSubmitting}
        >
          Continue
        </button>

        <button
        type="button"
        className="text-default text-sm border-default rounded disabled:opacity-20"
        onClick={handleLogin}
        disabled={isSubmitting || !name.trim()} // Disable if name is empty
      >
        Continue with Sync
      </button>

      </form>

      {toastVisible && <Toast 
      isVisible={toastVisible}
      message="Login failed. Please try again." 
      duration={3000}
      onClose={hideToast} />}
      </>
      :
      <DexieLogin/>
      }

    </div>
  );
}

export default UserForm;
