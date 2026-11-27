// Everything the site says. Sources: public/resume.pdf and the READMEs of the linked repos. No invented numbers.

export const site = {
  name: "Recep Batuhan Dikmen",
  mark: "RBD",
  city: "Istanbul",
  tagline: "Backend at scale, AI in the loop.",
  description:
    "Recep Batuhan Dikmen, software developer in Istanbul. Backend at scale, AI in the loop: .NET and Java systems for tens of thousands of users, built with Claude Code, MCP servers and agents.",
  url: "https://recepbatuhandikmen.vercel.app",
  links: {
    email: "rbdikmen@gmail.com",
    linkedin: "https://linkedin.com/in/recep-batuhan-dikmen",
    github: "https://github.com/bothuany",
    medium: "https://medium.com/@rbdikmen",
    resume: "/resume.pdf",
  },
};

// The sentence the second scene lights up word by word; the last words glow.
export const belief = { lead: "Backends that tens of thousands of people use every day, built with", hot: "AI in the loop." };

export const backend = {
  title: "Backend at scale",
  intro: "My day job is Turkcell: systems a lot of people lean on, in .NET and Java.",
  numbers: [
    { to: 50000, format: "k", text: "employees learn on TAG. I’m moving it from Java and JSF to .NET 10." },
    { to: 20, suffix: "%", text: "faster queries after I rebuilt the core APIs of Geleceği Yazanlar’s evaluation platform." },
    { to: 5, suffix: "+", text: "retail chains, and hundreds of their stores, ran on my full-stack work at ATP." },
  ] as { to: number; format?: "k"; suffix?: string; decimals?: number; text: string }[],
};

export const ai = {
  title: "AI in the loop",
  points: [
    "I build with Claude Code every day, and I build what it needs.",
    "MCP servers, so agents read our real Oracle schema instead of guessing it.",
    "Agent skills and a Claude Code setup I open-sourced, claude-starter.",
  ],
  insilode: {
    lead: "And the editor I wanted for this way of working:",
    name: "Insilode",
    text: "It shows how your code runs, and what an agent changed, drawn on the flow. Open source, built on VS Code.",
    try: "https://insilode.dev/try/",
    github: "https://github.com/bothuany/insilode",
  },
  starter: "https://github.com/bothuany/claude-starter",
  // The drawing on the right: one request, through two services and a queue, as Insilode draws it.
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

export const path = [
  { year: "2020", title: "Eskişehir Technical University", text: "BSc computer engineering. Graduated in 2024 with a 3.65 GPA, honor student." },
  { year: "2023", title: "Internships", text: "Softtech, OBSS and TUSAŞ during university, then Eczacıbaşı Bilişim, where I built a Teams bot in .NET and React." },
  { year: "2024", title: "ATP · Junior developer", text: "Full-stack work for five retail clients, and one dashboard to manage users across all their apps." },
  { year: "2025", title: "Turkcell · Associate developer", text: "Core APIs of the Geleceği Yazanlar evaluation platform. MCP servers for our own tooling." },
  { year: "2026", title: "Turkcell · Software developer", text: "Moving TAG, used by 50,000+ employees, from Java and JSF to .NET 10." },
  { year: "Now", title: "Insilode", text: "Nights and weekends: an editor that shows how code runs." },
];

// Rows of tools that drift past; `hot` ones are drawn in the signal colour.
export const tools: { speed: number; outline?: boolean; items: string[]; hot: string[] }[] = [
  { speed: -1, items: ["C#", ".NET", "Java", "Spring Boot", "Kafka", "RabbitMQ", "REST"], hot: [".NET", "Java"] },
  { speed: 1, outline: true, items: ["PostgreSQL", "Oracle", "MsSQL", "Redis", "Docker", "Kubernetes"], hot: [] },
  { speed: -0.7, items: ["Claude Code", "MCP", "Agent skills", "TypeScript", "React"], hot: ["Claude Code", "MCP"] },
];
export const languages = ["Turkish · native", "English · full professional"];
