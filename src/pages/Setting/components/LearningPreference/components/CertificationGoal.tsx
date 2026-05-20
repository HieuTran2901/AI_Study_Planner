import { BadgeCheck } from "lucide-react";
import type { UserPreferenceRequest } from "@/types/Request";

export const CertificationGoal = ({
  data,
  setFormData,
}: {
  data: UserPreferenceRequest;
  setFormData: React.Dispatch<
    React.SetStateAction<UserPreferenceRequest | null>
  >;
}) => {
  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10">
      <label className="flex items-center gap-4 cursor-pointer">
        <input
          type="checkbox"
          checked={data.certificationGoal || false}
          onChange={(e) =>
            setFormData((prev) => ({
              ...(prev ?? data),
              certificationGoal: e.target.checked,
            }))
          }
          className="w-5 h-5 accent-indigo-500"
        />

        <div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-indigo-400" />
            <h3 className="font-semibold">Certification Goal</h3>
          </div>

          <p className="text-sm text-slate-400 mt-1">
            I want to earn certifications while learning
          </p>
        </div>
      </label>
    </div>
  );
};
