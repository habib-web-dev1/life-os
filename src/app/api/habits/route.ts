import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Habit from "@/models/Habit";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

// GET - Fetch all habits for the user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const habits = await Habit.find({ userEmail: session.user.email }).sort({
      createdAt: -1,
    });

    return Response.json(habits);
  } catch (error) {
    console.error("Get habits error:", error);
    return Response.json({ error: "Failed to fetch habits" }, { status: 500 });
  }
}

// POST - Create a new habit
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, icon, color } = body;

    if (!name) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    await connectDB();

    const habit = await Habit.create({
      userEmail: session.user.email,
      name,
      icon: icon || "Flame",
      color: color || "#6366f1",
      completedDates: [],
      currentStreak: 0,
      longestStreak: 0,
    });

    return Response.json(habit, { status: 201 });
  } catch (error) {
    console.error("Create habit error:", error);
    return Response.json({ error: "Failed to create habit" }, { status: 500 });
  }
}
