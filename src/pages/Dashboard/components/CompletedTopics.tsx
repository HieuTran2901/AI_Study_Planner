import { Card, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function CompletedTopics() {
  return (
    <Card className="relative overflow-hidden border-white/[0.08] bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl group hover:shadow-xl hover:shadow-purple-500/10 transition-all">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <Target className="text-white" size={24} />
          </div>
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
            +8
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-400">Completed Topics</p>
          <p className="text-3xl font-bold text-white">47</p>
          <p className="text-xs text-gray-500">Out of 60 planned</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default CompletedTopics;
