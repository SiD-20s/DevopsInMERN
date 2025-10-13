import React, { useState } from "react";

export default function HabitForm({ addHabit }) {
  const [habitName, setHabitName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habitName.trim()) return;

    addHabit({ title: habitName, description });
    setHabitName("");
    setDescription("");
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter habit"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
