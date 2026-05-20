import { Target } from "lucide-react";
import type { UserPreferenceRequest } from "@/types/Request";
import { learningGoalOptions } from "@/constants";

export const LearningGoal = ({
  data,
  setFormData,
}: {
  data: UserPreferenceRequest;
  setFormData: React.Dispatch<
    React.SetStateAction<UserPreferenceRequest | null>
  >;
}) => {
  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Target className="w-5 h-5 text-purple-400" />
        <h3 className="font-semibold">Learning Goal</h3>
      </div>
      <p className="text-sm text-slate-400">
        What's your primary motivation for learning?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learningGoalOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFormData({ ...data, learningGoal: option.value })}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              data.learningGoal === option.value
                ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20"
                : "border-white/10 hover:border-white/20 bg-slate-800/40"
            }`}
          >
            <p className="font-medium mb-1">{option.label}</p>
            <p className="text-sm text-slate-400">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
