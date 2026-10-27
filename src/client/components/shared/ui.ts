import { h } from "../../lib/dom.js";
import type { Counts } from "../../catalog/index.js";
import type { ImplementationStatus } from "../../catalog/types.js";

const LABEL: Record<ImplementationStatus, string> = { working: "Funcional", simulated: "Simulação", planned: "Pendente" };
export const statusLabel = (s: ImplementationStatus): string => LABEL[s];

// O significado nunca depende só da cor: o selo sempre traz o texto.
export const statusBadge = (s: ImplementationStatus): HTMLElement => h("span", { class: `badge badge-${s}` }, LABEL[s]);

// "Faixa" de status: segmentos proporcionais, como clipes numa trilha de edição.
export function statusLane(c: Counts): HTMLElement {
  const lane = h("div", { class: "lane", role: "img", "aria-label": `${c.working} funcionais, ${c.simulated} simulações, ${c.planned} pendentes` });
  for (const k of ["working", "simulated", "planned"] as const) if (c[k]) lane.append(h("i", { class: `seg-${k}`, style: `flex:${c[k]}` }));
  return lane;
}

export function codeBlock(o: { code: string; language: string; filePath?: string }): HTMLElement {
  const btn = h("button", { type: "button", class: "btn-small", onClick: async () => {
    try { await navigator.clipboard.writeText(o.code); btn.textContent = "Copiado"; } catch { btn.textContent = "Não foi possível copiar"; }
    setTimeout(() => { btn.textContent = "Copiar"; }, 1800);
  } }, "Copiar");
  return h("figure", { class: "code" },
    h("figcaption", {}, h("span", {}, o.filePath ? `${o.filePath} (${o.language})` : o.language), btn),
    h("pre", {}, h("code", {}, o.code)));
}

// `detail` deve ser a saída REAL do comando (stderr/stdout), nunca uma mensagem genérica.
export const errorPanel = (title: string, detail?: string): HTMLElement =>
  h("div", { class: "panel-error", role: "alert" }, h("strong", {}, title), detail ? h("pre", {}, detail) : null);

export const processingStatus = (label: string, percent?: number): HTMLElement =>
  h("div", { class: "processing", role: "status" }, h("span", {}, percent == null ? label : `${label} ${percent}%`), h("progress", { max: 100, value: percent }));

export const emptyState = (title: string, hint: string): HTMLElement =>
  h("div", { class: "empty" }, h("strong", {}, title), h("p", {}, hint));
