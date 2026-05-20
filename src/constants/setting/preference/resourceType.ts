import { Video, BookOpen, FileText, MonitorPlay, Podcast } from "lucide-react";

export const resourceTypeOptions = [
  {
    value: "VIDEO",
    label: "Videos",
    icon: Video,
    color: "text-red-400",
  },
  {
    value: "COURSE",
    label: "Courses",
    icon: MonitorPlay,
    color: "text-indigo-400",
  },
  {
    value: "BOOK",
    label: "Books",
    icon: BookOpen,
    color: "text-emerald-400",
  },
  {
    value: "ARTICLE",
    label: "Articles",
    icon: FileText,
    color: "text-sky-400",
  },
  {
    value: "YOUTUBE",
    label: "YouTube",
    icon: Podcast,
    color: "text-rose-400",
  },
  {
    value: "PODCAST",
    label: "Podcast",
    icon: Podcast,
    color: "text-yellow-400",
  },
] as const;
