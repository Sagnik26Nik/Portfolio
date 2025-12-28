import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Cloud, Brain, Terminal, Wrench, Zap, Users, Target, TrendingUp } from "lucide-react";

const skills = {
  "Languages": { icon: Code2, items: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "C++", "Dart"] },
  "Frameworks": { icon: Terminal, items: ["React", "Flask", "FastAPI", "Node.js", "Flutter"] },
  "Databases": { icon: Database, items: ["PostgreSQL", "MySQL", "Redis", "Firebase"] },
  "Cloud & DevOps": { icon: Cloud, items: ["Azure", "AWS", "Docker", "Kubernetes"] },
  "AI/ML": { icon: Brain, items: ["Azure OpenAI", "GPT-4", "FAISS", "HuggingFace"] },
  "Tools": { icon: Wrench, items: ["Git", "Linux", "Nginx", "Gunicorn"] },
};

const stats = [
  { value: "100K+", label: "Records Processed", icon: Database, color: "from-blue-500 to-cyan-500" },
  { value: "99.9%", label: "Data Accuracy", icon: Target, color: "from-green-500 to-emerald-500" },
  { value: "40%", label: "Latency Reduction", icon: Zap, color: "from-yellow-500 to-orange-500" },
  { value: "50+", label: "Students Mentored", icon: Users, color: "from-purple-500 to-pink-500" },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-24 sm:py-32 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="section-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                About <span className="gradient-text">Me</span>
              </h2>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full border-2 border-dashed border-primary/30"
              />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              From rural India to Georgia's tech scene — building systems that matter.
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Bio Card - Spans 2 columns */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 glass-card p-8 rounded-2xl"
            >
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  I build <span className="text-foreground font-semibold">scalable data infrastructure</span> by finding hidden mathematical structure in computational problems.
                </p>
                <p>
                  Currently pursuing my Master's in Computer Science at{" "}
                  <span className="text-foreground font-medium">Georgia State University</span> with a{" "}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold">3.93 GPA</span>, 
                  where I architect production systems serving thousands of users while researching sparse computational optimization.
                </p>
                <p>
                  My journey started in rural India where internet arrived in 2018. Since then, I've built systems processing{" "}
                  <span className="text-foreground font-medium">100,000+ records</span>, reduced query latency by{" "}
                  <span className="text-foreground font-medium">40%</span>, and mentored{" "}
                  <span className="text-foreground font-medium">50+ students</span>.
                </p>
              </div>

              {/* Seeking badge */}
              <motion.div
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1 }}
                className="mt-6 inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
              >
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  Seeking <span className="text-primary">Summer 2026</span> Software Engineering Internships
                </span>
              </motion.div>
            </motion.div>

            {/* Stats Grid - 2x2 in one column */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card p-4 rounded-xl text-center group"
                >
                  <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-2`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Skills Section - Full width */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 glass-card p-8 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Technical Arsenal</h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(skills).map(([category, { icon: Icon, items }]) => (
                  <motion.div
                    key={category}
                    whileHover={{ y: -4 }}
                    className="space-y-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        {category}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <motion.span
                          key={skill}
                          whileHover={{ scale: 1.05 }}
                          className="skill-tag cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
