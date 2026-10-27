import { h } from "../lib/dom.js";
import { getCategory, skillsOf, type ImplementationStatus } from "../catalog/index.js";
import { SkillCard } from "../components/shared/SkillCard.js";
import { emptyState, statusLabel } from "../components/shared/ui.js";

export function categoryPage(id: string): HTMLElement | null {
  const cat = getCategory(id);
  if (!cat) return null;
  const all = skillsOf(id);
  let filter: ImplementationStatus | "all" = "all";
  const list = h("div", { class: "grid" });

  const draw = () => {
    const shown = filter === "all" ? all : all.filter((s) => s.status === filter);
    list.replaceChildren(...(shown.length ? shown.map((s) => SkillCard(s, false)) : [emptyState("Nenhuma habilidade neste filtro", "Escolha outro filtro para ver as demais.")]));
    chips.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.f === filter)));
  };
  const chip = (f: ImplementationStatus | "all", label: string) =>
    h("button", { type: "button", class: "chip-btn", "data-f": f, onClick: () => { filter = f; draw(); } }, label);
  const chips = h("div", { class: "chips", role: "group", "aria-label": "Filtrar por status" },
    chip("all", "Todas"), ...(["working", "simulated", "planned"] as const).map((s) => chip(s, statusLabel(s))));

  const page = h("div", { class: "page" }, h("h1", {}, cat.title), h("p", { class: "lead" }, cat.summary), chips, list);
  draw();
  return page;
}
