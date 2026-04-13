# Axiom

> A browser-based, AI-powered cloud IDE. Write, run, and ship code from anywhere — no local setup required.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## What is Axiom?

Axiom is a full-featured cloud IDE that runs entirely in the browser. It pairs a powerful CodeMirror 6 editor with an in-browser Node.js runtime (via WebContainers), a real terminal, and deeply integrated AI — from inline suggestions to an autonomous coding agent — so you can go from idea to running code without touching your local machine.

---

## Features
 
### ✏️ Editor
- **CodeMirror 6 editor** — Syntax highlighting for JS/TS, HTML, CSS, Python, JSON, and Markdown
- **Minimap** — Bird's-eye view of your file via `@replit/codemirror-minimap`
- **Indentation guides** — Visual indent markers for cleaner code navigation
- **One Dark theme** — Easy on the eyes out of the box
 
### 🤖 AI
- **AI Suggestions** — Inline ghost-text completions as you type, powered by `llama-3.1-8b-instant` via Groq — similar to GitHub Copilot
- **Quick Edit** — Select any block of code, type a prompt, and Axiom rewrites the selection in place — powered by `openai/gpt-oss-20b` via OpenRouter
- **AI Agent** — Autonomous multi-step coding tasks powered by Inngest AgentKit; the agent can read, write, and run code to complete complex goals
- **Streaming responses** — Markdown, code blocks, math equations, and Mermaid diagrams rendered as they stream in real time
- **Web context** — Pull live web content into AI context via Firecrawl for research-grounded code generation
 
### 💻 Runtime & Terminal
- **In-browser Node.js runtime** — Run full Node.js projects directly in the browser using WebContainers, no backend sandbox needed
- **Integrated terminal** — Full xterm.js terminal with auto-fit; run scripts, install packages, and see output live
 
### 🗂️ Workspace
- **Resizable split-pane layout** — Flexible editor/terminal/panel layout powered by allotment and react-resizable-panels
- **Node graph views** — Visualize project structure and relationships with React Flow
- **Real-time backend** — Persistent workspace state synced with Convex
- **Token usage tracking** — Monitor AI token consumption with tokenlens
 
### 🔐 Auth & Infrastructure
- **Authentication** — Clerk-powered sign-in with theme support
- **Error monitoring** — Sentry instrumented on server, edge, and client
- **Background jobs** — Inngest for reliable async and scheduled tasks
 
---
]

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16, React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI | Radix UI, shadcn/ui, Lucide React |
| Editor | CodeMirror 6 |
| Terminal | xterm.js |
| Runtime | WebContainers API |
| AI / LLM | Vercel AI SDK v6, Groq, Google Gemini, OpenRouter |
| Agent | Inngest AgentKit |
| Backend | Convex |
| Auth | Clerk |
| Web Scraping | Firecrawl |
| Monitoring | Sentry |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Animations | Motion (Framer Motion v12) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm / bun

### Install

```bash
git clone https://github.com/Anvarkangadiyil/axiom.git
cd axiom
npm install
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** WebContainers require `SharedArrayBuffer` support. The app must be served with these headers:
> ```
> Cross-Origin-Opener-Policy: same-origin
> Cross-Origin-Embedder-Policy: require-corp
> ```
> These are already configured in `next.config.ts`.

### Build

```bash
npm run build
npm run start
```
---

## Deployment

Deploy to [Vercel](https://vercel.com) for the easiest setup. Make sure all environment variables are configured in your Vercel project settings.

```bash
vercel --prod
```

Convex, Clerk, and Inngest each require their own project setup — refer to their docs for deployment guides.

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes (`git commit -m 'feat: add my feature'`)
4. Push to the branch (`git push origin feat/my-feature`)
5. Open a Pull Request

---

## License

MIT © [Anvar Kangadiyil](https://github.com/Anvarkangadiyil)
