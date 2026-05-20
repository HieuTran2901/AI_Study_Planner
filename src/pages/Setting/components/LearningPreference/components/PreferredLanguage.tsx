import { Globe } from "lucide-react";
import type { UserPreferenceRequest } from "@/types/Request";
import { preferredLanguageOptions } from "@/constants";

export const PreferredLanguage = ({
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
        <Globe className="w-5 h-5 text-sky-400" />
        <h3 className="font-semibold">Preferred Language</h3>
      </div>
      <p className="text-sm text-slate-400">
        In which language do you prefer to learn?
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {preferredLanguageOptions.map((option) => (
          <button
            key={option.value}
            onClick={() =>
              setFormData({ ...data, preferredLanguage: option.value })
            }
            className={`p-4 rounded-xl border-2 text-center transition-all font-medium ${
              data.preferredLanguage === option.value
                ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20"
                : "border-white/10 hover:border-white/20 bg-slate-800/40"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
