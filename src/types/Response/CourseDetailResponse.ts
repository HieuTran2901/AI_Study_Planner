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
  level: string;
  lessons: Lesson[];
}

export interface CourseDetailResponse {
  id: string;
  title: string;
  totalLessons: number;
  completedLessons: number;
  modules: Module[];
}
