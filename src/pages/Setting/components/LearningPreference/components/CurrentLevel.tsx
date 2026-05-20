import { Brain } from "lucide-react";
import type { UserPreferenceRequest } from "@/types/Request";
import { LEARNING_LEVELS } from "@/types/Enums";

export const CurrentLevel = ({
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
        <Brain className="w-5 h-5 text-cyan-400" />
        <h3 className="font-semibold">Current Level</h3>
      </div>
      <p className="text-sm text-slate-400">
        How would you rate your current expertise?
      </p>

      <div className="grid grid-cols-3 gap-4">
        {LEARNING_LEVELS.map((level) => (
          <button
            key={level}
            onClick={() => setFormData({ ...data, currentLevel: level })}
            className={`px-6 py-4 rounded-xl border-2 transition-all capitalize font-medium ${
              data.currentLevel === level
                ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20 ring-4 ring-indigo-500/20"
                : "border-white/10 hover:border-white/20 bg-slate-800/40"
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};
