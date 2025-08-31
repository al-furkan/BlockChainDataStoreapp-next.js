"use client";

import { useState } from "react";

export default function HelpList({ items, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditQuestion(item.question);
    setEditAnswer(item.answer);
  };

  const handleUpdate = () => {
    onUpdate(editingId, { id: editingId, question: editQuestion, answer: editAnswer });
    setEditingId(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Help Items</h2>
      {items.length === 0 && <p className="text-gray-500">No help items found.</p>}
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="border p-4 rounded-lg flex justify-between items-start">
            {editingId === item.id ? (
              <div className="flex-1">
                <input
                  type="text"
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  value={editAnswer}
                  onChange={(e) => setEditAnswer(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
            <div className="ml-4">
              {editingId === item.id ? null : (
                <>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
