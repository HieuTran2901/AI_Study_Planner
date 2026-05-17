import { create } from "zustand";
import type { LearningPathResponse } from "@/types/Response";

interface LearningPathState {
  learningPath: LearningPathResponse | null;
  setLearningPath: (data: LearningPathResponse) => void;
}

export const useLearningPathStore = create<LearningPathState>((set) => ({
  learningPath: null,
  setLearningPath: (data) => set({ learningPath: data }),
}));
