import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";

function CurrentStreak() {
  return (
    <Card
      className="
        relative overflow-hidden
        group
        border-border/50

        bg-gradient-to-br
        from-orange-500/[0.10]
        via-amber-500/[0.06]
        to-red-500/[0.10]

        dark:from-orange-500/10
        dark:via-amber-500/5
        dark:to-red-500/10

        backdrop-blur-xl
        transition-all
        hover:-translate-y-1
        hover:shadow-2xl
        hover:shadow-orange-500/15
      "
    >
      {/* Glow Effect */}
      <div
        className="
          absolute -top-10 -right-10
          h-32 w-32
          rounded-full
          bg-orange-500/20
          blur-3xl
          opacity-60
        "
      />

      {/* Hover Overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-orange-500/10
          via-transparent
          to-red-500/10
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
              from-orange-500
              via-amber-500
              to-red-500
              shadow-lg
              shadow-orange-500/30
            "
          >
            <div className="absolute inset-0 rounded-xl bg-white/10" />

            <Flame className="relative text-white" size={22} />
          </div>

          {/* Badge */}
          <Badge
            className="
              border border-orange-500/20
              bg-orange-500/10
              text-orange-700

              dark:bg-orange-500/20
              dark:text-orange-300

              hover:bg-orange-500/20
              transition-colors
            "
          >
            🔥 On Fire
          </Badge>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Current Streak
          </p>

          <div className="flex items-end gap-2">
            <p className="text-4xl font-bold tracking-tight text-foreground">
              28
            </p>

            <span className="mb-1 text-sm text-orange-500">days</span>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-orange-500/10 dark:bg-white/5">
            <div
              className="
                h-full w-[70%]
                rounded-full
                bg-gradient-to-r
                from-orange-500
                via-amber-500
                to-red-500
              "
            />
          </div>

          <p className="pt-1 text-xs text-slate-500 dark:text-gray-500">
            Keep it going!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default CurrentStreak;
