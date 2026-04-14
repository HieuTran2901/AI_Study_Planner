import * as Switch from "@radix-ui/react-switch";
import { Trash2, LogOut, Eye, EyeOff, Smartphone } from "lucide-react";
import { useState } from "react";

function Security() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    profileVisibility: "private",
    activityTracking: true,
  });

  const loginSessions = [
    {
      id: 1,
      device: "Chrome on MacBook Pro",
      location: "San Francisco, CA",
      lastActive: "5 minutes ago",
      current: true,
    },
    {
      id: 2,
      device: "Safari on iPhone 14",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: 3,
      device: "Firefox on Windows",
      location: "New York, NY",
      lastActive: "3 days ago",
      current: false,
    },
  ];
  return (
    <div className="space-y-6">
      {/* <div>
        <h2 className="text-2xl font-semibold mb-2">Privacy & Security</h2>
        <p className="text-slate-400">
          Protect your account and manage your privacy settings
        </p>
      </div> */}

      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 space-y-6">
        <div>
          <h3 className="font-medium mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.current ? "text" : "password"}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-800/50 border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none"
                  placeholder="Enter current password"
                />
                <button
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      current: !showPassword.current,
                    })
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword.current ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.new ? "text" : "password"}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-800/50 border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none"
                  placeholder="Enter new password"
                />
                <button
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      new: !showPassword.new,
                    })
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword.new ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-800/50 border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none"
                  placeholder="Confirm new password"
                />
                <button
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirm: !showPassword.confirm,
                    })
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword.confirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <button className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all">
              Update Password
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-white/5">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-slate-400">
                Add an extra layer of security
              </p>
            </div>
            <Switch.Root
              checked={security.twoFactor}
              onCheckedChange={(checked) =>
                setSecurity({ ...security, twoFactor: checked })
              }
              className="w-11 h-6 bg-slate-700 rounded-full relative data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-600 data-[state=checked]:to-teal-600 transition-all outline-none cursor-pointer"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-300 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="font-medium mb-4">Active Sessions</h3>
          <div className="space-y-3">
            {loginSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-xl bg-slate-800/40 border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm flex items-center gap-2">
                      {session.device}
                      {session.current && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400">
                          Current
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-400">
                      {session.location} • {session.lastActive}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <button className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="font-medium mb-4">Privacy Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Profile Visibility
              </label>
              <select
                value={security.profileVisibility}
                onChange={(e) =>
                  setSecurity({
                    ...security,
                    profileVisibility: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none"
              >
                <option value="public">Public - Visible to everyone</option>
                <option value="private">Private - Only visible to you</option>
                <option value="friends">
                  Friends - Visible to connections only
                </option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-white/5">
              <div>
                <p className="font-medium">Activity Tracking</p>
                <p className="text-sm text-slate-400">
                  Help us improve with usage analytics
                </p>
              </div>
              <Switch.Root
                checked={security.activityTracking}
                onCheckedChange={(checked) =>
                  setSecurity({ ...security, activityTracking: checked })
                }
                className="w-11 h-6 bg-slate-700 rounded-full relative data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-600 data-[state=checked]:to-purple-600 transition-all outline-none cursor-pointer"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-300 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="p-6 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
            <div className="flex items-start gap-3 mb-4">
              <Trash2 className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-300">Delete Account</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
              </div>
            </div>
            <button className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-all font-medium">
              Delete My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Security;
