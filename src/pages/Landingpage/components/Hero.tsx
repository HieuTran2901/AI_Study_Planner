import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-200">
                Powered by Advanced AI
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Build Your Personalized{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                Learning Roadmap
              </span>{" "}
              with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Transform your learning journey with AI-powered roadmaps,
              intelligent course discovery, and smart progress tracking. Achieve
              your goals faster than ever before.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                Generate My Roadmap
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                Explore Features
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -left-6 w-64 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
                  <div>
                    <div className="w-24 h-3 bg-white/40 rounded mb-1"></div>
                    <div className="w-16 h-2 bg-white/20 rounded"></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="w-full h-2 bg-white/30 rounded"></div>
                  <div className="w-3/4 h-2 bg-white/20 rounded"></div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-6 -right-6 w-56 h-40 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-20 h-3 bg-white/40 rounded"></div>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-400"></div>
                  </div>
                  <div className="w-full h-2 bg-white/30 rounded"></div>
                  <div className="w-4/5 h-2 bg-white/20 rounded"></div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-12 bg-white/20 rounded-lg"></div>
                    <div className="flex-1 h-12 bg-white/20 rounded-lg"></div>
                  </div>
                </div>
              </motion.div>

              {/* Main Dashboard Card */}
              <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-32 h-4 bg-white/40 rounded"></div>
                    <div className="w-20 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-white/10 rounded-xl p-3">
                      <div className="w-16 h-3 bg-white/30 rounded mb-2"></div>
                      <div className="w-20 h-6 bg-white/40 rounded"></div>
                    </div>
                    <div className="h-24 bg-white/10 rounded-xl p-3">
                      <div className="w-16 h-3 bg-white/30 rounded mb-2"></div>
                      <div className="w-20 h-6 bg-white/40 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-white/10 rounded-lg p-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400"></div>
                        <div className="flex-1 space-y-1">
                          <div className="w-32 h-2 bg-white/40 rounded"></div>
                          <div className="w-24 h-2 bg-white/20 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
