// Testes de catálogo (seção 21 do PRD). Rodar: npm test
import assert from "node:assert/strict";
import { categories, skills, search, counts, getCategory } from "../src/client/catalog/index.js";
import { validateFile } from "../src/client/lib/validation.js";

let passed = 0;
const test = (name: string, fn: () => void) => { fn(); passed++; console.log(`ok  ${name}`); };

test("ids de categorias e habilidades são únicos", () => {
  assert.equal(new Set(categories.map((c) => c.id)).size, categories.length);
  assert.equal(new Set(skills.map((s) => s.id)).size, skills.length);
});
test("toda habilidade aponta para uma categoria existente", () => {
  for (const s of skills) assert.ok(getCategory(s.categoryId), `${s.id}: categoria inexistente`);
});
test("toda categoria tem ao menos uma habilidade", () => {
  for (const c of categories) assert.ok(skills.some((s) => s.categoryId === c.id), `${c.id} vazia`);
});
test("status e modo da demo são coerentes (nada simulado passa por real)", () => {
  for (const s of skills) {
    if (s.status === "planned") assert.equal(s.demo.mode, "unavailable", `${s.id}`);
    if (s.status === "working") assert.equal(s.demo.mode, "real", `${s.id}`);
    if (s.status === "simulated") assert.equal(s.demo.mode, "simulation", `${s.id}`);
  }
});
test("habilidade publicada (working/simulated) tem os 3 pilares", () => {
  for (const s of skills.filter((k) => k.status !== "planned")) {
    assert.ok(s.demo.componentKey, `${s.id}: sem demo`);
    assert.ok(s.tutorial.steps.length > 0, `${s.id}: sem tutorial`);
    assert.ok(s.examples.length > 0, `${s.id}: sem exemplo`);
  }
});
test("habilidade 'validada' só existe se não for pendente", () => {
  for (const s of skills) if (s.validation === "validada") assert.notEqual(s.status, "planned", s.id);
});
test("URLs de referência são válidas", () => {
  for (const s of skills) for (const r of s.references) if (r.url) new URL(r.url);
});
test("contadores batem com o catálogo", () => {
  const c = counts();
  assert.equal(c.total, skills.length);
  assert.equal(c.working + c.simulated + c.planned, c.total);
});
test("busca ignora acento e caixa e usa tags", () => {
  assert.ok(search("audio").length > 0);
  assert.ok(search("DUCKING").some((s) => s.id === "mixagem-ducking"));
  assert.equal(search("zzz-inexistente").length, 0);
});
test("validateFile rejeita vazio, grande e formato errado", () => {
  const rules = { accept: ["video/mp4", "audio/"], maxBytes: 10 * 1048576 };
  assert.equal(validateFile({ name: "a.mp4", size: 1000, type: "video/mp4" }, rules), null);
  assert.equal(validateFile({ name: "a.wav", size: 1000, type: "audio/wav" }, rules), null);
  assert.match(validateFile({ name: "a.mp4", size: 0, type: "video/mp4" }, rules)!, /vazio/);
  assert.match(validateFile({ name: "a.mp4", size: 11 * 1048576, type: "video/mp4" }, rules)!, /limite/);
  assert.match(validateFile({ name: "a.pdf", size: 10, type: "application/pdf" }, rules)!, /não suportado/);
});

console.log(`\n${passed} testes passaram.`);
