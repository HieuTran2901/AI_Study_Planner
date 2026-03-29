import { motion } from "framer-motion";
import { Brain, Target, Zap } from "lucide-react";

export function SolutionSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              {/* Roadmap Visual */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Brain className="w-8 h-8 text-purple-400" />
                  <div>
                    <div className="font-bold text-lg">AI Analysis</div>
                    <div className="text-sm text-slate-400">
                      Processing your goals...
                    </div>
                  </div>
                </div>

                <div className="relative ml-4 pl-6 border-l-2 border-purple-500/30 space-y-6">
                  {[
                    {
                      title: "Fundamentals",
                      progress: 100,
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      title: "Intermediate",
                      progress: 60,
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      title: "Advanced",
                      progress: 20,
                      color: "from-purple-500 to-pink-500",
                    },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2, duration: 0.5 }}
                      className="relative"
                    >
                      <div
                        className={`absolute -left-[26px] w-3 h-3 rounded-full bg-gradient-to-r ${step.color}`}
                      ></div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{step.title}</span>
                          <span className="text-sm text-slate-400">
                            {step.progress}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${step.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 + 0.3, duration: 0.8 }}
                            className={`h-full bg-gradient-to-r ${step.color}`}
                          ></motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-6 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span className="font-bold">AI-Powered</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Smart Solution</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              AI That Understands Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Learning Goals
              </span>
            </h2>

            <p className="text-xl text-slate-300 mb-8">
              Our advanced AI analyzes your goals, current skill level, and
              learning preferences to create a personalized roadmap that adapts
              as you progress.
            </p>

            <div className="space-y-4">
              {[
                "Personalized learning paths based on your goals",
                "Smart course recommendations from top platforms",
                "Real-time progress tracking and insights",
                "Adaptive difficulty adjustments as you learn",
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-slate-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
