import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Sagnik26Nik", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/nik-chakrabarti", label: "LinkedIn" },
  { icon: Mail, href: "mailto:sagnikc2608@gmail.com", label: "Email" },
];

const roles = [
  "Full-Stack Engineer",
  "Systems Architect",
  "AI Researcher",
  "Data Infrastructure Builder",
];

export const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), springConfig);
  const y = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Typing effect
  useEffect(() => {
    const role = roles[currentRole];
    const typeSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === role) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      } else if (isDeleting) {
        setDisplayText(role.substring(0, displayText.length - 1));
      } else {
        setDisplayText(role.substring(0, displayText.length + 1));
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ x, y }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
          animate={{
            background: [
              "radial-gradient(circle, hsla(221, 83%, 53%, 0.3) 0%, transparent 70%)",
              "radial-gradient(circle, hsla(280, 83%, 60%, 0.3) 0%, transparent 70%)",
              "radial-gradient(circle, hsla(221, 83%, 53%, 0.3) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          style={{ x: useTransform(x, v => -v), y: useTransform(y, v => -v) }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]"
          animate={{
            background: [
              "radial-gradient(circle, hsla(280, 83%, 60%, 0.2) 0%, transparent 70%)",
              "radial-gradient(circle, hsla(221, 83%, 53%, 0.2) 0%, transparent 70%)",
              "radial-gradient(circle, hsla(280, 83%, 60%, 0.2) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30" />
      </div>

      <div className="section-container text-center relative z-10">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative flex h-2 w-2"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </motion.span>
          <span className="text-sm font-medium text-foreground/80">
            Open to Summer 2026 Internships
          </span>
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
        </motion.div>

        {/* Main heading with dramatic reveal */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring", damping: 20 }}
            className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter"
          >
            <span className="inline-block">Sagnik</span>{" "}
            <span className="inline-block gradient-text font-black">"Nik"</span>{" "}
            <span className="inline-block">Chakrabarti</span>
          </motion.h1>
        </div>

        {/* Animated role with typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-12 flex items-center justify-center mb-6"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-mono text-primary">
            {"<"}
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl font-mono text-muted-foreground mx-2">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-0.5 h-6 sm:h-8 bg-primary ml-1 align-middle"
            />
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl font-mono text-primary">
            {"/>"}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed mb-4"
        >
          Building high-performance data infrastructure and AI-powered systems that scale.
        </motion.p>

        {/* Education badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8"
        >
          <span className="text-sm font-semibold text-foreground">MSCS'27</span>
          <span className="text-muted-foreground">@</span>
          <span className="text-sm font-medium gradient-text">Georgia State University</span>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex items-center justify-center gap-2 text-muted-foreground mb-10"
        >
          <MapPin className="h-4 w-4" />
          <span className="text-sm">Atlanta, Georgia</span>
        </motion.div>

        {/* Social Links - Floating style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="group relative p-3 rounded-xl glass-card hover:border-primary/50 transition-all duration-300"
              aria-label={link.label}
            >
              <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <motion.div
                className="absolute inset-0 rounded-xl bg-primary/10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden px-8 bg-primary hover:bg-primary/90"
          >
            <a href="#projects">
              <span className="relative z-10">View My Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-8 glass-card border-border/50 hover:border-primary/50 hover:bg-primary/5"
          >
            <a href="#contact">Get in Touch</a>
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
