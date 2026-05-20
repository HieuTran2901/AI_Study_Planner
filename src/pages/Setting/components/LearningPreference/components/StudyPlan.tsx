import { Calendar, Clock } from "lucide-react";
import type { UserPreferenceRequest } from "@/types/Request";
import { weekDays } from "@/constants";

export const StudyPlan = ({
  data,
  setFormData,
}: {
  data: UserPreferenceRequest;
  setFormData: React.Dispatch<
    React.SetStateAction<UserPreferenceRequest | null>
  >;
}) => {
  const toggleWeekDay = (index: number) => {
    const newDays = data.weeklyStudyDays.includes(index)
      ? data.weeklyStudyDays.filter((d) => d !== index)
      : [...data.weeklyStudyDays, index].sort();
    setFormData({ ...data, weeklyStudyDays: newDays });
  };

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-5 h-5 text-emerald-400" />
        <h3 className="font-semibold">Study Plan Settings</h3>
      </div>

      {/* Daily Study Minutes */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-3 text-slate-300">
          <Clock className="w-4 h-4 text-indigo-400" />
          Daily Study Time
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="30"
            max="480"
            step="15"
            value={data.dailyStudyMinutes}
            onChange={(e) =>
              setFormData({
                ...data,
                dailyStudyMinutes: Number(e.target.value),
              })
            }
            className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-indigo-500 [&::-webkit-slider-thumb]:to-purple-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-indigo-500/50"
          />
          <div className="min-w-[7rem] text-right">
            <span className="text-2xl font-semibold text-indigo-400">
              {data.dailyStudyMinutes}
            </span>
            <span className="text-sm text-slate-400 ml-1">min/day</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          That's {Math.floor(data.dailyStudyMinutes / 60)} hour
          {Math.floor(data.dailyStudyMinutes / 60) !== 1 ? "s" : ""}
          {data.dailyStudyMinutes % 60 > 0 &&
            ` ${data.dailyStudyMinutes % 60} minutes`}{" "}
          per day
        </p>
      </div>

      {/* Weekly Study Days */}
      <div>
        <label className="text-sm font-medium mb-3 block text-slate-300">
          Weekly Study Days
        </label>
        <div className="flex gap-3">
          {weekDays.map((day, index) => (
            <button
              key={day}
              onClick={() => toggleWeekDay(index)}
              className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                data.weeklyStudyDays.includes(index)
                  ? "border-indigo-500 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30"
                  : "border-white/10 hover:border-white/20 bg-slate-800/40"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {data.weeklyStudyDays.length} day
          {data.weeklyStudyDays.length !== 1 ? "s" : ""} per week selected
        </p>
      </div>
    </div>
  );
};
