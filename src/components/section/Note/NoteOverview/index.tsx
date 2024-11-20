import { NoteType } from "../__types__";  
import { COLORS } from "../../../../constants/colors"; 

type NoteOverviewProps = {
  note: NoteType;  
  onOpen: () => void;  
};

function NoteOverview({ note, onOpen }: NoteOverviewProps) {

  return (
    <div 
      className={`p-4 rounded-lg cursor-pointer border-default ${COLORS[note.color]} text-black`} 
      onClick={onOpen}  // Calling onOpen function when the note is clicked
    >
      {/* Title of the note */}
      <h1 className="text-lg font-medium break-words">{note.title}</h1>

      {/* Description of the note, with line-clamp to limit the visible lines */}
      <p className="text-sm text-justify line-clamp-5 leading-snug">{note.description}</p>
    </div>
  );
}

export default NoteOverview; 
