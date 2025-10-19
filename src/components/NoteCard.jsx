// src/components/NoteCard.jsx
import React, { useState, useEffect, useRef } from "react";
import { Pin, PinOff, Archive, ArchiveX, MoreVertical } from "lucide-react";
import axios from "axios";
const aps = process.env.REACT_APP_API_URL;
const API = axios.create({
  baseURL: aps,
});

export default function NoteCard({ note, onPinToggle, onArchiveToggle, onDelete }) {
  const [pinned, setPinned] = useState(note.pinned);
  const [archived, setArchived] = useState(note.archived);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState(note.color || "#ffffff");
  const [openModal, setOpenModal] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const contentRef = useRef(null);

  // Modal temp state
  const [modalTitle, setModalTitle] = useState(title);
  const [modalContent, setModalContent] = useState(content);
  const [modalColor, setModalColor] = useState(color);

  useEffect(() => {
    setPinned(note.pinned);
    setArchived(note.archived);
    setColor(note.color || "#ffffff");
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  useEffect(() => {
    if (contentRef.current) {
      setShowExpand(contentRef.current.scrollHeight > 256);
    }
  }, [note.content]);

  useEffect(() => {
    const closeMenu = () => setShowMenu(false);
    if (showMenu) document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const togglePin = async () => {
    try {
      const res = await API.patch(`/api/notes/${note._id}/pin`);
      setPinned(res.data.note.pinned);
      onPinToggle && onPinToggle(res.data.note);
    } catch (err) {
      console.error("Failed to toggle pin:", err);
    }
  };

  const toggleArchive = async () => {
    try {
      const res = await API.patch(`/api/notes/${note._id}/archive`);
      setArchived(res.data.note.archived);
      onArchiveToggle && onArchiveToggle(res.data.note);
    } catch (err) {
      console.error("Failed to toggle archive:", err);
    }
  };

  const handleEdit = () => {
    setModalTitle(title);
    setModalContent(content);
    setModalColor(color);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  const handleSave = async () => {
    try {
      const res = await API.put(`/api/notes/${note._id}`, {
        title: modalTitle,
        content: modalContent,
        color: modalColor,
      });
      setTitle(res.data.note.title);
      setContent(res.data.note.content);
      setColor(res.data.note.color);
      setOpenModal(false);
    } catch (err) {
      console.error("Failed to save changes:", err);
    }
  };

  // Soft-delete: call parent's onDelete which sends /trash
  const handleDelete = async () => {
    if (!window.confirm("Move this note to Trash?")) return;
    try {
      await API.put(`/api/notes/${note._id}/trash`);
      onDelete?.(note._id);
      setShowMenu(false);
    } catch (err) {
      console.error("Failed to move note to trash:", err);
    }
  };

  return (
    <>
      <div
        className={`rounded-xl shadow border p-3 hover:shadow-md transition-shadow cursor-pointer`}
        style={{ backgroundColor: color }}
        onClick={handleEdit}
      >
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-gray-900 truncate">{title}</h4>
          <div className="flex gap-1 items-start">
            <button
              onClick={(e) => { e.stopPropagation(); togglePin(); }}
              className="p-1.5 rounded hover:bg-black/5 text-gray-700"
              title={pinned ? "Unpin" : "Pin"}
            >
              {pinned ? <Pin className="w-5 h-5" /> : <PinOff className="w-5 h-5" />}
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); toggleArchive(); }}
              className="p-1.5 rounded hover:bg-black/5 text-gray-700"
              title={archived ? "Unarchive" : "Archive"}
            >
              {archived ? <ArchiveX className="w-5 h-5" /> : <Archive className="w-5 h-5" />}
            </button>

            <div className="relative">
              <button
                className="p-1.5 rounded hover:bg-black/5 text-gray-600"
                title="More"
                onClick={(e) => { e.stopPropagation(); setShowMenu(prev => !prev); }}
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              {showMenu && (
                <div
                  className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg z-10 w-36"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={handleDelete}
                    className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg"
                  >
                    Move to Trash
                  </button>
                  {/* You can add more actions here */}
                </div>
              )}
            </div>
          </div>
        </div>

        <p ref={contentRef} className="mt-1 text-gray-800 whitespace-pre-wrap overflow-hidden max-h-32">{content}</p>
        {showExpand && <div className="flex justify-end mt-2"><span className="text-blue-600 text-sm italic">Click to edit</span></div>}
      </div>

      {/* Edit Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={handleClose}>
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800" onClick={handleClose}>✕</button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Note</h2>
            <input type="text" value={modalTitle} onChange={(e) => setModalTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Title" />
            <textarea rows="5" value={modalContent} onChange={(e) => setModalContent(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Write your note..."></textarea>
            <div className="mt-4 flex items-center gap-2">
              <label className="text-gray-600 text-sm">Color:</label>
              <input type="color" value={modalColor} onChange={(e) => setModalColor(e.target.value)} className="w-8 h-8 cursor-pointer rounded-full" />
            </div>
            <div className="flex justify-end mt-6 gap-2">
              <button onClick={handleClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
