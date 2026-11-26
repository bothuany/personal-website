import { test } from "node:test";
import assert from "node:assert/strict";
import { segment, subtitleIndex, mixGrade } from "./film-math.ts";

test("segment finds the pair of anchors and the fraction", () => {
  const a = [0, 100, 300, 600];
  assert.deepEqual(segment(a, -50), { k: 0, f: 0 });
  assert.deepEqual(segment(a, 50), { k: 0, f: 0.5 });
  assert.deepEqual(segment(a, 200), { k: 1, f: 0.5 });
  assert.deepEqual(segment(a, 600), { k: 2, f: 1 });
  assert.deepEqual(segment(a, 900), { k: 2, f: 1 });
});

test("subtitleIndex steps through every line once and is empty outside", () => {
  assert.equal(subtitleIndex(0, 3), -1);
  assert.equal(subtitleIndex(1, 3), -1);
  const seen = new Set<number>();
  for (let p = 0.04; p < 0.99; p += 0.01) seen.add(subtitleIndex(p, 3));
  assert.deepEqual([...seen].sort(), [0, 1, 2]);
  assert.equal(subtitleIndex(0.5, 0), -1);
});

test("mixGrade blends numbers and colour arrays", () => {
  const g = mixGrade({ a: 0, c: [0, 1, 2] }, { a: 10, c: [2, 1, 0] }, 0.5);
  assert.deepEqual(g, { a: 5, c: [1, 1, 1] });
});
