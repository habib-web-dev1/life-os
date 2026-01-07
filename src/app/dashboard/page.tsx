"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  Target,
  Flame,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  BarChart3,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Habit, Goal } from "@/types";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    try {
      const [habitsRes, goalsRes] = await Promise.all([
        fetch("/api/habits"),
        fetch("/api/goals"),
      ]);

      if (habitsRes.ok && goalsRes.ok) {
        const [habitsData, goalsData] = await Promise.all([
          habitsRes.json(),
          goalsRes.json(),
        ]);
        setHabits(habitsData);
        setGoals(goalsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getUserName = () => {
    return session?.user?.name?.split(" ")[0] || "there";
  };

  // Calculate statistics
  const totalHabits = habits.length;
  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.status === "completed").length;
  const activeGoals = goals.filter((g) => g.status === "active").length;
  const averageGoalProgress =
    goals.length > 0
      ? Math.round(
          goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length
        )
      : 0;

  // Today's habit completion
  const today = new Date().toISOString().split("T")[0];
  const todayCompletedHabits = habits.filter((h) =>
    h.completedDates.includes(today)
  ).length;
  const habitCompletionRate =
    totalHabits > 0
      ? Math.round((todayCompletedHabits / totalHabits) * 100)
      : 0;

  // Get current streaks
  const totalCurrentStreak = habits.reduce(
    (sum, habit) => sum + habit.currentStreak,
    0
  );
  const longestStreak = Math.max(...habits.map((h) => h.longestStreak), 0);

  // Recent habits (not completed today)
  const pendingHabits = habits
    .filter((h) => !h.completedDates.includes(today))
    .slice(0, 3);

  // Recent goals (active with lowest progress)
  const recentGoals = goals
    .filter((g) => g.status === "active")
    .sort((a, b) => a.progress - b.progress)
    .slice(0, 3);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          {getGreeting()}, {getUserName()}! 👋
        </h1>
        <p className="text-slate-500 text-lg">
          Here's your progress overview for today
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Today's Habits */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-2xl">
              <CheckCircle2 className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-blue-600">
              {todayCompletedHabits}/{totalHabits}
            </span>
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">Today's Habits</h3>
          <p className="text-sm text-slate-600">
            {habitCompletionRate}% completed
          </p>
          <div className="mt-3 w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${habitCompletionRate}%` }}
            />
          </div>
        </div>

        {/* Active Goals */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-500 rounded-2xl">
              <Target className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-emerald-600">
              {activeGoals}
            </span>
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">Active Goals</h3>
          <p className="text-sm text-slate-600">
            {averageGoalProgress}% avg progress
          </p>
          <div className="mt-3 w-full bg-emerald-200 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${averageGoalProgress}%` }}
            />
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500 rounded-2xl">
              <Flame className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-orange-600">
              {totalCurrentStreak}
            </span>
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">Total Streak</h3>
          <p className="text-sm text-slate-600">Best: {longestStreak} days</p>
        </div>

        {/* Completed Goals */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500 rounded-2xl">
              <Award className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-purple-600">
              {completedGoals}
            </span>
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">Completed</h3>
          <p className="text-sm text-slate-600">Goals achieved</p>
        </div>
      </motion.div>

      {/* Quick Actions & Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Habits */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Clock className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Pending Habits
              </h2>
            </div>
            <Link
              href="/habits"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {pendingHabits.length > 0 ? (
            <div className="space-y-3">
              {pendingHabits.map((habit) => (
                <div
                  key={habit._id}
                  className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl"
                >
                  <div
                    className="p-2 rounded-xl text-lg"
                    style={{ backgroundColor: `${habit.color}20` }}
                  >
                    🔥
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{habit.name}</h4>
                    <p className="text-sm text-slate-500">
                      {habit.currentStreak} day streak
                    </p>
                  </div>
                  <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                    <CheckCircle2 size={18} className="text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🎉</div>
              <p className="text-slate-600 mb-4">
                All habits completed for today!
              </p>
              <Link
                href="/habits"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus size={18} />
                Add New Habit
              </Link>
            </div>
          )}
        </motion.div>

        {/* Recent Goals */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-xl">
                <TrendingUp className="text-emerald-600" size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Goals in Progress
              </h2>
            </div>
            <Link
              href="/goals"
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {recentGoals.length > 0 ? (
            <div className="space-y-4">
              {recentGoals.map((goal) => (
                <div key={goal._id} className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-slate-900">{goal.title}</h4>
                    <span className="text-sm font-medium text-slate-600">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span className="capitalize">{goal.category}</span>
                    {goal.targetDate && (
                      <span>
                        {new Date(goal.targetDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🎯</div>
              <p className="text-slate-600 mb-4">No active goals yet</p>
              <Link
                href="/goals"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
              >
                <Plus size={18} />
                Create Goal
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-white/10 rounded-xl">
            <BarChart3 className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold">Your Progress Summary</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{totalHabits}</div>
            <div className="text-slate-300 text-sm">Total Habits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{totalGoals}</div>
            <div className="text-slate-300 text-sm">Total Goals</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{longestStreak}</div>
            <div className="text-slate-300 text-sm">Best Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{completedGoals}</div>
            <div className="text-slate-300 text-sm">Achievements</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
