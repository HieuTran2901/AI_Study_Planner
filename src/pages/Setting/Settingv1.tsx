import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Clock,
  Target,
  Mail,
  Key,
  Save,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    timezone: "UTC-5",
  });

  const [goals, setGoals] = useState({
    dailyHours: "4",
    weeklyGoal: "30",
    preferredTime: "morning",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    studyReminders: true,
    weeklyReports: true,
  });

  return (
    <div className="min-h-full p-8 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
          Settings
        </h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="border-white/[0.08] bg-card/50 backdrop-blur-xl sticky top-8">
            <CardContent className="p-4">
              <nav className="space-y-1">
                {[
                  { icon: User, label: "Profile", active: true },
                  { icon: Target, label: "Learning Goals", active: false },
                  { icon: Bell, label: "Notifications", active: false },
                  { icon: Palette, label: "Appearance", active: false },
                  { icon: Shield, label: "Privacy & Security", active: false },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                        item.active
                          ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white"
                          : "text-gray-400 hover:bg-white/[0.05] hover:text-gray-200"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card className="border-white/[0.08] bg-card/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <User className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Profile Settings
                  </h2>
                  <p className="text-sm text-gray-400">
                    Manage your personal information
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-white/[0.08]">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                    <User size={32} className="text-white" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-indigo-500 hover:bg-indigo-600 flex items-center justify-center border-2 border-[#0a0a0f] transition-colors">
                    <span className="text-white text-xs">✎</span>
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Profile Picture</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 border-white/[0.08] text-gray-300 hover:bg-white/[0.05]"
                  >
                    Change Photo
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="mt-1.5 bg-white/[0.05] border-white/[0.08] text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="mt-1.5 bg-white/[0.05] border-white/[0.08] text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="timezone" className="text-gray-300">
                    Timezone
                  </Label>
                  <Select
                    value={profile.timezone}
                    onValueChange={(value) =>
                      setProfile({ ...profile, timezone: value })
                    }
                  >
                    <SelectTrigger className="mt-1.5 bg-white/[0.05] border-white/[0.08] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-5">
                        Eastern Time (UTC-5)
                      </SelectItem>
                      <SelectItem value="UTC-6">
                        Central Time (UTC-6)
                      </SelectItem>
                      <SelectItem value="UTC-7">
                        Mountain Time (UTC-7)
                      </SelectItem>
                      <SelectItem value="UTC-8">
                        Pacific Time (UTC-8)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-6 border-t border-white/[0.08]">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/30">
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card className="border-white/[0.08] bg-card/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Target className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Learning Goals
                  </h2>
                  <p className="text-sm text-gray-400">
                    Set your study targets and preferences
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="dailyHours" className="text-gray-300">
                    Daily Study Goal (hours)
                  </Label>
                  <Input
                    id="dailyHours"
                    type="number"
                    value={goals.dailyHours}
                    onChange={(e) =>
                      setGoals({ ...goals, dailyHours: e.target.value })
                    }
                    className="mt-1.5 bg-white/[0.05] border-white/[0.08] text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="weeklyGoal" className="text-gray-300">
                    Weekly Study Goal (hours)
                  </Label>
                  <Input
                    id="weeklyGoal"
                    type="number"
                    value={goals.weeklyGoal}
                    onChange={(e) =>
                      setGoals({ ...goals, weeklyGoal: e.target.value })
                    }
                    className="mt-1.5 bg-white/[0.05] border-white/[0.08] text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="preferredTime" className="text-gray-300">
                    Preferred Study Time
                  </Label>
                  <Select
                    value={goals.preferredTime}
                    onValueChange={(value) =>
                      setGoals({ ...goals, preferredTime: value })
                    }
                  >
                    <SelectTrigger className="mt-1.5 bg-white/[0.05] border-white/[0.08] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">
                        Morning (6 AM - 12 PM)
                      </SelectItem>
                      <SelectItem value="afternoon">
                        Afternoon (12 PM - 6 PM)
                      </SelectItem>
                      <SelectItem value="evening">
                        Evening (6 PM - 10 PM)
                      </SelectItem>
                      <SelectItem value="night">
                        Night (10 PM - 2 AM)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-6 border-t border-white/[0.08]">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30">
                  <Save size={16} className="mr-2" />
                  Save Goals
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-white/[0.08] bg-card/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Bell className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Notifications
                  </h2>
                  <p className="text-sm text-gray-400">
                    Manage how you receive updates
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: "emailNotifications",
                    label: "Email Notifications",
                    description: "Receive updates via email",
                  },
                  {
                    key: "pushNotifications",
                    label: "Push Notifications",
                    description: "Browser push notifications",
                  },
                  {
                    key: "studyReminders",
                    label: "Study Reminders",
                    description: "Get reminded of your study schedule",
                  },
                  {
                    key: "weeklyReports",
                    label: "Weekly Reports",
                    description: "Receive weekly progress summaries",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      checked={
                        notifications[item.key as keyof typeof notifications]
                      }
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          [item.key]: checked,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="border-white/[0.08] bg-card/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <Palette className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Appearance
                  </h2>
                  <p className="text-sm text-gray-400">
                    Customize the look and feel
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-3 block">Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { name: "Dark", active: true },
                      { name: "Light", active: false },
                      { name: "Auto", active: false },
                    ].map((theme) => (
                      <button
                        key={theme.name}
                        className={`p-4 rounded-lg border transition-all ${
                          theme.active
                            ? "border-indigo-500 bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
                            : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="text-sm font-medium text-white mb-1">
                          {theme.name}
                        </div>
                        <div className="flex gap-1">
                          {theme.name === "Dark" && (
                            <>
                              <div className="w-6 h-6 rounded bg-gray-900" />
                              <div className="w-6 h-6 rounded bg-gray-700" />
                              <div className="w-6 h-6 rounded bg-gray-500" />
                            </>
                          )}
                          {theme.name === "Light" && (
                            <>
                              <div className="w-6 h-6 rounded bg-gray-100" />
                              <div className="w-6 h-6 rounded bg-gray-300" />
                              <div className="w-6 h-6 rounded bg-gray-500" />
                            </>
                          )}
                          {theme.name === "Auto" && (
                            <>
                              <div className="w-6 h-6 rounded bg-gradient-to-r from-gray-900 to-gray-100" />
                              <div className="w-6 h-6 rounded bg-gradient-to-r from-gray-700 to-gray-300" />
                              <div className="w-6 h-6 rounded bg-gradient-to-r from-gray-500 to-gray-500" />
                            </>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
