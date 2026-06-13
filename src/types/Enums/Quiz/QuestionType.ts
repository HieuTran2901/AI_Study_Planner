export const QUESTION_TYPES = [
  "MULTIPLE_CHOICE",
  "TRUE_FALSE",
  "SHORT_ANSWER",
] as const;

export type QuestionType = (typeof QUESTION_TYPES)[number];
