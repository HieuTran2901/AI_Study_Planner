import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock3, TrendingUp } from "lucide-react";

const recentActivity = [
  { topic: "React Hooks", time: "2 hours ago", progress: 100 },
  { topic: "TypeScript Basics", time: "5 hours ago", progress: 75 },
  { topic: "CSS Grid Layout", time: "1 day ago", progress: 100 },
];

function RecentActivity() {
  return (
    <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl rounded-2xl">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-indigo-400" />
              Recent Activity
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Your latest learning progress
            </p>
          </div>

          <button className="text-sm text-indigo-400 hover:text-indigo-300 transition">
            View all
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {recentActivity.map((activity, index) => {
            const isDone = activity.progress === 100;

            return (
              <div
                key={index}
                className="group flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all"
              >
                {/* Icon */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                    isDone
                      ? "bg-green-500/10 text-green-400"
                      : "bg-indigo-500/10 text-indigo-400"
                  }`}
                >
                  {isDone ? <CheckCircle2 size={16} /> : <Clock3 size={16} />}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-white group-hover:text-indigo-200 transition">
                    {activity.topic}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>

                    {/* Progress bar */}
                    <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          isDone ? "bg-green-500" : "bg-indigo-500"
                        }`}
                        style={{ width: `${activity.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Progress % */}
                <div
                  className={`text-sm font-semibold ${
                    isDone ? "text-green-400" : "text-indigo-400"
                  }`}
                >
                  {activity.progress}%
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentActivity;
