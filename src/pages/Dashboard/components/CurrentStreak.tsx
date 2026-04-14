import { Card, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function CurrentStreak() {
  return (
    <Card className="relative overflow-hidden border-white/[0.08] bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl group hover:shadow-xl hover:shadow-orange-500/10 transition-all">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Flame className="text-white" size={24} />
          </div>
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
            🔥
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-400">Current Streak</p>
          <p className="text-3xl font-bold text-white">28 days</p>
          <p className="text-xs text-gray-500">Keep it going!</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default CurrentStreak;
