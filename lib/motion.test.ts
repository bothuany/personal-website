import { test } from "node:test";
import assert from "node:assert/strict";
import { countText, wire, stepIn } from "./motion.ts";
import { backend, ai } from "../content/site.ts";

test("counters land on the figures the CV states", () => {
  assert.deepEqual(backend.numbers.map(n => countText(n.to, n)), [
    { main: "50K", sup: "+" }, { main: "20", sup: "%" }, { main: "5", sup: "+" },
  ]);
  assert.deepEqual(countText(0, { to: 3.65, decimals: 2 }), { main: "0.00", sup: "" });
});

test("wires go sideways to the right, or down to a node below", () => {
  assert.equal(wire({ x: 0, y: 0, w: 100 }, { x: 200, y: 100, w: 100 }), "M100 32 C150 32 150 132 200 132");
  assert.equal(wire({ x: 200, y: 140, w: 170 }, { x: 200, y: 360, w: 170 }), "M285 204 C285 282 285 282 285 360");
});

test("every edge in the flow joins two nodes that exist", () => {
  const ids = new Set(ai.flow.nodes.map(n => n.id));
  for (const [a, b] of ai.flow.edges) assert.ok(ids.has(a) && ids.has(b), `${a} → ${b}`);
});

test("stepIn clamps", () => {
  assert.equal(stepIn(0, 0.2, 0.1), 0);
  assert.equal(stepIn(0.75, 0.5, 0.5), 0.5);
  assert.equal(stepIn(1, 0.2, 0.1), 1);
});
