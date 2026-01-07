"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { Habit } from "@/types";
import HabitCard from "@/components/habits/HabitCard";
import HabitForm from "@/components/habits/HabitForm";
import { showSuccess, showError, showConfirm } from "@/lib/sweetAlert";

export default function HabitsPage() {
  const { data: session } = useSession();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  useEffect(() => {
    if (session) {
      fetchHabits();
    }
  }, [session]);

  const fetchHabits = async () => {
    try {
      const response = await fetch("/api/habits");
      if (response.ok) {
        const data = await response.json();
        setHabits(data);
      } else {
        showError("Failed to load habits", "Please try refreshing the page");
      }
    } catch (error) {
      showError("Network error", "Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHabit = async (habitData: {
    name: string;
    icon: string;
    color: string;
  }) => {
    try {
      const response = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitData),
      });

      if (response.ok) {
        const newHabit = await response.json();
        setHabits([newHabit, ...habits]);
        setShowForm(false);
        showSuccess(
          "Habit created!",
          "Your new habit has been added successfully"
        );
      } else {
        showError("Failed to create habit", "Please try again");
      }
    } catch (error) {
      showError("Network error", "Unable to create habit");
    }
  };

  const handleUpdateHabit = async (habitData: {
    name: string;
    icon: string;
    color: string;
  }) => {
    if (!editingHabit) return;

    try {
      const response = await fetch(`/api/habits/${editingHabit._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitData),
      });

      if (response.ok) {
        const updatedHabit = await response.json();
        setHabits(
          habits.map((h) => (h._id === updatedHabit._id ? updatedHabit : h))
        );
        setEditingHabit(null);
        showSuccess(
          "Habit updated!",
          "Your habit has been updated successfully"
        );
      } else {
        showError("Failed to update habit", "Please try again");
      }
    } catch (error) {
      showError("Network error", "Unable to update habit");
    }
  };

  const handleDeleteHabit = async (habitId: string) => {
    const result = await showConfirm(
      "Delete Habit",
      "Are you sure you want to delete this habit? This action cannot be undone."
    );

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/habits/${habitId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setHabits(habits.filter((h) => h._id !== habitId));
        showSuccess(
          "Habit deleted!",
          "Your habit has been removed successfully"
        );
      } else {
        showError("Failed to delete habit", "Please try again");
      }
    } catch (error) {
      showError("Network error", "Unable to delete habit");
    }
  };

  const handleToggleHabit = async (habitId: string, date: string) => {
    try {
      const response = await fetch(`/api/habits/${habitId}/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
      });

      if (response.ok) {
        const updatedHabit = await response.json();
        setHabits(
          habits.map((h) => (h._id === updatedHabit._id ? updatedHabit : h))
        );
        showSuccess("Habit updated!", "Progress has been recorded");
      } else {
        showError("Failed to update habit", "Please try again");
      }
    } catch (error) {
      showError("Network error", "Unable to update habit progress");
    }
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-500">Loading habits...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Habits</h1>
          <p className="text-slate-500">Build and track your daily habits.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-medium hover:bg-slate-800 transition-colors"
        >
          <Plus size={20} />
          New Habit
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No habits yet
          </h3>
          <p className="text-slate-500 mb-6">
            Create your first habit to start building better routines.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-medium hover:bg-slate-800 transition-colors"
          >
            Create Your First Habit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <HabitCard
              key={habit._id}
              habit={habit}
              onToggle={handleToggleHabit}
              onEdit={handleEditHabit}
              onDelete={handleDeleteHabit}
            />
          ))}
        </div>
      )}

      <HabitForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleCreateHabit}
      />

      <HabitForm
        isOpen={!!editingHabit}
        onClose={() => setEditingHabit(null)}
        onSubmit={handleUpdateHabit}
        initialData={
          editingHabit
            ? {
                name: editingHabit.name,
                icon: editingHabit.icon,
                color: editingHabit.color,
              }
            : undefined
        }
        isEditing={true}
      />
    </motion.div>
  );
}
