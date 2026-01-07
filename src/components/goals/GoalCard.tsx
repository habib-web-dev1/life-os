"use client";
import { motion } from "framer-motion";
import { Edit, Trash2, Calendar, Target } from "lucide-react";
import { Goal } from "@/types";

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
  onUpdateProgress: (goalId: string, progress: number) => void;
}

export default function GoalCard({
  goal,
  onEdit,
  onDelete,
  onUpdateProgress,
}: GoalCardProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      Health: "#10b981",
      Career: "#6366f1",
      Finance: "#f59e0b",
      Personal: "#ec4899",
    };
    return colors[category as keyof typeof colors] || "#6b7280";
  };

  const getCategoryEmoji = (category: string) => {
    const emojis = {
      Health: "🏃‍♂️",
      Career: "💼",
      Finance: "💰",
      Personal: "🎯",
    };
    return emojis[category as keyof typeof emojis] || "🎯";
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue =
    goal.targetDate &&
    new Date(goal.targetDate) < new Date() &&
    goal.status !== "completed";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="p-3 rounded-2xl text-xl"
            style={{ backgroundColor: `${getCategoryColor(goal.category)}15` }}
          >
            {getCategoryEmoji(goal.category)}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">{goal.title}</h3>
            <span
              className="text-xs px-2 py-1 rounded-full font-medium"
              style={{
                backgroundColor: `${getCategoryColor(goal.category)}15`,
                color: getCategoryColor(goal.category),
              }}
            >
              {goal.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(goal)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(goal._id)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {goal.description && (
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {goal.description}
        </p>
      )}

      <div className="space-y-3">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Progress</span>
            <span className="text-sm text-slate-500">{goal.progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${goal.progress}%`,
                backgroundColor: getCategoryColor(goal.category),
              }}
            />
          </div>
        </div>

        {/* Progress Input */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value={goal.progress}
            onChange={(e) =>
              onUpdateProgress(goal._id, parseInt(e.target.value))
            }
            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${getCategoryColor(
                goal.category
              )} 0%, ${getCategoryColor(goal.category)} ${
                goal.progress
              }%, #e2e8f0 ${goal.progress}%, #e2e8f0 100%)`,
            }}
          />
        </div>

        {/* Target Date */}
        {goal.targetDate && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={14} />
            <span className={isOverdue ? "text-red-500" : "text-slate-500"}>
              Target: {formatDate(goal.targetDate)}
              {isOverdue && " (Overdue)"}
            </span>
          </div>
        )}

        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target size={14} className="text-slate-400" />
            <span className="text-sm text-slate-500 capitalize">
              {goal.status}
            </span>
          </div>
          {goal.progress === 100 && goal.status !== "completed" && (
            <button
              onClick={() => onUpdateProgress(goal._id, 100)}
              className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium hover:bg-green-200 transition-colors"
            >
              Mark Complete
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
