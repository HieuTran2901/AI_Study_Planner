import { useEffect, useRef, useState } from "react";
import {
  User,
  Target,
  Bell,
  Palette,
  Shield,
  ChevronRight,
  Brain,
} from "lucide-react";
import Security, {
  Profile,
  Goal,
  Notification,
  Appearance,
} from "./components";
import LearningPreference from "./components/LearningPreference";

type SettingsTab =
  | "profile"
  | "learning-preferences"
  | "goals"
  | "notifications"
  | "appearance"
  | "security";

const sidebarItems = [
  {
    id: "profile" as SettingsTab,
    icon: User,
    label: "Profile",
    description: "Personal information",
  },
  {
    id: "learning-preferences" as SettingsTab,
    icon: Brain,
    label: "Learning Preferences",
    description: "Customize your learning experience",
  },
  {
    id: "goals" as SettingsTab,
    icon: Target,
    label: "Learning Goals",
    description: "Study targets & preferences",
  },
  {
    id: "notifications" as SettingsTab,
    icon: Bell,
    label: "Notifications",
    description: "Alerts & reminders",
  },
  {
    id: "appearance" as SettingsTab,
    icon: Palette,
    label: "Appearance",
    description: "Theme & display",
  },
  {
    id: "security" as SettingsTab,
    icon: Shield,
    label: "Privacy & Security",
    description: "Account protection",
  },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("goals");

  const contentRef = useRef<HTMLDivElement | null>(null);

  // Automatic scroll to top when activeTab changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "learning-preferences":
        return <LearningPreference />;
      case "goals":
        return <Goal />;

      case "notifications":
        return <Notification />;

      case "appearance":
        return <Appearance />;

      case "security":
        return <Security />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-indigo-950 text-white">
      {/* Header */}
      {/* <header className="border-b border-white/10 backdrop-blur-xl bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-slate-400 mt-1">
            Manage your account preferences and settings
          </p>
        </div>
      </header> */}

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 sticky top-6">
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20"
                          : "hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`w-5 h-5 ${activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-indigo-400"} transition-colors`}
                          />
                          <div>
                            <p
                              className={`font-medium text-sm ${activeTab === item.id ? "text-white" : "text-slate-300"}`}
                            >
                              {item.label}
                            </p>
                            <p
                              className={`text-xs ${activeTab === item.id ? "text-indigo-200" : "text-slate-500"}`}
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>
                        {activeTab === item.id && (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div
            className="lg:col-span-3 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar"
            ref={contentRef}
          >
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
