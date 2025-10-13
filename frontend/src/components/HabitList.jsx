import React from "react";
import HabitCard from "./HabitCard";

export default function HabitList({ habits, deleteHabit, toggleHabit, editHabit }) {
  if (!habits.length) return <p>No habits added yet.</p>;

  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitCard
          key={habit._id || habit.id}
          habit={habit}
          deleteHabit={deleteHabit}
          toggleHabit={toggleHabit}
          editHabit={editHabit}
        />
      ))}
    </div>
  );
}
