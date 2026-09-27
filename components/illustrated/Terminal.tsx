"use client";

import { useEffect, useState } from "react";
import { about, profile, stack } from "@/data/portfolio";

const SCRIPT: { cmd: string; out: string[] }[] = [
  { cmd: "whoami", out: [`${profile.name}`, `${profile.title} @ ${profile.company}, ${profile.location}`] },
  { cmd: "cat now.txt", out: ["Modernising the TAG enterprise LMS", "from Java/JSF to .NET 10 for 50,000+ learners."] },
  { cmd: "ls ~/favourite-tools", out: [stack[1].items.slice(0, 4).join("  "), stack[3].items.slice(3, 7).join("  ")] },
  { cmd: "claude mcp list", out: ["oracle-db   ✓ connected", "github      ✓ connected", "latte-cam   ✓ connected"] },
  { cmd: "latte --status", out: ["patrolling the desk, purr level: high"] },
  { cmd: "echo $MOTTO", out: [about.approach[0]] },
];

// Types the script out once, the way a real shell would echo it
export default function Terminal() {
  const [step, setStep] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (step >= SCRIPT.length) return;
    const cmd = SCRIPT[step].cmd;
    if (chars < cmd.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 55 + Math.random() * 60);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setStep((s) => s + 1);
      setChars(0);
    }, 900);
    return () => clearTimeout(t);
  }, [step, chars]);

  return (
    <div className="tty" aria-label="Terminal">
      <div className="tty__bar">
        <span /> <span /> <span />
        <em>rbd@desk: ~</em>
      </div>
      <div className="tty__body">
        {SCRIPT.slice(0, step).map((s) => (
          <div key={s.cmd}>
            <p><b>~</b> {s.cmd}</p>
            {s.out.map((o) => (
              <p key={o} className="tty__out">{o}</p>
            ))}
          </div>
        ))}
        <p>
          <b>~</b> {step < SCRIPT.length ? SCRIPT[step].cmd.slice(0, chars) : ""}
          <i className="tty__caret" />
        </p>
      </div>
    </div>
  );
}
