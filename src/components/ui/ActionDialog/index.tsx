import Button from "./Button";
import DialogModal from "../DialogModal";
import { capitalizeFirstChar } from "../../../utils/capitalizeFirstChar";

type ActionDialogProps = {
  action: string; // Action type (e.g., "delete", "clear", "logout")
  isOpen: boolean; // Determines if the dialog is open
  onCancel: () => void; // Cancel handler
  onConfirm: () => void; // Confirm handler
  title: string; // Customizable title for the dialog
};

function ActionDialog({ isOpen, action, onCancel, onConfirm, title }: ActionDialogProps) {
  return (
    <DialogModal isOpen={isOpen} onClose={() => null}>
      <div className="p-4 w-64 sm:w-72 bg-default border-default rounded text-center">
        <h1 className="text-default text-sm sm:text-base">
          {title} {/* Customizable title */}
        </h1>

        <div className="flex items-center justify-center gap-10 mt-4 px-4">
          <Button text="Cancel" onClick={onCancel} variant="default" />
          <Button text={capitalizeFirstChar(action)} onClick={onConfirm} variant="red" />
        </div>
      </div>
    </DialogModal>
  );
}

export default ActionDialog;
