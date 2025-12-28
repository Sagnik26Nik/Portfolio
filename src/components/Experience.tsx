import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, GraduationCap, Users, ChevronRight, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Graduate Research Assistant",
    company: "NSF-CoSEA",
    organization: "Georgia State University",
    duration: "Aug 2025 - Present",
    location: "Atlanta, GA",
    type: "research",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    achievements: [
      "Architecting Flask/PostgreSQL platform serving 2,000+ Georgia schools",
      "Reduced query latency by 40% through sparse index optimization with PostGIS",
      "Processing 100,000+ records with 99.9% data accuracy"
    ],
    tech: ["Flask", "PostgreSQL", "PostGIS", "Python", "JavaScript"],
  },
  {
    title: "Graduate Teaching Assistant",
    company: "Department of Computer Science",
    organization: "Georgia State University",
    duration: "Sep 2024 - Present",
    location: "Atlanta, GA",
    type: "teaching",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    achievements: [
      "Mentoring 50+ students in programming fundamentals and data structures",
      "Developing curriculum materials for Introduction to Computing course",
      "Conducting office hours and lab sessions for hands-on learning"
    ],
    tech: ["Python", "Java", "Data Structures", "Algorithms"],
  },
  {
    title: "Quality Assurance Engineer",
    company: "Consumer Electronics",
    organization: "Industry Partner",
    duration: "Dec 2024 - Present",
    location: "Remote",
    type: "work",
    icon: Briefcase,
    color: "from-orange-500 to-red-500",
    achievements: [
      "Implementing automated testing pipelines for consumer electronics",
      "Ensuring product quality through systematic testing methodologies",
      "Collaborating with engineering teams on quality standards"
    ],
    tech: ["Testing", "Automation", "Quality Assurance"],
  },
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="experience" className="py-24 sm:py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/50 to-transparent" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
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
                Work <span className="gradient-text">Experience</span>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Building impactful systems across research, education, and industry.
            </p>
          </motion.div>

          {/* Experience Cards */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.5 : 1,
                      boxShadow: hoveredIndex === index 
                        ? "0 0 20px hsla(221, 83%, 53%, 0.5)" 
                        : "0 0 0px transparent"
                    }}
                    className="absolute left-[15px] top-8 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 hidden md:block"
                  />

                  <div className="md:pl-16">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="glass-card rounded-2xl overflow-hidden group"
                    >
                      {/* Gradient top border */}
                      <div className={`h-1 bg-gradient-to-r ${exp.color}`} />
                      
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                          <div className="flex items-start gap-4">
                            <motion.div
                              whileHover={{ rotate: 10 }}
                              className={`p-3 rounded-xl bg-gradient-to-br ${exp.color} shadow-lg`}
                            >
                              <exp.icon className="h-6 w-6 text-white" />
                            </motion.div>
                            <div>
                              <h3 className="text-xl font-bold">{exp.title}</h3>
                              <p className="text-primary font-semibold">{exp.company}</p>
                              <p className="text-sm text-muted-foreground">{exp.organization}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-start sm:items-end gap-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{exp.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>

                        <ul className="space-y-3 mb-6">
                          {exp.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-3 text-muted-foreground"
                            >
                              <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/50 text-secondary-foreground border border-border/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
