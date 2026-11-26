"use client";

// All of the page's motion, run against the server-rendered markup: the curtain, the dot field,
// scroll-scrubbed scenes and the small cursor touches. Without JS the page reads as a plain document.

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { countText, stepIn } from "@/lib/motion";

export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover)").matches;
    const off: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(t: Window | HTMLElement, type: K, fn: (e: WindowEventMap[K]) => void) => {
      t.addEventListener(type, fn as EventListener);
      off.push(() => t.removeEventListener(type, fn as EventListener));
    };
    const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string) => [...document.querySelectorAll<T>(s)];

    const ctx = gsap.context(() => {
      // ---------- Curtain: count to 100, then lift ----------
      const intro = $(".intro");
      if (intro) {
        if (reduced) intro.style.display = "none";
        else {
          const n = intro.querySelector("b")!, o = { v: 0 };
          gsap.timeline()
            .to(o, { v: 100, duration: 1.4, ease: "power2.inOut", onUpdate: () => { n.textContent = String(Math.round(o.v)); } })
            .to(intro, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "+=0.15")
            .add(() => { intro.style.display = "none"; });
        }
      }

      // ---------- Cursor ----------
      const cur = $(".cursor");
      if (fine && cur) {
        const xTo = gsap.quickTo(cur, "x", { duration: 0.25, ease: "power3" }), yTo = gsap.quickTo(cur, "y", { duration: 0.25, ease: "power3" });
        on(window, "pointermove", e => { xTo(e.clientX); yTo(e.clientY); cur.classList.add("on"); });
        for (const a of $$("a, button")) {
          on(a, "pointerenter", () => cur.classList.add("big"));
          on(a, "pointerleave", () => cur.classList.remove("big"));
        }
      }

      // ---------- Header tone follows the scene under it ----------
      for (const s of $$("main > section")) {
        ScrollTrigger.create({ trigger: s, start: "top 40px", end: "bottom 40px", onToggle: e => { if (e.isActive) document.body.dataset.tone = s.dataset.tone ?? "dark"; } });
      }

      // ---------- 01: RBD as dots you can push around, falling away on scroll ----------
      const cv = $<HTMLCanvasElement>("#dots");
      if (cv) {
        const g = cv.getContext("2d")!;
        type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; ink: boolean; r: number; fall: number };
        let dots: Dot[] = [], W = 0, H = 0, dpr = 1, heroP = 0, raf = 0;
        const mouse = { x: -9999, y: -9999 };
        const family = getComputedStyle(document.documentElement).getPropertyValue("--font-archivo").trim() || "Archivo";
        const build = () => {
          dpr = Math.min(devicePixelRatio || 1, 2);
          W = cv.clientWidth; H = cv.clientHeight;
          cv.width = W * dpr; cv.height = H * dpr;
          const gap = W < 700 ? 9 : 11;
          const o = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
          o.canvas.width = W; o.canvas.height = H;
          let size = Math.min(W * 0.36, H * 0.72);
          o.fontStretch = "expanded";
          o.font = `900 ${size}px ${family}`;
          const fit = (W * 0.92) / o.measureText("RBD").width;     // never wider than the screen
          if (fit < 1) { size *= fit; o.font = `900 ${size}px ${family}`; }
          o.textAlign = "center"; o.textBaseline = "middle"; o.fillStyle = "#fff";
          o.fillText("RBD", W / 2, H * (W < 700 ? 0.4 : 0.44));
          const data = o.getImageData(0, 0, W, H).data;
          dots = [];
          for (let y = gap / 2; y < H; y += gap) for (let x = gap / 2; x < W; x += gap) {
            const ink = data[(Math.floor(y) * W + Math.floor(x)) * 4 + 3] > 128;
            dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, ink, r: ink ? gap * 0.34 : gap * 0.09, fall: 0.4 + Math.random() * 1.6 });
          }
        };
        const draw = (t: number) => {
          g.setTransform(dpr, 0, 0, dpr, 0, 0);
          g.clearRect(0, 0, W, H);
          const R = W < 700 ? 90 : 150, fallY = heroP * heroP * H * 1.4;
          for (const d of dots) {
            const dx = d.x - mouse.x, dy = d.y - mouse.y, dist2 = dx * dx + dy * dy;
            if (dist2 < R * R && !reduced) { const f = (1 - Math.sqrt(dist2) / R) * 2.6, a = Math.atan2(dy, dx); d.vx += Math.cos(a) * f; d.vy += Math.sin(a) * f; }
            d.vx = (d.vx + (d.hx - d.x) * 0.06) * 0.82; d.vy = (d.vy + (d.hy - d.y) * 0.06) * 0.82;
            d.x += d.vx; d.y += d.vy;
            const yy = d.y + fallY * d.fall;
            if (yy > H + 10) continue;
            const near = Math.max(0, 1 - Math.sqrt(dist2) / (R * 1.4));
            let r = d.r;
            if (!d.ink && !reduced) r *= 1 + 0.6 * Math.sin(t * 0.0012 + d.hx * 0.012 + d.hy * 0.008);
            g.fillStyle = near > 0.05 ? `rgba(255,75,20,${d.ink ? 1 : 0.6})` : d.ink ? "#eeebe4" : "rgba(238,235,228,0.22)";
            g.beginPath(); g.arc(d.x, yy, Math.max(0.4, r * (1 + near * (d.ink ? 0.25 : 2.2))), 0, 6.283); g.fill();
          }
        };
        const loop = (t: number) => { if (dots.length) draw(t); raf = requestAnimationFrame(loop); };
        document.fonts.ready.then(() => { build(); raf = requestAnimationFrame(loop); });
        on(window, "resize", build);
        on(window, "pointermove", e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
        on(document.documentElement, "pointerleave", () => { mouse.x = mouse.y = -9999; });
        off.push(() => cancelAnimationFrame(raf));
        ScrollTrigger.create({ trigger: ".hero", start: "top top", end: "bottom top", onUpdate: s => { heroP = s.progress; } });
        gsap.to(".hero .cap", { opacity: 0, y: -40, ease: "none", scrollTrigger: { trigger: ".hero", start: "20% top", end: "55% top", scrub: true } });
      }

      // ---------- 02: the sentence lights up word by word, and widens ----------
      const words = $$(".say .word");
      ScrollTrigger.create({
        trigger: ".statement", start: "top top", end: "bottom bottom", scrub: true,
        onUpdate: s => { const k = s.progress * (words.length + 2); words.forEach((w, i) => w.classList.toggle("lit", k > i)); },
      });
      gsap.fromTo(".say", { fontVariationSettings: '"wdth" 62' }, { fontVariationSettings: '"wdth" 112', ease: "none", scrollTrigger: { trigger: ".statement", start: "top top", end: "bottom bottom", scrub: true } });

      // ---------- 03: Insilode — the request draws itself through the system ----------
      const edges = $$<SVGPathElement>(".flow .edge").map(p => ({ p, len: p.getTotalLength(), guess: p.classList.contains("guess") }));
      for (const e of edges) if (!e.guess) { e.p.style.strokeDasharray = `${e.len}`; e.p.style.strokeDashoffset = `${e.len}`; }
      const nodes = $$<SVGGElement>(".flow .node");
      const pulse = $<SVGCircleElement>(".flow .pulse"), halo = $<SVGCircleElement>(".flow .halo"), tag = $<SVGTextElement>(".flow .tagl");
      const feats = $$(".feats li");
      const flow = (p: number) => {
        nodes.forEach((n, i) => n.classList.toggle("lit", p > 0.04 + i * 0.09));
        let head: DOMPoint | null = null;
        edges.forEach((e, i) => {
          if (e.guess) { e.p.style.opacity = p > 0.66 ? "1" : "0"; return; }
          const k = stepIn(p, 0.08 + i * 0.09, 0.09);
          e.p.style.strokeDashoffset = `${e.len * (1 - k)}`;
          e.p.classList.toggle("lit", k > 0);
          if (k > 0 && k < 1) head = e.p.getPointAtLength(e.len * k);
        });
        for (const c of [pulse, halo]) if (c) {
          const h = head as DOMPoint | null;
          if (h) { c.setAttribute("cx", String(h.x)); c.setAttribute("cy", String(h.y)); }
          c.style.opacity = h ? (c === halo ? "0.25" : "1") : "0";
        }
        if (tag) tag.style.opacity = p > 0.45 ? "1" : "0";
        feats.forEach((f, i) => f.classList.toggle("on", p > 0.15 + i * 0.25));
      };
      const mm = gsap.matchMedia();
      mm.add("(min-width: 861px)", () => {
        ScrollTrigger.create({ trigger: ".insilode", start: "top top", end: "bottom bottom", scrub: 0.6, onUpdate: s => flow(s.progress) });
      });
      mm.add("(max-width: 860px)", () => {
        ScrollTrigger.create({ trigger: ".flow", start: "top 80%", end: "bottom 30%", scrub: 0.6, onUpdate: s => flow(s.progress) });
      });

      // ---------- 04: paper opens as a circle; the numbers count up ----------
      if (!reduced) gsap.to(".numbers", { clipPath: "circle(150% at 50% 50%)", ease: "power2.in", scrollTrigger: { trigger: ".numbers", start: "top bottom", end: "top 15%", scrub: true } });
      for (const b of $$(".big")) {
        const c = { to: Number(b.dataset.to), format: b.dataset.format as "k" | undefined, suffix: b.dataset.suffix, decimals: b.dataset.decimals ? Number(b.dataset.decimals) : undefined };
        const paint = (v: number) => { const t = countText(v, c); b.innerHTML = t.main + (t.sup ? `<sup>${t.sup}</sup>` : ""); };
        if (reduced) continue;
        paint(0);
        const o = { v: 0 };
        ScrollTrigger.create({ trigger: b, start: "top 85%", once: true, onEnter: () => gsap.to(o, { v: c.to, duration: 1.8, ease: "power3.out", onUpdate: () => paint(o.v) }) });
      }

      // ---------- 05: four rules that stretch into place ----------
      $$(".rule").forEach((r, i) => {
        gsap.fromTo(r, { fontVariationSettings: '"wdth" 62', xPercent: i % 2 ? 12 : -12, opacity: 0.15 },
          { fontVariationSettings: '"wdth" 125', xPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: r, start: "top 95%", end: "top 45%", scrub: true } });
      });

      // ---------- 06: the path runs sideways on wide screens ----------
      const stops = $$(".stop");
      mm.add("(min-width: 861px)", () => {
        const track = $(".track")!;
        const dist = () => track.scrollWidth - innerWidth + 80;
        gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: ".timeline", start: "top top", end: "bottom bottom", scrub: 0.5, invalidateOnRefresh: true,
          onUpdate: s => stops.forEach((st, i) => st.classList.toggle("on", s.progress >= i / (stops.length - 1) - 0.08)) } });
        gsap.to(".track .line i", { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".timeline", start: "top top", end: "bottom bottom", scrub: 0.5 } });
      });
      mm.add("(max-width: 860px)", () => {
        for (const st of stops) ScrollTrigger.create({ trigger: st, start: "top 75%", onEnter: () => st.classList.add("on") });
      });

      // ---------- 07: rows of tools drift in opposite directions ----------
      for (const r of $$(".row")) {
        const sp = Number(r.dataset.speed);
        gsap.fromTo(r, { xPercent: sp < 0 ? 0 : -30 }, { xPercent: sp < 0 ? -30 * Math.abs(sp) : 0, ease: "none", scrollTrigger: { trigger: ".tools", start: "top bottom", end: "bottom top", scrub: true } });
      }

      // ---------- 08: the address ripples under the cursor ----------
      const mail = $(".mail"), chars = $$(".mail .ch");
      if (mail && fine) {
        on(mail, "pointermove", e => chars.forEach(c => { const r = c.getBoundingClientRect(); const d = Math.abs(e.clientX - (r.left + r.width / 2)); c.style.transform = `translateY(${-Math.max(0, 1 - d / 120) * 14}px)`; }));
        on(mail, "pointerleave", () => chars.forEach(c => { c.style.transform = ""; }));
      }
      gsap.from(".contact h2", { yPercent: 30, opacity: 0, ease: "power3.out", duration: 1.2, scrollTrigger: { trigger: ".contact", start: "top 70%" } });

      // ---------- Meter: which scene, how far ----------
      const idx = $(".meter .idx"), name = $(".meter .name"), bar = $(".meter .bar i");
      $$("main > section").forEach((s, i) => ScrollTrigger.create({ trigger: s, start: "top 50%", end: "bottom 50%", onToggle: e => {
        if (e.isActive && idx && name) { idx.textContent = String(i + 1).padStart(2, "0"); name.textContent = s.dataset.name ?? ""; }
      } }));
      ScrollTrigger.create({ start: 0, end: "max", onUpdate: s => { if (bar) bar.style.transform = `scaleX(${s.progress})`; } });
    });

    // Fonts change line lengths; measure again once they are in.
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => { ctx.revert(); off.forEach(f => f()); };
  }, []);
  return null;
}
