import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

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

function TodayTask() {
  return (
    <Card className="border-white/[0.08] bg-card/50 backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Today's Tasks</h3>
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
                  <p className="text-xs text-gray-500 mt-1">{task.subject}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default TodayTask;
