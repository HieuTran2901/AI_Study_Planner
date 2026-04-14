import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";

const studyData = [
  { day: "Mon", hours: 4.5 },
  { day: "Tue", hours: 6.2 },
  { day: "Wed", hours: 3.8 },
  { day: "Thu", hours: 5.5 },
  { day: "Fri", hours: 7.0 },
  { day: "Sat", hours: 4.2 },
  { day: "Sun", hours: 2.5 },
];

function LearningProgress() {
  return (
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
  );
}

export default LearningProgress;
