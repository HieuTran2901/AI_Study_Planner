import { BookOpen, Target } from "lucide-react";
import {
  Plus,
  X,
  Calendar,
  Clock,
  Brain,
  Headphones,
  Eye,
  FileText,
  Activity,
  Sun,
  Sunset,
  Moon,
  CloudMoon,
} from "lucide-react";
import { useState } from "react";

const suggestedSubjects = [
  "JavaScript",
  "Python",
  "React",
  "Java",
  "English",
  "Mathematics",
  "Data Science",
  "Machine Learning",
  "Web Development",
  "UI/UX Design",
  "Spanish",
  "German",
  "Business",
  "Marketing",
  "Photography",
];

const learningGoalOptions = [
  {
    value: "job",
    label: "Get a Job",
    description: "Land your dream role with focused preparation",
  },
  {
    value: "english",
    label: "Improve English",
    description: "Master communication and fluency",
  },
  {
    value: "exam",
    label: "Prepare for Exam",
    description: "Ace your upcoming tests and certifications",
  },
  {
    value: "skill",
    label: "Learn New Skill",
    description: "Expand your knowledge and capabilities",
  },
];

const learningStyleOptions = [
  {
    value: "visual",
    label: "Visual",
    description: "Diagrams, videos, infographics",
    icon: Eye,
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: "auditory",
    label: "Auditory",
    description: "Audio explanations, podcasts",
    icon: Headphones,
    color: "from-purple-500 to-pink-500",
  },
  {
    value: "reading",
    label: "Reading/Writing",
    description: "Text-based content, articles",
    icon: FileText,
    color: "from-emerald-500 to-teal-500",
  },
  {
    value: "kinesthetic",
    label: "Kinesthetic",
    description: "Practice, exercises, hands-on",
    icon: Activity,
    color: "from-orange-500 to-red-500",
  },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const studyTimeOptions = [
  {
    value: "morning",
    label: "Morning",
    icon: Sun,
    time: "6AM - 12PM",
    color: "text-yellow-400",
  },
  {
    value: "afternoon",
    label: "Afternoon",
    icon: Sunset,
    time: "12PM - 6PM",
    color: "text-orange-400",
  },
  {
    value: "evening",
    label: "Evening",
    icon: Moon,
    time: "6PM - 10PM",
    color: "text-indigo-400",
  },
  {
    value: "night",
    label: "Night",
    icon: CloudMoon,
    time: "10PM - 2AM",
    color: "text-purple-400",
  },
];

function LearningPreference() {
  const [subjectInput, setSubjectInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [preferences, setPreferences] = useState({
    favoriteSubjects: ["JavaScript", "React", "Python"],
    learningGoal: "skill",
    currentLevel: "intermediate",
    dailyStudyMinutes: 120,
    weeklyStudyDays: [0, 1, 2, 3, 4], // Mon-Fri
    preferredStudyTimes: ["morning", "evening"],
    learningStyle: "visual",
  });

  const addSubject = (subject: string) => {
    if (subject && !preferences.favoriteSubjects.includes(subject)) {
      setPreferences({
        ...preferences,
        favoriteSubjects: [...preferences.favoriteSubjects, subject],
      });
      setSubjectInput("");
      setShowSuggestions(false);
    }
  };

  const removeSubject = (subject: string) => {
    setPreferences({
      ...preferences,
      favoriteSubjects: preferences.favoriteSubjects.filter(
        (s) => s !== subject,
      ),
    });
  };

  const toggleWeekDay = (index: number) => {
    const newDays = preferences.weeklyStudyDays.includes(index)
      ? preferences.weeklyStudyDays.filter((d) => d !== index)
      : [...preferences.weeklyStudyDays, index].sort();
    setPreferences({ ...preferences, weeklyStudyDays: newDays });
  };

  const toggleStudyTime = (time: string) => {
    const newTimes = preferences.preferredStudyTimes.includes(time)
      ? preferences.preferredStudyTimes.filter((t) => t !== time)
      : [...preferences.preferredStudyTimes, time];
    setPreferences({ ...preferences, preferredStudyTimes: newTimes });
  };

  const filteredSuggestions = suggestedSubjects.filter(
    (s) =>
      s.toLowerCase().includes(subjectInput.toLowerCase()) &&
      !preferences.favoriteSubjects.includes(s),
  );
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
          {preferences.favoriteSubjects.map((subject) => (
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
                setPreferences({ ...preferences, learningGoal: option.value })
              }
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                preferences.learningGoal === option.value
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
          {["beginner", "intermediate", "advanced"].map((level) => (
            <button
              key={level}
              onClick={() =>
                setPreferences({ ...preferences, currentLevel: level })
              }
              className={`px-6 py-4 rounded-xl border-2 transition-all capitalize font-medium ${
                preferences.currentLevel === level
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
              value={preferences.dailyStudyMinutes}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  dailyStudyMinutes: Number(e.target.value),
                })
              }
              className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-indigo-500 [&::-webkit-slider-thumb]:to-purple-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-indigo-500/50"
            />
            <div className="min-w-[7rem] text-right">
              <span className="text-2xl font-semibold text-indigo-400">
                {preferences.dailyStudyMinutes}
              </span>
              <span className="text-sm text-slate-400 ml-1">min/day</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            That's {Math.floor(preferences.dailyStudyMinutes / 60)} hour
            {Math.floor(preferences.dailyStudyMinutes / 60) !== 1 ? "s" : ""}
            {preferences.dailyStudyMinutes % 60 > 0 &&
              ` ${preferences.dailyStudyMinutes % 60} minutes`}{" "}
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
                  preferences.weeklyStudyDays.includes(index)
                    ? "border-indigo-500 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30"
                    : "border-white/10 hover:border-white/20 bg-slate-800/40"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {preferences.weeklyStudyDays.length} day
            {preferences.weeklyStudyDays.length !== 1 ? "s" : ""} per week
            selected
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
                  preferences.preferredStudyTimes.includes(option.value)
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
                  setPreferences({
                    ...preferences,
                    learningStyle: option.value,
                  })
                }
                className={`p-6 rounded-xl border-2 text-left transition-all group ${
                  preferences.learningStyle === option.value
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
      </div>
    </div>
  );
}

export default LearningPreference;
