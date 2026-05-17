import type { LessonStatus } from "../Enums/LessonStatus";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  status: LessonStatus;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseLearning {
  id: string;
  title: string;
  totalLessons: number;
  completedLessons: number;
  modules: Module[];
}
