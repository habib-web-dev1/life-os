import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Habit from "@/models/Habit";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../pages/api/auth/[...nextauth]";

// GET - Fetch a specific habit
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const habit = await Habit.findOne({
      _id: params.id,
      userEmail: session.user.email,
    });

    if (!habit) {
      return Response.json({ error: "Habit not found" }, { status: 404 });
    }

    return Response.json(habit);
  } catch (error) {
    console.error("Get habit error:", error);
    return Response.json({ error: "Failed to fetch habit" }, { status: 500 });
  }
}

// PUT - Update a habit
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, icon, color } = body;

    await connectDB();

    const habit = await Habit.findOneAndUpdate(
      { _id: params.id, userEmail: session.user.email },
      { name, icon, color },
      { new: true }
    );

    if (!habit) {
      return Response.json({ error: "Habit not found" }, { status: 404 });
    }

    return Response.json(habit);
  } catch (error) {
    console.error("Update habit error:", error);
    return Response.json({ error: "Failed to update habit" }, { status: 500 });
  }
}

// DELETE - Delete a habit
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const habit = await Habit.findOneAndDelete({
      _id: params.id,
      userEmail: session.user.email,
    });

    if (!habit) {
      return Response.json({ error: "Habit not found" }, { status: 404 });
    }

    return Response.json({ message: "Habit deleted successfully" });
  } catch (error) {
    console.error("Delete habit error:", error);
    return Response.json({ error: "Failed to delete habit" }, { status: 500 });
  }
}
