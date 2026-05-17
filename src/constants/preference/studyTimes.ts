import { CloudMoon, Moon, Sun, Sunset, type LucideIcon } from "lucide-react";
import type { StudyTime } from "@/types/Enums";

export const studyTimeOptions: {
  value: StudyTime;
  label: string;
  icon: LucideIcon;
  time: string;
  color: string;
}[] = [
  {
    value: "MORNING",
    label: "Morning",
    icon: Sun,
    time: "6AM - 12PM",
    color: "text-yellow-400",
  },
  {
    value: "AFTERNOON",
    label: "Afternoon",
    icon: Sunset,
    time: "12PM - 6PM",
    color: "text-orange-400",
  },
  {
    value: "EVENING",
    label: "Evening",
    icon: Moon,
    time: "6PM - 10PM",
    color: "text-indigo-400",
  },
  {
    value: "NIGHT",
    label: "Night",
    icon: CloudMoon,
    time: "10PM - 2AM",
    color: "text-purple-400",
  },
];
