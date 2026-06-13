export const recommendedQuizzes = [
  {
    id: "react-hooks",
    title: "React Hooks Mastery",
    difficulty: "intermediate" as const,
    duration: 15,
    questionCount: 20,
    category: "React",
    isAIRecommended: true,
  },
  {
    id: "typescript-basics",
    title: "TypeScript Fundamentals",
    difficulty: "beginner" as const,
    duration: 10,
    questionCount: 15,
    category: "TypeScript",
    isAIRecommended: true,
  },
  {
    id: "advanced-js",
    title: "Advanced JavaScript Patterns",
    difficulty: "advanced" as const,
    duration: 20,
    questionCount: 25,
    category: "JavaScript",
  },
];

export const continueQuizzes = [
  {
    id: "css-grid",
    title: "CSS Grid Layout Deep Dive",
    difficulty: "intermediate" as const,
    duration: 12,
    questionCount: 18,
    progress: 45,
    category: "CSS",
  },
];

export const weakTopics = [
  { topic: "Async/Await", accuracy: 45, questions: 12 },
  { topic: "State Management", accuracy: 58, questions: 20 },
  { topic: "CSS Flexbox", accuracy: 62, questions: 15 },
];

export const recentQuizzes = [
  {
    id: "html-semantics",
    title: "HTML5 Semantic Elements",
    score: 85,
    date: "2 days ago",
    completedCount: 3,
  },
  {
    id: "web-accessibility",
    title: "Web Accessibility Basics",
    score: 92,
    date: "1 week ago",
    completedCount: 2,
  },
];

export interface ReviewQuestion {
  id: number;
  question: string;
  options: string[];
  userAnswer: number;
  correctAnswer: number;
  explanation: string;
  resources?: { title: string; url: string }[];
}

export const questions: ReviewQuestion[] = [
  {
    id: 1,
    question: "What is the primary purpose of React Hooks?",
    options: [
      "To add styling to components",
      "To allow functional components to use state and lifecycle features",
      "To create class components",
      "To handle routing in React applications",
    ],
    userAnswer: 1,
    correctAnswer: 1,
    explanation:
      "React Hooks were introduced in React 16.8 to allow functional components to use state and other React features that were previously only available in class components. The most common hooks are useState for state management and useEffect for side effects.",
    resources: [
      { title: "Official React Hooks Documentation", url: "#" },
      { title: "Hooks at a Glance", url: "#" },
    ],
  },
  {
    id: 2,
    question:
      "Which hook is used to perform side effects in functional components?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    userAnswer: 0,
    correctAnswer: 1,
    explanation:
      "useEffect is the correct answer. This hook lets you perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React class components.",
    resources: [
      { title: "Using the Effect Hook", url: "#" },
      { title: "A Complete Guide to useEffect", url: "#" },
    ],
  },
  {
    id: 3,
    question: "What does the dependency array in useEffect control?",
    options: [
      "The number of times the component renders",
      "When the effect should re-run",
      "Which props are passed to the component",
      "The order of component mounting",
    ],
    userAnswer: 1,
    correctAnswer: 1,
    explanation:
      "The dependency array controls when the effect should re-run. If you pass an empty array [], the effect runs only once after the initial render. If you include variables in the array, the effect re-runs whenever those variables change. This helps optimize performance by avoiding unnecessary re-renders.",
  },
];
