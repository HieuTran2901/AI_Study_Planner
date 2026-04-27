export const mapAIToRoadmap = (learningPath: any) => {
  if (!learningPath?.topics) return [];

  return learningPath.topics.map((t: any, index: number) => ({
    id: index + 1,
    title: t.title,
    description: t.description,
    status: "in-progress",
    duration: "Auto", // default
    progress: 0,
    subtopics: (t.children || []).map((c: any) => c.title),
  }));
};
