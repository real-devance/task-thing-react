import React, { useRef, useEffect } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';

interface DialogModalProps {
  children: React.ReactNode; // Modal content
  isOpen: boolean; // Determines if the modal is open
  onClose: () => void; // Callback to handle closing the modal
}

function DialogModal({ children, isOpen, onClose }: DialogModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null); // Ref for the dialog element
  const contentRef = useClickOutside<HTMLDivElement>(onClose); // Ref to detect clicks outside the content to close the modal

  // Effect to handle the modal open/close based on 'isOpen' state
  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal(); // Opens the dialog if isOpen is true
      } else {
        dialogRef.current.close(); // Closes the dialog if isOpen is false
      }
    }
  }, [isOpen]);

  // Only render the dialog when it is open
  if (!isOpen) return null;

  return (
    <dialog 
      ref={dialogRef} 
      onClose={onClose} // Calls onClose when the dialog is closed
      aria-label='dialog-modal' // Accessible label for screen readers
      className="bg-transparent" // Styling for the modal background
    >
      <div ref={contentRef}>
        {children} {/* Render the children passed into the modal */}
      </div>
    </dialog>
  );
}

export default DialogModal;
