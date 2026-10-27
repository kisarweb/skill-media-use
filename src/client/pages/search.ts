import { h } from "../lib/dom.js";
import { search } from "../catalog/index.js";
import { SkillCard } from "../components/shared/SkillCard.js";
import { emptyState } from "../components/shared/ui.js";

export function searchPage(q: string): HTMLElement {
  const found = search(q);
  return h("div", { class: "page" }, h("h1", {}, q ? `Busca: ${q}` : "Todas as habilidades"),
    h("p", { class: "muted", role: "status" }, `${found.length} ${found.length === 1 ? "resultado" : "resultados"}`),
    found.length ? h("div", { class: "grid" }, ...found.map((s) => SkillCard(s))) : emptyState("Nada encontrado", "Tente outro termo, como uma tag (lut, tts) ou um provedor (whisper, heygen)."));
}
