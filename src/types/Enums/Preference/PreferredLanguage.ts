export const PreferredLanguage = ["ENGLISH", "VIETNAMESE"] as const;

export type PreferredLanguage = (typeof PreferredLanguage)[number];
