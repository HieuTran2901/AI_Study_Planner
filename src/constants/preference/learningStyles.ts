import {
  Activity,
  Eye,
  FileText,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import type { LearningStyle } from "@/types/Enums";

export const learningStyleOptions: {
  value: LearningStyle;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    value: "VISUAL",
    label: "Visual",
    description: "Diagrams, videos, infographics",
    icon: Eye,
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: "AUDITORY",
    label: "Auditory",
    description: "Audio explanations, podcasts",
    icon: Headphones,
    color: "from-purple-500 to-pink-500",
  },
  {
    value: "READ_WRITE",
    label: "Reading/Writing",
    description: "Text-based content, articles",
    icon: FileText,
    color: "from-emerald-500 to-teal-500",
  },
  {
    value: "KINESTHETIC",
    label: "Kinesthetic",
    description: "Practice, exercises, hands-on",
    icon: Activity,
    color: "from-orange-500 to-red-500",
  },
];
