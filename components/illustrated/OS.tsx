"use client";

import { useEffect, useState } from "react";
import { experience, profile, projects } from "@/data/portfolio";
import { AboutApp, ContactApp, ProjectsApp, ResumeApp, StackApp } from "./OSApps";

export type AppId = "projects" | "about" | "resume" | "stack" | "contact";

// dock order; each app borrows the look of the macOS app it stands in for
export const APPS: { id: AppId; name: string; title: string }[] = [
  { id: "projects", name: "Projects", title: `Projects — ${projects.length} items` },
  { id: "about", name: "About me", title: "About me" },
  { id: "resume", name: "Resume", title: "Resume.pdf" },
  { id: "stack", name: "Tech stack", title: "Tech stack" },
  { id: "contact", name: "Contact", title: "New message" },
];

function useNow(every: number) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), every);
    return () => clearInterval(t);
  }, [every]);
  return now;
}

function MenuClock() {
  const now = useNow(15000);
  if (!now) return null;
  const day = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return <span>{day.replace(/,/g, "")}&nbsp;&nbsp;{time}</span>;
}

// app icons: squircles with gradients, drawn at 64×64
export function AppIcon({ id }: { id: AppId }) {
  const g = `ic-${id}`;
  return (
    <svg className="mac-icon" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        {id === "projects" && (
          <linearGradient id={g} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7fd0ff" /><stop offset="1" stopColor="#1f7ef0" /></linearGradient>
        )}
        {id === "about" && (
          <linearGradient id={g} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fffdf6" /><stop offset="1" stopColor="#ece6d6" /></linearGradient>
        )}
        {id === "resume" && (
          <linearGradient id={g} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffb36b" /><stop offset="1" stopColor="#f0663c" /></linearGradient>
        )}
        {id === "stack" && (
          <linearGradient id={g} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a9a7b6" /><stop offset="1" stopColor="#57556a" /></linearGradient>
        )}
        {id === "contact" && (
          <linearGradient id={g} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6fd3ff" /><stop offset="1" stopColor="#1a6ff0" /></linearGradient>
        )}
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill={`url(#${g})`} />
      {id === "projects" && (
        <g>
          <path d="M14 22a4 4 0 0 1 4-4h9l4 4h15a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z" fill="#dff3ff" />
          <path d="M14 28h36v16a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z" fill="#fff" />
        </g>
      )}
      {id === "about" && (
        <g>
          <path d="M2 16V16A14 14 0 0 1 16 2h32a14 14 0 0 1 14 14v4H2z" fill="#ffd23f" />
          <path d="M12 30h40M12 38h40M12 46h28" stroke="#d8cfbd" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {id === "resume" && (
        <g>
          <path d="M20 12h18l8 8v32H20z" fill="#fff" />
          <path d="M38 12v8h8" fill="#ffd9c4" />
          <path d="M25 30h16M25 36h16M25 42h10" stroke="#f0663c" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      )}
      {id === "stack" && (
        <g>
          <path d="M28.54 16.38 L29.49 12.16 L34.51 12.16 L35.46 16.38 L36.82 16.74 L39.75 13.56 L44.09 16.07 L42.81 20.20 L43.80 21.19 L47.93 19.91 L50.44 24.25 L47.26 27.18 L47.62 28.54 L51.84 29.49 L51.84 34.51 L47.62 35.46 L47.26 36.82 L50.44 39.75 L47.93 44.09 L43.80 42.81 L42.81 43.80 L44.09 47.93 L39.75 50.44 L36.82 47.26 L35.46 47.62 L34.51 51.84 L29.49 51.84 L28.54 47.62 L27.18 47.26 L24.25 50.44 L19.91 47.93 L21.19 43.80 L20.20 42.81 L16.07 44.09 L13.56 39.75 L16.74 36.82 L16.38 35.46 L12.16 34.51 L12.16 29.49 L16.38 28.54 L16.74 27.18 L13.56 24.25 L16.07 19.91 L20.20 21.19 L21.19 20.20 L19.91 16.07 L24.25 13.56 L27.18 16.74 Z" fill="#f4f3f8" />
          <circle cx="32" cy="32" r="12.5" fill="#8e8ba1" />
          <circle cx="32" cy="32" r="8.5" fill="#f4f3f8" />
          <circle cx="32" cy="32" r="4.5" fill="#6d6a82" />
        </g>
      )}
      {id === "contact" && (
        <g>
          <rect x="12" y="19" width="40" height="27" rx="4" fill="#fff" />
          <path d="M13 21l19 14 19-14" fill="none" stroke="#1a6ff0" strokeWidth="2.6" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}

function Paw() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <ellipse cx="12" cy="16" rx="5.2" ry="4.4" />
      <ellipse cx="5.2" cy="10.5" rx="2.2" ry="2.8" />
      <ellipse cx="9.2" cy="6.4" rx="2.2" ry="2.9" />
      <ellipse cx="14.8" cy="6.4" rx="2.2" ry="2.9" />
      <ellipse cx="18.8" cy="10.5" rx="2.2" ry="2.8" />
    </svg>
  );
}

// rounded so server and client render identical attributes
const r2 = (n: number) => Math.round(n * 100) / 100;

function ClockWidget() {
  const now = useNow(1000);
  const h = now ? now.getHours() % 12 : 10;
  const m = now ? now.getMinutes() : 9;
  const sec = now ? now.getSeconds() : 30;
  const hand = (deg: number, len: number, w: number, color: string) => (
    <line x1="50" y1="50" x2={r2(50 + len * Math.sin((deg * Math.PI) / 180))} y2={r2(50 - len * Math.cos((deg * Math.PI) / 180))} stroke={color} strokeWidth={w} strokeLinecap="round" />
  );
  return (
    <div className="mac-widget mac-widget--clock" aria-label="Istanbul clock">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="46" fill="#fbfaff" />
        {Array.from({ length: 12 }, (_, i) => (
          <text key={i} x={r2(50 + 35 * Math.sin((i * 30 * Math.PI) / 180))} y={r2(53.6 - 35 * Math.cos((i * 30 * Math.PI) / 180))} textAnchor="middle" fontSize="10" fontWeight="600" fill="#22264f">
            {i === 0 ? 12 : i}
          </text>
        ))}
        {hand(h * 30 + m / 2, 20, 4, "#22264f")}
        {hand(m * 6, 30, 3, "#22264f")}
        {hand(sec * 6, 34, 1.3, "#f0663c")}
        <circle cx="50" cy="50" r="2.6" fill="#f0663c" />
      </svg>
      <span>Istanbul</span>
    </div>
  );
}

export default function OS({
  open,
  setOpen,
  interactive,
}: {
  open: AppId | null;
  setOpen: (a: AppId | null) => void;
  interactive: boolean;
}) {
  const app = APPS.find((a) => a.id === open);
  const [zoomed, setZoomed] = useState(false);
  const now = experience[0];

  return (
    <div className="os" inert={!interactive || undefined}>
      <div className="mac-wall" aria-hidden="true" />

      <header className="mac-bar">
        <span className="mac-bar__logo"><Paw /></span>
        <strong>{app ? app.name : "LatteOS"}</strong>
        <span className="mac-bar__menu" aria-hidden="true">File&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;View&nbsp;&nbsp;&nbsp;Window&nbsp;&nbsp;&nbsp;Help</span>
        <span className="mac-bar__right">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0" /><circle cx="12" cy="19.5" r="1" fill="currentColor" /></svg>
          <svg width="26" height="14" viewBox="0 0 26 14" aria-hidden="true"><rect x="0.8" y="0.8" width="21" height="12.4" rx="3.5" fill="none" stroke="currentColor" strokeOpacity=".55" strokeWidth="1.4" /><rect x="3" y="3" width="14" height="8" rx="1.8" fill="currentColor" /><path d="M23.6 5v4" stroke="currentColor" strokeOpacity=".55" strokeWidth="1.6" strokeLinecap="round" /></svg>
          <MenuClock />
        </span>
      </header>

      <div className="mac-desk">
        <button className="mac-widget mac-widget--me" onClick={() => setOpen("about")}>
          <img src="/rbd_logo.png" alt="" width="72" height="72" />
          <span>
            <strong>{profile.name}</strong>
            <em>{profile.title} at {profile.company}</em>
            <small>{profile.location}</small>
          </span>
        </button>
        <ClockWidget />
        <button className="mac-widget mac-widget--ai" onClick={() => setOpen("stack")}>
          <svg viewBox="0 0 16 12" shapeRendering="crispEdges" aria-hidden="true">
            <g fill="#d97757"><rect x="3" y="1" width="10" height="7" /><rect x="1" y="4" width="2" height="2" /><rect x="13" y="4" width="2" height="2" /><rect x="4" y="8" width="1" height="3" /><rect x="6" y="8" width="1" height="3" /><rect x="9" y="8" width="1" height="3" /><rect x="11" y="8" width="1" height="3" /></g>
            <g fill="#1c1a24"><rect x="5" y="3" width="1" height="2" /><rect x="10" y="3" width="1" height="2" /></g>
          </svg>
          <span className="mac-widget__kicker">Daily driver</span>
          <strong>Claude Code</strong>
          <small>MCP · Skills · Hooks</small>
        </button>
        <button className="mac-widget mac-widget--now" onClick={() => setOpen("resume")}>
          <span className="mac-widget__kicker">Currently</span>
          <strong>{now.title} at {now.org}</strong>
          <p>{now.bullets[0]}</p>
        </button>
      </div>

      <a className="mac-file" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
        <AppIcon id="resume" />
        <span>Resume.pdf</span>
      </a>

      {app && (
        <section className={`mac-win ${zoomed ? "is-max" : ""}`} key={app.id} aria-label={app.name}>
          <header className="mac-win__bar">
            <span className="mac-lights">
              <button className="mac-light mac-light--close" onClick={() => setOpen(null)} aria-label="Close window" />
              <button className="mac-light mac-light--min" onClick={() => setOpen(null)} aria-label="Minimise window" />
              <button className="mac-light mac-light--max" onClick={() => setZoomed((z) => !z)} aria-label={zoomed ? "Restore window size" : "Enlarge window"} />
            </span>
            <span className="mac-win__title">{app.title}</span>
          </header>
          <div className="os-win__body">
            {app.id === "projects" && <ProjectsApp />}
            {app.id === "about" && <AboutApp />}
            {app.id === "resume" && <ResumeApp />}
            {app.id === "stack" && <StackApp />}
            {app.id === "contact" && <ContactApp />}
          </div>
        </section>
      )}

      <nav className="mac-dock" aria-label="Dock">
        <ul>
          {APPS.map((a) => (
            <li key={a.id}>
              <button onClick={() => setOpen(a.id)} aria-label={a.name} aria-current={a.id === open ? "page" : undefined}>
                <AppIcon id={a.id} />
                <span className="mac-dock__tip">{a.name}</span>
              </button>
              {a.id === open && <i className="mac-dock__dot" />}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
