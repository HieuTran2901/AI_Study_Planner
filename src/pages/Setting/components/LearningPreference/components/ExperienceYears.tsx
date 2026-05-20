import { Award } from "lucide-react";
import type { UserPreferenceRequest } from "@/types/Request";

export const ExperienceYears = ({
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
        <Award className="w-5 h-5 text-orange-400" />
        <h3 className="font-semibold">Years of Experience</h3>
      </div>

      <p className="text-sm text-slate-400">
        How many years of experience do you already have?
      </p>

      <div className="space-y-4">
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={data.experienceYears ?? 0}
          onChange={(e) =>
            setFormData((prev) => ({
              ...(prev ?? data),
              experienceYears: Number(e.target.value),
            }))
          }
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-gradient-to-r
          [&::-webkit-slider-thumb]:from-orange-500
          [&::-webkit-slider-thumb]:to-amber-500
          [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:shadow-orange-500/50"
        />

        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">Beginner</div>

          <div className="text-center">
            <span className="text-3xl font-bold text-orange-400">
              {data.experienceYears ?? 0}
            </span>

            <span className="ml-2 text-slate-400">
              year
              {(data.experienceYears ?? 0) !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="text-sm text-slate-500">Expert</div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-800/40 border border-white/10">
        <p className="text-sm text-slate-400 leading-relaxed">
          This helps AI generate more accurate learning roadmaps, skip topics
          you may already know, and recommend content that matches your
          real-world experience.
        </p>
      </div>
    </div>
  );
};
