import { Bell, Brain, Palette, Shield, Target, User } from "lucide-react";
import type { SettingsTab } from "./SettingsTab";

export const sidebarItems = [
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
