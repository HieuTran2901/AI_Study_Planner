import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, BookOpen } from "lucide-react";

type Topic = {
  id: number;
  title: string;
  subject: string;
  level?: string;
};

const topics: Topic[] = [
  {
    id: 1,
    title: "Advanced React Hooks",
    subject: "React",
    level: "Intermediate",
  },
  {
    id: 2,
    title: "State Management with Zustand",
    subject: "React",
    level: "Advanced",
  },
  {
    id: 3,
    title: "Redux Toolkit Basics",
    subject: "React",
    level: "Intermediate",
  },
  {
    id: 4,
    title: "TypeScript Generics",
    subject: "TypeScript",
    level: "Advanced",
  },
  {
    id: 5,
    title: "System Design Basics",
    subject: "Backend",
    level: "Beginner",
  },
];

interface TopicModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTopic: (topic: Topic) => void;
}

export default function TopicModal({
  open,
  onOpenChange,
  onSelectTopic,
}: TopicModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#0f0f1a] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Sparkles className="text-indigo-400" />
            Choose a Learning Topic
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition cursor-pointer"
                  onClick={() => onSelectTopic(topic)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white flex items-center gap-2">
                        <BookOpen size={16} />
                        {topic.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {topic.subject}
                      </p>
                    </div>

                    <span className="text-xs px-2 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {topic.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-end mt-4">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-gray-300"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ===================== TREE COMPONENT ===================== */

export function TopicItem({ topic, level = 0 }: any) {
  const getColor = (difficulty: string) => {
    switch (difficulty) {
      case "BEGINNER":
        return "text-green-400";
      case "INTERMEDIATE":
        return "text-yellow-400";
      case "ADVANCED":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const isRoot = level === 0;

  return (
    <div className="relative">
      {/* Tree line */}
      {level > 0 && (
        <div
          className="absolute top-0 left-0 h-full border-l border-white/10"
          style={{ left: (level - 1) * 16 + 8 }}
        />
      )}

      <div
        style={{ marginLeft: level * 16 }}
        className={`rounded-xl p-3 transition border 
        ${
          isRoot
            ? "bg-indigo-500/10 border-indigo-400/20"
            : "bg-white/[0.04] border-white/10 hover:bg-white/[0.06]"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Icon phân cấp */}
            <span className="text-xs">{isRoot ? "📘" : "▪️"}</span>

            <p
              className={`text-sm ${
                isRoot ? "font-semibold text-white" : "text-gray-200"
              }`}
            >
              {topic.title}
            </p>
          </div>

          <span className={`text-[10px] ${getColor(topic.difficulty)}`}>
            {topic.difficulty}
          </span>
        </div>

        <p className="text-xs text-gray-400 mt-1">{topic.description}</p>
      </div>

      {/* Children */}
      {topic.children && topic.children.length > 0 && (
        <div className="mt-2 space-y-2">
          {topic.children.map((child: any, i: number) => (
            <TopicItem key={i} topic={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
