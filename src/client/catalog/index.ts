import { categories } from "./categories.js";
import { skills } from "./skills.js";
import type { Category, ImplementationStatus, SkillPage } from "./types.js";

export { categories, skills };
export * from "./types.js";

export const getSkill = (id: string): SkillPage | undefined => skills.find((s) => s.id === id);
export const getCategory = (id: string): Category | undefined => categories.find((c) => c.id === id);
export const skillsOf = (categoryId: string): SkillPage[] => skills.filter((s) => s.categoryId === categoryId);

export interface Counts { total: number; working: number; simulated: number; planned: number }
// Contadores sempre calculados do catálogo: nunca números fictícios (RF-20).
export function counts(list: SkillPage[] = skills): Counts {
  const by = (s: ImplementationStatus) => list.filter((k) => k.status === s).length;
  return { total: list.length, working: by("working"), simulated: by("simulated"), planned: by("planned") };
}

// Remove acentos e caixa para "audio" encontrar "Áudio".
const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Busca por nome, descrição, categoria, tags e dependências. Todos os termos precisam casar.
export function search(query: string, list: SkillPage[] = skills): SkillPage[] {
  const terms = norm(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return list;
  return list.filter((s) => {
    const hay = norm([s.title, s.summary, s.description, getCategory(s.categoryId)?.title ?? "", ...s.tags, ...s.dependencies].join(" "));
    return terms.every((t) => hay.includes(t));
  });
}
