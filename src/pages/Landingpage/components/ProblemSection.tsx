import { motion } from "framer-motion";
import { HelpCircle, Compass, TrendingDown } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: HelpCircle,
      title: "Don't know what to learn?",
      description:
        "Overwhelmed by too many options and no clear direction for your career goals.",
    },
    {
      icon: Compass,
      title: "Too many courses online?",
      description:
        "Thousands of courses available, but which ones are actually worth your time?",
    },
    {
      icon: TrendingDown,
      title: "Lack of motivation?",
      description:
        "Start strong but lose momentum without proper tracking and accountability.",
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
            Struggling with Your Learning Journey?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            You're not alone. These are the most common challenges learners face
            today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <problem.icon className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{problem.title}</h3>
                <p className="text-slate-400">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
