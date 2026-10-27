import { h } from "../../lib/dom.js";
import type { DemoMode } from "../../catalog/types.js";

const MODE: Record<DemoMode, string> = {
  real: "Execução real",
  simulation: "Simulação: nenhum processamento real acontece aqui",
  unavailable: "Indisponível: implementação pendente",
};

// Moldura padrão de toda demo: modo sempre visível, requisitos listados e corpo (a demo em si).
export function DemoShell(o: { mode: DemoMode; explanation: string; requirements: string[]; body?: HTMLElement }): HTMLElement {
  return h("section", { class: `demo mode-${o.mode}` },
    h("p", { class: "mode" }, MODE[o.mode]),
    h("p", {}, o.explanation),
    o.requirements.length ? h("div", {}, h("strong", {}, "Requisitos"), h("ul", {}, ...o.requirements.map((r) => h("li", {}, r)))) : null,
    o.body);
}
