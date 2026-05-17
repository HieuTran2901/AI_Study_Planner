import * as Switch from "@radix-ui/react-switch";
import { Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";

import { useTheme } from "@/hooks";

type AccentColor = "indigo" | "purple" | "cyan" | "pink";
type FontSize = "small" | "medium" | "large";
type Density = "compact" | "comfortable";

function Appearance() {
  const { theme, setTheme } = useTheme();

  const [accentColor, setAccentColor] = useState<AccentColor>("indigo");

  const [fontSize, setFontSize] = useState<FontSize>("medium");

  const [density, setDensity] = useState<Density>("comfortable");

  const [animations, setAnimations] = useState(true);

  const themes = [
    {
      id: "dark",
      icon: Moon,
      label: "Dark",
      preview: "bg-gradient-to-br from-slate-900 to-slate-800",
    },
    {
      id: "light",
      icon: Sun,
      label: "Light",
      preview: "bg-gradient-to-br from-slate-50 to-slate-100",
    },
    {
      id: "auto",
      icon: Monitor,
      label: "Auto",
      preview: "bg-gradient-to-br from-slate-900 via-slate-600 to-slate-100",
    },
  ] as const;

  const accentColors = [
    {
      id: "indigo",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "purple",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "cyan",
      color: "from-cyan-500 to-blue-500",
    },
    {
      id: "pink",
      color: "from-pink-500 to-rose-500",
    },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 backdrop-blur-xl space-y-6 transition-colors">
        {/* Theme */}
        <div>
          <label className="text-sm font-medium mb-3 block text-slate-700 dark:text-slate-300">
            Theme
          </label>

          <div className="grid grid-cols-3 gap-4">
            {themes.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setTheme(item.id as "light" | "dark" | "auto")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    theme === item.id
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-slate-50 dark:bg-slate-800/40"
                  }`}
                >
                  <div
                    className={`w-full h-16 rounded-lg ${item.preview} mb-3`}
                  />

                  <div className="flex items-center justify-center gap-2">
                    <Icon className="w-4 h-4" />

                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <label className="text-sm font-medium mb-3 block text-slate-700 dark:text-slate-300">
            Accent Color
          </label>

          <div className="grid grid-cols-4 gap-3">
            {accentColors.map((accent) => (
              <button
                key={accent.id}
                onClick={() => setAccentColor(accent.id)}
                className={`h-12 rounded-xl bg-gradient-to-r ${accent.color} transition-all ${
                  accentColor === accent.id
                    ? "ring-4 ring-slate-300 dark:ring-white/30 scale-105"
                    : "hover:scale-105"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="text-sm font-medium mb-3 block text-slate-700 dark:text-slate-300">
            Font Size
          </label>

          <div className="grid grid-cols-3 gap-4">
            {(["small", "medium", "large"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-4 py-3 rounded-xl border transition-all capitalize ${
                  fontSize === size
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-slate-50 dark:bg-slate-800/40"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Density */}
        <div>
          <label className="text-sm font-medium mb-3 block text-slate-700 dark:text-slate-300">
            UI Density
          </label>

          <div className="grid grid-cols-2 gap-4">
            {(["compact", "comfortable"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setDensity(item)}
                className={`px-4 py-3 rounded-xl border transition-all capitalize ${
                  density === item
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-slate-50 dark:bg-slate-800/40"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Animations */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 transition-colors">
          <div>
            <p className="font-medium text-slate-900 dark:text-white">
              Smooth Animations
            </p>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enable transitions and motion effects
            </p>
          </div>

          <Switch.Root
            checked={animations}
            onCheckedChange={setAnimations}
            className="w-11 h-6 bg-slate-300 dark:bg-slate-700 rounded-full relative data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-600 data-[state=checked]:to-purple-600 transition-all outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-300 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
      </div>
    </div>
  );
}

export default Appearance;
