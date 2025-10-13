import React, { useEffect, useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import "./App.css";
import api from "./api";

function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/tasks");
        setHabits(data.tasks || []);
      } catch (e) {
        console.error("Failed to load tasks", e);
      }
    };
    load();
  }, []);

  const addHabit = async ({ title, description }) => {
    try {
      const { data } = await api.post("/tasks", { title, description });
      setHabits((prev) => [data, ...prev]);
    } catch (e) {
      console.error("Failed to add task", e);
    }
  };

  const deleteHabit = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setHabits((prev) => prev.filter((h) => h._id !== id));
    } catch (e) {
      console.error("Failed to delete task", e);
    }
  };

  const toggleHabit = async (id) => {
    try {
      const current = habits.find((h) => h._id === id);
      if (!current) return;
      const { data } = await api.put(`/tasks/${id}`, {
        completed: !current.completed,
      });
      setHabits((prev) => prev.map((h) => (h._id === id ? data : h)));
    } catch (e) {
      console.error("Failed to toggle task", e);
    }
  };

  const editHabit = async (id, updates) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, updates);
      setHabits((prev) => prev.map((h) => (h._id === id ? data : h)));
    } catch (e) {
      console.error("Failed to edit task", e);
    }
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <h1>Habit Tracker</h1>
        </div>
      </header>
      <main className="main">
        <div className="app">
          <HabitForm addHabit={addHabit} />
          <HabitList
            habits={habits}
            deleteHabit={deleteHabit}
            toggleHabit={toggleHabit}
            editHabit={editHabit}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
