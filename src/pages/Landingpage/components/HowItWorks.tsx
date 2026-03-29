import { motion } from "framer-motion";
import { Target, Cpu, TrendingUp } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Target,
      title: "Enter Your Goal",
      description:
        "Tell us what you want to learn or achieve. Be specific about your career goals and interests.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      number: "02",
      icon: Cpu,
      title: "AI Builds Roadmap",
      description:
        "Our advanced AI analyzes thousands of courses and creates a personalized learning path just for you.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      number: "03",
      icon: TrendingUp,
      title: "Track & Improve",
      description:
        "Follow your roadmap, track progress, and watch yourself grow. Get insights and recommendations along the way.",
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get started in three simple steps and transform your learning
            journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines (hidden on mobile) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-green-500/30"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-300 group hover:scale-105">
                {/* Number Badge */}
                <div
                  className={`absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-2xl font-bold shadow-lg`}
                >
                  {step.number}
                </div>

                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Decorative Element */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
