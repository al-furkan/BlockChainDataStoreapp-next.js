"use client";

import { useState } from "react";

export default function HelpForm({ onAdd }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !answer) return;
    onAdd({ question, answer });
    setQuestion("");
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Help Item</h2>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Item
      </button>
    </form>
  );
}
