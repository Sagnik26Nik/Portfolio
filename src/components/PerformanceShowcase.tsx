import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Zap, TrendingDown, Database, Brain, Smartphone, FileText, Award } from "lucide-react";

interface MetricData {
  label: string;
  before: number;
  after: number;
  unit: string;
  reduction: number;
  icon: typeof Zap;
  color: string;
  project: string;
}

const performanceMetrics: MetricData[] = [
  {
    label: "P95 Latency (NSF-CoSEA)",
    before: 1200,
    after: 140,
    unit: "ms",
    reduction: 88,
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    project: "Backend Optimization",
  },
  {
    label: "Cache Hit Rate (MCP Agent)",
    before: 40,
    after: 60,
    unit: "%",
    reduction: 50,
    icon: Database,
    color: "from-blue-500 to-cyan-500",
    project: "Semantic Caching",
  },
  {
    label: "Emotion Detection F1 (EchoVibe)",
    before: 50,
    after: 74,
    unit: "%",
    reduction: 48,
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    project: "ML Fine-tuning",
  },
  {
    label: "UI Render Performance (Flutter)",
    before: 30,
    after: 60,
    unit: "FPS",
    reduction: 100,
    icon: Smartphone,
    color: "from-green-500 to-emerald-500",
    project: "Mobile Optimization",
  },
];

const AnimatedBar = ({ metric, index, isInView }: { metric: MetricData; index: number; isInView: boolean }) => {
  const [animatedBefore, setAnimatedBefore] = useState(0);
  const [animatedAfter, setAnimatedAfter] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 1500;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setAnimatedBefore(Math.round(metric.before * easeOut));
        setAnimatedAfter(Math.round(metric.after * easeOut));
        
        if (step >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    }
  }, [isInView, metric.before, metric.after]);

  const maxValue = Math.max(metric.before, metric.after);
  const beforeWidth = (animatedBefore / maxValue) * 100;
  const afterWidth = (animatedAfter / maxValue) * 100;
  
  const isImprovement = metric.after > metric.before;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.color}`}>
            <metric.icon className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="font-semibold text-sm">{metric.label}</span>
            <p className="text-xs text-muted-foreground">{metric.project}</p>
          </div>
        </div>
        <div className="text-xs font-mono">
          <span className={`${isImprovement ? 'text-muted-foreground' : 'text-red-500 line-through'} opacity-60`}>
            {metric.before}{metric.unit}
          </span>
          <span className="mx-2">→</span>
          <span className="text-green-500 font-bold">{metric.after}{metric.unit}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {/* Before bar */}
        <div className="relative h-8 bg-secondary/30 rounded-lg overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${beforeWidth}%` }}
            transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${isImprovement ? 'from-red-500/40 to-red-500/60' : 'from-red-500/30 to-red-500/50'} relative`}
          >
            <div className="absolute inset-0 flex items-center justify-end pr-3">
              <span className="text-xs font-mono text-foreground font-medium">Before: {animatedBefore}{metric.unit}</span>
            </div>
          </motion.div>
        </div>
        
        {/* After bar */}
        <div className="relative h-8 bg-secondary/30 rounded-lg overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${afterWidth}%` }}
            transition={{ duration: 1.5, delay: index * 0.1 + 0.2, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${metric.color} relative`}
          >
            <div className="absolute inset-0 flex items-center justify-end pr-3">
              <span className="text-xs font-mono text-white font-medium">After: {animatedAfter}{metric.unit}</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Improvement badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
        className="flex justify-end"
      >
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${metric.color} text-white`}>
          <TrendingDown className="h-3 w-3" />
          {metric.reduction}% improvement
        </span>
      </motion.div>
    </motion.div>
  );
};

export const PerformanceShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 sm:py-20 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4"
            >
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Measurable Impact</span>
            </motion.div>
            <h3 className="text-3xl sm:text-4xl font-bold mb-3">
              Performance <span className="gradient-text">Optimization</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-world improvements across backend systems, ML models, and mobile applications
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-8">
            {performanceMetrics.map((metric, index) => (
              <AnimatedBar key={metric.label} metric={metric} index={index} isInView={isInView} />
            ))}
          </div>

          {/* Stats Summary - Updated with relevant metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="glass-card rounded-xl p-4 text-center group hover:scale-105 transition-transform">
              <div className="text-2xl font-bold gradient-text">15+</div>
              <div className="text-xs text-muted-foreground">Projects Shipped</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center group hover:scale-105 transition-transform">
              <div className="text-2xl font-bold gradient-text">2</div>
              <div className="text-xs text-muted-foreground">IEEE Papers Accepted</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center group hover:scale-105 transition-transform">
              <div className="text-2xl font-bold gradient-text">5</div>
              <div className="text-xs text-muted-foreground">Open Source Contributions</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center group hover:scale-105 transition-transform">
              <div className="text-2xl font-bold gradient-text">3</div>
              <div className="text-xs text-muted-foreground">Hackathon Wins</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};