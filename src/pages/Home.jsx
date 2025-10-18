import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const aps = process.env.REACT_APP_API_URL;
const Home = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
    else fetchNotes();
  }, [user, navigate]);

  // Fetch notes for logged-in user
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${aps}/api/notes/${user.email}`);
      setNotes(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching notes:", err.response || err);
      setError("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  // Add a new note
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      alert("Title and content are required");
      return;
    }
    try {
      const res = await axios.post(`${aps}/api/notes`, {
        ...form,
        email: user.email,
        color: "#ffffff",
        pinned: false,
        archived: false,
      });
      console.log("Note created:", res.data);
      setForm({ title: "", content: "" });
      fetchNotes(); // Refresh notes
    } catch (err) {
      console.error("Error creating note:", err.response || err);
      alert("Failed to add note");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4 text-center">My Notes</h2>

      {/* Add Note Form */}
      <form className="mb-6 flex flex-col gap-2 max-w-md mx-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          className="border p-2 rounded"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Note
        </button>
      </form>

      {/* Loading / Error */}
      {loading && <p className="text-center">Loading notes...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Notes Grid */}
      {!loading && notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div key={note._id} className="border p-4 rounded shadow bg-white">
              <h3 className="font-bold text-lg mb-2">{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center mt-4">No notes found</p>
      )}
    </div>
  );
};

export default Home;
