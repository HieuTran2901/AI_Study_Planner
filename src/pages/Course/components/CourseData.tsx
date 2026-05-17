interface Course {
  id: number;
  title: string;
  platform: string;
  instructor: string;
  rating: number;
  duration: string;
  progress: number;
  enrolled: boolean;
  image: string;
  category: string;
  level: string;
}

export const coursesData: Course[] = [
  {
    id: 1,
    title: "Complete React Developer Course",
    platform: "Udemy",
    instructor: "Andrew Mead",
    rating: 4.8,
    duration: "39 hours",
    progress: 65,
    enrolled: true,
    image:
      "https://images.unsplash.com/photo-1758876203754-1bc9d3ed514c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBsYXB0b3AlMjBzY3JlZW58ZW58MXx8fHwxNzc0NzU3OTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Frontend",
    level: "Intermediate",
  },
  {
    id: 2,
    title: "Advanced CSS and Sass",
    platform: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: 4.9,
    duration: "28 hours",
    progress: 100,
    enrolled: true,
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1080&q=80",
    category: "Frontend",
    level: "Advanced",
  },
  {
    id: 3,
    title: "TypeScript: The Complete Developer's Guide",
    platform: "Udemy",
    instructor: "Stephen Grider",
    rating: 4.7,
    duration: "25 hours",
    progress: 40,
    enrolled: true,
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1080&q=80",
    category: "Programming",
    level: "Intermediate",
  },
  {
    id: 4,
    title: "Node.js, Express & MongoDB Bootcamp",
    platform: "Udemy",
    instructor: "Jonas Schmedtmann",
    rating: 4.8,
    duration: "42 hours",
    progress: 0,
    enrolled: false,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1080&q=80",
    category: "Backend",
    level: "Intermediate",
  },
  {
    id: 5,
    title: "React Testing Library & Jest",
    platform: "Udemy",
    instructor: "Bonnie Schulkin",
    rating: 4.6,
    duration: "15 hours",
    progress: 0,
    enrolled: false,
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1080&q=80",
    category: "Testing",
    level: "Intermediate",
  },
  {
    id: 6,
    title: "Modern JavaScript From The Beginning",
    platform: "Udemy",
    instructor: "Brad Traversy",
    rating: 4.7,
    duration: "21 hours",
    progress: 100,
    enrolled: true,
    image:
      "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=1080&q=80",
    category: "Programming",
    level: "Beginner",
  },
];
