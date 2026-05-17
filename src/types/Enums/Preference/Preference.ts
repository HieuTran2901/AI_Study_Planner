import {
  BookOpen,
  Target,
  Eye,
  Headphones,
  FileText,
  Activity,
  Sun,
  Sunset,
  Moon,
  CloudMoon,
} from "lucide-react";

import type { LearningLevel, LearningStyle, StudyTime } from "../Preference";
// ================= SUBJECTS =================

export const SUGGESTED_SUBJECTS = [
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

// ================= GOALS =================

export const LEARNING_GOAL_OPTIONS = [
  {
    value: "GET_JOB",
    label: "Get a Job",
    description: "Land your dream role",
    icon: Target,
  },
  {
    value: "IMPROVE_ENGLISH",
    label: "Improve English",
    description: "Master communication",
    icon: BookOpen,
  },
  {
    value: "PREPARE_EXAM",
    label: "Prepare for Exam",
    description: "Ace your certifications",
    icon: Target,
  },
  {
    value: "LEARN_SKILL",
    label: "Learn New Skill",
    description: "Expand your knowledge",
    icon: BookOpen,
  },
];

// ================= LEARNING STYLES =================

export const LEARNING_STYLE_OPTIONS: {
  value: LearningStyle;
  label: string;
  description: string;
  icon: any;
  color: string;
}[] = [
  {
    value: "VISUAL",
    label: "Visual",
    description: "Videos, diagrams",
    icon: Eye,
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: "AUDITORY",
    label: "Auditory",
    description: "Audio & podcasts",
    icon: Headphones,
    color: "from-purple-500 to-pink-500",
  },
  {
    value: "READ_WRITE",
    label: "Reading/Writing",
    description: "Text-based learning",
    icon: FileText,
    color: "from-emerald-500 to-teal-500",
  },
  {
    value: "KINESTHETIC",
    label: "Kinesthetic",
    description: "Practice & exercises",
    icon: Activity,
    color: "from-orange-500 to-red-500",
  },
];

// ================= STUDY TIMES =================

export const STUDY_TIME_OPTIONS: {
  value: StudyTime;
  label: string;
  time: string;
  icon: any;
  color: string;
}[] = [
  {
    value: "MORNING",
    label: "Morning",
    time: "6AM - 12PM",
    icon: Sun,
    color: "text-yellow-400",
  },
  {
    value: "AFTERNOON",
    label: "Afternoon",
    time: "12PM - 6PM",
    icon: Sunset,
    color: "text-orange-400",
  },
  {
    value: "EVENING",
    label: "Evening",
    time: "6PM - 10PM",
    icon: Moon,
    color: "text-indigo-400",
  },
  {
    value: "NIGHT",
    label: "Night",
    time: "10PM - 2AM",
    icon: CloudMoon,
    color: "text-purple-400",
  },
];

// ================= WEEK DAYS =================

export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
