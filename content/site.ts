// Everything the site says. Sources: public/resume.pdf and the READMEs of the linked repos. No invented numbers.

export const site = {
  name: "Recep Batuhan Dikmen",
  mark: "RBD",
  city: "Istanbul",
  description:
    "Recep Batuhan Dikmen, software developer in Istanbul. Builds Insilode, an editor that shows how code runs.",
  url: "https://recepbatuhandikmen.vercel.app",
  links: {
    email: "rbdikmen@gmail.com",
    linkedin: "https://linkedin.com/in/recep-batuhan-dikmen",
    github: "https://github.com/bothuany",
    medium: "https://medium.com/@rbdikmen",
    resume: "/resume.pdf",
  },
};

// The one sentence the second scene lights up; the last words glow.
export const belief = { lead: "Most tools show you what code says. I build the ones that show", hot: "what it does." };

export const insilode = {
  tagline: "Every code editor shows your files.",
  tagHot: "Insilode shows how your code runs.",
  features: [
    "Follow a request across services, queues and databases, card by card.",
    "Review what an AI agent changed, drawn on the flow instead of buried in a diff.",
    "Run Claude Code and Codex side by side, and see which one needs you.",
  ],
  links: { try: "https://insilode.dev/try/", github: "https://github.com/bothuany/insilode" },
  // The drawing on the right: one request, through two services and a queue.
  flow: {
    nodes: [
      { id: "req", x: 0, y: 250, w: 150, t: "POST /orders", s: "request" },
      { id: "ctl", x: 200, y: 140, w: 170, t: "OrderController", s: "place()" },
      { id: "svc", x: 200, y: 360, w: 170, t: "OrderService", s: "save · price" },
      { id: "db", x: 430, y: 470, w: 150, t: "orders", s: "table" },
      { id: "q", x: 430, y: 250, w: 170, t: "order-placed", s: "kafka topic" },
      { id: "bill", x: 610, y: 120, w: 150, t: "BillingListener", s: "other service" },
      { id: "mail", x: 610, y: 360, w: 150, t: "Mailer", s: "guessed link" },
    ],
    edges: [["req", "ctl"], ["ctl", "svc"], ["svc", "db"], ["svc", "q"], ["q", "bill"], ["q", "mail", "guess"]] as [string, string, string?][],
  },
};

export const numbers: { to: number; format?: "k"; suffix?: string; decimals?: number; text: string }[] = [
  { to: 50000, format: "k", text: "employees learn on TAG, the platform I’m moving from Java to .NET 10." },
  { to: 20, suffix: "%", text: "faster queries on the core APIs I built for Geleceği Yazanlar." },
  { to: 5, suffix: "+", text: "retail chains and hundreds of their stores ran on my full-stack work at ATP." },
  { to: 3.65, decimals: 2, text: "GPA in computer engineering, Eskişehir Technical University, honor student." },
];

export const starter = {
  rules: ["Ask", "Plan", "Build clean", "Review fresh"],
  text: "That’s claude-starter, the Claude Code setup I open-sourced: it asks before it assumes, writes the plan to a file, builds in a clean context and reviews with fresh eyes.",
  href: "https://github.com/bothuany/claude-starter",
};

export const path = [
  { year: "2020", title: "Eskişehir Technical University", text: "BSc computer engineering. Graduated in 2024 with a 3.65 GPA." },
  { year: "2023", title: "Internships", text: "Softtech, OBSS and TUSAŞ during university, then Eczacıbaşı Bilişim, where I built a Teams bot in .NET and React." },
  { year: "2024", title: "ATP · Junior developer", text: "Full-stack work for five retail clients, and one dashboard to manage users across all their apps." },
  { year: "2025", title: "Turkcell · Associate developer", text: "Core APIs of the Geleceği Yazanlar evaluation platform. MCP servers for our own tooling." },
  { year: "2026", title: "Turkcell · Software developer", text: "Moving TAG, used by 50,000+ employees, from Java and JSF to .NET 10." },
  { year: "Now", title: "Insilode", text: "Nights and weekends: an editor that shows how code runs." },
];

// Rows of tools that drift past; `hot` ones are drawn in the signal colour.
export const tools: { speed: number; outline?: boolean; items: string[]; hot: string[] }[] = [
  { speed: -1, items: ["C#", ".NET", "Java", "Spring Boot", "TypeScript", "React", "Angular"], hot: [".NET"] },
  { speed: 1, outline: true, items: ["Kafka", "PostgreSQL", "Oracle", "Redis", "Docker", "Kubernetes"], hot: [] },
  { speed: -0.7, items: ["Claude Code", "MCP", "Agent skills", "Playwright"], hot: ["MCP"] },
];
export const languages = ["Turkish · native", "English · full professional"];
