// Small pure helpers behind the page's motion, kept apart so they can be tested without a browser.

export type Count = { to: number; format?: "k"; suffix?: string; decimals?: number };

/** The figure a counter shows at value v, split into the number and the small raised part. */
export function countText(v: number, c: Count): { main: string; sup: string } {
  if (c.format === "k") return { main: `${Math.round(v / 1000)}K`, sup: "+" };
  return { main: v.toFixed(c.decimals ?? 0), sup: c.suffix ?? "" };
}

export type Box = { x: number; y: number; w: number };
export const NODE_H = 64;

/** A wire from A to B: out of A's right side into B's left, or straight down when B sits under A. */
export function wire(A: Box, B: Box): string {
  if (B.x > A.x + A.w) {
    const x1 = A.x + A.w, y1 = A.y + NODE_H / 2, x2 = B.x, y2 = B.y + NODE_H / 2, mx = (x1 + x2) / 2;
    return `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
  }
  const xa = A.x + A.w / 2, xb = B.x + B.w / 2, mid = (A.y + NODE_H + B.y) / 2;
  return `M${xa} ${A.y + NODE_H} C${xa} ${mid} ${xb} ${mid} ${xb} ${B.y}`;
}

/** How far (0..1) a step drawn between `start` and `start + span` of the scroll has got at progress p. */
export const stepIn = (p: number, start: number, span: number) => Math.min(1, Math.max(0, (p - start) / span));
