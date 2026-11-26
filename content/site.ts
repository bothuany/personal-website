// Everything the site says. Sources: the old site and public/resume.pdf. No invented numbers.

export type Grade = "dusk" | "night" | "deep" | "dawn";

export const site = {
  name: "Recep Batuhan Dikmen",
  mark: "RBD",
  role: "software developer at Turkcell, Istanbul",
  description: "Recep Batuhan Dikmen, software developer at Turkcell in Istanbul. Backend systems in .NET and Java, and MCP servers for coding agents.",
  url: "https://recepbatuhandikmen.vercel.app",
  links: {
    email: "rbdikmen@gmail.com",
    linkedin: "https://linkedin.com/in/recep-batuhan-dikmen",
    github: "https://github.com/bothuany",
    medium: "https://medium.com/@rbdikmen",
    resume: "/resume.pdf",
  },
};

// The film: a location super and subtitles per chapter, shown one line at a time.
export const chapters: { grade: Grade; where: string; place: string; placeLang?: string; when: string; lines: string[] }[] = [
  {
    grade: "dusk", where: "Eskişehir, 2020", place: "Eskişehir", placeLang: "tr", when: "2020 to 2024",
    lines: [
      "I studied computer engineering at Eskişehir Technical University.",
      "I graduated in 2024, an honor student with a 3.65 GPA.",
      "I also interned at Softtech, OBSS, TUSAŞ and Eczacıbaşı Bilişim, where I built a Microsoft Teams bot in .NET and React.",
    ],
  },
  {
    grade: "night", where: "Istanbul, 2024", place: "İstanbul", placeLang: "tr", when: "2024 to 2025",
    lines: [
      "At ATP I shipped full-stack work for five retail clients and hundreds of their stores.",
      "I also built one dashboard to manage users across all of their apps.",
      "Alongside it, a 120-hour Spring Boot program at Turkcell: a CRM made of eight microservices talking over Kafka.",
    ],
  },
  {
    grade: "night", where: "Turkcell, 2025", place: "Turkcell", when: "2025 to 2026, associate software developer",
    lines: [
      "I built the core API routes of Geleceği Yazanlar. Queries got about 20% faster.",
      "I started writing MCP servers, so coding agents could read our real Oracle schema instead of guessing.",
    ],
  },
  {
    grade: "deep", where: "Turkcell, now", place: "Now", when: "Software developer, Turkcell",
    lines: [
      "TAG is where more than 50,000 Turkcell employees take their training.",
      "I'm moving it from Java and JSF to .NET 10.",
    ],
  },
];

// End credits: the full CV.
export const experience = [
  { title: "Software Developer", company: "Turkcell", years: "2026 to now", note: "Leading the modernisation of the TAG enterprise LMS from legacy Java/JSF to .NET 10, architecting backend services for 50,000+ corporate learners." },
  { title: "Associate Software Developer", company: "Turkcell", years: "2025 to 2026", note: "Core API routes for the Geleceği Yazanlar evaluation platform with .NET 8 and React, about 20% lower query latency for 50,000+ users. Custom MCP servers, including one for Oracle Database." },
  { title: "Junior Software Developer", company: "ATP", years: "2024 to 2025", note: "Full-stack solutions for 5+ retail clients (TabGıda, Fasdat, Sencard) with .NET 5, Angular and MsSQL, and a central user management dashboard." },
  { title: "Software Developer Intern", company: "Eczacıbaşı Bilişim", years: "2023 to 2024", note: "The Nextflow project: a Microsoft Teams bot integration with .NET Core Web API and React." },
];
export const earlierInternships = ["Softtech", "OBSS Technology", "TUSAŞ (Turkish Aerospace)"];

export const projects: { org: string; name: string; summary: string; href?: string }[] = [
  { org: "Turkcell", name: "TAG (Turkcell Akademi Gelişim)", summary: "Turkcell's internal learning platform. Moving it from Java/JSF to .NET 10; wrote an MCP server for its Oracle database." },
  { org: "Turkcell", name: "Geleceği Yazanlar scoring system", summary: "Where juries score the teams competing in Geleceği Yazanlar. .NET 8, React, PostgreSQL.", href: "https://gelecegiyazanlar.turkcell.com.tr/" },
  { org: "Turkcell GYGY 4.0 final project", name: "CRM microservices", summary: "8 Spring Boot services over Kafka, on Docker and Kubernetes, with PostgreSQL, MongoDB and Redis.", href: "https://github.com/bothuany/crm-microservices-turkcell-final-project" },
  { org: "ATP", name: "TabGıda, Fasdat, Entegre & Polat apps", summary: "Business-critical apps for retail chains and their franchise locations." },
  { org: "ATP", name: "Sencard internal tools", summary: "Active-user queries and authentication management. .NET and Angular.", href: "https://www.sencard.com.tr/" },
  { org: "University, software engineering course", name: "Blinder", summary: "A full-stack mobile app: Spring Boot and WebFlux backend, React Native app, on AWS.", href: "https://github.com/bothuany/blinder-api" },
];

export const skills = [
  { group: "languages", items: "C#, Java, TypeScript, JavaScript, SQL, Python, Go" },
  { group: "backend", items: ".NET, Spring Boot, Node.js (Express), REST APIs, Kafka, RabbitMQ" },
  { group: "frontend & mobile", items: "React, Angular, React Native, Material UI, HTML & CSS" },
  { group: "data", items: "PostgreSQL, MsSQL, Oracle, MySQL, MongoDB, Redis" },
  { group: "platform & quality", items: "Docker, Kubernetes, Jenkins, GitHub Actions, SonarQube, Fortify, Dynatrace, Prometheus, Grafana, Playwright, Git" },
  { group: "cloud", items: "AWS, Azure" },
  { group: "AI tooling", items: "Claude Code, MCP servers, agent skills, Cursor" },
];

export const school = [
  { what: "BSc, computer engineering", where: "Eskişehir Technical University", note: "2020 to 2024. GPA 3.65 / 4.00, honor student." },
  { what: "Java Spring Boot development program", where: "Turkcell GYGY 4.0 Bootcamp", note: "2024 to 2025. 120 hours: architecture, databases, microservices." },
  { what: "Alibaba Cloud", where: "Cloud Computing Engineer", note: "2024" },
  { what: "Stanford Online (Coursera)", where: "Machine Learning Specialization", note: "2023" },
  { what: "languages", where: "Turkish (native), English (full professional, B2–C1)", note: "" },
];
