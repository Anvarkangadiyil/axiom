"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Code2,
  Cpu,
  ExternalLink,
  Eye,
  FileCode2,
  Folder,
  GitBranch,
  Github,
  Globe,
  Layers,
  MessageSquare,
  MonitorSmartphone,
  Play,
  RefreshCw,
  Rocket,
  Shield,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const heroPrompts = [
  "Build a real-time collaborative dashboard with red accents",
  "Create a full-stack SaaS landing page in Next.js",
  "Scaffold a REST API with JWT authentication and rate limiting",
  "Implement an interactive node graph using React Flow",
];

const features = [
  {
    icon: Bot,
    title: "Autonomous AI Coding Agent",
    description:
      "Describe what you want — the agent plans, reads, writes, and refactors code autonomously across multiple files, handling complex architectures.",
    gradient: "from-red-500 to-rose-600",
  },
  {
    icon: Terminal,
    title: "In-Browser WebContainers",
    description:
      "Run a full Node.js runtime inside your browser. Install npm packages, execute scripts, and run dev servers without local configuration.",
    gradient: "from-amber-500 to-red-500",
  },
  {
    icon: Code2,
    title: "Sleek CodeEditor",
    description:
      "Powered by CodeMirror 6. Features syntax highlighting, indentation guides, minimap, and real-time inline AI suggestions.",
    gradient: "from-rose-500 to-orange-500",
  },
  {
    icon: Globe,
    title: "Hot-Reloading Preview",
    description:
      "See your application render in real time. The embedded browser preview updates instantly as the AI agent or you make edits.",
    gradient: "from-red-600 to-pink-600",
  },
  {
    icon: Folder,
    title: "Visual Workspace",
    description:
      "Manage your project structure easily. Browse, create, and modify files in a responsive sidebar, or view relationships in a node graph.",
    gradient: "from-orange-600 to-red-500",
  },
  {
    icon: MessageSquare,
    title: "Conversational UI",
    description:
      "Chat with the AI in natural language. Ask architectural questions, request features, or debug error traces through interactive conversation.",
    gradient: "from-rose-500 to-red-700",
  },
];

const howItWorks = [
  {
    step: "01",
    icon: BrainCircuit,
    title: "Prompt Your Idea",
    description:
      "Enter your requirements in natural language. The AI agent analyzes it and scaffolds the project architecture instantly.",
  },
  {
    step: "02",
    icon: FileCode2,
    title: "AI Agent Autonomously Builds",
    description:
      "Watch the agent create files, install dependencies, write structured code, and debug issues in real time.",
  },
  {
    step: "03",
    icon: Eye,
    title: "Preview & Iterate",
    description:
      "Review the live-rendered preview of your app. Refine the UI or add features by chatting with the agent.",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Ship to Production",
    description:
      "Deploy with one click or push directly to GitHub. Get clean, production-ready code that is entirely yours.",
  },
];

const techSpecs = [
  {
    icon: Cpu,
    title: "WebContainers API",
    description: "In-browser WebAssembly-based operating system that boots Node.js in milliseconds.",
  },
  {
    icon: Shield,
    title: "Secure Clerk Auth",
    description: "Seamless, secure developer authentication and workspace isolation.",
  },
  {
    icon: Zap,
    title: "Convex Realtime Backend",
    description: "Ultra-fast state synchronization, keeping your workspace instantly saved.",
  },
  {
    icon: Layers,
    title: "Next.js & React 19",
    description: "Built on the latest React architecture for peak performance and rendering speed.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const UnAuthenticatedView = () => {
  const [typedText, setTypedText] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("app.tsx");

  useEffect(() => {
    const currentPrompt = heroPrompts[promptIndex];
    const isDoneTyping = typedText === currentPrompt;
    const isDoneDeleting = typedText.length === 0;
    const delay = isDoneTyping ? 2000 : isDeleting ? 30 : 50;

    const timer = window.setTimeout(() => {
      if (!isDeleting && isDoneTyping) {
        setIsDeleting(true);
        return;
      }
      if (isDeleting && isDoneDeleting) {
        setIsDeleting(false);
        setPromptIndex((prev) => (prev + 1) % heroPrompts.length);
        return;
      }
      setTypedText((prev) =>
        isDeleting
          ? currentPrompt.slice(0, Math.max(0, prev.length - 1))
          : currentPrompt.slice(0, prev.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [promptIndex, isDeleting, typedText]);

  return (
    <main className="min-h-screen bg-[#030306] text-[#F4F4F5] overflow-x-hidden selection:bg-red-500/30 selection:text-red-200 font-sans">
      {/* Ambient Red Glow Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[15%] h-[600px] w-[800px] rounded-full bg-red-600/[0.06] blur-[150px]" />
        <div className="absolute bottom-[10%] right-[5%] h-[500px] w-[700px] rounded-full bg-rose-600/[0.04] blur-[130px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-amber-600/[0.03] blur-[140px]" />
      </div>

      {/* ── Navigation Bar ── */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" className="h-9 w-9" alt="Axiom Logo" />
            <span className="text-xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Axiom
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-zinc-400 transition-colors hover:text-red-400">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-zinc-400 transition-colors hover:text-red-400">
              How It Works
            </a>
            <a href="#tech-specs" className="text-sm font-medium text-zinc-400 transition-colors hover:text-red-400">
              Tech Stack
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Anvarkangadiyil/axiom"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <SignInButton>
              <Button className="h-9 rounded-lg border border-red-500/30 bg-red-500/10 px-4 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-all hover:border-red-500/50">
                Sign In
              </Button>
            </SignInButton>
            <SignInButton>
              <Button className="h-9 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 px-4 text-xs font-semibold text-white shadow-[0_0_15px_rgba(239,68,68,0.25)] hover:shadow-[0_0_25px_rgba(239,68,68,0.45)] hover:scale-[1.02] transition-all">
                Get Started
              </Button>
            </SignInButton>
          </div>
        </div>
      </nav>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-16 sm:px-8 md:pt-28">
        {/* ── Hero Section ── */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <Badge className="mb-6 border-red-500/30 bg-red-500/10 font-mono text-xs tracking-wider text-red-400 backdrop-blur-sm px-3 py-1">
            ✦ AI-POWERED BROWSER IDE
          </Badge>

          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-8xl">
            <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Describe it.
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              Build it. Ship it.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg lg:text-xl leading-relaxed">
            Axiom is a next-generation cloud IDE running entirely in your browser. With an autonomous AI coding agent, integrated terminal, and instant live previews, you can build production-ready apps from a single prompt.
          </p>

          {/* Interactive prompt demo */}
          <div className="mx-auto mt-10 max-w-2xl px-2 sm:px-0">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-1.5 backdrop-blur-sm shadow-[0_0_50px_rgba(239,68,68,0.03)]">
              <div className="flex items-center gap-3 rounded-lg bg-zinc-950/80 px-4 py-3.5 border border-white/[0.04]">
                <Sparkles className="h-5 w-5 shrink-0 text-red-400 animate-pulse" />
                <span className="min-h-[1.5rem] flex-1 text-left font-mono text-sm text-zinc-300 sm:text-base truncate">
                  {typedText}
                  <span className="ml-0.5 inline-block w-1.5 h-4 bg-red-400 animate-pulse"></span>
                </span>
                <SignInButton>
                  <Button
                    size="sm"
                    className="shrink-0 rounded-md bg-red-600 px-4 text-sm font-semibold text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:bg-red-500 transition-all"
                  >
                    Generate
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </SignInButton>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <SignInButton>
              <Button className="h-12 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-8 text-base font-semibold text-white shadow-[0_0_24px_rgba(239,68,68,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(239,68,68,0.5)]">
                Start Coding Instantly
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </SignInButton>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            No configuration needed · Complete setup in 3 seconds · Free tier available
          </p>
        </motion.header>

        {/* ── IDE Workspace Mockup ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 md:mt-28"
        >
          <div className="relative mx-auto max-w-5xl rounded-xl border border-white/[0.08] bg-zinc-950/60 p-2 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-red-500/[0.02] to-transparent pointer-events-none" />
            
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-zinc-950/80 px-4 py-3 rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              
              <div className="flex items-center gap-1 bg-zinc-900/80 border border-white/[0.04] px-3 py-1 rounded-md text-xs font-mono text-zinc-400">
                <span className="text-red-400">axiom://</span>
                <span>workspace/src/app.tsx</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] font-mono tracking-wider text-red-400 uppercase font-semibold">AI Connected</span>
              </div>
            </div>

            {/* IDE Workspace Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] bg-zinc-950/30 font-mono text-xs">
              {/* Sidebar File Explorer */}
              <div className="lg:col-span-2 border-r border-white/[0.06] bg-zinc-950/60 p-4 hidden lg:block text-zinc-400">
                <div className="flex items-center gap-1.5 mb-4 text-zinc-300 font-semibold uppercase tracking-wider text-[10px]">
                  <Folder className="h-3.5 w-3.5 text-red-400" />
                  Workspace
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-zinc-300 font-medium">
                    <span className="text-zinc-500">▼</span> src
                  </div>
                  <div className="pl-4 space-y-2">
                    <button
                      onClick={() => setActiveTab("app.tsx")}
                      className={cn(
                        "flex items-center gap-1.5 w-full text-left transition-colors",
                        activeTab === "app.tsx" ? "text-red-400" : "hover:text-zinc-200"
                      )}
                    >
                      <span>📄</span> app.tsx
                    </button>
                    <button
                      onClick={() => setActiveTab("styles.css")}
                      className={cn(
                        "flex items-center gap-1.5 w-full text-left transition-colors",
                        activeTab === "styles.css" ? "text-red-400" : "hover:text-zinc-200"
                      )}
                    >
                      <span>📄</span> styles.css
                    </button>
                    <button
                      onClick={() => setActiveTab("package.json")}
                      className={cn(
                        "flex items-center gap-1.5 w-full text-left transition-colors",
                        activeTab === "package.json" ? "text-red-400" : "hover:text-zinc-200"
                      )}
                    >
                      <span>📄</span> package.json
                    </button>
                  </div>
                  <div className="flex items-center gap-2 hover:text-zinc-200 transition-colors">
                    <span className="text-zinc-500">▶</span> components
                  </div>
                  <div className="flex items-center gap-2 hover:text-zinc-200 transition-colors">
                    <span className="text-zinc-500">▶</span> public
                  </div>
                </div>
              </div>

              {/* Code Editor */}
              <div className="lg:col-span-6 flex flex-col border-r border-white/[0.06] bg-zinc-950/20">
                {/* Tabs */}
                <div className="flex items-center border-b border-white/[0.06] bg-zinc-950/60 text-zinc-400">
                  <button
                    onClick={() => setActiveTab("app.tsx")}
                    className={cn(
                      "px-4 py-2 border-r border-white/[0.06] transition-colors",
                      activeTab === "app.tsx" ? "bg-zinc-900/60 text-red-400 border-t-2 border-t-red-500" : "hover:text-zinc-200"
                    )}
                  >
                    app.tsx
                  </button>
                  <button
                    onClick={() => setActiveTab("styles.css")}
                    className={cn(
                      "px-4 py-2 border-r border-white/[0.06] transition-colors",
                      activeTab === "styles.css" ? "bg-zinc-900/60 text-red-400 border-t-2 border-t-red-500" : "hover:text-zinc-200"
                    )}
                  >
                    styles.css
                  </button>
                  <button
                    onClick={() => setActiveTab("package.json")}
                    className={cn(
                      "px-4 py-2 border-r border-white/[0.06] transition-colors",
                      activeTab === "package.json" ? "bg-zinc-900/60 text-red-400 border-t-2 border-t-red-500" : "hover:text-zinc-200"
                    )}
                  >
                    package.json
                  </button>
                </div>

                {/* Editor Content */}
                <div className="flex-1 p-4 overflow-y-auto font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/10">
                  {activeTab === "app.tsx" && (
                    <div className="space-y-1">
                      <div>
                        <span className="text-red-400">import</span>{" "}
                        <span className="text-amber-400">{"{ useState, useEffect }"}</span>{" "}
                        <span className="text-red-400">from</span>{" "}
                        <span className="text-emerald-400">"react"</span>;
                      </div>
                      <div>
                        <span className="text-red-400">import</span>{" "}
                        <span className="text-amber-400">{"{ Sparkles, Zap }"}</span>{" "}
                        <span className="text-red-400">from</span>{" "}
                        <span className="text-emerald-400">"lucide-react"</span>;
                      </div>
                      <div className="text-zinc-600">// AI generated component</div>
                      <div>
                        <span className="text-red-400">export default function</span>{" "}
                        <span className="text-blue-400 font-semibold">AxiomApp</span>() {"{"}
                      </div>
                      <div>
                        &nbsp;&nbsp;<span className="text-red-400">const</span> [active, setActive] ={" "}
                        <span className="text-amber-400">useState</span>(
                        <span className="text-orange-400">true</span>);
                      </div>
                      <br />
                      <div>&nbsp;&nbsp;return (</div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                        <span className="text-rose-400">div</span>{" "}
                        <span className="text-amber-400">className</span>=
                        <span className="text-emerald-400">"flex flex-col items-center justify-center p-8 text-center"</span>
                        &gt;
                      </div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                        <span className="text-rose-400">h1</span>{" "}
                        <span className="text-amber-400">className</span>=
                        <span className="text-emerald-400">"text-3xl font-bold bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent animate-pulse"</span>
                        &gt;
                      </div>
                      <div className="pl-8 text-zinc-100 flex items-center">
                        &nbsp;&nbsp;Axiom Engine Active
                        <span className="ml-1 animate-ping text-red-500">|</span>
                      </div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/
                        <span className="text-rose-400">h1</span>&gt;
                      </div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                        <span className="text-rose-400">p</span>{" "}
                        <span className="text-amber-400">className</span>=
                        <span className="text-emerald-400">"mt-2 text-zinc-400 text-sm max-w-sm"</span>
                        &gt;
                      </div>
                      <div className="pl-8 text-zinc-400">
                        &nbsp;&nbsp;This client application runs completely in-browser via WebContainers.
                      </div>
                      <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/
                        <span className="text-rose-400">p</span>&gt;
                      </div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</div>
                      <div>&nbsp;&nbsp;);</div>
                      <div>{"}"}</div>
                    </div>
                  )}

                  {activeTab === "styles.css" && (
                    <div className="space-y-1 text-zinc-400">
                      <div>
                        <span className="text-amber-400">@import</span>{" "}
                        <span className="text-emerald-400">"tailwindcss"</span>;
                      </div>
                      <br />
                      <div>
                        <span className="text-rose-400">.animate-pulse</span> {"{"}
                      </div>
                      <div>
                        &nbsp;&nbsp;<span className="text-blue-400">animation</span>:{" "}
                        <span className="text-zinc-200">pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite</span>;
                      </div>
                      <div>{"}"}</div>
                    </div>
                  )}

                  {activeTab === "package.json" && (
                    <div className="space-y-1 text-zinc-300">
                      <div>{"{"}</div>
                      <div>
                        &nbsp;&nbsp;<span className="text-amber-400">"name"</span>:{" "}
                        <span className="text-emerald-400">"axiom-app"</span>,
                      </div>
                      <div>
                        &nbsp;&nbsp;<span className="text-amber-400">"version"</span>:{" "}
                        <span className="text-emerald-400">"1.0.0"</span>,
                      </div>
                      <div>
                        &nbsp;&nbsp;<span className="text-amber-400">"dependencies"</span>: {"{"}
                      </div>
                      <div className="pl-4">
                        <span className="text-amber-400">"react"</span>:{" "}
                        <span className="text-emerald-400">"^19.0.0"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-amber-400">"lucide-react"</span>:{" "}
                        <span className="text-emerald-400">"^0.400.0"</span>
                      </div>
                      <div>&nbsp;&nbsp;{"}"}</div>
                      <div>{"}"}</div>
                    </div>
                  )}
                </div>

                {/* Inline Agent Assistant Chat */}
                <div className="border-t border-white/[0.06] bg-zinc-950/70 p-3 flex flex-col gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-red-600 mt-0.5">
                      <Bot className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="flex-1 text-[11px] text-zinc-300">
                      <span className="font-semibold text-red-400">Axiom Agent:</span> Added gradient text style and imported lucide-react. The live preview has hot-reloaded successfully.
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Preview & Terminal Panel */}
              <div className="lg:col-span-4 flex flex-col">
                {/* Live Preview Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] bg-zinc-950/60 px-4 py-2 text-zinc-400">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                    <Globe className="h-3.5 w-3.5 text-zinc-500" />
                    Live Preview
                  </div>
                  <button className="text-zinc-500 hover:text-white transition-colors">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin-slow" />
                  </button>
                </div>

                {/* Preview Frame */}
                <div className="flex-1 bg-[#06060a] flex items-center justify-center p-6 border-b border-white/[0.06] min-h-[220px]">
                  <div className="rounded-xl border border-white/[0.05] bg-zinc-950/80 p-6 text-center max-w-xs shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                    <div className="flex justify-center mb-2.5">
                      <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                        <Zap className="h-5 w-5 text-red-400 fill-red-500/10 animate-pulse" />
                      </div>
                    </div>
                    <h2 className="text-sm font-bold bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
                      Axiom Engine Active
                    </h2>
                    <p className="mt-1 text-[10px] text-zinc-400 leading-relaxed">
                      This client application runs completely in-browser via WebContainers.
                    </p>
                  </div>
                </div>

                {/* Integrated Terminal */}
                <div className="flex flex-col h-[180px] bg-black">
                  <div className="flex items-center border-b border-white/[0.05] bg-zinc-950/80 px-4 py-1.5 text-[10px] text-zinc-400 justify-between">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5 text-red-500" />
                      Terminal
                    </div>
                    <span className="text-[9px] text-zinc-500">bash</span>
                  </div>
                  <div className="flex-1 p-3 font-mono text-[10px] sm:text-xs text-zinc-300 space-y-1.5 overflow-y-auto select-none">
                    <div className="text-zinc-500">$ npm run dev</div>
                    <div>&gt; axiom-app@1.0.0 dev</div>
                    <div>&gt; next dev</div>
                    <div className="text-red-400">▲ Next.js 16.1.1</div>
                    <div>- Local: &nbsp;&nbsp;&nbsp;http://localhost:3000</div>
                    <div>- Network: &nbsp;http://192.168.1.104:3000</div>
                    <div className="text-emerald-500">✓ Compiled successfully in 142ms</div>
                    <div className="text-zinc-500 flex items-center">
                      $ <span className="ml-1 animate-pulse h-3.5 w-2 bg-zinc-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Features Grid ── */}
        <section id="features" className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge className="border-red-500/20 bg-red-500/5 text-red-400 font-mono mb-4">
              CAPABILITIES
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A Complete OS inside a Browser Tab
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400 text-sm sm:text-base">
              Axiom integrates AI-guided coding, blazing-fast runtimes, and deep visualization to 10x your development velocity.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card className="group relative h-full overflow-hidden border border-white/[0.05] bg-zinc-950/40 backdrop-blur-sm transition-all duration-300 hover:border-red-500/20 hover:bg-zinc-950/80 hover:shadow-[0_8px_30px_rgba(239,68,68,0.02)]">
                    {/* Gradient hover glow */}
                    <div
                      className={cn(
                        "absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20",
                        feature.gradient,
                      )}
                    />
                    <CardHeader className="pb-3">
                      <div
                        className={cn(
                          "mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br shadow-[0_0_15px_rgba(239,68,68,0.1)]",
                          feature.gradient,
                        )}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-white">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── How It Works Section ── */}
        <section id="how-it-works" className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge className="border-red-500/20 bg-red-500/5 text-red-400 font-mono mb-4">
              WORKFLOW
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From Prompt to Production in Seconds
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400 text-sm sm:text-base">
              Say goodbye to environment configurations, git merges, and local build setups.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="flex h-full flex-col rounded-xl border border-white/[0.05] bg-zinc-950/40 p-6 backdrop-blur-sm transition-colors hover:border-red-500/10">
                    <span className="mb-4 font-mono text-4xl font-black text-red-500/15 group-hover:text-red-500/30 transition-colors">
                      {item.step}
                    </span>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5">
                      <Icon className="h-5 w-5 text-red-400" />
                    </div>
                    <h3 className="mb-2 text-base font-bold text-white group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                  {/* Connector line (hidden on last + mobile) */}
                  {index < howItWorks.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-px w-8 translate-x-full bg-gradient-to-r from-red-500/30 to-transparent lg:block z-0" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Technology Specs Section ── */}
        <section id="tech-specs" className="mt-32 border-t border-white/[0.04] pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <Badge className="border-red-500/20 bg-red-500/5 text-red-400 font-mono mb-4">
                ENGINEERING
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Engineered for Performance & Speed
              </h2>
              <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
                Axiom bypasses traditional server-side container virtualization. By executing Node.js, compiling dependencies, and rendering code completely on the client WebAssembly engine, your projects load instantly.
              </p>
              
              <div className="mt-8">
                <a
                  href="https://github.com/Anvarkangadiyil/axiom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
                >
                  Explore Github Repository
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
              {techSpecs.map((spec) => {
                const Icon = spec.icon;
                return (
                  <div key={spec.title} className="flex gap-4 p-5 rounded-xl border border-white/[0.04] bg-zinc-950/20">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-white/[0.05]">
                      <Icon className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{spec.title}</h4>
                      <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{spec.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Call to Action ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-32"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-red-950/[0.15] via-zinc-950/80 to-zinc-950 p-10 text-center backdrop-blur-sm sm:p-16 shadow-[0_0_50px_rgba(239,68,68,0.03)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.1),transparent_60%)]" />
            <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Build Your Next Idea in 10 Seconds
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-zinc-400 text-sm sm:text-base">
              Unlock a fully autonomous AI coding partner. Prototype, test, and ship applications directly from your web browser.
            </p>
            
            <div className="relative mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SignInButton>
                <Button className="h-12 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-10 text-base font-semibold text-white shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_45px_rgba(239,68,68,0.5)] hover:scale-[1.02] transition-all">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </SignInButton>
            </div>
            
            <p className="relative mt-4 text-xs text-zinc-500">
              Free plan includes 100 credits/mo · No credit card required
            </p>
          </div>
        </motion.section>

        {/* ── Footer ── */}
        <footer className="mt-28 border-t border-white/[0.06] pt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <img src="/logo.svg" className="h-8 w-8" alt="Axiom Logo" />
                <span className="text-lg font-extrabold tracking-tight text-white">Axiom</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                The next-generation cloud IDE powered by WebContainers and autonomous AI agents.
              </p>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-300 mb-4">Product</h5>
              <ul className="space-y-2.5 text-xs text-zinc-500">
                <li><a href="#features" className="hover:text-red-400 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-red-400 transition-colors">How It Works</a></li>
                <li><a href="#tech-specs" className="hover:text-red-400 transition-colors">Tech Stack</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-300 mb-4">Developer</h5>
              <ul className="space-y-2.5 text-xs text-zinc-500">
                <li>
                  <a
                    href="https://github.com/Anvarkangadiyil/axiom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-400 transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">API Reference</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-300 mb-4">Company</h5>
              <ul className="space-y-2.5 text-xs text-zinc-500">
                <li><a href="#" className="hover:text-red-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
            <p>© {new Date().getFullYear()} Axiom. All rights reserved.</p>
            <div className="flex items-center gap-1.5">
              <MonitorSmartphone className="h-3.5 w-3.5" />
              <span>Optimized for desktop &amp; tablet environments</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};
