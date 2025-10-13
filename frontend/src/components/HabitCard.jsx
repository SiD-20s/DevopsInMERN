import React, { useState } from "react";

export default function HabitCard({
  habit,
  deleteHabit,
  toggleHabit,
  editHabit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(habit.title || habit.name || "");
  const [newDescription, setNewDescription] = useState(habit.description || "");

  const handleEdit = () => {
    editHabit(habit._id || habit.id, {
      title: newTitle,
      description: newDescription,
    });
    setIsEditing(false);
  };

  return (
    <div className="habit-card">
      {isEditing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Description (optional)"
          />
        </div>
      ) : (
        <div>
          <span className={habit.completed ? "completed" : ""}>
            {habit.title || habit.name}
          </span>
          {habit.description ? (
            <div style={{ marginTop: 6, color: "#9ca3af", fontSize: 14 }}>
              {habit.description}
            </div>
          ) : null}
          <div style={{ marginTop: 6, color: "#6b7280", fontSize: 12 }}>
            {habit.createdAt
              ? new Date(habit.createdAt).toLocaleString()
              : null}
          </div>
        </div>
      )}

      <div className="buttons">
        {isEditing ? (
          <button onClick={handleEdit}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={() => toggleHabit(habit._id || habit.id)}>
          {habit.completed ? "Undo" : "Done"}
        </button>
        <button onClick={() => deleteHabit(habit._id || habit.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
