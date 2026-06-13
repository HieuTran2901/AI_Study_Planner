import { useState } from "react";
import { useNavigate } from "react-router";

import { Sparkles } from "lucide-react";

import { useQuiz } from "@/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Difficulty } from "@/types/Enums";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const difficulties: Difficulty[] = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

const questionOptions = [5, 10, 15, 20, 30];

export function CustomQuizDialog({ open, onOpenChange }: Props) {
  const navigate = useNavigate();

  const { generateQuiz, isGeneratingQuiz } = useQuiz();

  const [topic, setTopic] = useState("");

  const [difficulty, setDifficulty] = useState<Difficulty>("BEGINNER");

  const [questionCount, setQuestionCount] = useState(10);

  const handleGenerate = async () => {
    const quiz = await generateQuiz({
      topic,
      difficulty,
      questionCount,
    });

    onOpenChange(false);

    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] border-border/50 bg-background/95 backdrop-blur-xl">
        <DialogHeader className="space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 shadow-lg shadow-indigo-500/30">
            <Sparkles className="h-7 w-7 text-white" />
          </div>

          <DialogTitle className="text-center text-2xl font-bold">
            Create Custom Quiz
          </DialogTitle>

          <DialogDescription className="text-center">
            Generate a personalized quiz tailored to your learning goals.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Topic */}
          <div>
            <label className="mb-2 block text-sm font-medium">Topic</label>

            <Input
              placeholder="e.g. TOEIC Grammar, React Hooks, Java OOP"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-11"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="mb-3 block text-sm font-medium">Difficulty</label>

            <div className="grid grid-cols-3 gap-2">
              {difficulties.map((level) => (
                <Button
                  key={level}
                  type="button"
                  variant={difficulty === level ? "default" : "outline"}
                  onClick={() => setDifficulty(level)}
                  className={
                    difficulty === level
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                      : ""
                  }
                >
                  {level === "BEGINNER" && "Beginner"}

                  {level === "INTERMEDIATE" && "Intermediate"}

                  {level === "ADVANCED" && "Advanced"}
                </Button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div>
            <label className="mb-3 block text-sm font-medium">
              Number of Questions
            </label>

            <div className="grid grid-cols-5 gap-2">
              {questionOptions.map((count) => (
                <Button
                  key={count}
                  type="button"
                  variant={questionCount === count ? "default" : "outline"}
                  onClick={() => setQuestionCount(count)}
                  className={
                    questionCount === count
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                      : ""
                  }
                >
                  {count}
                </Button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-xl border bg-muted/30 p-4">
            <h4 className="font-semibold mb-3">Quiz Preview</h4>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Topic</span>

                <span className="font-medium">{topic || "Not selected"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Difficulty</span>

                <span className="font-medium">{difficulty}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Questions</span>

                <span className="font-medium">{questionCount}</span>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            className="h-12 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:opacity-90 shadow-lg shadow-indigo-500/30"
            disabled={!topic.trim() || isGeneratingQuiz}
            onClick={handleGenerate}
          >
            {isGeneratingQuiz ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Generating Quiz...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Quiz
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
