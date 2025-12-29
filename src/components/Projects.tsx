import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Database, Brain, ArrowUpRight, Layers, Cpu, Smartphone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "NSF-CoSEA Teacher Portal",
    description: "Flask/PostgreSQL platform serving 2K+ Georgia schools with 88% p95 latency reduction.",
    longDescription: "3NF schema decomposition, PostGIS R-tree spatial engine with sub-100ms GeoJSON rendering. Multi-tenant architecture processing 100K+ daily submissions.",
    tech: ["Flask", "PostgreSQL", "PostGIS", "Python", "Nginx", "Gunicorn", "3NF", "B-tree"],
    icon: Database,
    category: "Backend",
    github: "https://github.com/Sagnik26Nik",
    live: null,
    metrics: ["2K+ Schools", "88% P95 ↓", "Sub-100ms", "100K+ Records"],
    gradient: "from-blue-500 to-cyan-500",
    featured: true,
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  }
  ,
  {
    title: "Market Sphere - AI Trading Platform",
    description: "Real-time AI trading simulation with microservices architecture on Azure Kubernetes.",
    longDescription: "React 18 concurrent rendering, FastAPI uvloop backend (2x throughput), Databricks Spark analyzing 1M+ OHLCV records via Z-ordered Delta Lake.",
    tech: ["React", "FastAPI", "Azure", "Kubernetes", "Databricks", "PostgreSQL", "WebSocket"],
    icon: Database,
    category: "Full-Stack",
    github: "https://github.com/Sagnik26Nik",
    live: null,
    metrics: ["1K+ msg/sec", "1M+ Records", "HPA Auto-scale"],
    gradient: "from-cyan-500 to-blue-500",
    featured: false,
    previewImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
  },
  {
    title: "EchoVibe - Emotion Music Recommender",
    description: "Mood-based music recommendation using DistilBERT emotion detection (0.74 macro-F1) with real-time camera integration.",
    longDescription: "Fine-tuned on GoEmotions (58K samples, 28 labels) via fp16 training, mapped to Spotify features using Russell's circumplex model. Integrated real-time CV for enhanced emotion detection.",
    tech: ["Flutter", "Dart", "FastAPI", "DistilBERT", "Transformers", "Firebase", "OpenCV", "MediaPipe"],
    icon: Smartphone,
    category: "AI/ML",
    github: "https://github.com/Sagnik26Nik",
    live: null,
    metrics: ["0.74 F1", "28 Emotions", "Real-time CV", "60 FPS UI"],
    gradient: "from-pink-500 to-rose-500",
    featured: true,
    // Updated to non-branded music image
    previewImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
  },
  {
    title: "SHADOW: RowHammer Prevention",
    description: "DDR5 microarchitecture defense achieving 10⁶× bit-flip reduction with <1% area overhead.",
    longDescription: "Architected RNG-based intra-subarray row remapping via RFM interface. Simulated under SPEC CPU + blast attacks validating <3% throughput impact.",
    tech: ["C++", "Verilog", "DDR5", "Ramulator", "DRAM", "SPEC CPU"],
    icon: Cpu,
    category: "Systems",
    github: "https://github.com/Sagnik26Nik",
    live: null,
    metrics: ["10⁶× Protection", "<1% Overhead", "<3% Impact"],
    gradient: "from-red-500 to-orange-500",
    featured: true,
    previewImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
  },
  {
    title: "MCP-Powered Data Lake Agent",
    description: "Natural Language to SQL with 89% recall@5 via FAISS IVF quantization and semantic caching.",
    longDescription: "RAG pipeline using SentenceTransformer (384-dim), GPT-4 few-shot prompting, Redis SimHash LSH achieving 60% hit rate reducing latency 800ms→120ms.",
    tech: ["Python", "GPT-4", "FAISS", "PostgreSQL", "Azure OpenAI", "Redis", "ANTLR4"],
    icon: Brain,
    category: "AI/ML",
    github: "https://github.com/Sagnik26Nik",
    live: null,
    metrics: ["89% Recall@5", "60% Cache Hit", "800ms→120ms"],
    gradient: "from-purple-500 to-pink-500",
    featured: true,
    previewImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
  },
  {
    title: "RideWisely - Smart Transit App",
    description: "Flutter-based real-time transit tracking with route optimization and multi-modal journey planning.",
    longDescription: "Integrated Google Maps API with real-time GTFS data processing. Implemented offline caching and predictive arrival algorithms for enhanced user experience.",
    tech: ["Flutter", "Dart", "Firebase", "Google Maps API", "GTFS", "REST APIs"],
    icon: Navigation,
    category: "Mobile",
    github: "https://github.com/Sagnik26Nik",
    live: null,
    metrics: ["Real-time", "Multi-modal", "Offline Cache", "Route Optimize"],
    gradient: "from-green-500 to-emerald-500",
    featured: false,
    // Updated to actual public transportation image
    previewImage: "https://s44873.pcdn.co/wp-content/uploads/2020/09/PublicTransportation-1-1024x453.jpg.webp",
  }
];

const categories = ["All", "AI/ML", "Backend", "Systems", "Mobile", "Full-Stack"];

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
                Production-grade systems spanning AI/ML, distributed architectures, and hardware optimization - delivering measurable performance gains.
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
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="h-full glass-card rounded-2xl overflow-hidden"
                  >
                    {/* Gradient accent */}
                    <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />

                    {/* Preview Image */}
                    <div className="relative h-48 overflow-hidden bg-secondary/20">
                      <img
                        src={project.previewImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay on hover - translucent instead of solid */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProject === project.title ? 1 : 0 }}
                        className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-30`}
                      />
                      {/* Project Icon */}
                      <div className="absolute top-4 right-4">
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} shadow-lg`}
                        >
                          <project.icon className="h-6 w-6 text-white" />
                        </motion.div>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors flex-1">
                          {project.title}
                        </h3>
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
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <p className="text-muted-foreground/80 text-xs leading-relaxed mb-6">
                        {project.longDescription}
                      </p>

                      {/* Metrics */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.metrics.map((metric) => (
                          <span
                            key={metric}
                            className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-foreground border border-primary/20"
                          >
                            {metric}
                          </span>
                        ))}
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
                Explore More on GitHub
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};