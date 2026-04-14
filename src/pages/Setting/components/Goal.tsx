import { useState } from "react";
import { Clock, Target, Sun, Save } from "lucide-react";
import * as Switch from "@radix-ui/react-switch";

function Goal() {
  const [goalSettings, setGoalSettings] = useState({
    dailyHours: 2,
    weeklyGoal: 15,
    studyTime: "morning",
    streakTracking: true,
    focusDuration: 25,
  });
  return (
    <div className="space-y-6">
      {/* <div>
        <h2 className="text-2xl font-semibold mb-2">Learning Goals</h2>
        <p className="text-slate-400">
          Set your study targets and preferences to optimize your learning
          journey
        </p>
      </div> */}

      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3 text-slate-300">
              <Clock className="w-4 h-4 text-indigo-400" />
              Daily Study Hours
            </label>
            <input
              type="number"
              min="0"
              max="24"
              value={goalSettings.dailyHours}
              onChange={(e) =>
                setGoalSettings({
                  ...goalSettings,
                  dailyHours: Number(e.target.value),
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none"
            />
            <p className="text-xs text-slate-500 mt-2">
              Recommended: 2-4 hours per day
            </p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3 text-slate-300">
              <Target className="w-4 h-4 text-purple-400" />
              Weekly Goal (hours)
            </label>
            <input
              type="number"
              min="0"
              max="168"
              value={goalSettings.weeklyGoal}
              onChange={(e) =>
                setGoalSettings({
                  ...goalSettings,
                  weeklyGoal: Number(e.target.value),
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none"
            />
            <p className="text-xs text-slate-500 mt-2">
              Current progress: 12/15 hours
            </p>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-3 text-slate-300">
            <Sun className="w-4 h-4 text-cyan-400" />
            Preferred Study Time
          </label>
          <select
            value={goalSettings.studyTime}
            onChange={(e) =>
              setGoalSettings({
                ...goalSettings,
                studyTime: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none"
          >
            <option value="morning">Morning (6AM - 12PM)</option>
            <option value="afternoon">Afternoon (12PM - 6PM)</option>
            <option value="evening">Evening (6PM - 10PM)</option>
            <option value="night">Night (10PM - 2AM)</option>
          </select>
          <p className="text-xs text-slate-500 mt-2">
            AI will schedule study sessions during this time
          </p>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-white/5">
          <div>
            <p className="font-medium">Study Streak Tracking</p>
            <p className="text-sm text-slate-400">
              Track consecutive days of studying
            </p>
          </div>
          <Switch.Root
            checked={goalSettings.streakTracking}
            onCheckedChange={(checked) =>
              setGoalSettings({
                ...goalSettings,
                streakTracking: checked,
              })
            }
            className="w-11 h-6 bg-slate-700 rounded-full relative data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-600 data-[state=checked]:to-purple-600 transition-all outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-300 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-3 text-slate-300">
            Focus Mode Duration (minutes)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="15"
              max="90"
              step="5"
              value={goalSettings.focusDuration}
              onChange={(e) =>
                setGoalSettings({
                  ...goalSettings,
                  focusDuration: Number(e.target.value),
                })
              }
              className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-indigo-500 [&::-webkit-slider-thumb]:to-purple-500"
            />
            <span className="text-lg font-semibold text-indigo-400 min-w-[4rem] text-right">
              {goalSettings.focusDuration} min
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Pomodoro-style focused study sessions
          </p>
        </div>

        <button className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/30 font-medium">
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Goal;
