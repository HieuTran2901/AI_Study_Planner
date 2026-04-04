import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Brain,
  Coffee,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const POMODORO_DURATION = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

type TimerMode = "focus" | "shortBreak" | "longBreak";

interface Session {
  subject: string;
  duration: number;
  timestamp: string;
}

export default function Timer() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(POMODORO_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("React Development");
  const [completedSessions, setCompletedSessions] = useState<Session[]>([]);
  const [sessionsCount, setSessionsCount] = useState(0);

  const subjects = [
    "React Development",
    "TypeScript",
    "JavaScript",
    "CSS & Design",
    "Node.js",
    "Testing",
  ];

  const handleTimerComplete = () => {
    setIsRunning(false);

    if (mode === "focus") {
      const newSession: Session = {
        subject: selectedSubject,
        duration: POMODORO_DURATION / 60,
        timestamp: new Date().toLocaleTimeString(),
      };
      setCompletedSessions([newSession, ...completedSessions].slice(0, 5));
      setSessionsCount((prev) => prev + 1);

      if ((sessionsCount + 1) % 4 === 0) {
        setMode("longBreak");
        setTimeLeft(LONG_BREAK);
      } else {
        setMode("shortBreak");
        setTimeLeft(SHORT_BREAK);
      }
    } else {
      setMode("focus");
      setTimeLeft(POMODORO_DURATION);
    }
  };

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    switch (mode) {
      case "focus":
        setTimeLeft(POMODORO_DURATION);
        break;
      case "shortBreak":
        setTimeLeft(SHORT_BREAK);
        break;
      case "longBreak":
        setTimeLeft(LONG_BREAK);
        break;
    }
  };

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    switch (newMode) {
      case "focus":
        setTimeLeft(POMODORO_DURATION);
        break;
      case "shortBreak":
        setTimeLeft(SHORT_BREAK);
        break;
      case "longBreak":
        setTimeLeft(LONG_BREAK);
        break;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    let totalTime: number;
    switch (mode) {
      case "focus":
        totalTime = POMODORO_DURATION;
        break;
      case "shortBreak":
        totalTime = SHORT_BREAK;
        break;
      case "longBreak":
        totalTime = LONG_BREAK;
        break;
    }
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getModeConfig = () => {
    switch (mode) {
      case "focus":
        return {
          title: "Focus Time",
          icon: Brain,
          gradient: "from-indigo-500 to-purple-600",
          bgGradient: "from-indigo-500/20 to-purple-500/20",
        };
      case "shortBreak":
        return {
          title: "Short Break",
          icon: Coffee,
          gradient: "from-green-500 to-emerald-600",
          bgGradient: "from-green-500/20 to-emerald-500/20",
        };
      case "longBreak":
        return {
          title: "Long Break",
          icon: Coffee,
          gradient: "from-cyan-500 to-blue-600",
          bgGradient: "from-cyan-500/20 to-blue-500/20",
        };
    }
  };

  const modeConfig = getModeConfig();
  const ModeIcon = modeConfig.icon;

  return (
    <div className="min-h-full p-8 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
          Study Timer
        </h1>
        <p className="text-gray-400">Focus with the Pomodoro Technique</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timer Card */}
        <Card className="lg:col-span-2 border-white/[0.08] bg-card/50 backdrop-blur-xl">
          <CardContent className="p-8">
            {/* Mode Selector */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <Button
                variant={mode === "focus" ? "default" : "outline"}
                onClick={() => switchMode("focus")}
                className={
                  mode === "focus"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                    : "border-white/[0.08] text-gray-400 hover:bg-white/[0.05]"
                }
              >
                <Brain size={16} className="mr-2" />
                Focus
              </Button>
              <Button
                variant={mode === "shortBreak" ? "default" : "outline"}
                onClick={() => switchMode("shortBreak")}
                className={
                  mode === "shortBreak"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                    : "border-white/[0.08] text-gray-400 hover:bg-white/[0.05]"
                }
              >
                <Coffee size={16} className="mr-2" />
                Short Break
              </Button>
              <Button
                variant={mode === "longBreak" ? "default" : "outline"}
                onClick={() => switchMode("longBreak")}
                className={
                  mode === "longBreak"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                    : "border-white/[0.08] text-gray-400 hover:bg-white/[0.05]"
                }
              >
                <Coffee size={16} className="mr-2" />
                Long Break
              </Button>
            </div>

            {/* Timer Display */}
            <Card
              className={`border-white/[0.08] bg-gradient-to-br ${modeConfig.bgGradient} mb-8`}
            >
              <CardContent className="p-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <ModeIcon size={32} className="text-white" />
                  <h2 className="text-2xl font-bold text-white">
                    {modeConfig.title}
                  </h2>
                </div>

                <div className="text-center mb-6">
                  <div className="text-8xl font-bold text-white mb-4 tabular-nums">
                    {formatTime(timeLeft)}
                  </div>
                  <Progress value={getProgress()} className="h-2" />
                </div>

                {mode === "focus" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-white/80 mb-2 text-center">
                      Currently studying:
                    </label>
                    <Select
                      value={selectedSubject}
                      onValueChange={setSelectedSubject}
                    >
                      <SelectTrigger className="w-full max-w-xs mx-auto bg-white/[0.1] border-white/[0.2] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center justify-center gap-4">
                  <Button
                    size="lg"
                    onClick={toggleTimer}
                    className={`bg-gradient-to-r ${modeConfig.gradient} hover:shadow-lg hover:shadow-indigo-500/30 px-8`}
                  >
                    {isRunning ? (
                      <>
                        <Pause size={20} className="mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play size={20} className="mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={resetTimer}
                    className="border-white/[0.08] text-gray-300 hover:bg-white/[0.05]"
                  >
                    <RotateCcw size={20} className="mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-white/[0.08] bg-white/[0.02]">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">
                    {sessionsCount}
                  </div>
                  <div className="text-xs text-gray-400">Sessions Today</div>
                </CardContent>
              </Card>
              <Card className="border-white/[0.08] bg-white/[0.02]">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">
                    {sessionsCount * 25}
                  </div>
                  <div className="text-xs text-gray-400">Minutes Focused</div>
                </CardContent>
              </Card>
              <Card className="border-white/[0.08] bg-white/[0.02]">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">
                    {Math.floor(sessionsCount / 4)}
                  </div>
                  <div className="text-xs text-gray-400">Cycles Complete</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Session History */}
        <Card className="border-white/[0.08] bg-card/50 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 size={20} className="text-indigo-400" />
              <h2 className="text-lg font-semibold text-white">
                Recent Sessions
              </h2>
            </div>
            <div className="space-y-3">
              {completedSessions.length > 0 ? (
                completedSessions.map((session, index) => (
                  <Card
                    key={index}
                    className="border-white/[0.08] bg-white/[0.02]"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">
                          {session.subject}
                        </span>
                        <span className="text-xs text-gray-400">
                          {session.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={12} />
                        <span>{session.duration} minutes</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <Brain size={48} className="mx-auto text-gray-700 mb-3" />
                  <p className="text-sm text-gray-500">
                    No sessions completed yet
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Start a timer to track your study
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pomodoro Guide */}
      <Card className="mt-6 border-white/[0.08] bg-card/50 backdrop-blur-xl">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg text-white mb-4">
            How the Pomodoro Technique Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                num: "1",
                title: "Focus",
                desc: "Work for 25 minutes with complete concentration",
                color: "indigo",
              },
              {
                num: "2",
                title: "Short Break",
                desc: "Take a 5-minute break to rest",
                color: "green",
              },
              {
                num: "3",
                title: "Repeat",
                desc: "Complete 4 focus sessions in a row",
                color: "indigo",
              },
              {
                num: "4",
                title: "Long Break",
                desc: "Take a 15-minute break after 4 sessions",
                color: "cyan",
              },
            ].map((step) => (
              <Card
                key={step.num}
                className={`border-white/[0.08] bg-gradient-to-br from-${step.color}-500/10 to-${step.color}-500/5`}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 flex items-center justify-center mx-auto mb-3 text-white font-bold`}
                  >
                    {step.num}
                  </div>
                  <h4 className="font-medium text-sm text-white mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-400">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
