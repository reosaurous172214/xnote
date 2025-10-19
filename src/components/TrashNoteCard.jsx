// src/components/TrashNoteCard.jsx
import React from 'react';
import API from '../api/axios';

export default function TrashNoteCard({ note, onRestore, onDeleteForever }) {
  return (
    <div className="rounded-xl shadow border p-3 transition-shadow bg-white">
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-gray-900 truncate">{note.title || '(No title)'}</h4>
        <div className="text-xs text-gray-500">{ new Date(note.deletedAt).toLocaleString() }</div>
      </div>
      <p className="mt-2 text-gray-700 whitespace-pre-wrap">{note.content}</p>

      <div className="flex justify-end gap-2 mt-3">
        <button onClick={() => onRestore(note._id)} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">Restore</button>
        <button onClick={() => onDeleteForever(note._id)} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">Delete Forever</button>
      </div>
    </div>
  );
}
