"use client";

import { useEffect, useRef } from "react";
import { GRADES, Sea } from "@/lib/sea";
import { mixGrade, segment, smooth, subtitleIndex } from "@/lib/film-math";
import type { Grade } from "@/content/site";

// Drives the page: the sea behind it, the letterbox opening, subtitles, the time of day and the optional sound.
export default function Film() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const grain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const open = () => root.classList.add("open");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const snap = new URLSearchParams(location.search).has("snap"); // debug: no scroll smoothing, for screenshots
    const cleanups: (() => void)[] = [];
    const listen = <K extends keyof WindowEventMap>(type: K, fn: (e: WindowEventMap[K]) => void) => {
      addEventListener(type, fn);
      cleanups.push(() => removeEventListener(type, fn));
    };

    // Film grain, generated once.
    const g = document.createElement("canvas");
    g.width = g.height = 192;
    const gx = g.getContext("2d")!, img = gx.createImageData(192, 192);
    for (let i = 0; i < img.data.length; i += 4) { const v = Math.random() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
    gx.putImageData(img, 0, 0);
    if (grain.current) grain.current.style.backgroundImage = `url(${g.toDataURL()})`;

    // Sound: brown noise through a low-pass filter, swelling like waves. Off until asked.
    const btn = document.getElementById("sound") as HTMLButtonElement | null;
    let ac: AudioContext | null = null, gain: GainNode | null = null;
    const toggleSound = () => {
      if (!btn) return;
      const on = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", String(on));
      btn.textContent = on ? "Sound on" : "Sound off";
      if (on && !ac) {
        ac = new AudioContext();
        const len = ac.sampleRate * 4, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
        let last = 0;
        for (let i = 0; i < len; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.2; }
        const src = ac.createBufferSource(); src.buffer = buf; src.loop = true;
        const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 520;
        gain = ac.createGain(); gain.gain.value = 0;
        const lfo = ac.createOscillator(), lfoGain = ac.createGain();
        lfo.frequency.value = 0.09; lfoGain.gain.value = 0.12;
        lfo.connect(lfoGain).connect(gain.gain);
        src.connect(lp).connect(gain).connect(ac.destination);
        src.start(); lfo.start();
      }
      if (ac && gain) {
        ac.resume();
        gain.gain.cancelScheduledValues(ac.currentTime);
        gain.gain.linearRampToValueAtTime(on ? 0.22 : 0, ac.currentTime + 1.2);
      }
    };
    btn?.addEventListener("click", toggleSound);
    cleanups.push(() => { btn?.removeEventListener("click", toggleSound); ac?.close(); });

    const sea = canvas.current ? Sea.create(canvas.current) : null;
    if (!sea) {
      root.classList.add("no-gl");
      open();
      return () => cleanups.forEach(f => f());
    }

    const sections = [...document.querySelectorAll<HTMLElement>("main > section")];
    const chapters = [...document.querySelectorAll<HTMLElement>(".chapter")];
    const where = document.getElementById("where");
    let anchors: { y: number; grade: Grade; where: string }[] = [];
    let scale = 0.75;

    const layout = () => {
      const portrait = innerWidth < 700;
      scale = Math.min(scale, portrait ? 0.55 : 0.75);
      const dpr = Math.min(devicePixelRatio, 1.5);
      sea.resize(Math.round(innerWidth * scale * dpr), Math.round(innerHeight * scale * dpr));
      const vh = innerHeight, max = document.documentElement.scrollHeight - vh;
      anchors = sections.map(s => ({
        grade: s.dataset.g as Grade,
        where: s.dataset.where ?? "",
        y: Math.min(max, s.classList.contains("chapter") ? s.offsetTop + (s.offsetHeight - vh) / 2
          : s.dataset.flow !== undefined ? s.offsetTop + s.offsetHeight / 2 - vh / 2 : s.offsetTop),
      }));
    };
    layout();
    listen("resize", layout);
    document.fonts?.ready.then(layout);

    let look: [number, number] = [0, 0], lookTo: [number, number] = [0, 0];
    listen("pointermove", e => { lookTo = [(e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1)]; });

    let ys = scrollY, t = reduce ? 30 : 0, last = performance.now(), frames = 0, slow = 0, whereText = "", raf = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduce) t += dt;
      // one-time quality step down on slow GPUs
      if (++frames < 90 && frames > 10 && dt > 0.028) slow++;
      if (frames === 90 && slow > 40 && scale > 0.4) { scale = 0.4; layout(); }

      ys = snap ? scrollY : ys + (scrollY - ys) * (1 - Math.pow(0.004, dt));
      const { k, f } = segment(anchors.map(a => a.y), ys);
      const a0 = anchors[k], a1 = anchors[k + 1], m = smooth(f);
      look = [look[0] + (lookTo[0] - look[0]) * 0.03, look[1] + (lookTo[1] - look[1]) * 0.03];
      sea.render({
        time: t, travel: t * 0.9 + ys * 0.004, look, portrait: innerWidth < innerHeight,
        az: Math.min(1, Math.max(0.32, innerWidth / innerHeight / 1.7)),
        g: mixGrade(GRADES[a0.grade], GRADES[a1.grade], m),
      });

      for (const c of chapters) {
        const p = -c.getBoundingClientRect().top / Math.max(1, c.offsetHeight - innerHeight);
        const lines = c.querySelectorAll(".subs p"), idx = subtitleIndex(p, lines.length);
        c.classList.toggle("in", p > -0.02 && p < 1.02);
        lines.forEach((l, i) => l.classList.toggle("on", i === idx));
      }
      const w = (m < 0.5 ? a0 : a1).where;
      if (where && w !== whereText) { whereText = w; where.textContent = w; }
    };
    raf = requestAnimationFrame(now => { last = now; frame(now); requestAnimationFrame(open); });

    return () => {
      cancelAnimationFrame(raf);
      cleanups.forEach(f => f());
    };
  }, []);

  return (
    <>
      <canvas id="sea" ref={canvas} aria-hidden="true" />
      <div className="grain" ref={grain} aria-hidden="true" />
    </>
  );
}
