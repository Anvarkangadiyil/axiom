# Axiom

> A browser-based, AI-powered cloud IDE. Write, run, and ship code from anywhere — no local setup required.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square\&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square\&logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square\&logo=react)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## What is Axiom?

Axiom is a browser-based AI-powered cloud IDE built with Next.js. It combines a CodeMirror 6 editor, an in-browser Node.js runtime powered by WebContainers, a fully integrated terminal, and AI-assisted development to help you write, run, and iterate on code without leaving your browser.

---

## Features

### ✏️ Editor

* CodeMirror 6 editor with syntax highlighting
* Minimap support
* Indentation guides
* One Dark theme

### 🤖 AI

* **Inline AI Suggestions** powered by **Groq**
* **Quick Edit** for rewriting selected code with AI
* **Autonomous AI Agent** powered by Inngest Agent Kit for multi-step coding tasks
* Streaming AI responses with Markdown and Mermaid support
* Live web context using Firecrawl

### 💻 Runtime & Terminal

* In-browser Node.js runtime using WebContainers
* Integrated xterm.js terminal

### 🗂️ Workspace

* Resizable editor layout
* React Flow project visualization
* Real-time workspace powered by Convex
* AI token usage tracking

### 🔐 Infrastructure

* Clerk Authentication
* Sentry error monitoring
* Inngest background jobs and workflow orchestration

---

## Tech Stack

| Layer            | Technology                        |
| ---------------- | --------------------------------- |
| Framework        | Next.js 16, React 19              |
| Language         | TypeScript 5                      |
| Styling          | Tailwind CSS v4                   |
| UI               | shadcn/ui, Radix UI, Lucide React |
| Editor           | CodeMirror 6                      |
| Runtime          | WebContainers                     |
| Terminal         | xterm.js                          |
| AI               | **Groq**, Vercel AI SDK           |
| Agent            | Inngest Agent Kit                 |
| Workflow         | Inngest                           |
| Backend          | Convex                            |
| Authentication   | Clerk                             |
| Web Context      | Firecrawl                         |
| Monitoring       | Sentry                            |
| State Management | Zustand                           |

---

## Getting Started

### Prerequisites

* Node.js 18+
* npm / yarn / pnpm / bun

```bash
git clone https://github.com/Anvarkangadiyil/axiom.git
cd axiom
npm install
npm run dev
```

Open **http://localhost:3000**

> **Note:** WebContainers require `SharedArrayBuffer` support. The required headers are already configured in `next.config.ts`.

---

## Deployment

Deploy on Vercel and configure the required environment variables for Convex, Clerk, Groq, Firecrawl, and Inngest.

```bash
vercel --prod
```

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## License

MIT © Anvar Kangadiyil
