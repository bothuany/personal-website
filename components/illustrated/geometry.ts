// All coordinates are in the illustration's own pixel space (2048 × 1536).
export const ART = { w: 2048, h: 1536 };

export type Pt = [number, number];
export type Quad = [Pt, Pt, Pt, Pt]; // tl, tr, br, bl
export type Rect = { x: number; y: number; w: number; h: number };

// center monitor: nearly flat, 2px bleed so no art shows at the edge
export const CENTER: Rect = { x: 728, y: 531, w: 602, h: 339 };

// left monitor and laptop are drawn with perspective
export const LEFT_QUAD: Quad = [
  [58, 482],
  [692, 528],
  [690, 802],
  [70, 854],
];

export const LAPTOP_QUAD: Quad = [
  [1374, 752],
  [1645, 762],
  [1634, 952],
  [1364, 922],
];

export const LAMP: Rect = { x: 790, y: 468, w: 484, h: 40 };
export const MOUSE_GLOW = { x: 1550, y: 1250, r: 120 };

// Latte walks on the desk between the monitor stand and the laptop stand
export const LATTE = { baseline: 1064, minX: 800, maxX: 1180, height: 138, home: 990 };

// the framing keeps everything from the window's top down to the keyboard in view
export const FRAME = { top: 110, bottom: 1340 };

// coffee mug on the desk: the email link
export const MUG: Rect = { x: 555, y: 1050, w: 140, h: 140 };
// the cup itself (without the handle) is centred here, relative to MUG
export const MUG_CUP_X = 80;

// round window glass, for shooting stars
export const WINDOW = { cx: 425, cy: 305, r: 238 };

// visible part of the PC case (skips the laptop in front of it); fan effects are clipped to it
export const CASE: Pt[] = [
  [1490, 592], [1850, 508], [2048, 505], [2048, 1215], [1840, 1215], [1618, 1072], [1620, 1030], [1645, 1000], [1660, 742], [1490, 742],
];

// PC case fans: centre, radius and vertical squash for the ones seen at an angle
export const FANS = [
  { x: 1562, y: 722, r: 62, sy: 1 },
  { x: 1992, y: 715, r: 62, sy: 1 },
  { x: 1992, y: 855, r: 62, sy: 1 },
  { x: 1992, y: 995, r: 62, sy: 1 },
  { x: 1698, y: 1015, r: 56, sy: 0.42 },
  { x: 1812, y: 1066, r: 60, sy: 0.42 },
];

export function bounds(q: Pt[]): Rect {
  const xs = q.map((p) => p[0]);
  const ys = q.map((p) => p[1]);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
}

// CSS matrix3d mapping a w×h element (transform-origin 0 0) onto the quad, relative to its bounding box
export function quadMatrix(w: number, h: number, q: Quad): string {
  const b = bounds(q);
  const dst = q.map(([x, y]) => [x - b.x, y - b.y]);
  const src = [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
  ];
  const A: number[][] = [];
  const B: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [u, v] = dst[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    B.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    B.push(v);
  }
  const [a, bb, c, d, e, f, g, hh] = solve(A, B);
  const m = [a, d, 0, g, bb, e, 0, hh, 0, 0, 1, 0, c, f, 0, 1];
  return `matrix3d(${m.map((n) => +n.toFixed(10)).join(",")})`;
}

function solve(A: number[][], B: number[]): number[] {
  const n = B.length;
  const M = A.map((row, i) => [...row, B[i]]);
  for (let col = 0; col < n; col++) {
    let piv = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(M[r][col]) > Math.abs(M[piv][col])) piv = r;
    [M[col], M[piv]] = [M[piv], M[col]];
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = M[r][col] / M[col][col];
      for (let k = col; k <= n; k++) M[r][k] -= f * M[col][k];
    }
  }
  return M.map((row, i) => row[n] / row[i]);
}
