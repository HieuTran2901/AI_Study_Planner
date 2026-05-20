export const PREFERRED_LANGUAGES = [
  "ENGLISH",
  "VIETNAMESE",
  "JAPANESE",
  "KOREAN",
  "CHINESE",
] as const;

export type PreferredLanguage = (typeof PREFERRED_LANGUAGES)[number];
