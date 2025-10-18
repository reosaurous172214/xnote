import React, { useRef, useState,useEffect } from "react";
import { Pin, X } from "lucide-react";
const aps = process.env.REACT_APP_API_URL;
const COLORS = [
  "#ffffff", "#f28b82", "#fbbc04", "#fff475",
  "#ccff90", "#a7ffeb", "#cbf0f8", "#aecbfa",
  "#d7aefb", "#fdcfe8", "#e6c9a8", "#e8eaed",
];


export default function NoteComposer({ onAdd }) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [pinned, setPinned] = useState(false);

  const boxRef = useRef(null);

  const reset = () => {
    setTitle("");
    setContent("");
    setColor(COLORS[0]);
    setPinned(false);
    setExpanded(false);
  };

  const handleAdd = () => {
    if (!title && !content) return;
    onAdd?.({ title, content, color, pinned });
    reset();
  };

  return (
    <div
      ref={boxRef}
      style={{ backgroundColor: color }}
      className="w-full max-w-3xl mx-auto rounded-xl shadow border transition-colors"
    >
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="w-full text-left px-4 py-3 text-gray-700"
        >
          Take a note…
        </button>
      ) : (
        <div className="p-3">
          <div className="flex items-start gap-2">
            <input
              className="flex-1 bg-transparent placeholder-gray-500 text-gray-900 font-medium outline-none"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <button
              onClick={() => setPinned((p) => !p)}
              className={`p-2 rounded hover:bg-black/5 ${pinned ? "text-blue-600" : "text-gray-600"}`}
              title="Pin note"
            >
              <Pin className="w-5 h-5" />
            </button>
          </div>

          <textarea
            className="w-full mt-1 bg-transparent placeholder-gray-500 text-gray-800 outline-none resize-none"
            rows={3}
            placeholder="Take a note…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* actions */}
          <div className="mt-2 flex items-center justify-between">
            {/* color palette */}
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: c }}
                  title="Note color"
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAdd}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
              <button
                onClick={reset}
                className="p-2 rounded hover:bg-black/5"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
