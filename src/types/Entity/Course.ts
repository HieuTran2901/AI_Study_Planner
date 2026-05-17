export interface Course {
  id: string;
  learningPathId: string;
  title: string;
  platform: string;
  rating: number;
  url: string;
  imageUrl: string;
  level: string;
  category: string;
  instructor: string;
  duration: string;
  progress: number;
  enrolled: boolean;
}
