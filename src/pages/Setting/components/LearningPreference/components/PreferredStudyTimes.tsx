import { Clock } from "lucide-react";
import type { UserPreferenceRequest } from "@/types/Request";
import { StudyTime } from "@/types/Enums";
import { studyTimeOptions } from "@/constants";

export const PreferredStudyTimes = ({
  data,
  setFormData,
}: {
  data: UserPreferenceRequest;
  setFormData: React.Dispatch<
    React.SetStateAction<UserPreferenceRequest | null>
  >;
}) => {
  const toggleStudyTime = (time: StudyTime) => {
    const newTimes = data.preferredStudyTimes.includes(time)
      ? data.preferredStudyTimes.filter((t) => t !== time)
      : [...data.preferredStudyTimes, time];
    setFormData({ ...data, preferredStudyTimes: newTimes });
  };

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-5 h-5 text-yellow-400" />
        <h3 className="font-semibold">Preferred Study Times</h3>
      </div>
      <p className="text-sm text-slate-400">
        When do you prefer to study? (Select all that apply)
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {studyTimeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.value}
              onClick={() => toggleStudyTime(option.value)}
              className={`p-5 rounded-xl border-2 transition-all ${
                data.preferredStudyTimes.includes(option.value)
                  ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20"
                  : "border-white/10 hover:border-white/20 bg-slate-800/40"
              }`}
            >
              <Icon className={`w-8 h-8 mx-auto mb-2 ${option.color}`} />
              <p className="font-medium text-sm mb-1">{option.label}</p>
              <p className="text-xs text-slate-400">{option.time}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
