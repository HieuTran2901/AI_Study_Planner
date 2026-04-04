import {
  Clock,
  Target,
  Flame,
  TrendingUp,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const studyData = [
  { day: "Mon", hours: 4.5 },
  { day: "Tue", hours: 6.2 },
  { day: "Wed", hours: 3.8 },
  { day: "Thu", hours: 5.5 },
  { day: "Fri", hours: 7.0 },
  { day: "Sat", hours: 4.2 },
  { day: "Sun", hours: 2.5 },
];

const todayTasks = [
  {
    id: 1,
    title: "Complete React Hooks Tutorial",
    subject: "React Development",
    completed: true,
  },
  {
    id: 2,
    title: "Practice Algorithm Problems",
    subject: "Data Structures",
    completed: true,
  },
  {
    id: 3,
    title: "Read TypeScript Documentation",
    subject: "TypeScript",
    completed: false,
  },
  {
    id: 4,
    title: "Watch Design Patterns Video",
    subject: "Software Engineering",
    completed: false,
  },
];

const recentActivity = [
  { topic: "React Hooks", time: "2 hours ago", progress: 100 },
  { topic: "TypeScript Basics", time: "5 hours ago", progress: 75 },
  { topic: "CSS Grid Layout", time: "1 day ago", progress: 100 },
];

export default function Dashboard() {
  return (
    <div className="min-h-full p-8 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Welcome back, Alex
          </h1>
          <span className="text-2xl">🚀</span>
        </div>
        <p className="text-gray-400">
          Keep up the great work! You're making excellent progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Study Hours */}
        <Card className="relative overflow-hidden border-white/[0.08] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl group hover:shadow-xl hover:shadow-indigo-500/10 transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                <Clock className="text-white" size={24} />
              </div>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                +12%
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Total Study Hours</p>
              <p className="text-3xl font-bold text-white">142.5h</p>
              <p className="text-xs text-gray-500">This month</p>
            </div>
          </CardContent>
        </Card>

        {/* Completed Topics */}
        <Card className="relative overflow-hidden border-white/[0.08] bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl group hover:shadow-xl hover:shadow-purple-500/10 transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Target className="text-white" size={24} />
              </div>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                +8
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Completed Topics</p>
              <p className="text-3xl font-bold text-white">47</p>
              <p className="text-xs text-gray-500">Out of 60 planned</p>
            </div>
          </CardContent>
        </Card>

        {/* Current Streak */}
        <Card className="relative overflow-hidden border-white/[0.08] bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl group hover:shadow-xl hover:shadow-orange-500/10 transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Flame className="text-white" size={24} />
              </div>
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                🔥
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Current Streak</p>
              <p className="text-3xl font-bold text-white">28 days</p>
              <p className="text-xs text-gray-500">Keep it going!</p>
            </div>
          </CardContent>
        </Card>

        {/* Overall Progress */}
        <Card className="relative overflow-hidden border-white/[0.08] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl group hover:shadow-xl hover:shadow-cyan-500/10 transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <TrendingUp className="text-white" size={24} />
              </div>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                78%
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Overall Progress</p>
              <p className="text-3xl font-bold text-white">78%</p>
              <Progress value={78} className="mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Learning Progress Chart */}
        <Card className="lg:col-span-2 border-white/[0.08] bg-card/50 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Weekly Study Time
                </h3>
                <p className="text-sm text-gray-400">
                  Your learning activity this week
                </p>
              </div>
              <Badge className="bg-white/[0.05] text-gray-300 border-white/[0.08]">
                Last 7 days
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={studyData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis dataKey="day" stroke="#71717a" />
                <YAxis stroke="#71717a" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: "#6366f1", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  fill="url(#colorHours)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card className="border-white/[0.08] bg-card/50 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Today's Tasks
                </h3>
                <p className="text-sm text-gray-400">2 of 4 completed</p>
              </div>
              <div className="text-2xl">📝</div>
            </div>
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg border transition-all ${
                    task.completed
                      ? "bg-white/[0.02] border-white/[0.05] opacity-60"
                      : "bg-white/[0.05] border-white/[0.08] hover:border-indigo-500/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center ${
                        task.completed
                          ? "bg-indigo-500 border-indigo-500"
                          : "border-gray-600 hover:border-indigo-500"
                      }`}
                    >
                      {task.completed && (
                        <CheckCircle2 size={14} className="text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          task.completed
                            ? "line-through text-gray-500"
                            : "text-white"
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {task.subject}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Suggestions */}
        <Card className="border-white/[0.08] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/30 to-transparent rounded-full blur-3xl" />
          <CardContent className="p-6 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  AI Recommendation
                </h3>
                <p className="text-xs text-gray-400">Suggested for you</p>
              </div>
            </div>
            <div className="bg-white/[0.05] rounded-lg p-4 border border-white/[0.08]">
              <p className="text-sm text-gray-300 mb-3">
                Based on your progress, I recommend focusing on{" "}
                <span className="text-indigo-400 font-semibold">
                  Advanced React Patterns
                </span>{" "}
                next. This will complement your recent work on React Hooks.
              </p>
              <button className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2">
                Start Learning
                <ChevronRight size={16} />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-white/[0.08] bg-card/50 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Recent Activity
                </h3>
                <p className="text-sm text-gray-400">Your latest completions</p>
              </div>
              <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {activity.topic}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <div className="text-sm font-medium text-indigo-400">
                    {activity.progress}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
