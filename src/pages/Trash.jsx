// src/pages/Trash.jsx
import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import TrashNoteCard from '../components/TrashNoteCard';
import { useNavigate } from 'react-router-dom';

export default function Trash() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTrash = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await API.get(`/api/notes/trash/${user.email}`);
      setNotes(res.data);
    } catch (err) {
      console.error('Failed to fetch trashed notes', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) navigate('/login');
    else fetchTrash();
  }, [user?.email, navigate]);

  const handleRestore = async (id) => {
    try {
      await API.put(`/api/notes/${id}/restore`);
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      console.error('Failed to restore note', err);
    }
  };

  const handleDeleteForever = async (id) => {
    if (!window.confirm('Permanently delete this note? This cannot be undone.')) return;
    try {
      await API.delete(`/api/notes/${id}`);
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      console.error('Failed to permanently delete note', err);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Trash</h2>
      {loading && <p>Loading...</p>}
      {!loading && notes.length === 0 && <p className="text-gray-500">No notes in Trash.</p>}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.map(n => (
          <TrashNoteCard key={n._id} note={n} onRestore={handleRestore} onDeleteForever={handleDeleteForever} />
        ))}
      </div>
    </div>
  )
}
