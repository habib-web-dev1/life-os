"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { Goal } from "@/types";
import GoalCard from "@/components/goals/GoalCard";
import GoalForm from "@/components/goals/GoalForm";
import { showSuccess, showError, showConfirm } from "@/lib/sweetAlert";

export default function GoalsPage() {
  const { data: session } = useSession();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  useEffect(() => {
    if (session) {
      fetchGoals();
    }
  }, [session]);

  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/goals");
      if (response.ok) {
        const data = await response.json();
        setGoals(data);
      } else {
        showError("Failed to load goals", "Please try refreshing the page");
      }
    } catch (error) {
      showError("Network error", "Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoal = async (goalData: {
    title: string;
    description: string;
    category: string;
    targetDate?: string;
  }) => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      });

      if (response.ok) {
        const newGoal = await response.json();
        setGoals([newGoal, ...goals]);
        setShowForm(false);
        showSuccess(
          "Goal created!",
          "Your new goal has been added successfully"
        );
      } else {
        showError("Failed to create goal", "Please try again");
      }
    } catch (error) {
      showError("Network error", "Unable to create goal");
    }
  };

  const handleUpdateGoal = async (goalData: {
    title: string;
    description: string;
    category: string;
    targetDate?: string;
  }) => {
    if (!editingGoal) return;

    try {
      const response = await fetch(`/api/goals/${editingGoal._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      });

      if (response.ok) {
        const updatedGoal = await response.json();
        setGoals(
          goals.map((g) => (g._id === updatedGoal._id ? updatedGoal : g))
        );
        setEditingGoal(null);
        showSuccess("Goal updated!", "Your goal has been updated successfully");
      } else {
        showError("Failed to update goal", "Please try again");
      }
    } catch (error) {
      showError("Network error", "Unable to update goal");
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    const result = await showConfirm(
      "Delete Goal",
      "Are you sure you want to delete this goal? This action cannot be undone."
    );

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setGoals(goals.filter((g) => g._id !== goalId));
        showSuccess("Goal deleted!", "Your goal has been removed successfully");
      } else {
        showError("Failed to delete goal", "Please try again");
      }
    } catch (error) {
      showError("Network error", "Unable to delete goal");
    }
  };

  const handleUpdateProgress = async (goalId: string, progress: number) => {
    try {
      const status = progress === 100 ? "completed" : "active";
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress, status }),
      });

      if (response.ok) {
        const updatedGoal = await response.json();
        setGoals(
          goals.map((g) => (g._id === updatedGoal._id ? updatedGoal : g))
        );
        if (progress === 100) {
          showSuccess("Congratulations! 🎉", "You've completed your goal!");
        } else {
          showSuccess("Progress updated!", "Keep up the great work!");
        }
      } else {
        showError("Failed to update progress", "Please try again");
      }
    } catch (error) {
      showError("Network error", "Unable to update goal progress");
    }
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-500">Loading goals...</div>
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
          <h1 className="text-3xl font-bold text-slate-900">Goals</h1>
          <p className="text-slate-500">
            Track and manage your personal goals.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-medium hover:bg-slate-800 transition-colors"
        >
          <Plus size={20} />
          New Goal
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No goals yet
          </h3>
          <p className="text-slate-500 mb-6">
            Create your first goal to start achieving your dreams.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-medium hover:bg-slate-800 transition-colors"
          >
            Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <GoalCard
              key={goal._id}
              goal={goal}
              onEdit={handleEditGoal}
              onDelete={handleDeleteGoal}
              onUpdateProgress={handleUpdateProgress}
            />
          ))}
        </div>
      )}

      <GoalForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleCreateGoal}
      />

      <GoalForm
        isOpen={!!editingGoal}
        onClose={() => setEditingGoal(null)}
        onSubmit={handleUpdateGoal}
        initialData={
          editingGoal
            ? {
                title: editingGoal.title,
                description: editingGoal.description || "",
                category: editingGoal.category,
                targetDate: editingGoal.targetDate
                  ? new Date(editingGoal.targetDate).toISOString().split("T")[0]
                  : "",
              }
            : undefined
        }
        isEditing={true}
      />
    </motion.div>
  );
}
