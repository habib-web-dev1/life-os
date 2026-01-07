import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Goal from "@/models/Goal";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";

// GET - Fetch all goals for the user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const goals = await Goal.find({ userEmail: session.user.email }).sort({
      createdAt: -1,
    });

    return Response.json(goals);
  } catch (error) {
    console.error("Get goals error:", error);
    return Response.json({ error: "Failed to fetch goals" }, { status: 500 });
  }
}

// POST - Create a new goal
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, category, targetDate } = body;

    if (!title) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    await connectDB();

    const goal = await Goal.create({
      userEmail: session.user.email,
      title,
      description,
      category: category || "Personal",
      progress: 0,
      targetDate: targetDate ? new Date(targetDate) : undefined,
      status: "active",
    });

    return Response.json(goal, { status: 201 });
  } catch (error) {
    console.error("Create goal error:", error);
    return Response.json({ error: "Failed to create goal" }, { status: 500 });
  }
}
