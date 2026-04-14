import * as Switch from "@radix-ui/react-switch";
import { Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";

function Appearance() {
  const [appearance, setAppearance] = useState({
    theme: "dark",
    accentColor: "indigo",
    fontSize: "medium",
    density: "comfortable",
    animations: true,
  });

  return (
    <div className="space-y-6">
      {/* <div>
        <h2 className="text-2xl font-semibold mb-2">Appearance</h2>
        <p className="text-slate-400">
          Customize the look and feel of your learning environment
        </p>
      </div> */}

      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 space-y-6">
        <div>
          <label className="text-sm font-medium mb-3 block text-slate-300">
            Theme
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
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
                preview:
                  "bg-gradient-to-br from-slate-900 via-slate-600 to-slate-100",
              },
            ].map((theme) => {
              const Icon = theme.icon;
              return (
                <button
                  key={theme.id}
                  onClick={() =>
                    setAppearance({ ...appearance, theme: theme.id })
                  }
                  className={`p-4 rounded-xl border-2 transition-all ${
                    appearance.theme === theme.id
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-white/10 hover:border-white/20 bg-slate-800/40"
                  }`}
                >
                  <div
                    className={`w-full h-16 rounded-lg ${theme.preview} mb-3`}
                  ></div>
                  <div className="flex items-center justify-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{theme.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-3 block text-slate-300">
            Accent Color
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[
              { id: "indigo", color: "from-indigo-500 to-purple-500" },
              { id: "purple", color: "from-purple-500 to-pink-500" },
              { id: "cyan", color: "from-cyan-500 to-blue-500" },
              { id: "pink", color: "from-pink-500 to-rose-500" },
            ].map((accent) => (
              <button
                key={accent.id}
                onClick={() =>
                  setAppearance({ ...appearance, accentColor: accent.id })
                }
                className={`h-12 rounded-xl bg-gradient-to-r ${accent.color} transition-all ${
                  appearance.accentColor === accent.id
                    ? "ring-4 ring-white/30 scale-105"
                    : "hover:scale-105"
                }`}
              ></button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-3 block text-slate-300">
            Font Size
          </label>
          <div className="grid grid-cols-3 gap-4">
            {["small", "medium", "large"].map((size) => (
              <button
                key={size}
                onClick={() => setAppearance({ ...appearance, fontSize: size })}
                className={`px-4 py-3 rounded-xl border transition-all capitalize ${
                  appearance.fontSize === size
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-white/10 hover:border-white/20 bg-slate-800/40"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-3 block text-slate-300">
            UI Density
          </label>
          <div className="grid grid-cols-2 gap-4">
            {["compact", "comfortable"].map((density) => (
              <button
                key={density}
                onClick={() => setAppearance({ ...appearance, density })}
                className={`px-4 py-3 rounded-xl border transition-all capitalize ${
                  appearance.density === density
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-white/10 hover:border-white/20 bg-slate-800/40"
                }`}
              >
                {density}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-white/5">
          <div>
            <p className="font-medium">Smooth Animations</p>
            <p className="text-sm text-slate-400">
              Enable transitions and motion effects
            </p>
          </div>
          <Switch.Root
            checked={appearance.animations}
            onCheckedChange={(checked) =>
              setAppearance({ ...appearance, animations: checked })
            }
            className="w-11 h-6 bg-slate-700 rounded-full relative data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-600 data-[state=checked]:to-purple-600 transition-all outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-300 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>
      </div>
    </div>
  );
}

export default Appearance;
