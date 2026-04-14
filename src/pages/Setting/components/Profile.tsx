import { useState, useEffect } from "react";
import { Palette, Save, X, Camera } from "lucide-react";
import useUser from "@/hooks/useUser";

export default function Profile() {
  const { user, isLoading } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "Passionate learner and frontend developer who loves building beautiful and functional applications.",
  });

  // update form data when user data is loaded
  useEffect(() => {
    if (!user) return;

    const timer = setTimeout(() => {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        bio:
          user.bio ||
          "Passionate learner and frontend developer who loves building beautiful and functional applications.",
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [user]);

  const handleSave = () => {
    // handle api update profile data here
    console.log("Saving profile data:", formData);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-slate-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900/70 to-slate-800/50 backdrop-blur-xl border border-white/10">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-7xl shadow-2xl overflow-hidden">
              {user?.fullName ? user.fullName[0].toUpperCase() : "👤"}
            </div>

            <button className="absolute bottom-2 right-2 w-10 h-10 rounded-2xl bg-slate-900 border border-white/30 flex items-center justify-center hover:bg-indigo-600 transition-all group-hover:scale-110">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Click avatar to change photo
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                disabled={!isEditing}
                className={`w-full px-5 py-3.5 rounded-2xl bg-slate-800/60 border transition-all outline-none ${
                  isEditing
                    ? "border-indigo-500 focus:ring-4 focus:ring-indigo-500/30"
                    : "border-white/10"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={!isEditing}
                className={`w-full px-5 py-3.5 rounded-2xl bg-slate-800/60 border transition-all outline-none ${
                  isEditing
                    ? "border-indigo-500 focus:ring-4 focus:ring-indigo-500/30"
                    : "border-white/10"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled={!isEditing}
                className={`w-full px-5 py-3.5 rounded-2xl bg-slate-800/60 border transition-all outline-none ${
                  isEditing
                    ? "border-indigo-500 focus:ring-4 focus:ring-indigo-500/30"
                    : "border-white/10"
                }`}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Bio
            </label>
            <textarea
              rows={5}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              disabled={!isEditing}
              className={`w-full px-5 py-4 rounded-3xl bg-slate-800/60 border transition-all outline-none resize-y min-h-[120px] ${
                isEditing
                  ? "border-indigo-500 focus:ring-4 focus:ring-indigo-500/30"
                  : "border-white/10"
              }`}
              placeholder="Tell others about yourself..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-12">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 font-medium hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Palette className="w-5 h-5" />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 font-medium hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all font-medium flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Account Information */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
        <h3 className="font-medium mb-4 text-slate-300">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Member since</span>
            <span className="text-slate-300">March 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Account Type</span>
            <span className="text-emerald-400 font-medium">Premium</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Last login</span>
            <span className="text-slate-300">Today at 10:45 AM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Last updated</span>
            <span className="text-slate-300">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
