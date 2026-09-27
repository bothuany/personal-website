"use client";

export type CatMode = "walk" | "idle" | "sleep" | "pet";

// Latte is the Gemini illustration cut into puppet layers (see art/latte-flat.png).
// Layer images share one 410x326 canvas; pivots are percentages of it. Faces right.
export const CAT_ASPECT = 410 / 326;

const LAYERS = [
  { id: "tail", o: "19% 42.5%" },
  { id: "bf", o: "38.3% 71.4%" },
  { id: "ff", o: "77.5% 69.9%" },
  { id: "body", o: "50% 100%" },
  { id: "sleep", o: "50% 100%" },
  { id: "bn", o: "18% 71.1%" },
  { id: "fn", o: "63.1% 68%" },
] as const;

const EYES = [
  { cx: 310, cy: 101, rx: 17.5, ry: 14 },
  { cx: 358.5, cy: 99.5, rx: 15, ry: 14 },
];

export default function LatteCat({ mode }: { mode: CatMode }) {
  const shut = mode === "sleep" || mode === "pet";
  return (
    <div className={`cat cat--${mode}`} aria-hidden="true">
      <span className="cat__shadow" />
      <div className="cat__rig">
        {LAYERS.map((l) => (
          <img key={l.id} className={`cat__part cat__part--${l.id}`} src={`/latte/${l.id}.webp`} alt="" draggable={false} style={{ transformOrigin: l.o }} />
        ))}
        <svg className={`cat__lids ${shut ? "is-shut" : ""}`} viewBox="0 0 410 326">
          <defs>
            <linearGradient id="lid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#eddcc6" />
              <stop offset="1" stopColor="#d2bab2" />
            </linearGradient>
          </defs>
          {EYES.map((e, i) => (
            <g key={i}>
              <ellipse cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill="url(#lid)" />
              <path
                d={
                  mode === "pet"
                    ? `M${e.cx - e.rx * 0.8} ${e.cy + 3} Q ${e.cx} ${e.cy - e.ry * 0.9} ${e.cx + e.rx * 0.8} ${e.cy + 3}`
                    : `M${e.cx - e.rx * 0.8} ${e.cy - 1} Q ${e.cx} ${e.cy + e.ry * 0.75} ${e.cx + e.rx * 0.8} ${e.cy - 1}`
                }
                fill="none"
                stroke="#5b3a36"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </g>
          ))}
        </svg>
      </div>
      {mode === "sleep" && (
        <span className="cat__zzz">
          <i>z</i>
          <i>z</i>
          <i>z</i>
        </span>
      )}
    </div>
  );
}
