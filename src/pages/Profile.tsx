import {
  User,
  Mail,
  Edit,
  Trophy,
  Flame,
  Target,
  BookOpen,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useState, useEffect } from "react";
import authApi from "@/api/authApi";
import { type User as UserType } from "@/types/User.type";

const studyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 1.8 },
  { day: "Thu", hours: 4.5 },
  { day: "Fri", hours: 3.8 },
  { day: "Sat", hours: 5.2 },
  { day: "Sun", hours: 4.1 },
];

const achievements = [
  {
    id: 1,
    icon: Flame,
    title: "7-Day Streak",
    description: "Studied every day this week",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 2,
    icon: Target,
    title: "Goal Crusher",
    description: "Completed 15 learning goals",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    icon: BookOpen,
    title: "Course Master",
    description: "Finished 8 courses",
    color: "from-purple-500 to-pink-500",
  },
];

const recentActivity = [
  {
    id: 1,
    topic: "Advanced Machine Learning",
    time: "2 hours ago",
    progress: 85,
  },
  {
    id: 2,
    topic: "Data Structures & Algorithms",
    time: "5 hours ago",
    progress: 62,
  },
  {
    id: 3,
    topic: "Web Development Fundamentals",
    time: "1 day ago",
    progress: 100,
  },
  { id: 4, topic: "Python for Data Science", time: "2 days ago", progress: 45 },
];

export default function Profile() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authApi.getCurrentUser();
        setUser(response.results);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-indigo-500/20 ring-offset-2 ring-offset-slate-950">
                <User className="w-7 h-7" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
            </div>
            <div>
              <h1 className="font-semibold text-lg">Sarah Mitchell</h1>
              <p className="text-sm text-indigo-300">Premium Member</p>
            </div>
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30">
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Info Card */}
        <div className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10">
          <div className="flex items-start gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center ring-4 ring-indigo-500/20 transition-all duration-300 group-hover:ring-indigo-500/40 group-hover:scale-105">
                <User className="w-12 h-12" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">
                {user?.fullName || "Sarah Mitchell"}
              </h2>
              <div className="flex items-center gap-2 text-slate-400 mb-3">
                <Mail className="w-4 h-4" />
                <span>{user?.email || "sarah.mitchell@email.com"}</span>
              </div>
              <p className="text-slate-300 leading-relaxed max-w-2xl">
                Passionate learner focused on AI and machine learning. Currently
                diving deep into advanced algorithms and data science to build
                intelligent systems that make a difference.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 group">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/80"></div>
            </div>
            <div className="text-3xl font-semibold mb-1">156</div>
            <div className="text-sm text-slate-400">Total Study Hours</div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10 group">
            <div className="flex items-center justify-between mb-3">
              <BookOpen className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50 group-hover:shadow-cyan-500/80"></div>
            </div>
            <div className="text-3xl font-semibold mb-1">8</div>
            <div className="text-sm text-slate-400">Completed Courses</div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 group">
            <div className="flex items-center justify-between mb-3">
              <Flame className="w-8 h-8 text-orange-400 group-hover:text-orange-300 transition-colors" />
              <div className="w-2 h-2 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50 group-hover:shadow-orange-500/80"></div>
            </div>
            <div className="text-3xl font-semibold mb-1">7</div>
            <div className="text-sm text-slate-400">Current Streak</div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/10 group">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 group-hover:shadow-emerald-500/80"></div>
            </div>
            <div className="text-3xl font-semibold mb-1">73%</div>
            <div className="text-sm text-slate-400">Overall Progress</div>
            <div className="mt-3 w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000 shadow-lg shadow-emerald-500/30"
                style={{ width: "73%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Learning Progress Section */}
        <div className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 hover:border-indigo-500/30 transition-all duration-500">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            Weekly Study Hours
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={studyData}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                opacity={0.3}
              />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  borderRadius: "12px",
                  backdropFilter: "blur(12px)",
                }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={{ fill: "#6366f1", strokeWidth: 2, r: 5 }}
                activeDot={{
                  r: 7,
                  fill: "#8b5cf6",
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Achievements Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h4 className="font-semibold mb-1">{achievement.title}</h4>
                  <p className="text-sm text-slate-400">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={activity.id}
                className="p-5 rounded-xl bg-slate-800/40 hover:bg-slate-800/60 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1 group-hover:text-indigo-300 transition-colors">
                      {activity.topic}
                    </h4>
                    <p className="text-sm text-slate-400">{activity.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-indigo-400">
                      {activity.progress}%
                    </div>
                  </div>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 shadow-md shadow-indigo-500/30"
                    style={{ width: `${activity.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
