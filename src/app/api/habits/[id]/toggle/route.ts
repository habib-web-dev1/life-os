import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Habit from "@/models/Habit";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../pages/api/auth/[...nextauth]";

// POST - Toggle habit completion for a specific date
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { date } = body;

    if (!date) {
      return Response.json({ error: "Date is required" }, { status: 400 });
    }

    await connectDB();

    const habit = await Habit.findOne({
      _id: params.id,
      userEmail: session.user.email,
    });

    if (!habit) {
      return Response.json({ error: "Habit not found" }, { status: 404 });
    }

    const isCompleted = habit.completedDates.includes(date);

    if (isCompleted) {
      // Remove the date
      habit.completedDates = habit.completedDates.filter(
        (d: string) => d !== date
      );
    } else {
      // Add the date
      habit.completedDates.push(date);
    }

    // Calculate streak
    habit.currentStreak = calculateStreak(habit.completedDates);
    if (habit.currentStreak > habit.longestStreak) {
      habit.longestStreak = habit.currentStreak;
    }

    await habit.save();

    return Response.json(habit);
  } catch (error) {
    console.error("Toggle habit error:", error);
    return Response.json({ error: "Failed to toggle habit" }, { status: 500 });
  }
}

function calculateStreak(dates: string[]) {
  if (dates.length === 0) return 0;

  const sorted = [...dates].sort().reverse();
  let streak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sorted.length; i++) {
    const date = new Date(sorted[i]);
    date.setHours(0, 0, 0, 0);

    if (i === 0) {
      const diff = (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
      if (diff > 1) break;
    } else {
      const prev = new Date(sorted[i - 1]);
      prev.setHours(0, 0, 0, 0);
      const diff = (prev.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
      if (diff !== 1) break;
    }

    streak++;
  }

  return streak;
}
