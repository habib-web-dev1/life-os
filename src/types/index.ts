export interface Habit {
  _id: string;
  userEmail: string;
  name: string;
  icon: string;
  color: string;
  completedDates: string[];
  currentStreak: number;
  longestStreak: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal {
  _id: string;
  userEmail: string;
  title: string;
  description?: string;
  category: "Health" | "Career" | "Finance" | "Personal";
  progress: number;
  targetDate?: Date;
  status: "active" | "completed" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
