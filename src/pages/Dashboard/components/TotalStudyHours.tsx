import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function TotalStudyHours() {
  return (
    <Card className="relative overflow-hidden border-white/[0.08] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl group hover:shadow-xl hover:shadow-indigo-500/10 transition-all">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
            <Clock className="text-white" size={24} />
          </div>
          <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
            +12%
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-400">Total Study Hours</p>
          <p className="text-3xl font-bold text-white">142.5h</p>
          <p className="text-xs text-gray-500">This month</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default TotalStudyHours;
