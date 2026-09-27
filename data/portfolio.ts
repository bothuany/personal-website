export const profile = {
  name: "Recep Batuhan Dikmen",
  title: "Software Developer",
  company: "Turkcell",
  location: "Istanbul, Turkey",
  email: "rbdikmen@gmail.com",
  links: {
    github: "https://github.com/bothuany",
    linkedin: "https://linkedin.com/in/recep-batuhan-dikmen",
    medium: "https://medium.com/@rbdikmen",
  },
};

export const about = {
  intro:
    "Software engineer with a deep love for technology since childhood. I build clean, maintainable systems — from microservice architectures with Kafka & Kubernetes to full-stack apps with Spring Boot and React — and I work agent-first: Claude Code is part of my daily workflow, extended with MCP servers and agent skills.",
  strengths: [
    "Full-stack, backend-first",
    "AI-native workflow with Claude Code, MCP and agent skills",
    "Problem solver who enjoys hard problems",
    "Continuous learner",
    "Team player",
  ],
  approach: [
    "Clean, maintainable, efficient code",
    "Agile ways of working",
    "High-quality delivery",
  ],
  history:
    "Currently at Turkcell working on enterprise applications and internal platforms. Previously at ATP Tech; interned at Eczacıbaşı Bilişim, Softtech, OBSS Technology and TUSAŞ (Turkish Aerospace).",
};

export type Project = {
  id: string;
  name: string;
  role: string;
  kind: "Professional" | "Personal" | "University";
  description: string[];
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    id: "tag-lms",
    name: "TAG — Turkcell Akademi Gelişim",
    role: "Associate Software Developer · Turkcell",
    kind: "Professional",
    description: [
      "Developed and maintained Turkcell's internal Learning Management System for corporate training and employee development.",
      "Engineered a custom MCP server for Oracle Database so AI coding agents could query the schema directly, closing a tooling gap in AI-assisted development.",
    ],
    technologies: ["Java", "JSF", "Oracle DB", "SonarQube", "Fortify", "Dynatrace", "Jenkins", "BitBucket"],
  },
  {
    id: "gelecegi-yazanlar",
    name: "Geleceği Yazanlar Scoring System",
    role: "Associate Software Developer · Turkcell",
    kind: "Professional",
    description: [
      "Built an evaluation system integrated with Geleceği Yazanlar so juries can score and assess competing teams.",
      "Used AI coding agents and MCP integrations to speed up delivery and keep code context under control.",
    ],
    technologies: [".NET 8.0", "React", "PostgreSQL", "Playwright", "SonarQube", "Fortify", "Dynatrace", "Jenkins", "AWS S3", "BitBucket"],
    demoUrl: "https://gelecegiyazanlar.turkcell.com.tr/",
  },
  {
    id: "crm-microservices",
    name: "CRM Microservices",
    role: "Turkcell GYGY 4.0 Final Project",
    kind: "Personal",
    description: [
      "Architected a cloud-native CRM of 8 Spring Boot microservices, orchestrated with Docker and Kubernetes and event-driven over Kafka.",
      "Combined PostgreSQL, MongoDB and Redis; monitoring with Prometheus + Grafana and centralised logging on AWS ELK.",
      "Automated CI/CD pipelines with GitHub Actions.",
    ],
    technologies: ["Java", "Spring Boot", "Docker", "Kubernetes", "Kafka", "PostgreSQL", "MongoDB", "Redis", "Prometheus", "Grafana", "AWS ELK"],
    githubUrl: "https://github.com/bothuany/crm-microservices-turkcell-final-project",
  },
  {
    id: "tabgida-fasdat",
    name: "TabGıda, Fasdat, Entegre & Polat Apps",
    role: "Junior Software Developer · ATP Tech",
    kind: "Professional",
    description: [
      "Developed and maintained monolithic applications that optimise business-critical operations and system performance.",
    ],
    technologies: [".NET", "HTML", "CSS", "JavaScript", "MsSQL", "Azure", "Git"],
  },
  {
    id: "sencard",
    name: "Sencard Internal Tools",
    role: "Junior Software Developer · ATP Tech",
    kind: "Professional",
    description: [
      "Contributed to internal Sencard applications, including active-user querying and authentication management tools.",
    ],
    technologies: [".NET", "Angular", "MsSQL", "Azure", "Git"],
    demoUrl: "https://www.sencard.com.tr/",
  },
  {
    id: "blinder-app",
    name: "Blinder App",
    role: "Software Engineering course project",
    kind: "University",
    description: [
      "Full-stack mobile app built as the final project for the Software Engineering course.",
      "Spring Boot backend, React Native mobile client, deployed on AWS.",
    ],
    technologies: ["Java", "Spring Boot", "React Native", "WebFlux", "PostgreSQL", "Azure", "AWS", "Postman", "Git", "Figma"],
    githubUrl: "https://github.com/bothuany/blinder-api",
  },
];

export const experience = [
  {
    title: "Software Developer",
    org: "Turkcell",
    when: "May 2026 – Present",
    bullets: [
      "Leading the modernisation of the TAG enterprise LMS from legacy Java/JSF to .NET 10, architecting backend services for 50,000+ corporate learners.",
    ],
  },
  {
    title: "Associate Software Developer",
    org: "Turkcell",
    when: "Aug 2025 – May 2026",
    bullets: [
      "Engineered core API routes for the Geleceği Yazanlar evaluation platform (.NET 8.0 + React), cutting query latency by ~20% for 50,000+ users.",
      "Pioneered AI-assisted development on the team with custom MCP servers for coding agents.",
    ],
  },
  {
    title: "Junior Software Developer",
    org: "ATP",
    when: "Jul 2024 – Jul 2025",
    bullets: [
      "Delivered full-stack solutions for 5+ retail clients (TabGıda, Fasdat, Sencard) with .NET 5, Angular and MsSQL.",
      "Built a centralised user-management dashboard for querying and administering users across retail apps.",
    ],
  },
  {
    title: "Software Developer Intern",
    org: "Eczacıbaşı Bilişim",
    when: "Sep 2023 – Jun 2024",
    bullets: ["Contributed to Nextflow, engineering a Microsoft Teams bot integration with .NET Core Web API and React."],
  },
];

export const education = [
  {
    title: "B.Sc. Computer Engineering",
    org: "Eskişehir Technical University",
    when: "Oct 2020 – Jun 2024",
    note: "GPA 3.65 / 4.00 · Honor Student",
  },
  {
    title: "Turkcell GYGY 4.0 Bootcamp",
    org: "Java Spring Boot Development Program",
    when: "Dec 2024 – Apr 2025",
    note: "120-hour intensive program — 8-service CRM with Spring Boot, Spring Security and Kafka.",
  },
];

export const stack = [
  { name: "Languages", items: ["Java", "Python", "C#", "JavaScript", "Go"] },
  { name: "Frameworks & Libraries", items: ["Spring Boot", ".NET", "Node.js", "React", "React Native", "Angular"] },
  { name: "Databases", items: ["PostgreSQL", "MySQL", "MsSQL", "MongoDB", "Oracle", "Redis"] },
  { name: "DevOps & Tools", items: ["Git", "GitHub", "Docker", "Kubernetes", "Kafka", "RabbitMQ", "Playwright", "SonarQube", "Jenkins"] },
  { name: "Cloud", items: ["AWS", "Azure"] },
  { name: "AI tooling", items: ["Claude Code", "MCP servers", "Agent skills", "Subagents", "Hooks", "Cursor"] },
];

