import { useState } from "react";
import {
  Search,
  User,
  Calendar,
  TrendingUp,
  CreditCard,
  Bot,
  Wrench,
  ChevronDown,
  Send,
  MessageCircle,
  Bell,
  CheckCircle,
  Info,
  Sparkles,
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

const helpCategories = [
  {
    id: 1,
    icon: User,
    title: "Account Issues",
    description: "Login, password, profile settings",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    icon: Calendar,
    title: "Study Plans",
    description: "Create and manage learning schedules",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "View stats, goals, achievements",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    icon: CreditCard,
    title: "Billing & Subscription",
    description: "Plans, payments, invoices",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    icon: Bot,
    title: "AI Assistant",
    description: "Using AI features, recommendations",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 6,
    icon: Wrench,
    title: "Technical Issues",
    description: "Bugs, performance, browser issues",
    color: "from-slate-500 to-zinc-500",
  },
];

const faqs = [
  {
    id: 1,
    question: "How do I create a personalized study plan?",
    answer:
      'Go to the Study Plans section and click "Create New Plan". Our AI will analyze your learning goals, available time, and preferences to generate a customized schedule. You can adjust the plan anytime and the AI will adapt to your progress.',
  },
  {
    id: 2,
    question: "How does progress tracking work?",
    answer:
      "Your progress is automatically tracked as you complete study sessions. Visit the Progress dashboard to see detailed analytics including study hours, completion rates, streak tracking, and course progress. Charts and graphs help visualize your learning journey.",
  },
  {
    id: 3,
    question: "How can I upgrade my account to Premium?",
    answer:
      'Click on your profile icon in the top right, select "Subscription", and choose the Premium plan. Premium includes unlimited AI assistance, advanced analytics, priority support, and exclusive study tools. All plans come with a 14-day free trial.',
  },
  {
    id: 4,
    question: "What can the AI Assistant help me with?",
    answer:
      "The AI Assistant can answer study questions, explain complex topics, generate practice problems, recommend resources, adjust your study schedule, provide motivation, and track your learning patterns. Simply type your question or click the chat icon to start.",
  },
  {
    id: 5,
    question: "How do I reset my password?",
    answer:
      "Click \"Forgot Password\" on the login page. Enter your email address and we'll send you a secure link to reset your password. The link expires in 1 hour for security. If you don't receive the email, check your spam folder.",
  },
  {
    id: 6,
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time from the Billing section. You'll retain Premium access until the end of your current billing period. No cancellation fees apply, and you can resubscribe whenever you want.",
  },
];

const supportTips = [
  {
    id: 1,
    icon: CheckCircle,
    title: "All Systems Operational",
    description: "All services running smoothly",
    color: "text-emerald-400",
    bg: "from-emerald-500/10 to-teal-500/10",
  },
  {
    id: 2,
    icon: Sparkles,
    title: "New AI Features",
    description: "Enhanced study recommendations available",
    color: "text-purple-400",
    bg: "from-purple-500/10 to-pink-500/10",
  },
  {
    id: 3,
    icon: Info,
    title: "Pro Tip",
    description: "Study in 25-minute focused sessions",
    color: "text-blue-400",
    bg: "from-blue-500/10 to-cyan-500/10",
  },
];

export default function HelpAndSupport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl font-semibold mb-3 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            Help & Support
          </h1>
          <p className="text-slate-400 text-lg">
            We're here to help you succeed in your learning journey
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Search Bar */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              placeholder="How can we help you?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-900/50 border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 backdrop-blur-xl transition-all duration-300 outline-none text-lg placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Quick Help Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Quick Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {helpCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  className="text-left p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">{category.title}</h3>
                  <p className="text-sm text-slate-400">
                    {category.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10">
            <Accordion.Root type="single" collapsible className="space-y-3">
              {faqs.map((faq) => (
                <Accordion.Item
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className="rounded-xl bg-slate-800/40 border border-white/5 overflow-hidden hover:border-indigo-500/30 transition-all duration-300"
                >
                  <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-slate-800/60 transition-colors">
                    <span className="font-medium group-hover:text-indigo-300 transition-colors pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-all duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="px-6 pb-4 pt-2 text-slate-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Support Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Contact Support</h2>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10">
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 outline-none"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 outline-none resize-none"
                    placeholder="Describe your issue or question..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/30 font-medium"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Support Tips */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Status & Tips</h2>
            <div className="space-y-4">
              {supportTips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <div
                    key={tip.id}
                    className={`p-5 rounded-2xl bg-gradient-to-br ${tip.bg} backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon
                        className={`w-6 h-6 ${tip.color} flex-shrink-0 mt-0.5`}
                      />
                      <div>
                        <h3 className="font-semibold mb-1">{tip.title}</h3>
                        <p className="text-sm text-slate-400">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Quick Contact Info */}
              <div className="mt-6 p-5 rounded-2xl bg-slate-800/40 border border-white/10">
                <h3 className="font-semibold mb-3">Response Time</h3>
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex justify-between">
                    <span>Email Support:</span>
                    <span className="text-slate-300">24-48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Live Chat:</span>
                    <span className="text-emerald-400">Instant</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Premium Support:</span>
                    <span className="text-purple-400">Priority</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <div className="mb-4 w-80 rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-indigo-500/20 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"></div>
                <span className="font-medium">AI Assistant</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="w-6 h-6 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="p-4 h-80 overflow-y-auto space-y-3">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-800/60 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                  <p className="text-sm">
                    Hi! I'm your AI study assistant. How can I help you today?
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-2 text-xs rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 transition-colors">
                  Study plan tips
                </button>
                <button className="px-3 py-2 text-xs rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 transition-colors">
                  Track progress
                </button>
                <button className="px-3 py-2 text-xs rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 transition-colors">
                  Account help
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-800/50 border border-white/10 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm"
                />
                <button className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center justify-center hover:scale-105">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}
