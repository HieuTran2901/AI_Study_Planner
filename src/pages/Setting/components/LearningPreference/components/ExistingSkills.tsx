import { Lightbulb, Plus, X } from "lucide-react";
import { useState } from "react";
import type { UserPreferenceRequest } from "@/types/Request";
import { suggestedSubjects } from "@/constants";

export const ExistingSkills = ({
  data,
  setFormData,
}: {
  data: UserPreferenceRequest;
  setFormData: React.Dispatch<
    React.SetStateAction<UserPreferenceRequest | null>
  >;
}) => {
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addSkill = (skill: string) => {
    if (skill && !(data.existingSkills || []).includes(skill)) {
      setFormData((prev) => ({
        ...(prev ?? data),
        existingSkills: [...(data.existingSkills || []), skill],
      }));

      setSkillInput("");
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...(prev ?? data),
      existingSkills: data.existingSkills?.filter((s) => s !== skill) || [],
    }));
  };

  const filteredSuggestions = suggestedSubjects.filter(
    (s) =>
      s.toLowerCase().includes(skillInput.toLowerCase()) &&
      !(data.existingSkills || []).includes(s),
  );

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 space-y-4 relative z-20">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-amber-400" />
        <h3 className="font-semibold">Existing Skills</h3>
      </div>

      <p className="text-sm text-slate-400">Skills you already possess</p>

      <div className="flex flex-wrap gap-2">
        {(data.existingSkills || []).map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-sm"
          >
            {skill}

            <button onClick={() => removeSkill(skill)}>
              <X className="w-3 h-3 text-slate-400 hover:text-red-400" />
            </button>
          </span>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => {
            setSkillInput(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Add your skills..."
          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10"
        />

        <button
          onClick={() => addSkill(skillInput)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-amber-500"
        >
          <Plus className="w-4 h-4" />
        </button>

        {showSuggestions &&
          skillInput.trim().length > 0 &&
          filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-xl bg-slate-900 border border-white/10 z-20">
              {filteredSuggestions.slice(0, 8).map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-800"
                >
                  {skill}
                </button>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};
