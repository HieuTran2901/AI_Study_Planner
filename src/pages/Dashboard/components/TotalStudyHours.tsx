import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function TotalStudyHours() {
  return (
    <Card
      className="
        relative overflow-hidden
        group
        border-border/50

        bg-gradient-to-br
        from-cyan-500/[0.10]
        via-sky-500/[0.06]
        to-blue-500/[0.10]

        dark:from-cyan-500/10
        dark:via-sky-500/5
        dark:to-blue-500/10

        backdrop-blur-xl
        transition-all
        hover:-translate-y-1
        hover:shadow-2xl
        hover:shadow-cyan-500/15
      "
    >
      {/* Glow Effect */}
      <div
        className="
          absolute -top-10 -right-10
          h-32 w-32
          rounded-full
          bg-cyan-500/20
          blur-3xl
          opacity-60
        "
      />

      {/* Hover Overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-cyan-500/10
          via-transparent
          to-blue-500/10
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
              from-cyan-500
              via-sky-500
              to-blue-500
              shadow-lg
              shadow-cyan-500/30
            "
          >
            <div className="absolute inset-0 rounded-2xl bg-white/10" />

            <Clock className="relative text-white" size={22} />
          </div>

          {/* Badge */}
          <Badge
            className="
              border border-cyan-500/20
              bg-cyan-500/10
              text-cyan-700

              dark:bg-cyan-500/20
              dark:text-cyan-300

              hover:bg-cyan-500/20
              transition-colors
            "
          >
            +12%
          </Badge>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Total Study Hours
          </p>

          <div className="flex items-end gap-2">
            <p className="text-4xl font-bold tracking-tight text-foreground">
              142.5h
            </p>

            <span className="mb-1 text-sm text-cyan-500">+18%</span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-cyan-500/10 dark:bg-white/5">
            <div
              className="
                h-full w-[82%]
                rounded-full
                bg-gradient-to-r
                from-cyan-500
                via-sky-500
                to-blue-500
              "
            />
          </div>

          <p className="pt-1 text-xs text-slate-500 dark:text-gray-500">
            This month
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default TotalStudyHours;
