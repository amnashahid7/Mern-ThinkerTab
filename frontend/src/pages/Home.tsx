
import { useEffect, useState } from "react";
import RateLimitUi from "../components/RateLimitUi";
import toast from "react-hot-toast";
import axios from "axios";
import Navbar from "../components/Navbar";
import NotesNotFound from "../components/NotesNotFound";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import { Note } from "../types";

const Home = () => {
  const [rateLimit, setRateLimit] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setRateLimit(false);
      } catch (error: unknown) {
        console.error("Error fetching notes:", error);
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          setRateLimit(true);
          setLoading(false);
        } else {
          toast.error("An error occurred while fetching notes. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [])

  return (
    <>
      <div className="min-h-screen">
        <Navbar />

        {rateLimit && <RateLimitUi />}

        <div className="max-w-7xl mx-auto p-4 mt-6">
          {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

            {notes.length === 0  && !rateLimit && <NotesNotFound />}

          {notes.length > 0 && !rateLimit && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home