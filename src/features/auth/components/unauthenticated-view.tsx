"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Code2,
  Eye,
  FileCode2,
  Folder,
  GitBranch,
  Globe,
  Layers,
  MessageSquare,
  MonitorSmartphone,
  Rocket,
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
  "Build a full-stack SaaS dashboard",
  "Create a REST API with auth",
  "Scaffold a landing page with forms",
  "Add real-time chat to my app",
];

const features = [
  {
    icon: Bot,
    title: "AI Coding Agent",
    description:
      "Describe what you want — the agent reads, writes, and executes code autonomously across multiple files.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Terminal,
    title: "Built-in Terminal",
    description:
      "Run npm, pnpm, or any CLI command right in the browser. Install packages, run scripts, and see output instantly.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Code2,
    title: "Smart Code Editor",
    description:
      "Syntax highlighting, minimap, indentation guides, and AI-powered inline completions as you type.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Globe,
    title: "Live Preview",
    description:
      "See your app running in a real browser preview — updated in real time as the agent edits your code.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Folder,
    title: "Full File Explorer",
    description:
      "Browse, create, rename, and delete files and folders. Your project structure, always visible.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: MessageSquare,
    title: "Conversational UI",
    description:
      "Chat with the AI in natural language. Ask questions, request changes, or debug — all through conversation.",
    gradient: "from-sky-500 to-indigo-500",
  },
];

const howItWorks = [
  {
    step: "01",
    icon: BrainCircuit,
    title: "Describe Your Idea",
    description:
      "Type a prompt like \"Build a todo app with authentication\" and the AI agent starts working immediately.",
  },
  {
    step: "02",
    icon: FileCode2,
    title: "Watch It Build",
    description:
      "The agent creates files, installs packages, writes code, and runs your project — all in the browser.",
  },
  {
    step: "03",
    icon: Eye,
    title: "Preview & Iterate",
    description:
      "See the live preview, request changes in chat, and refine your app until it's exactly right.",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Ship It",
    description:
      "Export your project, push to GitHub, or deploy — your code is real, production-ready, and fully yours.",
  },
];

const useCases = [
  {
    icon: Layers,
    title: "Rapid Prototyping",
    description: "Go from idea to working prototype in minutes, not days.",
  },
  {
    icon: GitBranch,
    title: "Learn By Building",
    description: "Watch how the AI structures code and learn best practices in real time.",
  },
  {
    icon: Zap,
    title: "Automate Boilerplate",
    description: "Skip repetitive setup. Auth, routing, CRUD — generated instantly.",
  },
  {
    icon: Sparkles,
    title: "AI Pair Programming",
    description: "Collaborate with an AI that understands your entire project context.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const UnAuthenticatedView = () => {
  const [typedText, setTypedText] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPrompt = heroPrompts[promptIndex];
    const isDoneTyping = typedText === currentPrompt;
    const isDoneDeleting = typedText.length === 0;
    const delay = isDoneTyping ? 1800 : isDeleting ? 35 : 65;

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
    <main className="min-h-screen bg-[#050508] text-[#E0E0E0] overflow-x-hidden">
      {/* Ambient glow background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-violet-500/[0.05] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-12 sm:px-8 md:pt-20">
        {/* ── Hero ── */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <Badge className="mb-6 border-cyan-500/30 bg-cyan-500/10 font-mono text-xs tracking-widest text-cyan-400 backdrop-blur-sm">
            ✦ AI-Powered Cloud IDE
          </Badge>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
            <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Describe it. Build it.
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Ship it.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-gray-400 sm:text-lg">
            Axiom is a browser-based IDE with an AI coding agent that builds entire
            applications from a single prompt. No local setup. No boilerplate. Just results.
          </p>

          {/* Interactive prompt demo */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-sm">
              <div className="flex items-center gap-3 rounded-lg bg-black/60 px-5 py-4">
                <Sparkles className="h-5 w-5 shrink-0 text-cyan-400" />
                <span className="min-h-[1.5rem] flex-1 text-left font-mono text-sm text-gray-300 sm:text-base">
                  {typedText}
                  <span className="ml-0.5 inline-block animate-pulse text-cyan-400">|</span>
                </span>
                <SignInButton>
                  <Button
                    size="sm"
                    className="shrink-0 border border-cyan-400/50 bg-cyan-400 px-4 text-sm font-semibold text-black shadow-[0_0_20px_#00F0FF33] transition-shadow hover:shadow-[0_0_30px_#00F0FF55]"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </SignInButton>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <SignInButton>
              <Button className="h-12 rounded-xl border border-cyan-400/50 bg-cyan-400 px-8 text-base font-semibold text-black shadow-[0_0_24px_#00F0FF44] transition-all hover:scale-[1.02] hover:shadow-[0_0_32px_#00F0FF66]">
                Start Building — It&apos;s Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </SignInButton>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            No credit card required · Free tier available
          </p>
        </motion.header>

        {/* ── Features ── */}
        <section className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need to build
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-400">
              A complete development environment that lives in your browser — powered by AI.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <Card className="group relative h-full overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
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
                          "mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br",
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
                      <p className="text-sm leading-relaxed text-gray-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-400">
              Four steps from idea to production — all inside your browser.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex h-full flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
                    <span className="mb-4 font-mono text-3xl font-bold text-cyan-500/30">
                      {item.step}
                    </span>
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10">
                      <Icon className="h-4.5 w-4.5 text-cyan-400" />
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {item.description}
                    </p>
                  </div>
                  {/* Connector line (hidden on last + mobile) */}
                  {index < howItWorks.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-px w-6 translate-x-full bg-gradient-to-r from-cyan-500/30 to-transparent lg:block" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built for every developer
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-400">
              Whether you&apos;re prototyping, learning, or shipping — Axiom adapts to your workflow.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/20 hover:bg-cyan-500/[0.03]"
                >
                  <Icon className="mb-3 h-6 w-6 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="mb-1 text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-400">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── CTA ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-28"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-cyan-500/[0.08] via-transparent to-violet-500/[0.06] p-10 text-center backdrop-blur-sm sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#00F0FF15,transparent_70%)]" />
            <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to build something amazing?
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-gray-400">
              Join developers who are shipping faster with AI. Start building
              your next project in seconds.
            </p>
            <SignInButton>
              <Button className="relative mt-8 h-12 rounded-xl border border-cyan-400/50 bg-cyan-400 px-10 text-base font-semibold text-black shadow-[0_0_30px_#00F0FF44] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_#00F0FF66]">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </SignInButton>
            <p className="relative mt-4 text-xs text-gray-500">
              No credit card required
            </p>
          </div>
        </motion.section>

        {/* ── Footer ── */}
        <footer className="mt-20 border-t border-white/[0.06] pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-blue-500">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">Axiom</span>
            </div>
            <div className="flex items-center gap-5 text-xs text-gray-500">
              <a href="#" className="transition-colors hover:text-gray-300">
                About
              </a>
              <a href="#" className="transition-colors hover:text-gray-300">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-gray-300">
                Terms
              </a>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} Axiom. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <MonitorSmartphone className="h-3.5 w-3.5" />
              Works on desktop, tablet &amp; mobile
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
};
