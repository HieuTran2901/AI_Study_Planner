import { Outlet, Link, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  Map,
  GraduationCap,
  Timer,
  TrendingUp,
  Settings,
  Search,
  Bell,
  User,
  LogOut,
  Clock,
  UserCircle,
  HelpCircle,
  ChevronLeft,
  Sparkles,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/roadmap", label: "My Roadmap", icon: Map },
  { path: "/courses", label: "Courses", icon: GraduationCap },
  { path: "/timer", label: "Study Timer", icon: Timer },
  { path: "/progress", label: "Progress", icon: TrendingUp },
  { path: "/settings", label: "Settings", icon: Settings },
];

// Mock data
const notifications = [
  {
    id: 1,
    title: "Your study session is ready",
    message: "Time to continue React Development roadmap",
    time: "2 min ago",
    type: "study",
    read: false,
  },
  {
    id: 2,
    title: "New course recommended",
    message: "“Advanced TypeScript” matches your learning goals",
    time: "1 hour ago",
    type: "course",
    read: false,
  },
  {
    id: 3,
    title: "Progress milestone",
    message: "You've completed 80% of JavaScript module",
    time: "Yesterday",
    type: "progress",
    read: true,
  },
  {
    id: 4,
    title: "Daily streak 🔥",
    message: "You've studied for 7 days in a row!",
    time: "Yesterday",
    type: "streak",
    read: true,
  },
];

export function Layout() {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    if (isNotificationOpen) setIsNotificationOpen(false); // Close notifications if profile dropdown is opened
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (isProfileDropdownOpen) setIsProfileDropdownOpen(false); // Close profile dropdown if notifications is opened
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 border-r border-white/[0.08] bg-gradient-to-b from-[#0a0a0f] to-[#11111b] transition-all duration-300 ${
          isSidebarCollapsed ? "lg:w-20" : "lg:w-64"
        } ${
          isMobileMenuOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">
                  AI Study Planner
                </h1>
                <p className="text-xs text-gray-400">Smart Learning</p>
              </div>
            </div>
          )}
          {isSidebarCollapsed && (
            <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
          )}
          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white shadow-lg shadow-indigo-500/10"
                    : "text-gray-400 hover:bg-white/[0.05] hover:text-gray-200"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-r" />
                )}
                <Icon size={20} className={isActive ? "text-indigo-400" : ""} />
                {!isSidebarCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* AI Assistant Button */}
        <div className="absolute bottom-24 left-0 right-0 px-3">
          <button
            onClick={() => setShowAIChat(!showAIChat)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 transition-all ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <MessageSquare size={20} />
            {!isSidebarCollapsed && (
              <span className="text-sm font-medium">AI Assistant</span>
            )}
          </button>
        </div>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/[0.08]">
          <div
            className={`flex items-center gap-3 ${isSidebarCollapsed ? "justify-center" : ""}`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Alex Johnson
                </p>
                <p className="text-xs text-gray-400 truncate">Premium Member</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Button - Desktop Only */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#18181b] border border-white/[0.08] items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/20 transition-all"
        >
          <ChevronLeft
            size={14}
            className={`transition-transform ${isSidebarCollapsed ? "rotate-180" : ""}`}
          />
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-white/[0.08] bg-[#0a0a0f]/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 z-50">
          {/* Left Section - Hamburger Menu (Mobile) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white transition-all"
            >
              <Menu size={20} />
            </button>

            {/* Logo (Mobile) */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <h1 className="text-base font-bold text-white">AI Study</h1>
            </div>
          </div>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                name="search"
                placeholder="Search courses, topics..."
                autoComplete="off"
                className="pl-10 bg-white/[0.05] border-white/[0.08] text-white placeholder:text-gray-500 focus:bg-white/[0.08] focus:border-indigo-500/50"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Icon (Mobile/Tablet) */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="md:hidden w-10 h-10 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center transition-all"
            >
              <Search size={18} className="text-gray-400" />
            </button>

            {/* Notifications */}
            <div className="relative z-[55]" ref={notificationRef}>
              <button
                onClick={toggleNotification}
                className="relative w-10 h-10 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center transition-all group"
              >
                <Bell
                  size={18}
                  className="text-gray-400 group-hover:text-white"
                />
                {/* Red dot */}
                {notifications.some((n) => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0a0a0f]" />
                )}
              </button>

              {/* Notification Dropdown - Đã fix vị trí */}
              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-80 bg-[#11111b] border border-white/[0.08] rounded-2xl shadow-2xl py-2 z-[70] overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/[0.08] flex items-center justify-between">
                      <h3 className="font-semibold text-white">
                        Notifications
                      </h3>
                      <span className="text-xs px-2.5 py-1 bg-white/[0.08] rounded-full text-gray-400">
                        {notifications.filter((n) => !n.read).length} new
                      </span>
                    </div>

                    <div className="max-h-[380px] overflow-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 border-b border-white/[0.08] hover:bg-white/[0.03] transition-colors ${!notif.read ? "bg-indigo-500/5" : ""}`}
                        >
                          <div className="flex gap-3">
                            <div className="mt-0.5">
                              {notif.type === "study" && (
                                <Clock size={18} className="text-indigo-400" />
                              )}
                              {notif.type === "course" && (
                                <Sparkles
                                  size={18}
                                  className="text-purple-400"
                                />
                              )}
                              {notif.type === "progress" && (
                                <TrendingUp
                                  size={18}
                                  className="text-emerald-400"
                                />
                              )}
                              {notif.type === "streak" && (
                                <span className="text-xl">🔥</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white font-medium leading-tight">
                                {notif.title}
                              </p>
                              <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">
                                {notif.message}
                              </p>
                              <p className="text-[10px] text-gray-500 mt-2">
                                {notif.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 border-t border-white/[0.08]">
                      <button className="w-full py-2.5 text-sm font-medium text-indigo-400 hover:bg-white/[0.05] rounded-xl transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative z-50" ref={profileRef}>
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] transition-all active:scale-95"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-white">Alex Johnson</p>
                  <p className="text-xs text-gray-400">Premium</p>
                </div>
                <ChevronLeft
                  size={16}
                  className={`transition-transform duration-200 ${isProfileDropdownOpen ? "rotate-90" : "-rotate-90"}`}
                />
              </button>

              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-64 bg-[#11111b] border border-white/[0.08] rounded-2xl shadow-2xl py-2 overflow-hidden z-[60]"
                  >
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-white/[0.08]">
                      <p className="font-medium text-white">Alex Johnson</p>
                      <p className="text-sm text-gray-400">Premium Member</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.05] hover:text-white transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <UserCircle size={18} />
                        View Profile
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.05] hover:text-white transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <Settings size={18} />
                        Settings
                      </Link>

                      <Link
                        to="/help"
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.05] hover:text-white transition-colors"
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                        }}
                      >
                        <HelpCircle size={18} />
                        Help & Support
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-white/[0.08] pt-2 mt-2">
                      <button
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                        onClick={() => {
                          alert("Logged out");
                          setIsProfileDropdownOpen(false);
                        }}
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Icon Only - Mobile */}
            <button className="md:hidden w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
              <User size={18} className="text-white" />
            </button>
          </div>
        </header>

        {/* Expanded Search Bar (Mobile) */}
        {isSearchExpanded && (
          <div className="md:hidden px-4 py-3 border-b border-white/[0.08] bg-[#0a0a0f]">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Search courses, topics..."
                className="pl-10 bg-white/[0.05] border-white/[0.08] text-white placeholder:text-gray-500"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* AI Chat Panel */}
      {showAIChat && (
        <>
          {/* Mobile/Tablet Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowAIChat(false)}
          />

          {/* Chat Panel */}
          <div
            className={`fixed lg:relative inset-y-0 right-0 z-50 w-full sm:w-96 border-l border-white/[0.08] bg-gradient-to-b from-[#0a0a0f] to-[#11111b] flex flex-col transition-transform duration-300 ${
              showAIChat ? "translate-x-0" : "translate-x-full lg:translate-x-0"
            }`}
          >
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Assistant</h3>
                  <p className="text-xs text-gray-400">Ask me anything</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIChat(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="flex-1 p-4 overflow-auto">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles size={14} className="text-white" />
                  </div>
                  <div className="flex-1 bg-white/[0.05] rounded-lg p-3 border border-white/[0.08]">
                    <p className="text-sm text-gray-300">
                      Hi! I'm your AI study assistant. I can help you with:
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-gray-400">
                      <li>• Suggesting next topics to learn</li>
                      <li>• Creating study schedules</li>
                      <li>• Answering questions</li>
                      <li>• Tracking your progress</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-gray-500 px-1">
                    Suggested Questions:
                  </p>
                  <button className="w-full text-left p-3 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-sm text-gray-300 transition-all">
                    What should I learn next?
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-sm text-gray-300 transition-all">
                    How am I progressing?
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-sm text-gray-300 transition-all">
                    Create a study plan for this week
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/[0.08]">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask AI anything..."
                  className="flex-1 bg-white/[0.05] border-white/[0.08] text-white placeholder:text-gray-500"
                />
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/30">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
