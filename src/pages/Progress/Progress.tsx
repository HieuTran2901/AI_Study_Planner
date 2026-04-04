import {
  Clock,
  Target,
  Flame,
  TrendingUp,
  Calendar,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const weeklyData = [
  { day: "Mon", hours: 4.5, sessions: 9 },
  { day: "Tue", hours: 6.2, sessions: 12 },
  { day: "Wed", hours: 3.8, sessions: 7 },
  { day: "Thu", hours: 5.5, sessions: 11 },
  { day: "Fri", hours: 7.0, sessions: 14 },
  { day: "Sat", hours: 4.2, sessions: 8 },
  { day: "Sun", hours: 2.5, sessions: 5 },
];

const monthlyData = [
  { week: "Week 1", hours: 28 },
  { week: "Week 2", hours: 32 },
  { week: "Week 3", hours: 25 },
  { week: "Week 4", hours: 35 },
];

const subjectDistribution = [
  { name: "React", value: 35, color: "#6366f1" },
  { name: "TypeScript", value: 25, color: "#8b5cf6" },
  { name: "CSS", value: 20, color: "#06b6d4" },
  { name: "Node.js", value: 15, color: "#10b981" },
  { name: "Testing", value: 5, color: "#f59e0b" },
];

const achievements = [
  {
    id: 1,
    title: "7-Day Streak",
    icon: "🔥",
    unlocked: true,
    date: "Unlocked 2 days ago",
  },
  {
    id: 2,
    title: "100 Hours",
    icon: "⏰",
    unlocked: true,
    date: "Unlocked 1 week ago",
  },
  {
    id: 3,
    title: "Early Bird",
    icon: "🌅",
    unlocked: true,
    date: "Unlocked 3 days ago",
  },
  {
    id: 4,
    title: "Night Owl",
    icon: "🦉",
    unlocked: false,
    date: "Study after 10 PM for 5 days",
  },
  {
    id: 5,
    title: "Marathon",
    icon: "🏃",
    unlocked: false,
    date: "Complete 10 hours in one day",
  },
  {
    id: 6,
    title: "Consistent",
    icon: "📅",
    unlocked: false,
    date: "30-day streak",
  },
];

export default function StudyProgress() {
  return (
    <div className="min-h-full p-8 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
          Your Progress
        </h1>
        <p className="text-gray-400">
          Track your learning journey and achievements
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-white/[0.08] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Clock className="text-white" size={24} />
              </div>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                This Week
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Study Hours</p>
              <p className="text-3xl font-bold text-white">33.7h</p>
              <p className="text-xs text-gray-500 mt-1">+15% from last week</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/[0.08] bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl relative overflow-hidden group">
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
            <div>
              <p className="text-sm text-gray-400 mb-1">Current Streak</p>
              <p className="text-3xl font-bold text-white">28 days</p>
              <p className="text-xs text-gray-500 mt-1">Personal best!</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/[0.08] bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Target className="text-white" size={24} />
              </div>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                78%
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Completion Rate</p>
              <p className="text-3xl font-bold text-white">78%</p>
              <Progress value={78} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/[0.08] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <TrendingUp className="text-white" size={24} />
              </div>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                +8
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Topics Completed</p>
              <p className="text-3xl font-bold text-white">47</p>
              <p className="text-xs text-gray-500 mt-1">Out of 60 planned</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Weekly Activity */}
        <Card className="lg:col-span-2 border-white/[0.08] bg-card/50 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Weekly Activity
                </h3>
                <p className="text-sm text-gray-400">
                  Daily study hours and sessions
                </p>
              </div>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="text-gray-400">Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="text-gray-400">Sessions</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorSessions"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
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
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#colorHours)"
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#colorSessions)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Distribution */}
        <Card className="border-white/[0.08] bg-card/50 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white">
                Subject Distribution
              </h3>
              <p className="text-sm text-gray-400">Time spent per subject</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={subjectDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {subjectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {subjectDistribution.map((subject) => (
                <div
                  key={subject.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="text-gray-300">{subject.name}</span>
                  </div>
                  <span className="text-gray-400">{subject.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card className="border-white/[0.08] bg-card/50 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white">
                Monthly Trend
              </h3>
              <p className="text-sm text-gray-400">Study hours per week</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis dataKey="week" stroke="#71717a" />
                <YAxis stroke="#71717a" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="hours" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="border-white/[0.08] bg-card/50 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Award size={20} className="text-indigo-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Achievements
                </h3>
                <p className="text-sm text-gray-400">3 of 6 unlocked</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    achievement.unlocked
                      ? "border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                      : "border-white/[0.08] bg-white/[0.02] opacity-50"
                  }`}
                  title={achievement.date}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <p className="text-xs font-medium text-white">
                    {achievement.title}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
