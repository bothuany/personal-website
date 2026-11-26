// Pure helpers behind the scroll-driven film. Tested in film-math.test.ts.

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const smooth = (x: number) => x * x * (3 - 2 * x);

/** Which pair of anchors a scroll position sits between, and how far along. Needs 2+ ascending anchors. */
export function segment(anchors: number[], y: number): { k: number; f: number } {
  let k = 0;
  while (k < anchors.length - 2 && y >= anchors[k + 1]) k++;
  const span = Math.max(1, anchors[k + 1] - anchors[k]);
  return { k, f: clamp01((y - anchors[k]) / span) };
}

/** Index of the subtitle line to show at chapter progress p (0..1), or -1 outside the chapter. */
export function subtitleIndex(p: number, lines: number): number {
  if (lines < 1 || p <= 0.03 || p >= 0.99) return -1;
  return Math.min(lines - 1, Math.max(0, Math.floor(((p - 0.04) / 0.92) * lines)));
}

type Value = number | readonly number[];
/** Blend two grades key by key; arrays blend per channel. */
export function mixGrade<T extends Record<string, Value>>(a: T, b: T, t: number): T {
  const out: Record<string, Value> = {};
  for (const key in a) {
    const x = a[key], y = b[key];
    out[key] = typeof x === "number" ? x + ((y as number) - x) * t : x.map((v, i) => v + ((y as readonly number[])[i] - v) * t);
  }
  return out as T;
}
