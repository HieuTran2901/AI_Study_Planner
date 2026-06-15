export interface Topic {
  id: number;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "locked";
  duration: string | number;
  progress: number;
  subtopics: string[];
}
