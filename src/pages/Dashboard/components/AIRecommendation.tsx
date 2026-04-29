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
    <Card className="lg:col-span-1 border-white/[0.08] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-violet-500/10 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />

      <CardContent className="p-6 relative">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white">
                AI Learning Path
              </h3>
              <p className="text-xs text-indigo-300">Generate your roadmap</p>
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
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* QUICK SUGGESTIONS */}
          <div className="flex gap-2 flex-wrap">
            {["React", "Java", "AWS", "Docker", "System Design"].map((item) => (
              <button
                key={item}
                onClick={() => setInput(item)}
                className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-gray-200"
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !input.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
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
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 min-h-[160px]">
          {error ? (
            <p className="text-red-400 text-sm">{error}</p>
          ) : learningPath ? (
            <div className="space-y-4">
              {/* TITLE */}
              <h3 className="text-white font-semibold">{learningPath.title}</h3>

              {/* RECOMMEND */}
              {recommendedTopic && (
                <p className="text-sm text-slate-200">
                  👉 Recommended:{" "}
                  <span className="text-indigo-400 font-medium">
                    {recommendedTopic.title}
                  </span>
                </p>
              )}

              {/* TREE */}
              <div className="max-h-[320px] overflow-y-auto space-y-3 pr-1">
                {learningPath.topics.map((topic, index) => (
                  <TopicItem key={index} topic={topic} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center">
              Enter a topic and generate your learning path 🚀
            </p>
          )}
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="mt-4 space-y-3">
          <button
            disabled={!recommendedTopic}
            className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            Start This Topic
            <ChevronRight size={18} />
          </button>

          <button
            onClick={() => setOpenTopicModal(true)}
            className="w-full py-3 px-5 rounded-2xl border border-white/20 hover:bg-white/5 text-sm flex items-center justify-center gap-2"
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
