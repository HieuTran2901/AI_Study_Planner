import { BookOpen, Target } from "lucide-react";
import { Plus, X, Calendar, Clock, Brain } from "lucide-react";
import { useState, useEffect } from "react";
import { usePreference } from "@/hooks";
import { DEFAULT_PREFERENCES, LEARNING_LEVELS, StudyTime } from "@/types/Enums";
import type { UserPreferenceRequest } from "@/types/Request";
import {
  suggestedSubjects,
  learningGoalOptions,
  studyTimeOptions,
  learningStyleOptions,
  weekDays,
} from "@/constants";

function LearningPreference() {
  const [subjectInput, setSubjectInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formData, setFormData] = useState<UserPreferenceRequest | null>(null);

  const {
    preferences,
    fetchPreferences,
    updatePreferences,
    isFetching,
    isSaving: isUpdating,
    error,
  } = usePreference();

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  const data = formData ?? preferences ?? DEFAULT_PREFERENCES;

  // const [preferences, setPreferences] = useState({
  //   favoriteSubjects: ["JavaScript", "React", "Python"],
  //   learningGoal: "skill",
  //   currentLevel: "intermediate",
  //   dailyStudyMinutes: 120,
  //   weeklyStudyDays: [0, 1, 2, 3, 4], // Mon-Fri
  //   preferredStudyTimes: ["morning", "evening"],
  //   learningStyle: "visual",
  // });

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

  const toggleWeekDay = (index: number) => {
    const newDays = data.weeklyStudyDays.includes(index)
      ? data.weeklyStudyDays.filter((d) => d !== index)
      : [...data.weeklyStudyDays, index].sort();
    setFormData({ ...data, weeklyStudyDays: newDays });
  };

  const toggleStudyTime = (time: StudyTime) => {
    const newTimes = data.preferredStudyTimes.includes(time)
      ? data.preferredStudyTimes.filter((t) => t !== time)
      : [...data.preferredStudyTimes, time];
    setFormData({ ...data, preferredStudyTimes: newTimes });
  };

  const filteredSuggestions = suggestedSubjects.filter(
    (s) =>
      s.toLowerCase().includes(subjectInput.toLowerCase()) &&
      !data.favoriteSubjects.includes(s),
  );

  const handleSavePreferences = () => {
    updatePreferences(formData!);
  };

  if (isFetching && !formData) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-slate-400">Loading preferences...</div>
      </div>
    );
  }
  return (
    <div className="space-y-6 pb-24">
      {/* <div>
        <h2 className="text-2xl font-semibold mb-2">Learning Preferences</h2>
        <p className="text-slate-400">
          Customize your learning experience to match your goals and style
        </p>
      </div> */}

      {/* Favorite Subjects */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 space-y-4 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <h3 className="font-semibold">Favorite Subjects</h3>
        </div>
        <p className="text-sm text-slate-400">
          Add subjects you want to learn and focus on
        </p>

        {/* Selected Subjects */}
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

        {/* Input */}
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

          {/* Suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
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

      {/* Learning Goal */}
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
              onClick={() =>
                setFormData({ ...data, learningGoal: option.value })
              }
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

      {/* Current Level */}
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

      {/* Study Plan Settings */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold">Study Plan Settings</h3>
        </div>

        {/* Daily Study Minutes */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-3 text-slate-300">
            <Clock className="w-4 h-4 text-indigo-400" />
            Daily Study Time
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="30"
              max="480"
              step="15"
              value={data.dailyStudyMinutes}
              onChange={(e) =>
                setFormData({
                  ...data,
                  dailyStudyMinutes: Number(e.target.value),
                })
              }
              className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-indigo-500 [&::-webkit-slider-thumb]:to-purple-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-indigo-500/50"
            />
            <div className="min-w-[7rem] text-right">
              <span className="text-2xl font-semibold text-indigo-400">
                {data.dailyStudyMinutes}
              </span>
              <span className="text-sm text-slate-400 ml-1">min/day</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            That's {Math.floor(data.dailyStudyMinutes / 60)} hour
            {Math.floor(data.dailyStudyMinutes / 60) !== 1 ? "s" : ""}
            {data.dailyStudyMinutes % 60 > 0 &&
              ` ${data.dailyStudyMinutes % 60} minutes`}{" "}
            per day
          </p>
        </div>

        {/* Weekly Study Days */}
        <div>
          <label className="text-sm font-medium mb-3 block text-slate-300">
            Weekly Study Days
          </label>
          <div className="flex gap-3">
            {weekDays.map((day, index) => (
              <button
                key={day}
                onClick={() => toggleWeekDay(index)}
                className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                  data.weeklyStudyDays.includes(index)
                    ? "border-indigo-500 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30"
                    : "border-white/10 hover:border-white/20 bg-slate-800/40"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {data.weeklyStudyDays.length} day
            {data.weeklyStudyDays.length !== 1 ? "s" : ""} per week selected
          </p>
        </div>
      </div>

      {/* Preferred Study Times */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-yellow-400" />
          <h3 className="font-semibold">Preferred Study Times</h3>
        </div>
        <p className="text-sm text-slate-400">
          When do you prefer to study? (Select all that apply)
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {studyTimeOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => toggleStudyTime(option.value)}
                className={`p-5 rounded-xl border-2 transition-all ${
                  data.preferredStudyTimes.includes(option.value)
                    ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20"
                    : "border-white/10 hover:border-white/20 bg-slate-800/40"
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${option.color}`} />
                <p className="font-medium text-sm mb-1">{option.label}</p>
                <p className="text-xs text-slate-400">{option.time}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Learning Style */}
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
        <div className="flex justify-end bottom-0 pt-4">
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
    </div>
  );
}

export default LearningPreference;
