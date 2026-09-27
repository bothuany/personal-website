"use client";

import { useState } from "react";
import { about, education, experience, profile, projects, stack } from "@/data/portfolio";

export function ProjectsApp() {
  const [sel, setSel] = useState(0);
  const p = projects[sel];
  return (
    <div className="app-projects">
      <nav>
        {projects.map((x, i) => (
          <button key={x.id} className={i === sel ? "on" : ""} onClick={() => setSel(i)}>
            <strong>{x.name}</strong>
            <span>{x.kind}</span>
          </button>
        ))}
      </nav>
      <article key={p.id}>
        <h3>{p.name}</h3>
        <p className="app-sub">{p.role}</p>
        {p.description.map((d) => (
          <p key={d}>{d}</p>
        ))}
        <ul className="pills">
          {p.technologies.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="app-actions">
          {p.demoUrl && (
            <a className="os-btn os-btn--primary" href={p.demoUrl} target="_blank" rel="noopener noreferrer">
              Open live site
            </a>
          )}
          {p.githubUrl && (
            <a className="os-btn" href={p.githubUrl} target="_blank" rel="noopener noreferrer">
              View code on GitHub
            </a>
          )}
        </div>
      </article>
    </div>
  );
}

export function AboutApp() {
  return (
    <div className="app-doc">
      <h3>Hi, I&apos;m Batuhan.</h3>
      <p className="app-lead">{about.intro}</p>
      <div className="app-cols">
        <section>
          <h4>What I bring</h4>
          <ul>{about.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
        </section>
        <section>
          <h4>How I work</h4>
          <ul>{about.approach.map((s) => <li key={s}>{s}</li>)}</ul>
        </section>
      </div>
      <p>{about.history}</p>
    </div>
  );
}

export function ResumeApp() {
  return (
    <div className="app-doc">
      <div className="app-doc__head">
        <h3>Experience</h3>
        <a className="os-btn os-btn--primary" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          Open full resume (PDF)
        </a>
      </div>
      <ol className="app-timeline">
        {experience.map((j) => (
          <li key={j.title + j.when}>
            <div className="app-timeline__when">{j.when}</div>
            <div>
              <h4>{j.title} at {j.org}</h4>
              {j.bullets.map((b) => (
                <p key={b}>{b}</p>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <h3 className="app-h3-gap">Education</h3>
      <ol className="app-timeline">
        {education.map((e) => (
          <li key={e.title}>
            <div className="app-timeline__when">{e.when}</div>
            <div>
              <h4>{e.title}</h4>
              <p>{e.org}. {e.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function StackApp() {
  return (
    <div className="app-stack">
      {stack.map((c) => (
        <section key={c.name}>
          <h4>{c.name}</h4>
          <ul className="pills">
            {c.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function ContactApp() {
  const rows = [
    { k: "Email", v: profile.email, href: `mailto:${profile.email}` },
    { k: "LinkedIn", v: "linkedin.com/in/recep-batuhan-dikmen", href: profile.links.linkedin },
    { k: "GitHub", v: "github.com/bothuany", href: profile.links.github },
    { k: "Medium", v: "medium.com/@rbdikmen", href: profile.links.medium },
  ];
  return (
    <div className="app-mail">
      <div className="app-mail__field"><span>To</span>{profile.name}</div>
      <div className="app-mail__field"><span>Subject</span>Hello from your portfolio</div>
      <p className="app-lead">Open to backend and full-stack roles, collaborations, or just a friendly chat. Pick whichever channel suits you.</p>
      <ul className="app-mail__list">
        {rows.map((r) => (
          <li key={r.k}>
            <a href={r.href} target={r.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer">
              <strong>{r.k}</strong>
              <span>{r.v}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}


