import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Check,
  X,
  Grid3x3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useQuiz } from "@/hooks";

export function QuizSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [selectedAnswer, setSelectedAnswer] = useState<Record<string, string>>(
  //   {},
  // );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  // const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const [showNavigator, setShowNavigator] = useState(false);
  const { selectedQuiz, getQuiz, submitQuiz } = useQuiz();

  // const questions: Question[] = [
  //   {
  //     id: 1,
  //     question: "What is the primary purpose of React Hooks?",
  //     options: [
  //       "To add styling to components",
  //       "To allow functional components to use state and lifecycle features",
  //       "To create class components",
  //       "To handle routing in React applications",
  //     ],
  //     correctAnswer: 1,
  //     hint: "Think about what made functional components different from class components before hooks.",
  //   },
  //   {
  //     id: 2,
  //     question:
  //       "Which hook is used to perform side effects in functional components?",
  //     options: ["useState", "useEffect", "useContext", "useReducer"],
  //     correctAnswer: 1,
  //     hint: "This hook runs after the component renders and can be used for data fetching, subscriptions, etc.",
  //   },
  //   {
  //     id: 3,
  //     question: "What does the dependency array in useEffect control?",
  //     options: [
  //       "The number of times the component renders",
  //       "When the effect should re-run",
  //       "Which props are passed to the component",
  //       "The order of component mounting",
  //     ],
  //     correctAnswer: 1,
  //   },
  // ];

  // useMemo
  // const questions = useMemo(
  //   () => selectedQuiz?.questions || [],
  //   [selectedQuiz],
  // );

  const questions = useMemo(
    () =>
      [...(selectedQuiz?.questions || [])].sort((a, b) => a.order - b.order),
    [selectedQuiz],
  );

  useEffect(() => {
    setAnswers({});
  }, [questions]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      // setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      // setShowHint(false);
    }
  };

  const handleSubmit = () => {
    const quizId = String(id);
    const request = {
      answers: Object.entries(answers).map(([questionId, optionId]) => ({
        questionId,
        selectedOptionId: optionId,
      })),
    };

    submitQuiz(quizId, request);
    console.log(JSON.stringify(request, null, 2));

    navigate(`/quiz/${quizId}/result`);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    if (id) {
      getQuiz(id);
    }
  }, [id, getQuiz]);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <Card className="border-border bg-card/50 backdrop-blur-xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold mb-1">
                  {selectedQuiz?.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-amber-500/15 text-amber-400 border-amber-500/30"
                  >
                    {selectedQuiz?.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span
                      className={
                        timeLeft < 60 ? "text-rose-400 font-medium" : ""
                      }
                    >
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNavigator(!showNavigator)}
                className="sm:ml-auto"
              >
                <Grid3x3 className="h-4 w-4 mr-2" />
                Questions
              </Button>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="font-medium">
                  {answeredCount}/{questions.length} answered
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Quiz Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Question Card */}
          <Card className="border-border bg-card/50 backdrop-blur-xl">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {currentQuestion + 1}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold flex-1">
                    {questions[currentQuestion]?.questionText}
                  </h2>
                </div>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {[...(questions[currentQuestion]?.options || [])]
                  .sort((a, b) => a.order - b.order)
                  .map((option, index) => {
                    const questionId = String(questions[currentQuestion]?.id);
                    const isSelected =
                      answers[questionId] === String(option.id);
                    return (
                      <button
                        key={index}
                        onClick={() =>
                          handleAnswerSelect(
                            String(questions[currentQuestion].id),
                            String(option.id),
                          )
                        }
                        className={`w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all group ${
                          isSelected
                            ? "border-indigo-500 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 shadow-lg shadow-indigo-500/20"
                            : "border-border bg-muted/30 hover:border-indigo-500/50 hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              isSelected
                                ? "border-indigo-500 bg-indigo-500"
                                : "border-muted-foreground/30 group-hover:border-indigo-500/50"
                            }`}
                          >
                            {isSelected && (
                              <Check className="h-5 w-5 text-white" />
                            )}
                          </div>
                          <span
                            className={`font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {option.optionText}
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>

              {/* AI Hint */}
              {/* {questions[currentQuestion]?.hint && (
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHint(!showHint)}
                    className="mb-3"
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    {showHint ? "Hide Hint" : "Show AI Hint"}
                  </Button>
                  {showHint && (
                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        💡 {questions[currentQuestion]?.hint}
                      </p>
                    </div>
                  )}
                </div>
              )} */}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1 sm:flex-none"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                className="flex-1 sm:flex-none bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/30"
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1}
                className="flex-1 sm:flex-none bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigator - Desktop */}
        <div className={`hidden lg:block ${!showNavigator && "lg:hidden"}`}>
          <Card className="sticky top-6 border-border bg-card/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Navigation</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, index) => {
                  const questionId = String(questions[index].id);

                  const isAnswered = questionId in answers;
                  const isCurrent = index === currentQuestion;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentQuestion(index);
                        // setShowHint(false);
                      }}
                      className={`aspect-square rounded-lg border-2 flex items-center justify-center font-medium transition-all ${
                        isCurrent
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : isAnswered
                            ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                            : "border-border bg-muted/30 text-muted-foreground hover:border-indigo-500/50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Navigator - Mobile/Tablet Overlay */}
        {showNavigator && (
          <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 p-4 flex items-center justify-center">
            <Card className="w-full max-w-md border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Question Navigator</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNavigator(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {questions.map((_, index) => {
                    const isAnswered = answers[index] !== null;
                    const isCurrent = index === currentQuestion;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentQuestion(index);
                          // setShowHint(false);
                          setShowNavigator(false);
                        }}
                        className={`aspect-square rounded-lg border-2 flex items-center justify-center font-medium text-lg transition-all ${
                          isCurrent
                            ? "border-indigo-500 bg-indigo-500 text-white"
                            : isAnswered
                              ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                              : "border-border bg-muted/30 text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
