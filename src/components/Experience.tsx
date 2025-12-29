import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin, Award } from "lucide-react";

const experiences = [
  {
    title: "Graduate Research Assistant",
    company: "National Science Foundation - Computer Science Department at Georgia State University", 
    location: "Atlanta, GA",
    period: "Aug 2025 - Present",
    achievements: [
      "Architected Flask/PostgreSQL platform serving 2K+ institutions processing 100K+ submissions, decomposed monolithic schema into 3NF model reducing latency p50 40% (420ms→250ms) and p95 88% (1.2s→140ms) via composite B-tree indexes",
      "Engineered PostGIS R-tree spatial engine with Douglas-Peucker simplification achieving sub-100ms GeoJSON rendering, deployed Gunicorn (4 workers) behind Nginx with ETL pipeline reducing full-table scans 45%→7% via strategic indexing"
    ],
    techStack: ["Flask", "PostgreSQL", "PostGIS", "Python", "3NF", "B-tree", "Nginx", "Gunicorn"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Graduate Teaching Assistant (formerly, Undergraduate Teaching Assistant)",
    company: "Computer Science Department at Georgia State University",
    location: "Atlanta, GA",
    period: "Sep 2024 - Aug 2025",
    achievements: [
      "Instructed 90+ students across 3 semesters in SOLID principles, polymorphic type systems, AVL/2-3-4 trees, graph algorithms (Dijkstra, Bellman-Ford), amortized analysis via aggregate method and accounting technique",
      "Engineered automated grading using Python AST introspection with pytest parametrized fixtures and hypothesis property-based testing, instrumented cProfile/memory_profiler yielding runtime breakdowns for 500+ submissions"
    ],
    techStack: ["Python", "AST", "pytest", "hypothesis", "cProfile", "Algorithms", "SOLID"],
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "User Students and Technology Services Assistant",
    company: "University Library at Georgia State University",
    location: "Atlanta, GA",
    period: "Sep 2023 - Dec 2025",
    achievements: [
      "Provided technical support resolving 1,500+ monthly patron requests across 150+ Windows/Mac workstations, troubleshot hardware issues (printers, scanners, network connectivity), managed equipment checkout system processing 200+ daily transactions",
      "Maintained library information systems including Integrated Library System (ILS) database operations, cataloged 2,000+ digital/physical resources using MARC21 standards, optimized search indexing improving retrieval speed 25% for 100,000+ catalog entries"
    ],
    techStack: ["ILS Database", "MARC21", "Windows", "macOS", "Network Troubleshooting", "Search Optimization"],
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Computing and Informatics Center Tutor",
    company: "Research Innovation and Scholarly Excellence Grant - Georgia State University",
    location: "Atlanta, GA",
    period: "Sep 2023 - May 2025",
    achievements: [
      "Conducted 200+ sessions teaching top-down memoization, bottom-up tabulation with space-optimized rolling arrays, divide-and-conquer via Master Theorem, greedy exchange arguments with correctness proof techniques",
      "Facilitated code reviews emphasizing correctness proofs and complexity lower bounds, median 30% reduction in off-by-one errors, 75% successful refactoring from Θ(n²) to Θ(n log n) merge-based or Θ(n) hash-based solutions"
    ],
    techStack: ["Dynamic Programming", "Master Theorem", "Complexity Analysis", "Algorithm Proofs"],
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Inventory Analytics Team Associate",
    company: "University Housing at Georgia State University",
    location: "Atlanta, GA",
    period: "Apr 2023 - Aug 2023",
    achievements: [
      "Built OLAP analytics pipeline processing 50K+ maintenance records using PostgreSQL window functions, recursive CTEs, and materialized views with incremental refresh strategy across 15 residential facilities",
      "Executed zero-downtime migration of 5GB database from MySQL 5.7 to AWS RDS PostgreSQL 13.x using parallel restore (pg_dump --format=custom, jobs=4), optimized queries via prepared statement caching reducing latency 60%"
    ],
    techStack: ["PostgreSQL", "MySQL", "AWS RDS", "Window Functions", "CTEs", "OLAP"],
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "Peer Academic Mentor and UAP",
    company: "Department of Student Success at Georgia State University",
    location: "Atlanta, GA",
    period: "Feb 2023 - Aug 2023",
    achievements: [
      "Provided 150+ one-on-one mentoring sessions to guide 20+ undergraduate student peers across STEM majors, developed personalized academic success strategies resulting in 85% improvement in mentee GPA averages (2.5→3.2 average increase)",
      "Tracked student engagement metrics using Excel/Google Sheets analytics, identified at-risk students through data-driven patterns (attendance, assignment completion rates), implemented intervention strategies reducing dropout risk 30% among mentees"
    ],
    techStack: ["Data Analytics", "Excel", "Google Sheets", "Mentoring", "Pattern Recognition"],
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "Student Floor Manager",
    company: "Patton Dining Hall at Georgia State University",
    location: "Atlanta, GA",
    period: "Aug 2022 - Feb 2023",
    achievements: [
      "Managed front-of-house POS system processing 300+ daily transactions (average $8K daily revenue), handled cash reconciliation with 99.8% accuracy, maintained inventory tracking for 50+ menu items",
      "Optimized order fulfillment workflow reducing average customer wait time 20% (12 min→9.6 min) during peak hours (11am-1pm, 500+ customers/day), coordinated 5-person staff schedules ensuring operational efficiency"
    ],
    techStack: ["POS Systems", "Inventory Management", "Workflow Optimization", "Operations"],
    color: "from-yellow-500 to-orange-500"
  },
];

// Helper function to highlight tech terms in text
const highlightTechTerms = (text: string, techStack: string[]) => {
  let highlightedText = text;
  const parts: Array<{ text: string; isTech: boolean }> = [];
  
  // Create a regex pattern that matches any tech term
  const pattern = new RegExp(`(${techStack.join('|')})`, 'gi');
  const matches = text.split(pattern);
  
  matches.forEach((part, idx) => {
    if (part) {
      const isTech = techStack.some(tech => 
        tech.toLowerCase() === part.toLowerCase()
      );
      parts.push({ text: part, isTech });
    }
  });
  
  return parts;
};

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="experience" className="py-24 sm:py-32 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="section-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-primary" />
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Experience <span className="gradient-text">Journey</span>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              From systems architecture to mentoring 90+ students - building impactful solutions across research, education, and operations.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.title}-${exp.period}`}
                  variants={itemVariants}
                  className="relative pl-20"
                >
                  {/* Timeline dot */}
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={`absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-r ${exp.color} shadow-lg shadow-primary/50 border-4 border-background z-10`}
                  />

                  {/* Content card */}
                  <motion.div
                    whileHover={{ y: -4, x: 4 }}
                    className="glass-card rounded-2xl overflow-hidden group"
                  >
                    {/* Gradient top border */}
                    <div className={`h-1 bg-gradient-to-r ${exp.color}`} />

                    <div className="p-6 sm:p-8">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-sm text-primary font-medium mb-2">{exp.subtitle}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <Briefcase className="h-4 w-4" />
                              {exp.company}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4" />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{exp.period}</span>
                        </div>
                      </div>

                      {/* Achievements with highlighted tech terms */}
                      <div className="space-y-3 mb-6">
                        {exp.achievements.map((achievement, idx) => {
                          const parts = highlightTechTerms(achievement, exp.techStack);
                          return (
                            <div key={idx} className="flex gap-3">
                              <Award className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {parts.map((part, partIdx) => (
                                  <span
                                    key={partIdx}
                                    className={part.isTech ? 'px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-400 font-medium' : ''}
                                  >
                                    {part.text}
                                  </span>
                                ))}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Tech Stack - Also highlighted */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                        {exp.techStack.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};