import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ExternalLink,
  FileText,
  MessageSquare,
  BookOpen,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function CourseTabs() {
  const resources = [
    {
      id: 1,
      type: "video",
      title: "Advanced React Patterns - Full Tutorial",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      url: "https://youtube.com",
    },
    {
      id: 2,
      type: "article",
      title: "Understanding Modern JavaScript ES2024",
      thumbnail:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop",
      url: "https://example.com",
    },
    {
      id: 3,
      type: "docs",
      title: "Official React Documentation",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
      url: "https://react.dev",
    },
  ];

  return (
    <div className="mt-8 lg:mt-12">
      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b border-white/[0.08]">
          <TabsList className="bg-transparent border-0 p-0 h-auto w-full justify-start overflow-x-auto">
            <TabsTrigger
              value="overview"
              className="relative bg-transparent border-0 text-white/60 data-[state=active]:text-white data-[state=active]:bg-transparent rounded-none px-4 sm:px-6 py-3 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="relative bg-transparent border-0 text-white/60 data-[state=active]:text-white data-[state=active]:bg-transparent rounded-none px-4 sm:px-6 py-3 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Resources</span>
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="relative bg-transparent border-0 text-white/60 data-[state=active]:text-white data-[state=active]:bg-transparent rounded-none px-4 sm:px-6 py-3 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300"
            >
              <FileText className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Notes</span>
            </TabsTrigger>
            <TabsTrigger
              value="qa"
              className="relative bg-transparent border-0 text-white/60 data-[state=active]:text-white data-[state=active]:bg-transparent rounded-none px-4 sm:px-6 py-3 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-500 after:scale-x-0 data-[state=active]:after:scale-x-100 after:transition-transform after:duration-300"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Q&A</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-6">
          <div className="p-5 sm:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm border border-white/[0.08] shadow-xl">
            <h3 className="text-xl lg:text-2xl font-semibold mb-5">
              Lesson Overview
            </h3>
            <div className="space-y-4 text-white/70 leading-relaxed text-sm sm:text-base">
              <p>
                This comprehensive lesson covers the essential concepts you need
                to understand to progress in your learning journey. We'll
                explore practical applications and real-world examples that
                bridge theory and practice.
              </p>
              <p>
                You'll gain hands-on experience through interactive examples and
                learn best practices that industry professionals use daily in
                production environments.
              </p>
              <div className="mt-6 p-5 rounded-xl lg:rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 ring-1 ring-indigo-500/10">
                <h4 className="text-indigo-400 font-semibold mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-5 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full" />
                  What You'll Learn
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span>
                      Core concepts and fundamental principles that form the
                      foundation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                    <span>
                      Practical implementation techniques you can apply
                      immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span>Industry best practices and proven patterns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                    <span>
                      Common pitfalls and how to avoid them in real projects
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <div className="space-y-3 sm:space-y-4">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="p-4 sm:p-5 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm border border-white/[0.08] hover:border-indigo-500/30 transition-all group shadow-lg"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-36 h-24 sm:h-20 rounded-xl overflow-hidden bg-white/5 shrink-0 ring-1 ring-white/5">
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="mb-2 font-medium group-hover:text-indigo-400 transition-colors text-sm sm:text-base">
                      {resource.title}
                    </h4>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-3 font-medium">
                      {resource.type}
                    </p>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                    >
                      Open Resource
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <div className="p-5 sm:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm border border-white/[0.08] shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Your Notes</h3>
              <Button
                size="sm"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
            <textarea
              placeholder="Take notes while watching the lesson... Your notes are automatically saved."
              className="w-full h-64 sm:h-80 p-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none resize-none text-white/90 placeholder:text-white/30 transition-all"
            />
          </div>
        </TabsContent>

        <TabsContent value="qa" className="mt-6">
          <div className="p-5 sm:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm border border-white/[0.08] shadow-xl">
            <h3 className="text-xl font-semibold mb-5">Questions & Answers</h3>
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-sm font-medium shrink-0">
                    JD
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1">
                      <span className="text-white font-medium">John Doe</span>
                      <span className="text-white/40 ml-2">2 days ago</span>
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      How do I implement this pattern in a production
                      environment with real-time data?
                    </p>
                  </div>
                </div>
                <div className="ml-12 p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
                  <p className="text-sm text-white/70 leading-relaxed">
                    Great question! In production, you'll want to consider
                    performance optimizations, error handling, and proper state
                    management. Here's what I recommend...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
