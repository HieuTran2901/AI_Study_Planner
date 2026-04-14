import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ChevronRight, Target } from "lucide-react";
import { useState } from "react";
import TopicModal from "./TopicModal";

function AIRecommendation() {
  const [openTopicModal, setOpenTopicModal] = useState(false);

  return (
    <Card className="lg:col-span-1 border-white/[0.08] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-violet-500/10 backdrop-blur-xl relative overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />

      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white">
                AI Recommendation
              </h3>
              <p className="text-xs text-indigo-300">Based on your progress</p>
            </div>
          </div>
          <div className="text-3xl">✨</div>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 mb-6">
          <p className="text-sm leading-relaxed text-slate-200">
            Based on your recent progress in{" "}
            <span className="text-indigo-400 font-medium">React Hooks</span>, I
            recommend focusing on{" "}
            <span className="text-purple-400 font-medium">
              "Advanced State Management with Zustand & Redux"
            </span>{" "}
            next.
          </p>
        </div>

        <div className="space-y-3">
          <button className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:brightness-110 transition-all flex items-center justify-center gap-2">
            Start This Topic
            <ChevronRight size={18} />
          </button>

          <button
            onClick={() => {
              setOpenTopicModal(true);
            }}
            className="w-full py-3 px-5 rounded-2xl border border-white/20 hover:bg-white/5 transition-all text-sm font-medium flex items-center justify-center gap-2"
          >
            Choose Another Topic
            <Target size={18} />
          </button>
          <TopicModal
            open={openTopicModal}
            onOpenChange={setOpenTopicModal}
            onSelectTopic={(topic) => {
              console.log("Selected:", topic);
              setOpenTopicModal(false);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default AIRecommendation;
