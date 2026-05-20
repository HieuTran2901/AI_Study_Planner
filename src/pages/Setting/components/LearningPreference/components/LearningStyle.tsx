import { Brain } from "lucide-react";
import type { UserPreferenceRequest } from "@/types/Request";
import { learningStyleOptions } from "@/constants";
import { usePreference } from "@/hooks";

export const LearningStyle = ({
  data,
  setFormData,
}: {
  data: UserPreferenceRequest;
  setFormData: React.Dispatch<
    React.SetStateAction<UserPreferenceRequest | null>
  >;
}) => {
  const { updatePreferences, isSaving: isUpdating } = usePreference();

  const handleSavePreferences = () => {
    updatePreferences(data);
    console.log(data);
  };

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Brain className="w-5 h-5 text-pink-400" />
        <h3 className="font-semibold">Learning Style</h3>
      </div>
      <p className="text-sm text-slate-400">How do you learn best?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learningStyleOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.value}
              onClick={() =>
                setFormData({
                  ...data,
                  learningStyle: option.value,
                })
              }
              className={`p-6 rounded-xl border-2 text-left transition-all group ${
                data.learningStyle === option.value
                  ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20"
                  : "border-white/10 hover:border-white/20 bg-slate-800/40"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <p className="font-medium mb-1">{option.label}</p>
              <p className="text-sm text-slate-400">{option.description}</p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSavePreferences}
          disabled={isUpdating}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg shadow-indigo-500/30 flex items-center gap-2"
        >
          {isUpdating && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {isUpdating ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </div>
  );
};
