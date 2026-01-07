import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Goal from "@/models/Goal";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../pages/api/auth/[...nextauth]";

// GET - Fetch a specific goal
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

    const goal = await Goal.findOne({
      _id: params.id,
      userEmail: session.user.email,
    });

    if (!goal) {
      return Response.json({ error: "Goal not found" }, { status: 404 });
    }

    return Response.json(goal);
  } catch (error) {
    console.error("Get goal error:", error);
    return Response.json({ error: "Failed to fetch goal" }, { status: 500 });
  }
}

// PUT - Update a goal
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
    const { title, description, category, progress, targetDate, status } = body;

    await connectDB();

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (progress !== undefined)
      updateData.progress = Math.max(0, Math.min(100, progress));
    if (targetDate !== undefined)
      updateData.targetDate = targetDate ? new Date(targetDate) : null;
    if (status !== undefined) updateData.status = status;

    const goal = await Goal.findOneAndUpdate(
      { _id: params.id, userEmail: session.user.email },
      updateData,
      { new: true }
    );

    if (!goal) {
      return Response.json({ error: "Goal not found" }, { status: 404 });
    }

    return Response.json(goal);
  } catch (error) {
    console.error("Update goal error:", error);
    return Response.json({ error: "Failed to update goal" }, { status: 500 });
  }
}

// DELETE - Delete a goal
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

    const goal = await Goal.findOneAndDelete({
      _id: params.id,
      userEmail: session.user.email,
    });

    if (!goal) {
      return Response.json({ error: "Goal not found" }, { status: 404 });
    }

    return Response.json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Delete goal error:", error);
    return Response.json({ error: "Failed to delete goal" }, { status: 500 });
  }
}
