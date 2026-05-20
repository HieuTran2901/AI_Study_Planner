import { BookOpen, Plus, X } from "lucide-react";
import React, { useState } from "react";
import type { UserPreferenceRequest } from "@/types/Request";
import { suggestedSubjects } from "@/constants";

export const FavouriteSubject = ({
  data,
  setFormData,
}: {
  data: UserPreferenceRequest;
  setFormData: React.Dispatch<
    React.SetStateAction<UserPreferenceRequest | null>
  >;
}) => {
  const [subjectInput, setSubjectInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addSubject = (subject: string) => {
    if (subject && !data.favoriteSubjects.includes(subject)) {
      setFormData({
        ...data,
        favoriteSubjects: [...data.favoriteSubjects, subject],
      });
      setSubjectInput("");
      setShowSuggestions(false);
    }
  };

  const removeSubject = (subject: string) => {
    setFormData({
      ...data,
      favoriteSubjects: data.favoriteSubjects.filter((s) => s !== subject),
    });
  };

  const filteredSuggestions = suggestedSubjects.filter(
    (s) =>
      s.toLowerCase().includes(subjectInput.toLowerCase()) &&
      !data.favoriteSubjects.includes(s),
  );

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 space-y-4 relative z-30">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-5 h-5 text-indigo-400" />
        <h3 className="font-semibold">Favorite Subjects</h3>
      </div>
      <p className="text-sm text-slate-400">
        Add subjects you want to learn and focus on
      </p>

      <div className="flex flex-wrap gap-2">
        {data.favoriteSubjects.map((subject) => (
          <span
            key={subject}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-sm flex items-center gap-2 hover:border-indigo-500/50 transition-all group"
          >
            {subject}
            <button
              onClick={() => removeSubject(subject)}
              className="w-4 h-4 rounded-full hover:bg-red-500/20 flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3 text-slate-400 group-hover:text-red-400" />
            </button>
          </span>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          value={subjectInput}
          onChange={(e) => {
            setSubjectInput(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && subjectInput) {
              addSubject(subjectInput);
            }
          }}
          placeholder="Add subjects you want to learn..."
          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none"
        />
        <button
          onClick={() => addSubject(subjectInput)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>

        {showSuggestions &&
          subjectInput.trim().length > 0 &&
          filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl z-10 max-h-60 overflow-y-auto">
              {filteredSuggestions.slice(0, 8).map((subject) => (
                <button
                  key={subject}
                  onClick={() => addSubject(subject)}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-slate-800/60 transition-colors text-sm"
                >
                  {subject}
                </button>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};
