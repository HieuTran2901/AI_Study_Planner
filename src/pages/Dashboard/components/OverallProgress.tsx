import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

function OverallProgress() {
  return (
    <Card className="relative overflow-hidden border-white/[0.08] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl group hover:shadow-xl hover:shadow-cyan-500/10 transition-all">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <TrendingUp className="text-white" size={24} />
          </div>
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
            78%
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-400">Overall Progress</p>
          <p className="text-3xl font-bold text-white">78%</p>
          <Progress value={78} className="mt-2" />
        </div>
      </CardContent>
    </Card>
  );
}

export default OverallProgress;
