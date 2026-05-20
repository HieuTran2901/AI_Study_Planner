export const RESOURCE_TYPES = [
  "VIDEO",
  "COURSE",
  "BOOK",
  "ARTICLE",
  "YOUTUBE",
  "PODCAST",
] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];
