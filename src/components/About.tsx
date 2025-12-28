import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Code2, Database, Cloud, Brain, Terminal, Zap, Award, Sparkles, Shield, Trophy, X, Check, AlertCircle } from "lucide-react";

// PYTHON: Code Debugger Game
const PythonDebugger = ({ onClose }: { onClose: () => void }) => {
  const [score, setScore] = useState(0);
  const [currentBug, setCurrentBug] = useState(0);
  
  const bugs = [
    {
      code: "def add(a, b)\n    return a + b",
      bug: "Missing colon after function definition",
      fix: "def add(a, b):\n    return a + b",
      hint: "Python functions need something at the end of the def line..."
    },
    {
      code: "for i in range(10)\n    print(i)",
      bug: "Missing colon after for loop",
      fix: "for i in range(10):\n    print(i)",
      hint: "Loops also need proper syntax..."
    },
    {
      code: "if x = 5:\n    print('five')",
      bug: "Using = instead of == for comparison",
      fix: "if x == 5:\n    print('five')",
      hint: "Assignment vs comparison operator..."
    }
  ];

  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);

  const checkAnswer = () => {
    const normalized = userAnswer.trim().toLowerCase();
    const correct = bugs[currentBug].fix.trim().toLowerCase();
    
    if (normalized === correct) {
      setScore(score + 20);
      setFeedback("✅ Perfect! Bug fixed!");
      setTimeout(() => {
        if (currentBug < bugs.length - 1) {
          setCurrentBug(currentBug + 1);
          setUserAnswer("");
          setFeedback("");
          setShowHint(false);
        } else {
          setFeedback(`🎉 All bugs fixed! Final score: ${score + 20}`);
        }
      }, 1500);
    } else {
      setFeedback("❌ Not quite. Try again!");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Python Debugger 🐍</h3>
        <div className="text-lg font-bold text-primary">Score: {score}</div>
      </div>
      
      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
        <p className="text-sm text-red-400 font-semibold mb-2">Bug {currentBug + 1}/{bugs.length}: {bugs[currentBug].bug}</p>
        <pre className="text-sm font-mono bg-black/30 p-3 rounded overflow-x-auto text-red-300">
          {bugs[currentBug].code}
        </pre>
      </div>

      <div>
        <label className="text-sm font-medium block mb-2">Fix the code:</label>
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Write the corrected code here..."
          className="w-full h-24 p-3 bg-black/20 border border-primary/30 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-primary"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={checkAnswer}
          className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90"
        >
          Submit Fix
        </button>
        <button
          onClick={() => setShowHint(!showHint)}
          className="px-4 py-2 bg-secondary/50 rounded-lg font-semibold hover:bg-secondary"
        >
          💡 Hint
        </button>
      </div>

      {showHint && (
        <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-sm text-yellow-400">
          {bugs[currentBug].hint}
        </div>
      )}

      {feedback && (
        <div className={`p-3 rounded-lg text-sm font-medium ${
          feedback.includes('✅') || feedback.includes('🎉') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {feedback}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Master Python syntax and debugging skills! 🚀
      </p>
    </div>
  );
};

// JAVA: Stack & Queue Visualizer
const JavaDataStructures = ({ onClose }: { onClose: () => void }) => {
  const [stack, setStack] = useState<number[]>([]);
  const [queue, setQueue] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [nextValue, setNextValue] = useState(1);

  const pushToStack = () => {
    setStack([...stack, nextValue]);
    setNextValue(nextValue + 1);
    setScore(score + 5);
  };

  const popFromStack = () => {
    if (stack.length > 0) {
      setStack(stack.slice(0, -1));
      setScore(score + 5);
    }
  };

  const enqueue = () => {
    setQueue([...queue, nextValue]);
    setNextValue(nextValue + 1);
    setScore(score + 5);
  };

  const dequeue = () => {
    if (queue.length > 0) {
      setQueue(queue.slice(1));
      setScore(score + 5);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Java: Stack & Queue ☕</h3>
        <div className="text-lg font-bold text-primary">Score: {score}</div>
      </div>

      <p className="text-sm text-muted-foreground">
        Learn LIFO (Stack) vs FIFO (Queue) - fundamental Java data structures!
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* Stack */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-orange-400">Stack (LIFO)</h4>
            <span className="text-xs text-muted-foreground">Last In, First Out</span>
          </div>
          <div className="h-48 bg-black/20 border-2 border-orange-500/30 rounded-lg p-2 flex flex-col-reverse gap-1 overflow-y-auto">
            {stack.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-orange-500/30 border border-orange-500 rounded p-2 text-center font-mono font-bold"
              >
                {val}
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={pushToStack}
              className="flex-1 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500 rounded text-sm font-semibold"
            >
              Push
            </button>
            <button
              onClick={popFromStack}
              disabled={stack.length === 0}
              className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500 rounded text-sm font-semibold disabled:opacity-50"
            >
              Pop
            </button>
          </div>
        </div>

        {/* Queue */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-blue-400">Queue (FIFO)</h4>
            <span className="text-xs text-muted-foreground">First In, First Out</span>
          </div>
          <div className="h-48 bg-black/20 border-2 border-blue-500/30 rounded-lg p-2 flex flex-col gap-1 overflow-y-auto">
            {queue.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-blue-500/30 border border-blue-500 rounded p-2 text-center font-mono font-bold"
              >
                {val}
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={enqueue}
              className="flex-1 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500 rounded text-sm font-semibold"
            >
              Enqueue
            </button>
            <button
              onClick={dequeue}
              disabled={queue.length === 0}
              className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500 rounded text-sm font-semibold disabled:opacity-50"
            >
              Dequeue
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 bg-primary/10 rounded-lg text-sm">
        <p className="font-semibold mb-1">Challenge: Can you see the difference?</p>
        <p className="text-xs text-muted-foreground">
          Stack removes from top (last added), Queue removes from front (first added)!
        </p>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Master fundamental data structures used everywhere in Java! 📚
      </p>
    </div>
  );
};

// POSTGRESQL: Query Performance Game
const PostgreSQLOptimizer = ({ onClose }: { onClose: () => void }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);

  const challenges = [
    {
      query: "SELECT * FROM users WHERE id = 1000",
      options: ["No index", "Index on id", "Index on name", "Composite index"],
      correct: 1,
      explanation: "Single column index on 'id' is perfect for WHERE id = X queries!"
    },
    {
      query: "SELECT * FROM orders WHERE user_id = 5 AND status = 'pending'",
      options: ["Index on user_id", "Index on status", "Composite (user_id, status)", "No index needed"],
      correct: 2,
      explanation: "Composite index on (user_id, status) handles both WHERE conditions efficiently!"
    },
    {
      query: "SELECT COUNT(*) FROM products",
      options: ["Index on id", "Full table scan", "Index on price", "Composite index"],
      correct: 1,
      explanation: "COUNT(*) requires scanning all rows - index won't help much here!"
    }
  ];

  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  const handleSelect = (idx: number) => {
    setSelected(idx);
    if (idx === challenges[level].correct) {
      setScore(score + 25);
      setFeedback("✅ " + challenges[level].explanation);
      setTimeout(() => {
        if (level < challenges.length - 1) {
          setLevel(level + 1);
          setSelected(null);
          setFeedback("");
        } else {
          setFeedback(`🎉 All optimizations complete! Final score: ${score + 25}`);
        }
      }, 2500);
    } else {
      setFeedback("❌ Not optimal. Think about query performance...");
      setTimeout(() => setFeedback(""), 1500);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">PostgreSQL Optimizer 🐘</h3>
        <div className="text-lg font-bold text-primary">Score: {score}</div>
      </div>

      <div className="p-4 bg-secondary/30 rounded-lg border border-border">
        <p className="text-xs text-muted-foreground mb-2">Level {level + 1}/{challenges.length}</p>
        <p className="text-sm font-medium mb-2">Optimize this query:</p>
        <pre className="text-xs font-mono bg-black/30 p-3 rounded overflow-x-auto text-primary">
          {challenges[level].query}
        </pre>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Best optimization strategy:</p>
        {challenges[level].options.map((option, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(idx)}
            disabled={selected !== null}
            className={`w-full p-3 rounded-lg border-2 text-left text-sm font-medium transition-all ${
              selected === idx
                ? idx === challenges[level].correct
                  ? 'border-green-500 bg-green-500/20 text-green-400'
                  : 'border-red-500 bg-red-500/20 text-red-400'
                : 'border-border bg-secondary/20 hover:border-primary hover:bg-secondary/40'
            }`}
          >
            {option}
            {selected === idx && (
              <span className="ml-2">
                {idx === challenges[level].correct ? '✓' : '✗'}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {feedback && (
        <div className={`p-3 rounded-lg text-sm ${
          feedback.includes('✅') || feedback.includes('🎉') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {feedback}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Learn query optimization - crucial for database performance! 🚀
      </p>
    </div>
  );
};

// AWS: Cost Optimizer Challenge
const AWSCostOptimizer = ({ onClose }: { onClose: () => void }) => {
  const [budget, setBudget] = useState(1000);
  const [services, setServices] = useState<Array<{name: string, cost: number, benefit: number}>>([]);
  const [score, setScore] = useState(0);
  const [month, setMonth] = useState(1);

  const availableServices = [
    { name: "EC2 t3.micro", cost: 50, benefit: 40, icon: "🖥️" },
    { name: "RDS db.t3.small", cost: 100, benefit: 90, icon: "💾" },
    { name: "Lambda (1M req)", cost: 20, benefit: 60, icon: "⚡" },
    { name: "S3 (100GB)", cost: 30, benefit: 50, icon: "🗄️" },
    { name: "CloudFront CDN", cost: 80, benefit: 100, icon: "🌐" },
    { name: "ElastiCache", cost: 70, benefit: 70, icon: "⚙️" },
  ];

  const addService = (service: typeof availableServices[0]) => {
    if (budget >= service.cost) {
      setBudget(budget - service.cost);
      setServices([...services, service]);
      setScore(score + service.benefit);
    }
  };

  const nextMonth = () => {
    const monthlyCost = services.reduce((sum, s) => sum + s.cost, 0);
    if (budget >= monthlyCost) {
      setBudget(budget - monthlyCost);
      setScore(score + services.reduce((sum, s) => sum + s.benefit, 0));
      setMonth(month + 1);
    } else {
      alert("💸 Budget exceeded! Optimize your architecture!");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">AWS Cost Optimizer ☁️</h3>
        <div className="text-lg font-bold text-primary">Score: {score}</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-xs text-muted-foreground">Budget</p>
          <p className="text-xl font-bold text-green-400">${budget}</p>
        </div>
        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-xs text-muted-foreground">Month</p>
          <p className="text-xl font-bold text-blue-400">{month}</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Available Services:</p>
        <div className="grid grid-cols-2 gap-2">
          {availableServices.map((service) => (
            <button
              key={service.name}
              onClick={() => addService(service)}
              disabled={budget < service.cost}
              className="p-3 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 disabled:opacity-50 text-left transition-all"
            >
              <div className="text-lg mb-1">{service.icon}</div>
              <div className="text-xs font-semibold">{service.name}</div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-red-400">${service.cost}/mo</span>
                <span className="text-green-400">+{service.benefit}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-black/20 border border-primary/30 rounded-lg">
        <p className="text-xs text-muted-foreground mb-2">Active Services ({services.length}):</p>
        <div className="flex flex-wrap gap-2">
          {services.map((s, idx) => (
            <span key={idx} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
              {s.name}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={nextMonth}
        className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90"
      >
        Next Month →
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Balance cost vs performance - key AWS skill! 💰
      </p>
    </div>
  );
};

// REACT: Component Lifecycle Challenge
const ReactLifecycle = ({ onClose }: { onClose: () => void }) => {
  const [phase, setPhase] = useState<'mount' | 'update' | 'unmount'>('mount');
  const [score, setScore] = useState(0);
  const [events, setEvents] = useState<string[]>([]);

  const lifecycleMethods = {
    mount: ['constructor', 'render', 'componentDidMount'],
    update: ['render', 'componentDidUpdate'],
    unmount: ['componentWillUnmount']
  };

  const allMethods = ['constructor', 'render', 'componentDidMount', 'componentDidUpdate', 'componentWillUnmount', 'shouldComponentUpdate'];

  const [selected, setSelected] = useState<string[]>([]);

  const handleMethodClick = (method: string) => {
    if (selected.includes(method)) {
      setSelected(selected.filter(m => m !== method));
    } else {
      setSelected([...selected, method]);
    }
  };

  const checkAnswer = () => {
    const correct = lifecycleMethods[phase];
    const isCorrect = selected.length === correct.length && 
                      selected.every(m => correct.includes(m));
    
    if (isCorrect) {
      setScore(score + 30);
      setEvents([...events, `✅ ${phase.toUpperCase()} phase complete!`]);
      if (phase === 'mount') setPhase('update');
      else if (phase === 'update') setPhase('unmount');
      else setEvents([...events, `🎉 All phases mastered! Score: ${score + 30}`]);
      setSelected([]);
    } else {
      setEvents([...events, `❌ Not quite right for ${phase} phase`]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">React Lifecycle ⚛️</h3>
        <div className="text-lg font-bold text-primary">Score: {score}</div>
      </div>

      <div className="p-4 bg-secondary/30 rounded-lg border border-border">
        <p className="text-sm font-medium">Current Phase: <span className="text-primary uppercase">{phase}</span></p>
        <p className="text-xs text-muted-foreground mt-1">
          Select all lifecycle methods that run during this phase
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {allMethods.map((method) => (
          <motion.button
            key={method}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMethodClick(method)}
            className={`p-3 rounded-lg border-2 text-sm font-mono transition-all ${
              selected.includes(method)
                ? 'border-primary bg-primary/20 text-primary'
                : 'border-border bg-secondary/20'
            }`}
          >
            {method}()
          </motion.button>
        ))}
      </div>

      <button
        onClick={checkAnswer}
        disabled={selected.length === 0}
        className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50"
      >
        Check Answer
      </button>

      <div className="p-3 bg-black/20 border border-primary/30 rounded-lg max-h-32 overflow-y-auto">
        <p className="text-xs text-muted-foreground mb-2">Event Log:</p>
        {events.map((event, idx) => (
          <p key={idx} className="text-xs mb-1">{event}</p>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Master React component lifecycle! 🔄
      </p>
    </div>
  );
};

// DOCKER: Container Orchestration Puzzle
const DockerOrchestrator = ({ onClose }: { onClose: () => void }) => {
  const [score, setScore] = useState(0);
  const [architecture, setArchitecture] = useState<string[]>([]);
  
  const requiredServices = ['nginx', 'node', 'postgres', 'redis'];
  const [deployed, setDeployed] = useState<string[]>([]);

  const deployService = (service: string) => {
    if (!deployed.includes(service)) {
      setDeployed([...deployed, service]);
      setScore(score + 15);
      
      if ([...deployed, service].length === requiredServices.length) {
        setTimeout(() => {
          alert("🎉 Full stack deployed successfully!");
        }, 500);
      }
    }
  };

  const serviceInfo: Record<string, {icon: string, desc: string, port: string}> = {
    nginx: { icon: '🌐', desc: 'Reverse Proxy', port: ':80' },
    node: { icon: '🟢', desc: 'API Server', port: ':3000' },
    postgres: { icon: '🐘', desc: 'Database', port: ':5432' },
    redis: { icon: '🔴', desc: 'Cache', port: ':6379' },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Docker Orchestrator 🐳</h3>
        <div className="text-lg font-bold text-primary">Score: {score}</div>
      </div>

      <p className="text-sm text-muted-foreground">
        Deploy a full-stack application! Deploy all services in the correct order.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {requiredServices.map((service) => (
          <motion.button
            key={service}
            whileHover={{ scale: deployed.includes(service) ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => deployService(service)}
            disabled={deployed.includes(service)}
            className={`p-4 rounded-lg border-2 transition-all ${
              deployed.includes(service)
                ? 'border-green-500 bg-green-500/20'
                : 'border-border bg-secondary/20 hover:border-primary'
            }`}
          >
            <div className="text-3xl mb-2">{serviceInfo[service].icon}</div>
            <div className="text-sm font-bold">{service}</div>
            <div className="text-xs text-muted-foreground">{serviceInfo[service].desc}</div>
            <div className="text-xs text-primary mt-1">{serviceInfo[service].port}</div>
            {deployed.includes(service) && (
              <div className="mt-2 text-xs text-green-400 font-semibold">✓ Running</div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="p-4 bg-black/20 border border-primary/30 rounded-lg">
        <p className="text-xs text-muted-foreground mb-2">docker-compose.yml:</p>
        <pre className="text-xs font-mono text-green-400">
          {deployed.map(s => `  ${s}:\n    image: ${s}:latest\n    ports:\n      - "${serviceInfo[s].port}"\n`).join('')}
        </pre>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Containerize and orchestrate microservices! 🚢
      </p>
    </div>
  );
};

// TypeScript: Type Inference Game
const TypeScriptTyper = ({ onClose }: { onClose: () => void }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);

  const challenges = [
    {
      code: "const name = 'John'",
      question: "What is the type of 'name'?",
      options: ["string", "any", "String", "text"],
      correct: 0
    },
    {
      code: "const numbers = [1, 2, 3]",
      question: "What is the type of 'numbers'?",
      options: ["number", "Array", "number[]", "list"],
      correct: 2
    },
    {
      code: "function add(a: number, b: number) { return a + b }",
      question: "What is the return type?",
      options: ["void", "number", "any", "string"],
      correct: 1
    }
  ];

  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  const handleSelect = (idx: number) => {
    setSelected(idx);
    if (idx === challenges[level].correct) {
      setScore(score + 20);
      setFeedback("✅ Correct type!");
      setTimeout(() => {
        if (level < challenges.length - 1) {
          setLevel(level + 1);
          setSelected(null);
          setFeedback("");
        }
      }, 1500);
    } else {
      setFeedback("❌ Wrong type. TypeScript infers types automatically!");
      setTimeout(() => setFeedback(""), 1500);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">TypeScript Type Master 📘</h3>
        <div className="text-lg font-bold text-primary">Score: {score}</div>
      </div>

      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <pre className="text-sm font-mono text-blue-300 mb-3">{challenges[level].code}</pre>
        <p className="text-sm font-medium">{challenges[level].question}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {challenges[level].options.map((option, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(idx)}
            disabled={selected !== null}
            className={`p-3 rounded-lg border-2 font-mono text-sm transition-all ${
              selected === idx
                ? idx === challenges[level].correct
                  ? 'border-green-500 bg-green-500/20 text-green-400'
                  : 'border-red-500 bg-red-500/20 text-red-400'
                : 'border-border bg-secondary/20 hover:border-primary'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {feedback && (
        <div className={`p-3 rounded-lg text-sm ${
          feedback.includes('✅') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {feedback}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        TypeScript brings type safety to JavaScript! 🛡️
      </p>
    </div>
  );
};

// Map skills to games
const skillGames: Record<string, React.ComponentType<{ onClose: () => void }>> = {
  'Python': PythonDebugger,
  'Java': JavaDataStructures,
  'PostgreSQL': PostgreSQLOptimizer,
  'AWS': AWSCostOptimizer,
  'React': ReactLifecycle,
  'Docker': DockerOrchestrator,
  'TypeScript': TypeScriptTyper,
};


// Main About Component
const skills = {
  "Languages & Core": { 
    icon: Code2, 
    items: ["Python", "Java", "C#", "TypeScript", "SQL", "C++", "Dart", "Scala"]
  },
  "Backend & APIs": { 
    icon: Terminal, 
    items: ["Flask", "FastAPI", "ASP.NET", "Node.js", "GraphQL", "REST", "gRPC"]
  },
  "Data & Databases": { 
    icon: Database, 
    items: ["PostgreSQL", "MySQL", "Redis", "Firebase", "MongoDB", "PostGIS"]
  },
  "Cloud & DevOps": { 
    icon: Cloud, 
    items: ["Azure", "AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"]
  },
  "AI/ML & Analytics": { 
    icon: Brain, 
    items: ["GPT-4", "FAISS", "DistilBERT", "Transformers", "Spark", "Databricks"]
  },
  "Frontend & Mobile": { 
    icon: Sparkles, 
    items: ["React", "Next.js", "Flutter", "React Native", "Tailwind", "TypeScript"]
  },
};

const stats = [
  { 
    value: "88%", 
    label: "P95 Latency", 
    subtitle: "Optimization", 
    icon: Zap, 
    color: "from-yellow-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop"
  },
  { 
    value: "10⁶×", 
    label: "Bit-Flip", 
    subtitle: "DRAM Protection", 
    icon: Shield, 
    color: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop"
  },
  { 
    value: "0.74", 
    label: "ML F1-Score", 
    subtitle: "Emotion Detection", 
    icon: Brain, 
    color: "from-green-500 to-emerald-500",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
  },
  { 
    value: "89%", 
    label: "NL2SQL", 
    subtitle: "Recall@5", 
    icon: Database, 
    color: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop"
  },
];

const achievements = [
  { icon: Award, label: "3× Math Olympiad Qualifier", detail: "National-level competition", color: "from-yellow-500 to-orange-500" },
  { icon: Trophy, label: "Algorithm Optimization Expert", detail: "75% complexity reduction success", color: "from-blue-500 to-cyan-500" },
  { icon: Sparkles, label: "FIDE Chess Player", detail: "Strategic problem-solver", color: "from-purple-500 to-pink-500" },
  { icon: Shield, label: "JPMorgan Software Engineering", detail: "Virtual Experience Program", color: "from-green-500 to-emerald-500" },
  { icon: Cloud, label: "AWS Solutions Architect", detail: "Cloud infrastructure certified", color: "from-orange-500 to-red-500" },
  { icon: Database, label: "AWS Cloud Practitioner", detail: "Cloud fundamentals certified", color: "from-cyan-500 to-blue-500" },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

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

  const ActiveGame = activeSkill ? skillGames[activeSkill] : null;

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
              Full-Stack Systems Engineer & Researcher building <span className="text-foreground font-medium">production-grade infrastructure</span> that scales.
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
                  Building <span className="text-foreground font-semibold">high-performance data infrastructure</span> and{" "}
                  <span className="text-foreground font-semibold">AI-powered systems</span> that scale. I specialize in{" "}
                  <span className="text-foreground font-medium">database query optimization</span>,{" "}
                  <span className="text-foreground font-medium">distributed systems architecture</span>, and{" "}
                  <span className="text-foreground font-medium">full-stack applications</span> delivering measurable performance gains.
                </p>
                <p>
                  Currently pursuing <span className="text-foreground font-medium">Master's in Computer Science</span> at{" "}
                  <span className="text-foreground font-medium">Georgia State University</span> (MSCS'27) while architecting production systems with{" "}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold">40% latency reduction</span>,{" "}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-green-500/10 text-green-500 font-bold">99.9% data accuracy</span>, and{" "}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-yellow-500/10 text-yellow-500 font-bold">sub-100ms analytics</span>.
                </p>
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm font-medium text-foreground mb-2">Core Competencies:</p>
                  <p className="text-sm">
                    <span className="text-foreground">Systems:</span> Distributed architectures • Query optimization • Microservices<br/>
                    <span className="text-foreground">Data:</span> PostgreSQL • Redis • Spark • Real-time processing<br/>
                    <span className="text-foreground">AI/ML:</span> LLMs • RAG pipelines • Model fine-tuning
                  </p>
                </div>
                <p className="text-sm italic pt-4 border-t border-border/50">
                  Solving complex problems through mathematical rigor, clean architecture, and innovative algorithms. Passionate about building systems that make a measurable difference.
                </p>
              </div>

              {/* Seeking badge */}
              <motion.div
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1 }}
                className="mt-6 inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
              >
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  Seeking <span className="text-primary">Summer 2026</span> Software Engineering Internships
                </span>
              </motion.div>
            </motion.div>

            {/* Stats Grid with Background Images */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card rounded-xl overflow-hidden text-center group relative"
                >
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <img 
                      src={stat.image} 
                      alt={stat.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 p-4">
                    <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-2`}>
                      <stat.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                    <div className="text-[10px] text-muted-foreground/70 mt-0.5">{stat.subtitle}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Achievements */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 glass-card p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Distinctions & Certifications</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4, scale: 1.02 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${achievement.color} flex-shrink-0`}>
                      <achievement.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{achievement.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{achievement.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Interactive Skills */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 glass-card p-8 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Terminal className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Technical Arsenal</h3>
                <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-4 w-4 animate-pulse text-primary" />
                  <span>Click skills to play!</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(skills).map(([category, { icon: Icon, items }]) => (
                  <motion.div
                    key={category}
                    whileHover={{ y: -4 }}
                    className="space-y-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        {category}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <motion.button
                          key={skill}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => skillGames[skill] && setActiveSkill(skill)}
                          className={`skill-tag cursor-pointer ${
                            skillGames[skill] ? 'hover:bg-primary/20 hover:border-primary' : ''
                          }`}
                        >
                          {skill}
                          {skillGames[skill] && <span className="ml-1 text-primary">🎮</span>}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Skill Game Modal */}
      <AnimatePresence>
        {activeSkill && ActiveGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setActiveSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setActiveSkill(null)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <ActiveGame onClose={() => setActiveSkill(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};