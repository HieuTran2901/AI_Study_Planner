import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ChevronRight, Target, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import TopicModal, { TopicItem } from "./TopicModal";
import { useLearningPath } from "@/hooks/useLearningPath";

function AIRecommendation() {
  const [openTopicModal, setOpenTopicModal] = useState(false);
  const [input, setInput] = useState("");

  const {
    learningPath,
    generateLearningPath,
    getLearningPath,
    isLoading,
    error,
  } = useLearningPath();

  // load existing path
  useEffect(() => {
    getLearningPath();
  }, [getLearningPath]);

  const handleGenerate = () => {
    if (!input.trim()) return;

    generateLearningPath({
      input,
    });
  };

  const recommendedTopic = learningPath?.topics?.[0];

  return (
    <Card
      className="
    lg:col-span-1
    relative overflow-hidden
    border-border
    bg-card
    dark:bg-gradient-to-br
    dark:from-indigo-500/10
    dark:via-purple-500/10
    dark:to-violet-500/10
    backdrop-blur-xl
  "
    >
      {/* Glow */}
      <div
        className="
      absolute -top-20 -right-20
      h-64 w-64 rounded-full blur-3xl
      opacity-30
      dark:bg-gradient-to-br
      dark:from-indigo-500/20
      dark:to-purple-500/20
    "
      />

      <CardContent className="relative p-6">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <Sparkles className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                AI Learning Path
              </h3>

              <p className="text-xs text-indigo-400 dark:text-indigo-300">
                Generate your roadmap
              </p>
            </div>
          </div>

          <div className="text-2xl">✨</div>
        </div>

        {/* ================= INPUT ================= */}
        <div className="mb-5 space-y-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What do you want to learn? (e.g. React, Java, AWS...)"
            className="
          w-full rounded-xl border border-border
          bg-background px-4 py-3
          text-sm text-foreground
          placeholder:text-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
          />

          {/* QUICK SUGGESTIONS */}
          <div className="flex flex-wrap gap-2">
            {["React", "Java", "AWS", "Docker", "System Design"].map((item) => (
              <button
                key={item}
                onClick={() => setInput(item)}
                className="
              rounded-full
              bg-muted
              px-3 py-1
              text-xs
              text-foreground
              transition-colors
              hover:bg-accent
            "
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !input.trim()}
            className="
          flex w-full items-center justify-center gap-2
          rounded-xl
          bg-gradient-to-r from-indigo-600 to-purple-600
          py-3
          text-sm font-medium text-white
          disabled:opacity-50
        "
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate Learning Path
                <Sparkles size={16} />
              </>
            )}
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div
          className="
        min-h-[160px]
        rounded-2xl
        border border-border
        bg-muted/40
        p-5
      "
        >
          {error ? (
            <p className="text-sm text-red-400">{error}</p>
          ) : learningPath ? (
            <div className="space-y-4">
              {/* TITLE */}
              <h3 className="font-semibold text-foreground">
                {learningPath.title}
              </h3>

              {/* RECOMMEND */}
              {recommendedTopic && (
                <p className="text-sm text-muted-foreground">
                  👉 Recommended:{" "}
                  <span className="font-medium text-indigo-500 dark:text-indigo-400">
                    {recommendedTopic.title}
                  </span>
                </p>
              )}

              {/* TREE */}
              <div className="max-h-[320px] space-y-3 overflow-y-auto pr-1">
                {learningPath.topics.map((topic, index) => (
                  <TopicItem key={index} topic={topic} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              Enter a topic and generate your learning path 🚀
            </p>
          )}
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="mt-4 space-y-3">
          <button
            disabled={!recommendedTopic}
            className="
          flex w-full items-center justify-center gap-2
          rounded-2xl
          bg-gradient-to-r from-indigo-600 to-purple-600
          px-5 py-3
          font-medium text-white
          disabled:opacity-50
        "
          >
            Start This Topic
            <ChevronRight size={18} />
          </button>

          <button
            onClick={() => setOpenTopicModal(true)}
            className="
          flex w-full items-center justify-center gap-2
          rounded-2xl
          border border-border
          bg-background
          px-5 py-3
          text-sm text-foreground
          transition-colors
          hover:bg-accent
        "
          >
            Choose Another Topic
            <Target size={18} />
          </button>

          <TopicModal
            open={openTopicModal}
            onOpenChange={setOpenTopicModal}
            onSelectTopic={(topic) => {
              setInput(topic.title);
              setOpenTopicModal(false);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default AIRecommendation;
