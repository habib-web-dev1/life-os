import { Schema, model, models } from "mongoose";

const HabitSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String, default: "Flame" }, // Lucide icon name
    color: { type: String, default: "#6366f1" },
    completedDates: [{ type: String }], // Format: "YYYY-MM-DD"
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    collection: "habit", // This ensures it uses your existing 'habit' collection
  }
);

const Habit = models.Habit || model("Habit", HabitSchema);
export default Habit;
