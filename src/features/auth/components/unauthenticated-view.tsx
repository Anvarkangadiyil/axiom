"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bot,
  Copy,
  Cpu,
  MonitorSmartphone,
  PlayCircle,
  Sparkles,
  Terminal,
  ToggleLeft,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const heroCommands = [
  "npx create-axiom-app@latest",
  "axiom agent run \"build auth flow\"",
  "pnpm dev --webcontainer",
  "git push origin main",
];

const features = [
  {
    icon: Bot,
    title: "AI Agent",
    description: "Autonomous multi-step coding tasks",
    detail: "Read, write, and run code autonomously",
    badge: "Powered by Inngest",
  },
  {
    icon: Cpu,
    title: "WebContainers",
    description: "Full Node.js runtime in browser - no backend needed",
    detail: "ShareArrayBuffer support for full Node.js environment",
  },
  {
    icon: Sparkles,
    title: "CodeMirror 6",
    description: "Syntax highlighting + minimap + indentation guides",
    detail: "Inline ghost-text completions powered by Llama 3.1 via Groq",
  },
  {
    icon: Terminal,
    title: "Real Terminal",
    description: "xterm.js with full npm/pnpm support",
    detail: "Run scripts and package managers with instant feedback",
  },
];

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Convex",
  "Clerk",
  "Groq",
  "Claude",
  "WebContainers",
];

const codeSample = `import { createAgent } from "@axiom/agent";

const app = createAgent({
  model: "llama-3.1",
  workspace: "webcontainer"
});

await app.run("Create a production auth flow with protected routes");
await app.test();
await app.commit("feat: ship auth flow");
`;

export const UnAuthenticatedView = () => {
  const [typedText, setTypedText] = useState("");
  const [commandIndex, setCommandIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAIExplainOn, setIsAIExplainOn] = useState(true);
  const [copied, setCopied] = useState(false);
  const [marqueeOffset, setMarqueeOffset] = useState(0);

  useEffect(() => {
    const currentCommand = heroCommands[commandIndex];
    const isDoneTyping = typedText === currentCommand;
    const isDoneDeleting = typedText.length === 0;
    const delay = isDoneTyping ? 1200 : isDeleting ? 45 : 75;

    const timer = window.setTimeout(() => {
      if (!isDeleting && isDoneTyping) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isDoneDeleting) {
        setIsDeleting(false);
        setCommandIndex((prev) => (prev + 1) % heroCommands.length);
        return;
      }

      setTypedText((prev) =>
        isDeleting
          ? currentCommand.slice(0, Math.max(0, prev.length - 1))
          : currentCommand.slice(0, prev.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [commandIndex, isDeleting, typedText]);

  const marqueeItems = useMemo(() => [...techStack, ...techStack], []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMarqueeOffset((prev) => (prev >= 50 ? 0 : prev + 0.2));
    }, 40);

    return () => window.clearInterval(timer);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSample);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="min-h-screen bg-black bg-[radial-gradient(#00F0FF10_1px,transparent_1px)] [background-size:22px_22px] text-[#E0E0E0]">
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-12 sm:px-8 md:pt-16">
        <header className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge className="mb-5 border-cyan-500/30 bg-black/50 font-mono text-cyan-400 backdrop-blur-sm">
              Axiom Cloud IDE
            </Badge>
            <h1 className="font-mono text-4xl leading-tight text-cyan-400 sm:text-5xl lg:text-6xl">
              Build, run, and ship software directly in the browser.
            </h1>
            <p className="mt-5 max-w-xl text-base text-gray-300 sm:text-lg">
              From idea to running code - no local setup required
            </p>
            <p className="mt-3 max-w-xl text-sm text-gray-400 sm:text-base">
              Create apps with AI-native workflows, instant terminals, and deployment-ready
              projects.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SignInButton>
                <Button className="border border-cyan-400 bg-cyan-400 text-black shadow-[0_0_20px_#00F0FF55] transition hover:shadow-[0_0_10px_#00F0FF]">
                  Launch Axiom →
                </Button>
              </SignInButton>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-cyan-500/40 bg-transparent text-cyan-300 hover:bg-cyan-500/10"
                  >
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-cyan-500/30 bg-zinc-950 text-gray-200">
                  <DialogHeader>
                    <DialogTitle className="font-mono text-cyan-400">Axiom Demo</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Preview how Axiom runs AI-assisted coding sessions in the browser.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="rounded-md border border-cyan-500/20 bg-black/60 p-4 font-mono text-sm text-gray-300">
                    <p className="text-cyan-400">$ axiom demo --play</p>
                    <p className="mt-2 text-gray-400">
                      Demo modal ready. Replace this with your product video player.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="rounded-lg border border-cyan-500/20 bg-zinc-900/80 p-4 font-mono backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-gray-500">terminal</span>
            </div>
            <p className="text-sm text-gray-400">user@axiom:~$</p>
            <p className="mt-2 min-h-7 text-sm text-[#33FF33] sm:text-base">
              {typedText}
              <span className="animate-pulse text-cyan-300">█</span>
            </p>
          </div>
        </header>

        <section className="mt-14 grid gap-4 sm:grid-cols-2">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="group border border-cyan-500/20 bg-zinc-950/50 backdrop-blur-sm transition duration-300 hover:border-cyan-400 hover:shadow-[0_0_24px_#00F0FF22]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="rounded-md border border-cyan-500/30 bg-black/50 p-2 text-cyan-300 shadow-[0_0_16px_#00F0FF22] transition group-hover:shadow-[0_0_18px_#00F0FF66]">
                      <Icon className="h-5 w-5" />
                    </div>
                    {item.badge ? (
                      <Badge className="border-cyan-500/30 bg-black/50 text-cyan-300">
                        {item.badge}
                      </Badge>
                    ) : null}
                  </div>
                  <CardTitle className="font-mono text-cyan-400">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-300">
                  <p>{item.description}</p>
                  <p className="text-gray-400">{item.detail}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="mt-14">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-mono text-2xl text-cyan-400">Interactive Code Demo</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="border-cyan-500/30 bg-black/40 text-cyan-300"
              >
                <Copy className="mr-2 h-4 w-4" />
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAIExplainOn((prev) => !prev)}
                className={cn(
                  "border-cyan-500/30 bg-black/40 text-cyan-300",
                  isAIExplainOn && "shadow-[0_0_10px_#00F0FF55]",
                )}
              >
                <ToggleLeft className="mr-2 h-4 w-4" />
                AI Explain {isAIExplainOn ? "On" : "Off"}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="typescript" className="rounded-lg border border-cyan-500/20 bg-zinc-950/50 p-4 backdrop-blur-sm">
            <TabsList className="border border-cyan-500/20 bg-black/50">
              <TabsTrigger value="typescript" className="text-gray-300 data-[state=active]:text-cyan-300">
                TypeScript
              </TabsTrigger>
              <TabsTrigger value="javascript" className="text-gray-300 data-[state=active]:text-cyan-300">
                JavaScript
              </TabsTrigger>
            </TabsList>
            <TabsContent value="typescript" className="mt-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <pre className="overflow-x-auto rounded-md border border-cyan-500/20 bg-zinc-900 p-4 font-mono text-xs text-gray-200 sm:text-sm">
                  <code>{codeSample}</code>
                </pre>
                <div className="rounded-md border border-emerald-500/30 bg-black/60 p-4 font-mono text-xs text-emerald-300 sm:text-sm">
                  <p className="text-emerald-400/70">// AI ghost-text</p>
                  <p className="mt-2 text-emerald-300/70">
                    {`// suggest: add middleware for route guards`}
                  </p>
                  <p className="text-emerald-300/70">
                    {`// suggest: scaffold tests for auth flow`}
                  </p>
                  {isAIExplainOn ? (
                    <p className="mt-4 text-gray-400">
                      AI Explain: This flow creates an agent, executes coding tasks, runs tests,
                      then commits changes safely.
                    </p>
                  ) : null}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="javascript" className="mt-4">
              <div className="rounded-md border border-cyan-500/20 bg-zinc-900 p-4 font-mono text-sm text-gray-300">
                <p className="text-cyan-300">// JavaScript example mirrors TypeScript workflow.</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="mt-14 overflow-hidden rounded-lg border border-cyan-500/20 bg-black/40 py-4">
          <div
            className="flex w-max whitespace-nowrap"
            style={{ transform: `translateX(-${marqueeOffset}%)` }}
          >
            {marqueeItems.map((tech, idx) => (
              <Badge
                key={`${tech}-${idx}`}
                className="mx-2 border-cyan-500/30 bg-black/50 px-3 py-1 text-cyan-300 backdrop-blur-sm"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            "1. Open in Browser → no install",
            "2. AI Writes Code → agent helps build",
            "3. Run & Ship → WebContainers execute",
          ].map((step) => (
            <Card key={step} className="border border-cyan-500/20 bg-zinc-950/50 backdrop-blur-sm">
              <CardContent className="pt-6 font-mono text-cyan-300">{step}</CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-14 rounded-lg border border-cyan-500/20 bg-zinc-950/40 p-6 font-mono backdrop-blur-sm">
          <h2 className="mb-4 text-xl text-cyan-400">Developer Logs</h2>
          <p className="text-gray-300">{`$ echo "Best cloud IDE ever" --user @devloper`}</p>
          <p className="mt-2 text-gray-400">{`$ echo "Shipped MVP in one afternoon" --user @frontendace`}</p>
        </section>

        <section className="mt-14 rounded-lg border border-cyan-500/30 bg-zinc-900/50 p-8 text-center shadow-[0_0_30px_#00F0FF22] backdrop-blur-sm">
          <h2 className="font-mono text-3xl text-cyan-400">Ready to Code Without Setup?</h2>
          <p className="mt-3 text-gray-300">Free tier includes 100k AI tokens/month</p>
          <SignInButton>
            <Button className="mt-6 border border-cyan-400 bg-cyan-400 px-8 py-6 text-base text-black shadow-[0_0_18px_#00F0FF88] transition hover:shadow-[0_0_10px_#00F0FF]">
              Start Coding Now →
            </Button>
          </SignInButton>
          <p className="mt-3 text-xs text-gray-400">No credit card required</p>
        </section>

        <footer className="mt-16 border-t border-cyan-500/20 pt-6 font-mono text-sm">
          <p className="text-[#33FF33]">$ npx create-axiom-app</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-gray-400">
            <p className="text-[#33FF33]">© {new Date().getFullYear()} Axiom. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-cyan-300 hover:text-cyan-200">
                {"> about"}
              </a>
              <a href="#" className="text-cyan-300 hover:text-cyan-200">
                {"> privacy"}
              </a>
              <a href="#" className="text-cyan-300 hover:text-cyan-200">
                {"> terms"}
              </a>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-gray-500">
            <MonitorSmartphone className="h-3.5 w-3.5" />
            Responsive on mobile, tablet, and desktop.
          </p>
        </footer>
      </div>
    </main>
  );
};
