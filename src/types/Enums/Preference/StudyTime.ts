export const StudyTime = ["MORNING", "AFTERNOON", "EVENING", "NIGHT"] as const;
export type StudyTime = (typeof StudyTime)[number];
