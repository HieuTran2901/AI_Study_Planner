import { Target } from "lucide-react";
import type { UserPreferenceRequest } from "@/types/Request";

export const CareerTarget = ({
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
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-purple-400" />
        <h3 className="font-semibold">Career Target</h3>
      </div>

      <p className="text-sm text-slate-400">
        Your long-term learning objective
      </p>

      <input
        type="text"
        value={data.careerTarget || ""}
        onChange={(e) =>
          setFormData((prev) => ({
            ...(prev ?? data),
            careerTarget: e.target.value,
          }))
        }
        placeholder="e.g. Become Fullstack Developer"
        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10"
      />
    </div>
  );
};
