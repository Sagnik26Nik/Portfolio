import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Database, Brain, Eye, TrendingUp, ArrowUpRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "NSF-CoSEA Teacher Portal",
    description: "Flask/PostgreSQL platform serving 2,000+ Georgia schools with geospatial data processing.",
    longDescription: "Built a comprehensive educational platform processing 100,000+ records with optimized PostGIS queries, reducing latency by 40%.",
    tech: ["Flask", "PostgreSQL", "PostGIS", "Python", "JavaScript"],
    icon: Database,
    category: "Backend",
    github: "https://github.com/Sagnik26Nik",
    live: null,
    metrics: ["2,000+ Schools", "40% Faster", "99.9% Accuracy"],
    gradient: "from-blue-500 to-cyan-500",
    featured: true,
  },
  {
    title: "Market Sphere",
    description: "Real-time AI trading simulation with sub-500ms latency using Azure Databricks.",
    longDescription: "Developed an AI-powered trading platform with real-time market analysis and portfolio optimization.",
    tech: ["React", "FastAPI", "Azure", "Databricks", "PostgreSQL"],
    icon: TrendingUp,
    category: "Full-Stack",
    github: "https://github.com/Sagnik26Nik",
    live: null,
    metrics: ["Sub-500ms", "Real-time", "AI-Powered"],
    gradient: "from-green-500 to-emerald-500",
    featured: true,
  },
  {
    title: "MCP Data Lake Agent",
    description: "Natural Language to SQL achieving 89% precision with Azure OpenAI.",
    longDescription: "Created an intelligent data querying system that translates natural language into optimized SQL queries.",
    tech: ["Python", "GPT-4", "FAISS", "PostgreSQL", "Azure OpenAI"],
    icon: Brain,
    category: "AI/ML",
    github: "https://github.com/Sagnik26Nik",
    live: null,
    metrics: ["89% Precision", "NL2SQL", "Vector Search"],
    gradient: "from-purple-500 to-pink-500",
    featured: false,
  },
  {
    title: "Real-Time CV Platform",
    description: "30 FPS camera processing with MediaPipe for gesture recognition.",
    longDescription: "Built a web-based computer vision application with real-time video processing.",
    tech: ["OpenCV", "Python", "JavaScript", "MediaPipe"],
    icon: Eye,
    category: "AI/ML",
    github: "https://github.com/Sagnik26Nik",
    live: "https://computer-vision-1-ro8u.onrender.com",
    metrics: ["30 FPS", "Real-time ML", "Deployed"],
    gradient: "from-orange-500 to-red-500",
    featured: false,
  },
];

const categories = ["All", "Full-Stack", "Backend", "AI/ML"];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = projects.filter(
    (project) => activeFilter === "All" || project.category === activeFilter
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="projects" className="py-24 sm:py-32 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="section-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Layers className="h-8 w-8 text-primary" />
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                  Featured <span className="gradient-text">Projects</span>
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-xl">
                A selection of projects showcasing my expertise in building scalable, production-ready systems.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`group relative ${project.featured ? "md:col-span-1" : ""}`}
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="h-full glass-card rounded-2xl overflow-hidden"
                  >
                    {/* Gradient accent */}
                    <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />

                    <div className="p-6 sm:p-8 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} shadow-lg`}
                        >
                          <project.icon className="h-6 w-6 text-white" />
                        </motion.div>
                        <div className="flex gap-2">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                          >
                            <Github className="h-5 w-5" />
                          </motion.a>
                          {project.live && (
                            <motion.a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1, y: -2 }}
                              className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                            >
                              <ExternalLink className="h-5 w-5" />
                            </motion.a>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Metrics */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.metrics.map((metric) => (
                            <span
                              key={metric}
                              className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${project.gradient} bg-opacity-10 text-foreground`}
                              style={{
                                background: `linear-gradient(135deg, hsla(var(--primary), 0.1), hsla(var(--accent), 0.1))`,
                              }}
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-muted-foreground border border-border/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover overlay effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.title ? 1 : 0 }}
                      className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-5 pointer-events-none`}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View All Button */}
          <motion.div variants={itemVariants} className="text-center pt-8">
            <Button
              asChild
              size="lg"
              className="group glass-card border-border/50 hover:border-primary/50 bg-transparent hover:bg-primary/5"
              variant="outline"
            >
              <a
                href="https://github.com/Sagnik26Nik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                View All Projects on GitHub
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
