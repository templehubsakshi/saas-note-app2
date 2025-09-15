import { useEffect, useState } from "react";
import API from "../api/axios";
import NoteCard from "../components/Notecard.jsx";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch {
      alert("Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/notes", { title, content });
      setNotes([...notes, res.data]);
      setTitle("");
      setContent("");
    } catch (err) {
      alert(err?.response?.data?.message || "Error adding note");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch {
      alert("Failed to delete note");
    }
  };

  // ✅ Update note feature
  const handleUpdate = async (id, updatedNote) => {
    try {
      const res = await API.put(`/notes/${id}`, updatedNote);
      setNotes((prev) =>
        prev.map((note) =>
          note._id === id ? { ...note, ...res.data } : note
        )
      );
    } catch {
      alert("Failed to update note");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Notes</h2>

        {user.plan === "free" && notes.length >= 3 && (
          <div className="mb-4 p-3 bg-yellow-700 text-yellow-100 rounded-lg shadow-md">
            Free plan limit reached. Please{" "}
            <button
              className="text-blue-400 underline hover:text-blue-300"
              onClick={() => navigate("/upgrade")}
            >
              Upgrade to Pro
            </button>.
          </div>
        )}

        {/* Add Note Form */}
        <form
          onSubmit={handleAddNote}
          className="mb-6 flex flex-col space-y-3 bg-gray-800 p-4 rounded-lg shadow-lg"
        >
          <input
            type="text"
            placeholder="Title"
            className="bg-gray-700 border border-gray-600 p-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            className="bg-gray-700 border border-gray-600 p-2 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-32 transition-colors">
            Add Note
          </button>
        </form>

        {/* Notes List */}
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={handleDelete}
              onUpdate={handleUpdate} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
