import type { TopicStatus } from "../Enums";
import type { ResourceResponse } from "./ResourceResponse";

export interface TopicNode {
  title: string;
  description: string;
  difficulty: string;
  order: number;
  estimatedHours: number;
  progress: number;
  status: TopicStatus;
  imageUrl: string;
  children?: TopicNode[];
  resources?: ResourceResponse[];
}

export interface LearningPathResponse {
  id: string;
  title: string;
  topics: TopicNode[];
}
