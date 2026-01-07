"use client";
import { useState } from "react";
import { X, Flame, Heart, Zap, Target, Coffee, Book } from "lucide-react";
import { showError } from "@/lib/sweetAlert";

interface HabitFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; icon: string; color: string }) => void;
  initialData?: { name: string; icon: string; color: string };
  isEditing?: boolean;
}

const icons = [
  { name: "Flame", component: Flame },
  { name: "Heart", component: Heart },
  { name: "Zap", component: Zap },
  { name: "Target", component: Target },
  { name: "Coffee", component: Coffee },
  { name: "Book", component: Book },
];

const colors = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#6b7280",
];

export default function HabitForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}: HabitFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [selectedIcon, setSelectedIcon] = useState(
    initialData?.icon || "Flame"
  );
  const [selectedColor, setSelectedColor] = useState(
    initialData?.color || "#6366f1"
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showError("Validation Error", "Please enter a habit name");
      return;
    }

    onSubmit({
      name: name.trim(),
      icon: selectedIcon,
      color: selectedColor,
    });

    if (!isEditing) {
      setName("");
      setSelectedIcon("Flame");
      setSelectedColor("#6366f1");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            {isEditing ? "Edit Habit" : "Create New Habit"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Habit Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Drink 8 glasses of water"
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Icon
            </label>
            <div className="grid grid-cols-3 gap-3">
              {icons.map(({ name: iconName, component: IconComponent }) => (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => setSelectedIcon(iconName)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedIcon === iconName
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <IconComponent size={24} className="mx-auto" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Color
            </label>
            <div className="grid grid-cols-4 gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-xl border-4 transition-all ${
                    selectedColor === color
                      ? "border-slate-400 scale-110"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
            >
              {isEditing ? "Update" : "Create"} Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
