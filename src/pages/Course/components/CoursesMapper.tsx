import type { LearningPathResponse, TopicNode } from "@/types/Response";
import type { ResourceResponse } from "@/types/Response/ResourceResponse";
import type { Course } from "@/types/Entity";

export const mapAIToCourse = (learningPath: LearningPathResponse) => {
  if (!learningPath?.topics) return [];

  const results: Course[] = [];

  const traverse = (topics: TopicNode[]) => {
    topics.forEach((t) => {
      if (t.resources) {
        t.resources.forEach((r: ResourceResponse, i: number) => {
          results.push({
            id: r.id,
            learningPathId: learningPath.id,
            title: r.title,
            platform: r.platform,
            rating: r.rating ?? 0,
            url: r.url,

            // Reuse from topic
            level: t.difficulty,
            category: validateType(r.type),
            imageUrl: r.platform == "Youtube" ? r.thumbnailUrl : t.imageUrl,

            // UI fallback
            instructor: extractInstructor(r.platform) ?? "Platform Instructor",
            duration: t.estimatedHours
              ? `${t.estimatedHours} hours`
              : "Self-paced",

            progress: 0,
            enrolled: false,
          });
        });
      }

      // check if topic have children
      if (t.children?.length) {
        traverse(t.children);
      }
    });
  };

  traverse(learningPath.topics);

  // check deduplicate
  return Array.from(new Map(results.map((r) => [r.url, r])).values());
};

const validateType = (type: string) => {
  switch (type) {
    case "COURSE":
      return "Course";
    case "VIDEO":
      return "Video";
    case "ARTICLE":
      return "Article";
    case "DOCUMENT":
      return "Document";
    default:
      return "Other";
  }
};

const extractInstructor = (platform: string) => {
  switch (platform) {
    case "Udemy":
      return "Udemy Instructor";
    case "Coursera":
      return "Coursera Instructor";
    case "YouTube":
      return "Content Creator";
    case "GitHub":
      return "Github project";
    default:
      return null;
  }
};
