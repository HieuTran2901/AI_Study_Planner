import { create } from "zustand";
import type { CourseDetailResponse } from "@/types/Response";

interface CourseLearningState {
  courseLearning: CourseDetailResponse | null;
  setCourseLearning: (data: CourseDetailResponse) => void;
}

export const useCourseLearningStore = create<CourseLearningState>((set) => ({
  courseLearning: null,

  setCourseLearning: (data) =>
    set((state) => ({
      ...state,
      courseLearning: data,
    })),
}));
