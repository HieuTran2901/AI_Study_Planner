export interface Topic {
  id: number;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "locked";
  duration: string;
  progress: number;
  subtopics: string[];
}
