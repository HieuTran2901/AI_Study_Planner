import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Lock,
  ChevronDown,
  ChevronUp,
  Clock,
  Target,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Topic {
  id: number;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "locked";
  duration: string;
  progress: number;
  subtopics: string[];
}

const roadmapData: Topic[] = [
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

export default function Roadmap() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([3, 4]);

  const toggleTopic = (id: number) => {
    setExpandedTopics((prev) =>
      prev.includes(id)
        ? prev.filter((topicId) => topicId !== id)
        : [...prev, id],
    );
  };

  const getStatusConfig = (status: Topic["status"]) => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle2,
          color: "text-green-400",
          bg: "bg-green-500/10",
          border: "border-green-500/30",
          badge: "bg-green-500/20 text-green-300 border-green-500/30",
        };
      case "in-progress":
        return {
          icon: Circle,
          color: "text-indigo-400",
          bg: "bg-indigo-500/10",
          border: "border-indigo-500/30",
          badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
        };
      case "locked":
        return {
          icon: Lock,
          color: "text-gray-500",
          bg: "bg-gray-500/10",
          border: "border-gray-500/30",
          badge: "bg-gray-500/20 text-gray-400 border-gray-500/30",
        };
    }
  };

  const completedCount = roadmapData.filter(
    (t) => t.status === "completed",
  ).length;
  const totalCount = roadmapData.length;
  const overallProgress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-full p-8 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
          My Learning Roadmap
        </h1>
        <p className="text-gray-400">
          Your personalized path to mastering React development
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8 border-white/[0.08] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">Overall Progress</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-white">
                  {overallProgress}%
                </span>
                <span className="text-sm text-gray-400">complete</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Completed Topics</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">
                  {completedCount}
                </span>
                <span className="text-sm text-gray-400">of {totalCount}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">
                Estimated Time Remaining
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">12</span>
                <span className="text-sm text-gray-400">weeks</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roadmap Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-gray-700" />

        {/* Topics */}
        <div className="space-y-6">
          {roadmapData.map((topic) => {
            const config = getStatusConfig(topic.status);
            const Icon = config.icon;
            const isExpanded = expandedTopics.includes(topic.id);

            return (
              <div key={topic.id} className="relative pl-20">
                {/* Timeline Node */}
                <div
                  className={`absolute left-5 top-6 w-8 h-8 rounded-full ${config.bg} ${config.border} border-2 flex items-center justify-center z-10`}
                >
                  <Icon size={16} className={config.color} />
                </div>

                {/* Topic Card */}
                <Card
                  className={`border-white/[0.08] bg-card/50 backdrop-blur-xl hover:shadow-xl transition-all ${
                    topic.status === "locked" ? "opacity-60" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">
                            {topic.title}
                          </h3>
                          <Badge className={config.badge}>
                            {topic.status === "in-progress"
                              ? "In Progress"
                              : topic.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">
                          {topic.description}
                        </p>
                      </div>
                      {topic.status !== "locked" && (
                        <button
                          onClick={() => toggleTopic(topic.id)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Progress Bar (only for non-locked topics) */}
                    {topic.status !== "locked" && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">
                            Progress
                          </span>
                          <span className="text-xs font-medium text-white">
                            {topic.progress}%
                          </span>
                        </div>
                        <Progress value={topic.progress} />
                      </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock size={14} />
                        <span>{topic.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Target size={14} />
                        <span>{topic.subtopics.length} subtopics</span>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && topic.status !== "locked" && (
                      <div className="border-t border-white/[0.08] pt-4 mt-4">
                        <p className="text-sm text-gray-400 mb-3">Subtopics:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {topic.subtopics.map((subtopic, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                            >
                              {topic.status === "completed" ? (
                                <CheckCircle2
                                  size={14}
                                  className="text-green-400"
                                />
                              ) : (
                                <Circle size={14} className="text-gray-500" />
                              )}
                              <span className="text-sm text-gray-300">
                                {subtopic}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Action Button */}
                        <div className="mt-4">
                          {topic.status === "completed" ? (
                            <Button
                              variant="outline"
                              className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10"
                            >
                              <CheckCircle2 size={16} className="mr-2" />
                              Completed
                            </Button>
                          ) : (
                            <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/30">
                              Continue Learning
                            </Button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Locked State */}
                    {topic.status === "locked" && (
                      <div className="text-center py-4">
                        <Lock
                          size={24}
                          className="text-gray-500 mx-auto mb-2"
                        />
                        <p className="text-sm text-gray-500">
                          Complete previous topics to unlock this module
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
