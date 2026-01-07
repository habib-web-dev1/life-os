import { Schema, model, models } from "mongoose";

const GoalSchema = new Schema(
  {
    userEmail: { type: String, required: true }, // Links goal to a specific user
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["Health", "Career", "Finance", "Personal"],
      default: "Personal",
    },
    progress: { type: Number, default: 0 },
    targetDate: { type: Date },
    status: {
      type: String,
      enum: ["active", "completed", "archived"],
      default: "active",
    },
  },
  {
    timestamps: true,
    collection: "goal", // This ensures it uses your existing 'goal' collection
  }
);

// Check if the model exists before creating a new one (important for Next.js HMR)
const Goal = models.Goal || model("Goal", GoalSchema);
export default Goal;
