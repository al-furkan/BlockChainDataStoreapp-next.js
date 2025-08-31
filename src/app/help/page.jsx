"use client";

import { useState } from "react";
import HelpForm from "./HelpForm";
import HelpList from "./HelpList";

export default function HelpPage() {
  const [helpItems, setHelpItems] = useState([
    { id: 1, question: "How to register?", answer: "Click on register and fill out the form." },
    { id: 2, question: "How to reset password?", answer: "Use the 'Forgot Password' option on login." }
  ]);

  const addHelpItem = (item) => {
    setHelpItems([...helpItems, { ...item, id: Date.now() }]);
  };

  const updateHelpItem = (id, updatedItem) => {
    setHelpItems(helpItems.map((item) => (item.id === id ? updatedItem : item)));
  };

  const deleteHelpItem = (id) => {
    setHelpItems(helpItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Help Page (Admin Panel)</h1>
      <HelpForm onAdd={addHelpItem} />
      <HelpList items={helpItems} onDelete={deleteHelpItem} onUpdate={updateHelpItem} />
    </div>
  );
}
