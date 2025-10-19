// src/pages/Keep.jsx
import React, { useEffect, useMemo, useState } from "react";
import NoteComposer from "../components/NoteComposer";
import NoteCard from "../components/NoteCard";
import { useNavigate } from "react-router-dom";
import { Squares2X2Icon, Bars3Icon } from '@heroicons/react/24/outline';
import axios from "axios";
const aps = process.env.REACT_APP_API_URL;
export default function Keep() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stacked, setStacked] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchNotes = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await axios.get(`${aps}/api/notes/${user.email}`);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const addNote = async ({ title, content, color = "#fff", pinned = false }) => {
    if (!user?.email) return;
    try {
      const res = await axios.post(`${aps}/api/notes`, { email: user.email, title, content, color, pinned, archived: false });
      setNotes(prev => [res.data.note, ...prev]);
    } catch (err) {
      console.error(err);
      setError("Failed to add note");
    }
  };

  useEffect(() => {
    if (!user) navigate("/login");
    else fetchNotes();
  }, [user?.email, navigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(n => n.title?.toLowerCase().includes(q) || n.content?.toLowerCase().includes(q));
  }, [notes, query]);

  const pinned = filtered.filter(n => n.pinned);
  const others = filtered.filter(n => !n.pinned);

  const gridClasses = stacked 
    ? "grid grid-cols-1 gap-4" 
    : "grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4";

  // SOFT DELETE (move to trash)
  const handleDeleteNote = async (id) => {
    try {
      await axios.put(`/api/notes/${id}/trash`);
      setNotes(prev => prev.filter(n => n._id !== id)); // remove from current view
    } catch (err) {
      console.error("Failed to move note to trash", err);
    }
  };

  // If you want to handle pin/archive refetch/update from child, add handlers accordingly.
  const handlePinToggle = (updatedNote) => {
    setNotes(prev => prev.map(n => n._id === updatedNote._id ? updatedNote : n));
  };
  const handleArchiveToggle = (updatedNote) => {
    setNotes(prev => prev.map(n => n._id === updatedNote._id ? updatedNote : n));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search notes"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-grow border rounded-lg px-3 py-2 mr-4"
        />
        <button 
          onClick={() => setStacked(prev => !prev)} 
          className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-200"
        >
          {stacked ? <Squares2X2Icon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      <NoteComposer onAdd={addNote} />

      {loading && <p className="text-center text-gray-500 mt-6">Loading notes...</p>}
      {error && <p className="text-center text-red-500 mt-6">{error}</p>}

      {pinned.length > 0 && (
        <>
          <h3 className="mt-6 mb-2 text-sm font-semibold text-gray-600">PINNED</h3>
          <div className={gridClasses}>
            {pinned.map(n => (
              <NoteCard key={n._id} note={n} onDelete={handleDeleteNote} onPinToggle={handlePinToggle} onArchiveToggle={handleArchiveToggle} />
            ))}
          </div>
        </>
      )}

      {others.length > 0 && (
        <>
          <h3 className="mt-6 mb-2 text-sm font-semibold text-gray-600">OTHERS</h3>
          <div className={gridClasses}>
            {others.map(n => (
              <NoteCard key={n._id} note={n} onDelete={handleDeleteNote} onPinToggle={handlePinToggle} onArchiveToggle={handleArchiveToggle} />
            ))}
          </div>
        </>
      )}

      {!loading && filtered.length === 0 && <p className="text-center text-gray-500 mt-10">No notes yet. Create your first note!</p>}
    </div>
  );
}
