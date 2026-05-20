import { BookText, Video } from "lucide-react";
import type { UserPreferenceRequest } from "@/types/Request";
import { resourceTypeOptions } from "@/constants";

export const PreferredResourceTypes = ({
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
        <BookText className="w-5 h-5 text-violet-400" />
        <h3 className="font-semibold">Preferred Resource Types</h3>
      </div>
      <p className="text-sm text-slate-400">
        What kind of learning materials do you prefer? (Select all that apply)
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {resourceTypeOptions.map((option) => {
          const Icon = option.icon || Video;
          return (
            <button
              key={option.value}
              onClick={() => {
                const current = data.preferredResourceTypes || [];
                const newTypes = current.includes(option.value)
                  ? current.filter((t) => t !== option.value)
                  : [...current, option.value];
                setFormData({ ...data, preferredResourceTypes: newTypes });
              }}
              className={`p-5 rounded-xl border-2 transition-all flex flex-col items-center text-center ${
                (data.preferredResourceTypes || []).includes(option.value)
                  ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20"
                  : "border-white/10 hover:border-white/20 bg-slate-800/40"
              }`}
            >
              <Icon
                className={`w-8 h-8 mx-auto mb-3 ${option.color || "text-white"}`}
              />
              <p className="font-medium text-sm">{option.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
