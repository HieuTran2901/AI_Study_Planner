export const LearningStyle = [
  "VISUAL",
  "AUDITORY",
  "READ_WRITE",
  "KINESTHETIC",
] as const;

export type LearningStyle = (typeof LearningStyle)[number];
