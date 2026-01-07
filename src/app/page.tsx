"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Star,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: CheckCircle2,
    title: "Smart Habit Tracking",
    description:
      "Build lasting habits with intelligent streak tracking and personalized insights.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Star,
    title: "Goal Achievement",
    description:
      "Set, track, and achieve your most important goals with visual progress tracking.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description:
      "Understand your patterns with detailed analytics and performance insights.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: Zap,
    title: "Daily Motivation",
    description:
      "Stay motivated with daily challenges, achievements, and progress celebrations.",
    color: "from-purple-400 to-pink-500",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Entrepreneur",
    content:
      "LifeOS transformed how I approach my daily routines. I've never been more productive!",
    avatar:
      "https://www.cityheadshots.com/uploads/5/1/2/1/5121840/mjb-4702_orig.jpg",
  },
  {
    name: "Mike Chen",
    role: "Software Developer",
    content:
      "The habit tracking is incredibly intuitive. I've built 5 new habits in just 2 months.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
  },
  {
    name: "Emily Davis",
    role: "Designer",
    content:
      "Beautiful interface and powerful features. It's like having a personal life coach.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
  },
];

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900 selection:bg-indigo-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full opacity-20 blur-xl"
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 font-bold text-2xl tracking-tight"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            LifeOS
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          <Link
            href="/login"
            className="text-sm font-medium hover:text-indigo-600 transition-colors px-4 py-2 rounded-lg hover:bg-white/50"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all active:scale-95"
          >
            Get Started
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 text-sm font-bold mb-8 border border-indigo-100"
            >
              <Sparkles size={16} className="animate-pulse" />
              YOUR ENTIRE LIFE, ORGANIZED
            </motion.div>

            <h1 className="text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tight">
              Design the life you{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-pulse">
                actually
              </span>{" "}
              want to live.
            </h1>

            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              The all-in-one workspace for your habits, goals, and daily
              reflections. Stop drifting and start designing your perfect life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all group"
                >
                  Start Your Journey
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-3 bg-white/80 backdrop-blur border border-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:shadow-lg transition-all"
                >
                  Existing Member
                </Link>
              </motion.div>
            </div>

            <div className="flex items-center gap-8 text-sm text-slate-500 font-medium">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 size={16} className="text-green-500" />
                <span>Smart Habits</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 size={16} className="text-blue-500" />
                <span>Goal Tracking</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 size={16} className="text-purple-500" />
                <span>Analytics</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-tr from-indigo-100 via-purple-50 to-pink-100 rounded-[3rem] overflow-hidden border border-white shadow-2xl shadow-indigo-100/50 backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 w-2/3">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl border border-white/50 shadow-lg flex items-center justify-center"
                  >
                    <CheckCircle2 size={32} className="text-white" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className="h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl border border-white/50 shadow-lg flex items-center justify-center"
                  >
                    <Star size={32} className="text-white" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="h-48 col-span-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl border border-white/50 shadow-lg flex items-center justify-center"
                  >
                    <TrendingUp size={40} className="text-white" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-slate-600">
              Powerful features designed to help you build the life you want
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 bg-white/80 backdrop-blur rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                >
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by thousands</h2>
            <p className="text-xl text-slate-600">
              See what our users are saying
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + index * 0.1 }}
                className="p-6 bg-white/80 backdrop-blur rounded-2xl border border-slate-100 shadow-lg"
              >
                <p className="text-slate-700 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-32 text-center"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to transform your life?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of people who are already living their best life
              with LifeOS
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/register"
                className="inline-flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all group"
              >
                Start Free Today
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
