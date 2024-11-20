import { NoteType } from '../__types__';
import NoteOverview from '../NoteOverview';
import NoteDetail from '../NoteDetail';
import {DialogModal} from '../../../ui';
import { useState } from 'react';

type NoteListProps = {
    items: NoteType[]; // Array of notes to display
};

function NoteList({ items }: NoteListProps) {
    const [selectedNote, setSelectedNote] = useState<NoteType | null>(null); 

    // Open the note detail view in modal
    const handleOpen = (note: NoteType) => {
        setSelectedNote(note);
    };

    // Close the note detail view in modal
    const handleClose = () => {
        setSelectedNote(null);
    };

    return (
        <div>
            {/* Render note overview or display message if no notes available */}
            <div className="space-y-2">
                {items.length > 0 ? (
                    items.map((item) => (
                        <NoteOverview key={item.id} note={item} onOpen={() => handleOpen(item)} />
                    ))
                ) : (
                    <p className="text-default text-center">No notes available</p>
                )}
            </div>
  

            {/* Display modal with note details if a note is selected */}
            <DialogModal isOpen={!!selectedNote} onClose={handleClose}>
                {selectedNote && <NoteDetail note={selectedNote} onClose={handleClose} />}
            </DialogModal>
        </div>
    );
}

export default NoteList;
