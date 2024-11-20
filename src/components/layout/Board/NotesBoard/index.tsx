import { NoteForm, NoteList } from "../../../section/Note"; 
import DialogModal from "../../../ui/DialogModal"; 
import LoadingSpinner from "../../../ui/LoadingSpinner"; 

import { NoteActions } from "../../../../database/actions";
import { useLiveQuery } from "dexie-react-hooks"; 

import { useState } from "react";

function NotesBoard() {
    const NOTES = useLiveQuery(() => NoteActions.getAll(), []); 
    const isLoading = !NOTES;

    const [isModalOpen, setIsModalOpen] = useState(false);
   

    // Function to open the modal when the user clicks the "add" button
    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal when the user cancels or submits the note form
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="px-4 py-2 grid grid-rows-[auto_1fr] overflow-y-scroll">
            {/* Title of the notes board */}
            <h1 className="text-default text-2xl mb-2">Notes</h1>

            {/* Conditional rendering: show loading spinner or notes list based on loading state */}
            {isLoading ? 
            <div className="flex justify-center">
                {/* Display loading spinner while data is being fetched */}
                <LoadingSpinner />
            </div>
            : 
            // Render the list of notes once the data is loaded
                

            <div className="space-y-2 overflow-y-scroll">
                <NoteList items={NOTES} />
            </div>
          }

            {/* Button to open the modal for creating a new note */}
            <button 
                className="absolute bottom-4 right-4 z-10 px-2 py-1 grid place-items-center bg-green-600 rounded-full" 
                onClick={handleModalOpen}
            >
                {/* Material icon for the "add" button */}
                <span className="material-symbols-outlined text-xl !text-black">add</span>
            </button>

            {/* Dialog Modal for creating a new note. 
                It is shown when the `isModalOpen` state is true */}
            <DialogModal isOpen={isModalOpen} onClose={handleModalClose}>
                {/* Note form component for adding or editing a note */}
                <NoteForm onClose={handleModalClose} />
            </DialogModal>
        </div>
    );
}

export default NotesBoard;
