"use client";
import { motion } from "framer-motion";
import { Check, Edit, Trash2 } from "lucide-react";
import { Habit } from "@/types";

interface HabitCardProps {
  habit: Habit;
  onToggle: (habitId: string, date: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

export default function HabitCard({
  habit,
  onToggle,
  onEdit,
  onDelete,
}: HabitCardProps) {
  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completedDates.includes(today);

  // Get icon component dynamically
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Flame: "🔥",
      Heart: "❤️",
      Zap: "⚡",
      Target: "🎯",
      Coffee: "☕",
      Book: "📚",
    };
    return icons[iconName] || "🔥";
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div
            className="p-4 rounded-2xl text-2xl"
            style={{ backgroundColor: `${habit.color}15` }}
          >
            {getIcon(habit.icon)}
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{habit.name}</h3>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              {habit.currentStreak} Day Streak
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(habit)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(habit._id)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">
          Longest streak: {habit.longestStreak} days
        </div>
        <button
          onClick={() => onToggle(habit._id, today)}
          className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${
            isDoneToday
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
              : "bg-slate-50 text-slate-300 hover:bg-slate-100"
          }`}
        >
          <Check size={24} strokeWidth={3} />
        </button>
      </div>
    </motion.div>
  );
}
