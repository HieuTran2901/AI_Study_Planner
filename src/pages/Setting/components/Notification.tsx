import * as Switch from "@radix-ui/react-switch";
import { Bell } from "lucide-react";
import { useState } from "react";

function Notification() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    studyReminders: true,
    weeklyReports: true,
    deadlineAlerts: true,
    aiRecommendations: false,
  });
  return (
    <div className="space-y-6">
      {/* <div>
        <h2 className="text-2xl font-semibold mb-2">Notifications</h2>
        <p className="text-slate-400">
          Manage how and when you receive updates and alerts
        </p>
      </div> */}

      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 space-y-4">
        {[
          {
            key: "email" as const,
            title: "Email Notifications",
            description: "Receive updates via email",
          },
          {
            key: "push" as const,
            title: "Push Notifications",
            description: "Browser and mobile push notifications",
          },
          {
            key: "studyReminders" as const,
            title: "Study Reminders",
            description: "Get notified when it's time to study",
          },
          {
            key: "weeklyReports" as const,
            title: "Weekly Progress Reports",
            description: "Summary of your weekly achievements",
          },
          {
            key: "deadlineAlerts" as const,
            title: "Deadline Alerts",
            description: "Reminders for upcoming deadlines",
          },
          {
            key: "aiRecommendations" as const,
            title: "AI Recommendations",
            description: "Personalized study suggestions from AI",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/60 border border-white/5 hover:border-indigo-500/20 transition-all group"
          >
            <div>
              <p className="font-medium group-hover:text-indigo-300 transition-colors">
                {item.title}
              </p>
              <p className="text-sm text-slate-400">{item.description}</p>
            </div>
            <Switch.Root
              checked={notifications[item.key]}
              onCheckedChange={(checked) =>
                setNotifications({
                  ...notifications,
                  [item.key]: checked,
                })
              }
              className="w-11 h-6 bg-slate-700 rounded-full relative data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-600 data-[state=checked]:to-purple-600 transition-all outline-none cursor-pointer"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-300 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
          </div>
        ))}

        <div className="mt-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-indigo-300">
                Notification Frequency
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Choose when to receive notifications
              </p>
              <select className="mt-3 px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm">
                <option>Instant</option>
                <option>Daily Digest</option>
                <option>Weekly Summary</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
