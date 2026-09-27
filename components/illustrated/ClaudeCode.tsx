"use client";

import { useEffect, useRef, useState } from "react";
import { about, experience, profile, projects } from "@/data/portfolio";

// A Claude Code-style session on the laptop: visitors pick a prompt and watch the agent "work" it out.
type Step =
  | { t: "tool"; name: string; arg: string; out: string }
  | { t: "say"; text: string; link?: { href: string; label: string } };
type Session = { ask: string; steps: Step[] };

const crm = projects.find((p) => p.id === "crm-microservices") ?? projects[0];

const DEMO: Session = {
  ask: "give Latte a comfy nap spot on the desk",
  steps: [
    { t: "tool", name: "Read", arg: "components/LatteCat.tsx", out: "Read 74 lines" },
    { t: "tool", name: "Update", arg: "app/illustrated.css", out: "+14 −3, added a loaf pose" },
    { t: "tool", name: "Bash", arg: "latte --nap", out: "zzz… purr level: high" },
    { t: "say", text: "Done. Latte now naps between the monitor stand and the laptop. Ask me something below." },
  ],
};

const SESSIONS: Session[] = [
  {
    ask: "who is Batuhan?",
    steps: [
      { t: "tool", name: "Read", arg: "about.md", out: `Read ${about.intro.split(" ").length} words` },
      { t: "say", text: `${profile.name}, ${profile.title.toLowerCase()} at ${profile.company} in ${profile.location}. ${about.intro.split(". ")[1] ?? about.intro}.` },
    ],
  },
  {
    ask: "what is he working on right now?",
    steps: [
      { t: "tool", name: "Grep", arg: '"Present" resume.pdf', out: "1 match" },
      { t: "say", text: experience[0].bullets[0] },
    ],
  },
  {
    ask: "show me a project worth a look",
    steps: [
      { t: "tool", name: "Glob", arg: "projects/**", out: `Found ${projects.length} projects` },
      { t: "tool", name: "Read", arg: `projects/${crm.id}/README.md`, out: `${crm.technologies.length} technologies` },
      { t: "say", text: `${crm.name}: ${crm.description[0]}`, link: crm.githubUrl ? { href: crm.githubUrl, label: "Open it on GitHub" } : undefined },
    ],
  },
  {
    ask: "how does he use AI in his work?",
    steps: [
      { t: "tool", name: "Bash", arg: "claude mcp list", out: "oracle-db ✓  github ✓  latte-cam ✓" },
      { t: "tool", name: "Read", arg: ".claude/skills/", out: "Loaded 6 agent skills" },
      { t: "say", text: "Claude Code is his daily driver. He builds MCP servers (one lets agents query Oracle DB schemas at work), writes agent skills, and wires subagents and hooks into real team workflows. This laptop screen is a small tribute." },
    ],
  },
  {
    ask: "is Latte a good cat?",
    steps: [
      { t: "tool", name: "Bash", arg: "latte --status", out: "mood: sleepy · snacks owed: 3" },
      { t: "say", text: "Extremely. She reviews every commit by sitting on the keyboard. Try petting her on the desk." },
    ],
  },
  {
    ask: "how do I hire him?",
    steps: [
      { t: "tool", name: "Write", arg: "hello.eml", out: "Draft ready" },
      { t: "say", text: "He's open to backend and full-stack roles and collaborations. The draft is one click away.", link: { href: `mailto:${profile.email}?subject=Hello%20from%20your%20portfolio`, label: `Email ${profile.email}` } },
    ],
  },
];

const SPIN = ["✢", "✳", "✶", "✻", "✽", "✻", "✶", "✳"];
const VERBS = ["Pondering", "Purring", "Brewing", "Noodling", "Whisking"];

export default function ClaudeCode({ interactive }: { interactive: boolean }) {
  const [session, setSession] = useState<Session>(DEMO);
  const [shown, setShown] = useState(0); // steps revealed
  const [typed, setTyped] = useState(0); // chars of the prompt typed
  const [said, setSaid] = useState(0); // chars of the current reply
  const [spin, setSpin] = useState(0);
  const body = useRef<HTMLDivElement>(null);

  const promptDone = typed >= session.ask.length;
  const current = session.steps[shown];
  const done = shown >= session.steps.length;

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (!promptDone) t = setTimeout(() => setTyped((n) => n + 1), 38 + Math.random() * 40);
    else if (current?.t === "tool") t = setTimeout(() => setShown((n) => n + 1), 900);
    else if (current?.t === "say") {
      if (said < current.text.length) t = setTimeout(() => setSaid((n) => Math.min(current.text.length, n + 3)), 22);
      else t = setTimeout(() => { setShown((n) => n + 1); setSaid(0); }, 200);
    }
    return () => clearTimeout(t);
  }, [typed, promptDone, current, said]);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setSpin((n) => n + 1), 120);
    return () => clearInterval(t);
  }, [done]);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  });

  const run = (s: Session) => {
    setSession(s);
    setShown(0);
    setTyped(0);
    setSaid(0);
  };

  const replies = session.steps.slice(0, shown);
  return (
    <div className="cc" aria-label="Claude Code session">
      <div className="cc__welcome">
        <Clawd busy={!done} />
        <div>
          <p><b>✻</b> Welcome to <strong>Claude Code</strong></p>
          <span>on Batuhan&apos;s laptop · ~/desk-portfolio</span>
        </div>
      </div>
      <div className="cc__body" ref={body}>

        <p className="cc__ask"><span>&gt;</span> {session.ask.slice(0, typed)}{!promptDone && <i className="cc__caret" />}</p>

        {replies.map((s, i) => <StepLine key={i} s={s} />)}
        {current?.t === "say" && <p className="cc__say"><b>●</b> {current.text.slice(0, said)}</p>}

        {promptDone && !done && current?.t === "tool" && (
          <p className="cc__think"><b>{SPIN[spin % SPIN.length]}</b> {VERBS[session.ask.length % VERBS.length]}… <em>(esc to interrupt)</em></p>
        )}

        {done && (
          <div className="cc__pick">
            <p>Try asking:</p>
            <ul>
              {SESSIONS.filter((s) => s !== session).map((s) => (
                <li key={s.ask}>
                  <button onClick={() => run(s)} tabIndex={interactive ? 0 : -1}>&gt; {s.ask}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="cc__foot">
        <span>? for shortcuts</span>
        <span>Opus · Latte-approved</span>
      </div>
    </div>
  );
}

// the little orange pixel buddy, drawn on a 16×12 grid
function Clawd({ busy }: { busy: boolean }) {
  return (
    <svg className={`cc__clawd ${busy ? "is-busy" : ""}`} viewBox="0 0 16 12" shapeRendering="crispEdges" aria-hidden="true">
      <g fill="#d97757">
        <rect x="3" y="1" width="10" height="7" />
        <rect x="1" y="4" width="2" height="2" />
        <rect x="13" y="4" width="2" height="2" />
        <rect className="cc__leg cc__leg--a" x="4" y="8" width="1" height="3" />
        <rect className="cc__leg cc__leg--b" x="6" y="8" width="1" height="3" />
        <rect className="cc__leg cc__leg--a" x="9" y="8" width="1" height="3" />
        <rect className="cc__leg cc__leg--b" x="11" y="8" width="1" height="3" />
      </g>
      <g className="cc__eyes" fill="#16161d">
        <rect x="5" y="3" width="1" height="2" />
        <rect x="10" y="3" width="1" height="2" />
      </g>
    </svg>
  );
}

function StepLine({ s }: { s: Step }) {
  if (s.t === "tool")
    return (
      <div className="cc__tool">
        <p><b>●</b> <strong>{s.name}</strong>({s.arg})</p>
        <p className="cc__out">⎿&nbsp; {s.out}</p>
      </div>
    );
  return (
    <p className="cc__say">
      <b>●</b> {s.text}
      {s.link && (
        <>
          {" "}
          <a href={s.link.href} target={s.link.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer">{s.link.label}</a>
        </>
      )}
    </p>
  );
}
