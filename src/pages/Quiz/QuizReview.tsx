import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Home,
} from "lucide-react";
import { QuizReviewSkeleton } from "./components";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useQuiz } from "@/hooks";

export function QuizReview() {
  const { id } = useParams();
  const { getQuizReview, isFetchingQuiz, quizReview } = useQuiz();
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      getQuizReview(id);
    }
  }, [id, getQuizReview]);

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id],
    );
  };

  // const questions = quizReview?.questions || [];

  const questions = useMemo(
    () => [...(quizReview?.questions ?? [])].sort((a, b) => a.order - b.order),
    [quizReview],
  );

  const incorrectQuestions = questions.filter((q) => !q.correct);
  const correctCount = questions.filter((q) => q.correct).length;

  if (isFetchingQuiz || !quizReview) {
    return <QuizReviewSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Quiz Review</h1>
          <p className="text-muted-foreground">
            Review your answers and learn from explanations
          </p>
        </div>

        {/* Summary */}
        <Card className="border-border bg-card/50 backdrop-blur-xl mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold mb-2">Performance Summary</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">
                      {correctCount} Correct
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-rose-400" />
                    <span className="text-rose-400 font-medium">
                      {incorrectQuestions.length} Incorrect
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  const incorrectIds = incorrectQuestions.map(
                    (q) => q.questionId,
                  );
                  setExpandedQuestions(incorrectIds);
                }}
              >
                Expand Incorrect Only
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((question, index) => {
            const isCorrect = question.correct;
            const isExpanded = expandedQuestions.includes(question.questionId);

            return (
              <Card
                key={question.questionId}
                className={`border-2 transition-all ${
                  isCorrect
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-rose-500/30 bg-rose-500/5"
                }`}
              >
                <CardContent className="p-0">
                  <Collapsible
                    open={isExpanded}
                    onOpenChange={() => toggleQuestion(question.questionId)}
                  >
                    {/* Question Header */}
                    <CollapsibleTrigger className="w-full p-6 text-left hover:bg-muted/30 transition-colors">
                      <div className="flex items-start gap-4">
                        {/* Status Icon */}
                        <div className="shrink-0 mt-1">
                          {isCorrect ? (
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
                              <XCircle className="h-5 w-5 text-rose-400" />
                            </div>
                          )}
                        </div>

                        {/* Question Text */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-semibold pr-4">
                              Question {index + 1}: {question.questionText}
                            </h3>
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                            )}
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              isCorrect
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                            }
                          >
                            {isCorrect ? "Correct" : "Incorrect"}
                          </Badge>
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    {/* Expanded Content */}
                    <CollapsibleContent>
                      <div className="px-6 pb-6 space-y-4 border-t border-border/50 pt-6">
                        {/* Answer Options */}
                        <div className="space-y-2">
                          {[...question.options]
                            .sort((a, b) => a.order - b.order)
                            .map((option, index) => {
                              const isUserAnswer =
                                option.id === question.selectedAnswer;
                              const isCorrectAnswer = option.correct;

                              return (
                                <div
                                  key={index}
                                  className={`p-4 rounded-lg border-2 ${
                                    isCorrectAnswer
                                      ? "border-emerald-500 bg-emerald-500/10"
                                      : isUserAnswer
                                        ? "border-rose-500 bg-rose-500/10"
                                        : "border-border bg-muted/30"
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    {isCorrectAnswer && (
                                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                                    )}
                                    {isUserAnswer && !isCorrectAnswer && (
                                      <XCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                                    )}
                                    <div className="flex-1">
                                      <p
                                        className={
                                          isCorrectAnswer || isUserAnswer
                                            ? "font-medium"
                                            : ""
                                        }
                                      >
                                        {option.content}
                                      </p>
                                      {isCorrectAnswer && (
                                        <p className="text-xs text-emerald-400 mt-1">
                                          ✓ Correct Answer
                                        </p>
                                      )}
                                      {isUserAnswer && !isCorrectAnswer && (
                                        <p className="text-xs text-rose-400 mt-1">
                                          ✗ Your Answer
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>

                        {/* Explanation */}
                        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                          <div className="flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold mb-2 text-indigo-400">
                                Explanation
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {question.explanation}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Learning Resources */}
                        {/* {question.resources &&
                          question.resources.length > 0 && (
                            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                              <div className="flex items-start gap-3">
                                <BookOpen className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <h4 className="font-semibold mb-3 text-purple-400">
                                    Related Resources
                                  </h4>
                                  <div className="space-y-2">
                                    {question.resources.map(
                                      (resource, index) => (
                                        <a
                                          key={index}
                                          href={resource.url}
                                          className="block text-sm text-muted-foreground hover:text-purple-400 transition-colors underline"
                                        >
                                          → {resource.title}
                                        </a>
                                      ),
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )} */}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {incorrectQuestions.length > 0 && (
            <Button
              variant="outline"
              className="flex-1 border-rose-500/30 hover:bg-rose-500/10"
              onClick={() => {}}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retry Incorrect ({incorrectQuestions.length})
            </Button>
          )}
          <Link to="/quiz" className="flex-1">
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
              <Home className="h-4 w-4 mr-2" />
              Back to Quizzes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
