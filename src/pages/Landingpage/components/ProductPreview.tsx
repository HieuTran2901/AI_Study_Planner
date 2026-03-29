import { motion } from "framer-motion";
import { LayoutDashboard, GitBranch, Timer, BarChart2 } from "lucide-react";

export function ProductPreview() {
  const screens = [
    {
      icon: LayoutDashboard,
      title: "Dashboard Overview",
      description: "Monitor your entire learning journey at a glance",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: GitBranch,
      title: "Roadmap Timeline",
      description: "Visual representation of your learning path",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Timer,
      title: "Study Timer (Pomodoro)",
      description: "Stay focused with built-in productivity tools",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: BarChart2,
      title: "Progress Analytics",
      description: "Detailed insights into your learning patterns",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Beautiful UI,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Experience a platform designed for modern learners
          </p>
        </motion.div>

        {/* Main Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-16"
        >
          <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Mock Dashboard Cards */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500"></div>
                      <div>
                        <div className="w-24 h-3 bg-white/40 rounded mb-1.5"></div>
                        <div className="w-16 h-2 bg-white/20 rounded"></div>
                      </div>
                    </div>
                    <div className="w-20 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-white/30 rounded"></div>
                    <div className="w-4/5 h-2 bg-white/20 rounded"></div>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "65%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    ></motion.div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-20 h-3 bg-white/40 rounded"></div>
                    <Timer className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="flex items-center justify-center py-8">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full border-8 border-slate-700"></div>
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileInView={{ rotate: 270 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0 w-32 h-32 rounded-full border-8 border-transparent border-t-orange-500 border-r-orange-500"
                      ></motion.div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold">25:00</div>
                          <div className="text-xs text-slate-400">
                            Focus Time
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Visualization */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <GitBranch className="w-6 h-6 text-blue-400" />
                  <div className="w-32 h-4 bg-white/40 rounded"></div>
                </div>
                <div className="flex items-center gap-4 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex-shrink-0 w-32 h-24 bg-white/10 rounded-xl p-3"
                    >
                      <div className="w-20 h-2 bg-white/30 rounded mb-2"></div>
                      <div className="w-16 h-2 bg-white/20 rounded mb-3"></div>
                      <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-blue-500 to-cyan-500`}
                          style={{ width: `${100 - i * 15}%` }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {screens.map((screen, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${screen.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <screen.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2">{screen.title}</h3>
              <p className="text-sm text-slate-400">{screen.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
