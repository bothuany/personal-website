"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ART, CENTER, FRAME, FRAME_MIN, LAMP, LAPTOP_QUAD, LATTE, LEFT_QUAD, MOUSE_GLOW, MUG, MUG_CUP_X, WINDOW, FANS, CASE, bounds, quadMatrix, type Quad, type Rect } from "./geometry";
import LatteCat, { CAT_ASPECT, type CatMode } from "./LatteCat";
import OS, { type AppId } from "./OS";
import Terminal from "./Terminal";
import ClaudeCode from "./ClaudeCode";
import { profile } from "@/data/portfolio";

type View = "desk" | "center" | "left" | "laptop";

const OS_W = 1280;
const OS_H = Math.round((OS_W * CENTER.h) / CENTER.w);
const TERM = { w: 1000, h: 520 };
const LAPTOP = { w: 680, h: 480 };
const CAT_H = LATTE.height;
const CAT_W = CAT_H * CAT_ASPECT;

const LEFT_B = bounds(LEFT_QUAD);
const LAPTOP_B = bounds(LAPTOP_QUAD);
const LEFT_M = quadMatrix(TERM.w, TERM.h, LEFT_QUAD);
const LAPTOP_M = quadMatrix(LAPTOP.w, LAPTOP.h, LAPTOP_QUAD);

function useViewport() {
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  useLayoutEffect(() => {
    const on = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return vp;
}

const FOCUS: Record<Exclude<View, "desk">, Rect> = { center: CENTER, left: LEFT_B, laptop: LAPTOP_B };

function cameraFor(view: View, vw: number, vh: number) {
  if (view === "desk") {
    // cover the viewport; only when the screen is very wide and short do the sides show (filled by the backdrop)
    const prefH = FRAME.bottom - FRAME.top;
    const minH = FRAME_MIN.bottom - FRAME_MIN.top;
    const s = Math.min(Math.max(vw / ART.w, vh / (ART.h - 180)), vh / minH);
    const tx = ART.w * s < vw ? (vw - ART.w * s) / 2 : Math.min(0, Math.max(vw - ART.w * s, vw / 2 - 1024 * s));
    const visible = vh / s;
    const want = visible >= prefH ? FRAME.top - (visible - prefH) / 2 : Math.max(FRAME.top, FRAME_MIN.bottom - visible);
    const y0 = Math.min(ART.h - visible, Math.max(0, want));
    return { s, tx, ty: -y0 * s };
  }
  const r = FOCUS[view];
  const small = vw < 760;
  const pad = small ? 8 : 48;
  const top = small ? 60 : 76;
  const s = Math.min((vw - pad * 2) / r.w, (vh - top - pad) / r.h);
  const tx = vw / 2 - (r.x + r.w / 2) * s;
  const ty = top + (vh - top - pad) / 2 - (r.y + r.h / 2) * s;
  return { s, tx, ty };
}

function QuadScreen({
  quad,
  b,
  size,
  matrix,
  zoomed,
  onZoom,
  label,
  className,
  children,
}: {
  quad: Quad;
  b: Rect;
  size: { w: number; h: number };
  matrix: string;
  zoomed: boolean;
  onZoom: () => void;
  label: string;
  className: string;
  children: React.ReactNode;
}) {
  const clip = `polygon(${quad.map(([x, y]) => `${x - b.x}px ${y - b.y}px`).join(",")})`;
  return (
    <div className={`screen ${className} ${zoomed ? "is-zoomed" : ""}`} style={{ left: b.x, top: b.y, width: b.w, height: b.h, clipPath: clip }}>
      <div className="screen__content" style={{ width: size.w, height: size.h, transform: matrix }} inert={!zoomed || undefined}>
        {children}
      </div>
      {!zoomed && <button className="screen__hit" onClick={onZoom} aria-label={label} />}
    </div>
  );
}

export default function Scene() {
  const { w: vw, h: vh } = useViewport();
  const [view, setView] = useState<View>("desk");
  const [app, setApp] = useState<AppId | null>(null);
  const [lights, setLights] = useState(true);
  const [booted, setBooted] = useState(false);
  const [catMode, setCatMode] = useState<CatMode>("idle");
  const [hearts, setHearts] = useState<{ key: number; x: number } | null>(null);
  const catEl = useRef<HTMLButtonElement>(null);
  const cat = useRef({ x: LATTE.home, dir: -1, target: LATTE.home, timer: 3, mode: "idle" as CatMode });

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 900);
    return () => clearTimeout(t);
  }, []);

  const setMode = useCallback((m: CatMode) => {
    cat.current.mode = m;
    setCatMode(m);
  }, []);

  const petLatte = useCallback(() => {
    const c = cat.current;
    c.timer = 2.6;
    setMode("pet");
    setHearts({ key: Date.now(), x: c.x });
  }, [setMode]);


  // Latte's routine: wander, pause, sometimes nap
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const c = cat.current;
      c.timer -= dt;
      if (c.mode === "walk") {
        const d = c.target - c.x;
        if (Math.abs(d) > 0.5) c.dir = d > 0 ? 1 : -1;
        c.x += Math.sign(d) * Math.min(Math.abs(d), 58 * dt);
        if (Math.abs(d) < 1) {
          c.timer = 3 + Math.random() * 4;
          setMode("idle");
        }
      } else if (c.timer <= 0 && !reduced) {
        if (c.mode === "pet" || c.mode === "sleep") {
          c.timer = 2 + Math.random() * 3;
          setMode("idle");
        } else if (Math.random() < 0.22) {
          c.timer = 7 + Math.random() * 5;
          setMode("sleep");
        } else {
          let t = c.x;
          while (Math.abs(t - c.x) < 110) t = LATTE.minX + Math.random() * (LATTE.maxX - LATTE.minX);
          c.target = t;
          setMode("walk");
        }
      }
      const el = catEl.current;
      if (el) el.style.transform = `translate(${c.x - CAT_W / 2}px, ${LATTE.baseline - CAT_H}px) scaleX(${c.dir})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [petLatte, setMode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (app) setApp(null);
      else setView("desk");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [app]);

  // on phones a zoomed screen would be unreadable, so screens open as full-size sheets instead
  const small = vw < 760;
  const cam = cameraFor(small ? "desk" : view, vw, vh);
  const openApp = (a: AppId | null) => {
    setApp(a);
    if (a) setView("center");
  };

  return (
    <div className={`room ${lights ? "" : "room--dark"} ${booted ? "room--on" : ""} ${booted && lights ? "room--lit" : ""}`}>
      <div className="room__backdrop" aria-hidden="true" />
      <div className="stage" style={{ width: ART.w, height: ART.h, transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.s})` }}>
        <img className="stage__art" src="/scene/desk-night-4k.webp" alt="" width={ART.w} height={ART.h} draggable={false} />

        <h1 className="sr-only">{profile.name}, {profile.title} at {profile.company}</h1>

        <ShootingStars />
        <CaseFans />

        <a className="mug" href={`mailto:${profile.email}`} style={{ left: MUG.x, top: MUG.y, width: MUG.w, height: MUG.h, ["--cup" as string]: `${MUG_CUP_X}px` }} aria-label="Coffee? Email me">
          <svg className="mug__steam" viewBox="0 0 60 80" aria-hidden="true">
            <path d="M18 76 C 8 60, 28 52, 18 34 S 26 10, 20 2" />
            <path d="M38 76 C 28 60, 48 52, 38 34 S 46 10, 40 2" />
          </svg>
          <span className="mug__tip">Coffee? Email me</span>
        </a>

        <LampLight />
        <button
          className="lamp"
          style={{ left: LAMP.x, top: LAMP.y, width: LAMP.w, height: LAMP.h }}
          onClick={() => setLights((l) => !l)}
          aria-label={lights ? "Switch the light bar off" : "Switch the light bar on"}
          aria-pressed={lights}
        />
        <div className="mouse-glow" style={{ left: MOUSE_GLOW.x - MOUSE_GLOW.r, top: MOUSE_GLOW.y - MOUSE_GLOW.r, width: MOUSE_GLOW.r * 2, height: MOUSE_GLOW.r * 2 }} aria-hidden="true" />

        <QuadScreen quad={LEFT_QUAD} b={LEFT_B} size={TERM} matrix={LEFT_M} zoomed={!small && view === "left"} onZoom={() => setView("left")} label="Read the terminal" className="screen--left">
          <Terminal />
        </QuadScreen>

        <QuadScreen quad={LAPTOP_QUAD} b={LAPTOP_B} size={LAPTOP} matrix={LAPTOP_M} zoomed={!small && view === "laptop"} onZoom={() => setView("laptop")} label="Use Claude Code on the laptop" className="screen--laptop">
          <ClaudeCode interactive={!small && view === "laptop"} />
        </QuadScreen>

        <div className={`screen screen--center ${!small && view === "center" ? "is-zoomed" : ""}`} style={{ left: CENTER.x, top: CENTER.y, width: CENTER.w, height: CENTER.h }}>
          <div className="screen__content" style={{ width: OS_W, height: OS_H, transform: `scale(${CENTER.w / OS_W})` }}>
            <OS open={small ? null : app} setOpen={openApp} interactive={!small && view === "center"} />
          </div>
          {(small || view !== "center") && <button className="screen__hit" onClick={() => setView("center")} aria-label="Use the main screen" />}
        </div>

        <button ref={catEl} className="latte" style={{ width: CAT_W, height: CAT_H }} onClick={petLatte} aria-label="Pet Latte">
          <LatteCat mode={catMode} />
        </button>
        {hearts && <Hearts key={hearts.key} x={hearts.x} y={LATTE.baseline - CAT_H - 6} />}
      </div>

      {small && view !== "desk" && (
        <div className="sheet" role="dialog" aria-modal="true" aria-label="Screen">
          {view === "center" && <OS open={app} setOpen={openApp} interactive />}
          {view === "left" && <Terminal />}
          {view === "laptop" && <ClaudeCode interactive />}
        </div>
      )}
      {view !== "desk" && (
        <button className="backbtn" onClick={() => setView("desk")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Back to the desk
        </button>
      )}
      {view === "desk" && <p className="room-hint">Click any screen to use it. Latte likes to be petted.</p>}
    </div>
  );
}

// a few shooting stars cross the round window, each on its own slow loop
const STARS = [
  { x: 60, y: 70, len: 170, ang: 24, d: 9, dl: 1.5 },
  { x: 220, y: 40, len: 130, ang: 32, d: 13, dl: 6 },
  { x: 120, y: 150, len: 110, ang: 18, d: 17, dl: 11 },
];

function ShootingStars() {
  const { cx, cy, r } = WINDOW;
  return (
    <div className="stars" style={{ left: cx - r, top: cy - r, width: r * 2, height: r * 2 }} aria-hidden="true">
      {STARS.map((st, i) => (
        <i key={i} style={{ left: st.x, top: st.y, width: st.len, ["--ang" as string]: `${st.ang}deg`, ["--d" as string]: `${st.d}s`, ["--dl" as string]: `${st.dl}s` }} />
      ))}
      <b style={{ left: 330, top: 120 }} />
      <b style={{ left: 90, top: 250, animationDelay: "-1.4s" }} />
      <b style={{ left: 250, top: 200, animationDelay: "-2.6s" }} />
    </div>
  );
}

// the case fans spin a bright arc and pulse one after another
function CaseFans() {
  return (
    <div className="fans" style={{ clipPath: `polygon(${CASE.map(([x, y]) => `${x}px ${y}px`).join(",")})` }} aria-hidden="true">
      {FANS.map((f, i) => (
        <div key={i} className="fan" style={{ left: f.x - f.r, top: f.y - f.r, width: f.r * 2, height: f.r * 2, transform: `scaleY(${f.sy})`, ["--i" as string]: i }}>
          <span className="fan__spin" />
          <span className="fan__pulse" />
        </div>
      ))}
    </div>
  );
}

// light from the monitor bar: glowing strip, wall wash, a soft cone falling onto the desk, dust drifting in it
const DUST = Array.from({ length: 14 }, (_, i) => ({
  x: 180 + ((i * 97) % 820),
  y: 60 + ((i * 131) % 460),
  s: 3 + (i % 3) * 1.5,
  d: 6 + (i % 5) * 1.7,
  dl: -(i * 1.3),
  dx: ((i % 4) - 1.5) * 26,
}));

function LampLight() {
  const cone = { x: LAMP.x - 430, y: LAMP.y + 28, w: LAMP.w + 860, h: 900 };
  const inset = 430;
  return (
    <div className="lamp-light" aria-hidden="true">
      <div className="lamp-wash" style={{ left: LAMP.x - 260, top: LAMP.y - 190, width: LAMP.w + 520, height: 320 }} />
      <div className="lamp-cone" style={{ left: cone.x, top: cone.y, width: cone.w, height: cone.h }}>
        <div className="lamp-cone__beam" style={{ clipPath: `polygon(${inset}px 0, ${inset + LAMP.w}px 0, 100% 100%, 0 100%)` }} />
      </div>
      <div className="lamp-desk" style={{ left: 330, top: 960, width: 1420, height: 520 }} />
      <div className="lamp-desk lamp-desk--add" style={{ left: 480, top: 1000, width: 1120, height: 400 }} />
      <div className="lamp-dust" style={{ left: cone.x + 250, top: cone.y, width: cone.w - 500, height: 620 }}>
        {DUST.map((p, i) => (
          <i key={i} style={{ ["--x" as string]: `${p.x}px`, ["--y" as string]: `${p.y}px`, ["--s" as string]: `${p.s}px`, ["--d" as string]: `${p.d}s`, ["--dl" as string]: `${p.dl}s`, ["--dx" as string]: `${p.dx}px` }} />
        ))}
      </div>
      <div className="lamp-strip" style={{ left: LAMP.x + 10, top: LAMP.y + 22, width: LAMP.w - 20, height: 9 }} />
    </div>
  );
}

function Hearts({ x, y }: { x: number; y: number }) {
  return (
    <div className="purr" style={{ left: x, top: y }} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} style={{ ["--i" as string]: i }} width="30" height="30" viewBox="0 0 24 24" fill="#f5b3ba">
          <path d="M12 21s-7.5-4.6-10-9.2C.4 8.4 2.3 4 6.4 4c2.3 0 3.9 1.3 5.6 3.3C13.7 5.3 15.3 4 17.6 4c4.1 0 6 4.4 4.4 7.8C19.5 16.4 12 21 12 21z" />
        </svg>
      ))}
      <span>prrr</span>
    </div>
  );
}
