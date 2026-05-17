import type {
  LearningLevel,
  TargetTimeline,
  StudyTime,
  LearningStyle,
  PreferredLanguage,
} from "../Enums";

export interface UserPreferenceRequest {
  favoriteSubjects: string[];
  existingSkills: string[];

  currentLevel: LearningLevel;

  experienceYears: number;

  learningGoal: string;

  careerTarget: string;

  certificationGoal: boolean;

  targetTimeline: TargetTimeline;

  dailyStudyMinutes: number;

  weeklyStudyDays: number[];

  preferredStudyTimes: StudyTime[];

  learningStyle: LearningStyle;

  preferredLanguage: PreferredLanguage;

  preferredResourceTypes: string[];
}
