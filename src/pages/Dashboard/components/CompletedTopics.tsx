import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";

function CompletedTopics() {
  return (
    <Card
      className="
        relative overflow-hidden
        group
        border-border/50

        bg-gradient-to-br
        from-fuchsia-500/[0.10]
        via-purple-500/[0.06]
        to-pink-500/[0.10]

        dark:from-purple-500/10
        dark:via-fuchsia-500/5
        dark:to-pink-500/10

        backdrop-blur-xl
        transition-all
        hover:-translate-y-1
        hover:shadow-2xl
        hover:shadow-purple-500/15
      "
    >
      {/* Glow Effect */}
      <div
        className="
          absolute -top-10 -right-10
          h-32 w-32
          rounded-full
          bg-purple-500/20
          blur-3xl
          opacity-60
        "
      />

      {/* Hover Overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-purple-500/10
          via-transparent
          to-pink-500/10
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      <CardContent className="relative p-6">
        <div className="mb-5 flex items-start justify-between">
          {/* Icon */}
          <div
            className="
              relative
              flex h-12 w-12 items-center justify-center
              rounded-xl
              bg-gradient-to-br
              from-fuchsia-500
              via-purple-500
              to-pink-500
              shadow-lg
              shadow-purple-500/30
            "
          >
            <div className="absolute inset-0 rounded-2xl bg-white/10" />

            <Target className="relative text-white" size={22} />
          </div>

          {/* Badge */}
          <Badge
            className="
              border border-purple-500/20
              bg-purple-500/10
              text-purple-700

              dark:bg-purple-500/20
              dark:text-purple-300

              hover:bg-purple-500/20
              transition-colors
            "
          >
            +8 Topics
          </Badge>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Completed Topics
          </p>

          <div className="flex items-end gap-2">
            <p className="text-4xl font-bold tracking-tight text-foreground">
              47
            </p>

            <span className="mb-1 text-sm text-emerald-500">+12%</span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-purple-500/10 dark:bg-white/5">
            <div
              className="
                h-full w-[78%]
                rounded-full
                bg-gradient-to-r
                from-fuchsia-500
                via-purple-500
                to-pink-500
              "
            />
          </div>

          <p className="pt-1 text-xs text-slate-500 dark:text-gray-500">
            Out of 60 planned
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default CompletedTopics;
