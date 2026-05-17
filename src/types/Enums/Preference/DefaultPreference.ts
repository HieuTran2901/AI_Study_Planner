import type { UserPreferenceRequest } from "@/types/Request";

export const DEFAULT_PREFERENCES: UserPreferenceRequest = {
  favoriteSubjects: [],
  existingSkills: [],

  currentLevel: "BEGINNER",

  experienceYears: 0,

  learningGoal: "",

  careerTarget: "",

  certificationGoal: false,

  targetTimeline: "THREE_MONTHS",

  dailyStudyMinutes: 60,

  weeklyStudyDays: [1, 2, 3, 4, 5],

  preferredStudyTimes: ["EVENING"],

  learningStyle: "VISUAL",

  preferredLanguage: "ENGLISH",

  preferredResourceTypes: [],
};
