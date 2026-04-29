interface Topic {
  id: number;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "locked";
  duration: string;
  progress: number;
  subtopics: string[];
}

export const roadmapData: Topic[] = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description:
      "Learn the core concepts of JavaScript including variables, functions, and control flow",
    status: "completed",
    duration: "2 weeks",
    progress: 100,
    subtopics: [
      "Variables & Data Types",
      "Functions",
      "Loops & Conditionals",
      "Objects & Arrays",
    ],
  },
  {
    id: 2,
    title: "ES6+ Features",
    description:
      "Modern JavaScript features like arrow functions, destructuring, and async/await",
    status: "completed",
    duration: "1 week",
    progress: 100,
    subtopics: [
      "Arrow Functions",
      "Template Literals",
      "Destructuring",
      "Promises & Async/Await",
    ],
  },
  {
    id: 3,
    title: "React Basics",
    description:
      "Introduction to React, components, props, and state management",
    status: "in-progress",
    duration: "3 weeks",
    progress: 65,
    subtopics: [
      "JSX & Components",
      "Props & State",
      "Event Handling",
      "Lifecycle Methods",
    ],
  },
  {
    id: 4,
    title: "React Hooks",
    description:
      "Deep dive into React Hooks: useState, useEffect, useContext, and custom hooks",
    status: "in-progress",
    duration: "2 weeks",
    progress: 40,
    subtopics: [
      "useState & useEffect",
      "useContext & useReducer",
      "Custom Hooks",
      "Performance Optimization",
    ],
  },
  {
    id: 5,
    title: "Advanced React Patterns",
    description:
      "Learn advanced patterns like HOCs, render props, and compound components",
    status: "locked",
    duration: "2 weeks",
    progress: 0,
    subtopics: [
      "Higher-Order Components",
      "Render Props",
      "Compound Components",
      "Error Boundaries",
    ],
  },
  {
    id: 6,
    title: "TypeScript with React",
    description: "Add type safety to your React applications with TypeScript",
    status: "locked",
    duration: "2 weeks",
    progress: 0,
    subtopics: [
      "TypeScript Basics",
      "Typing Props & State",
      "Generics",
      "Advanced Types",
    ],
  },
  {
    id: 7,
    title: "State Management (Redux)",
    description:
      "Master Redux for complex state management in React applications",
    status: "locked",
    duration: "2 weeks",
    progress: 0,
    subtopics: ["Redux Basics", "Redux Toolkit", "Middleware", "Async Actions"],
  },
  {
    id: 8,
    title: "Testing React Apps",
    description:
      "Learn to test React applications with Jest and React Testing Library",
    status: "locked",
    duration: "1 week",
    progress: 0,
    subtopics: [
      "Unit Testing",
      "Component Testing",
      "Integration Testing",
      "E2E Testing",
    ],
  },
];
