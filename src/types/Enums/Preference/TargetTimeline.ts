export const TargetTimeline = [
  "ONE_MONTH",
  "THREE_MONTHS",
  "SIX_MONTHS",
  "ONE_YEAR",
] as const;

export type TargetTimeline = (typeof TargetTimeline)[number];
