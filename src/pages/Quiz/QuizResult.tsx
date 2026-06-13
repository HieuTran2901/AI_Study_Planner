import { useParams, useNavigate, Link } from "react-router";
import {
  Trophy,
  Clock,
  Target,
  TrendingUp,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Brain,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function QuizResult() {
  const { id } = useParams();
  const navigate = useNavigate();

  const result = {
    score: 85,
    correctAnswers: 17,
    incorrectAnswers: 3,
    totalQuestions: 20,
    timeTaken: "12:34",
    accuracy: 85,
    rank: "Top 15%",
  };

  const weakAreas = [
    { topic: "useEffect Dependencies", accuracy: 60, questions: 5 },
    { topic: "Custom Hooks", accuracy: 66, questions: 3 },
  ];

  const recommendations = [
    {
      title: "Advanced React Patterns",
      difficulty: "advanced",
      duration: 20,
    },
    {
      title: "React Performance Optimization",
      difficulty: "intermediate",
      duration: 15,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 70) return "text-indigo-400";
    if (score >= 50) return "text-amber-400";
    return "text-rose-400";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Outstanding! You're a master! 🎉";
    if (score >= 70) return "Great job! Keep it up! 👏";
    if (score >= 50) return "Good effort! Room for improvement 📈";
    return "Keep practicing! You'll get there 💪";
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse" />
            <Trophy className="h-10 w-10 text-white relative z-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Quiz Complete!
          </h1>
          <p className="text-muted-foreground">
            {getScoreMessage(result.score)}
          </p>
        </div>

        {/* Main Score Card */}
        <Card className="relative overflow-hidden border-border bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent backdrop-blur-xl mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-transparent" />
          <CardContent className="relative p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Circular Score */}
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse" />

                  {/* SVG Circle */}
                  <svg className="relative w-full h-full transform -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted/30"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                      strokeDashoffset={
                        2 * Math.PI * 45 * (1 - result.score / 100)
                      }
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Score Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className={`text-5xl sm:text-6xl font-bold ${getScoreColor(result.score)}`}
                    >
                      {result.score}
                    </span>
                    <span className="text-sm text-muted-foreground">Score</span>
                  </div>
                </div>
                <Badge className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 border-0">
                  {result.rank}
                </Badge>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 flex-1">
                {[
                  {
                    icon: CheckCircle2,
                    label: "Correct",
                    value: result.correctAnswers,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/10",
                  },
                  {
                    icon: XCircle,
                    label: "Incorrect",
                    value: result.incorrectAnswers,
                    color: "text-rose-400",
                    bg: "bg-rose-500/10",
                  },
                  {
                    icon: Target,
                    label: "Accuracy",
                    value: `${result.accuracy}%`,
                    color: "text-indigo-400",
                    bg: "bg-indigo-500/10",
                  },
                  {
                    icon: Clock,
                    label: "Time",
                    value: result.timeTaken,
                    color: "text-purple-400",
                    bg: "bg-purple-500/10",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`p-4 rounded-xl ${stat.bg} border border-white/10`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color} mb-2`} />
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weak Areas */}
            <Card className="border-border bg-card/50 backdrop-blur-xl">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-rose-400" />
                  Areas to Improve
                </h3>
                <div className="space-y-4">
                  {weakAreas.map((area) => (
                    <div key={area.topic}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{area.topic}</span>
                        <span className="text-sm text-muted-foreground">
                          {area.accuracy}%
                        </span>
                      </div>
                      <Progress
                        value={area.accuracy}
                        className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-rose-500 [&>div]:to-orange-500"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {area.questions} questions in this area
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Feedback */}
            <Card className="relative overflow-hidden border-indigo-500/50 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-transparent" />
              <CardContent className="relative p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      AI-Generated Feedback
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Great work on understanding the basics of React Hooks! You
                      showed strong knowledge in useState and basic hook usage.
                      To reach the next level, focus on mastering useEffect
                      dependencies and creating custom hooks. Consider reviewing
                      the official React documentation on these topics.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      >
                        Strong: useState
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      >
                        Strong: Basic Hooks
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-amber-500/10 text-amber-400 border-amber-500/30"
                      >
                        Improve: useEffect
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={`/quiz/${id}/review`} className="flex-1">
                <Button variant="outline" className="w-full">
                  Review Answers
                </Button>
              </Link>
              <Button
                onClick={() => navigate(`/quiz/${id}`)}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retry Quiz
              </Button>
              <Link to="/quiz" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
                  Continue Learning
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recommended Quizzes */}
            <Card className="border-border bg-card/50 backdrop-blur-xl">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-400" />
                  Recommended Next
                </h3>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-muted/30 border border-border hover:border-indigo-500/50 transition-all cursor-pointer"
                    >
                      <h4 className="font-medium mb-2">{rec.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {rec.difficulty}
                        </Badge>
                        <span>•</span>
                        <span>{rec.duration} min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
