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
  ChevronLeft,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/roadmap", label: "My Roadmap", icon: Map },
  { path: "/courses", label: "Courses", icon: GraduationCap },
  { path: "/timer", label: "Study Timer", icon: Timer },
  { path: "/progress", label: "Progress", icon: TrendingUp },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Layout() {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Sidebar */}
      <aside
        className={`relative border-r border-white/[0.08] bg-gradient-to-b from-[#0a0a0f] to-[#11111b] transition-all duration-300 ${
          isSidebarCollapsed ? "w-20" : "w-64"
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

        {/* Collapse Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#18181b] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/20 transition-all"
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
        <header className="h-16 border-b border-white/[0.08] bg-[#0a0a0f]/80 backdrop-blur-xl flex items-center justify-between px-6">
          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors"
                size={18}
              />
              <Input
                placeholder="Search courses, topics..."
                className="pl-10 w-full 
                 bg-zinc-900/80 border border-zinc-700 
                 text-white placeholder:text-gray-500 
                 focus:bg-zinc-900 
                 focus:border-indigo-500 
                 focus:ring-2 focus:ring-indigo-500/30 
                 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]
                 transition-all duration-200 
                 rounded-2xl h-11"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative w-10 h-10 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center transition-all group">
              <Bell
                size={18}
                className="text-gray-400 group-hover:text-white"
              />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-[#0a0a0f]" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-white">Alex Johnson</p>
                <p className="text-xs text-gray-400">Premium</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* AI Chat Panel */}
      {showAIChat && (
        <div className="w-96 border-l border-white/[0.08] bg-gradient-to-b from-[#0a0a0f] to-[#11111b] flex flex-col">
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
      )}
    </div>
  );
}
