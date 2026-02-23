import React from "react";
import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import { formatDate } from "../lib/formateDate"
import api from "../lib/axios";
import { toast } from "react-hot-toast/headless";
import { Note } from "../types";

type NotesState = Note[] | [];
const NoteCard: React.FC<{ note: Note; setNotes: React.Dispatch<React.SetStateAction<NotesState>> }> = ({ note, setNotes }) => {

 const handleDelete = async (e: React.MouseEvent, id: string) => {
  e.preventDefault();

  const confirmed = window.confirm("Are you sure you want to delete this note?");
  if (!confirmed) return;

  try {
    await api.delete(`/notes/${id}`);

    setNotes((prevNotes) => prevNotes.filter((n) => n._id !== id));

    toast.success("Note deleted successfully!");
  } catch (error: unknown) {
    console.error("Error deleting note:", error);
    toast.error("Failed to delete note. Please try again.");
  }
};
    return (
      <Link
        to={`/note/${note._id}`}
        className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
      >
        <div className="card-body">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => handleDelete(e, note._id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    )
  
  }
  export default NoteCard;