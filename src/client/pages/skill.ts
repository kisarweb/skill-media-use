import { h } from "../lib/dom.js";
import { getCategory, getSkill, type SkillPage } from "../catalog/index.js";
import { demoComponents } from "../components/demos/index.js";
import { DemoShell } from "../components/shared/DemoShell.js";
import { codeBlock, emptyState, statusBadge } from "../components/shared/ui.js";

type Tab = "demo" | "tutorial" | "examples" | "refs";
const TABS: [Tab, string][] = [["demo", "Demonstração"], ["tutorial", "Tutorial"], ["examples", "Exemplos"], ["refs", "Referências e limitações"]];

function panel(s: SkillPage, tab: Tab): HTMLElement {
  if (tab === "demo") {
    const mount = s.demo.componentKey ? demoComponents[s.demo.componentKey] : undefined;
    const body = mount ? h("div", { class: "demo-host" }) : undefined;
    if (body && mount) mount(body);
    return DemoShell({ mode: s.demo.mode, explanation: s.demo.explanation, requirements: s.dependencies, body });
  }
  if (tab === "tutorial") {
    if (!s.tutorial.steps.length) return emptyState("Tutorial ainda não disponível", "Ele será escrito depois de conferir o SKILL.md e as referências reais, para não publicar comandos que não existem.");
    return h("div", {}, h("p", {}, s.tutorial.objective), h("ol", { class: "steps" }, ...s.tutorial.steps.map((st) =>
      h("li", {}, h("h3", {}, st.title), h("p", {}, st.content), st.code ? codeBlock({ code: st.code, language: st.language ?? "bash", filePath: st.filePath }) : null))));
  }
  if (tab === "examples") {
    if (!s.examples.length) return emptyState("Sem exemplos ainda", "Os exemplos entram junto com a primeira demo validada desta habilidade.");
    return h("div", { class: "grid" }, ...s.examples.map((e) => h("article", { class: "card" }, h("strong", {}, e.title), h("p", {}, e.description),
      h("small", { class: "muted" }, `Caso de uso: ${e.useCase}`), h("small", { class: "muted" }, `Resultado esperado: ${e.expectedOutput}`), e.codeSnippet ? codeBlock({ code: e.codeSnippet, language: "bash" }) : null)));
  }
  return h("div", {}, h("h3", {}, "Referências"), h("ul", {}, ...s.references.map((r) => h("li", {},
    r.url ? h("a", { href: r.url, target: "_blank", rel: "noopener noreferrer" }, r.title) : h("code", {}, r.filePath ?? r.title),
    r.filePath ? h("small", { class: "muted" }, " (arquivo dentro do diretório instalado da skill)") : null))),
    h("h3", {}, "Limitações"), h("ul", {}, ...s.limitations.map((l) => h("li", {}, l))));
}

export function skillPage(id: string): HTMLElement | null {
  const s = getSkill(id);
  if (!s) return null;
  const cat = getCategory(s.categoryId);
  const body = h("div", { class: "tab-body", role: "tabpanel" });
  const bar = h("div", { class: "tabs", role: "tablist" });
  const show = (t: Tab) => {
    body.replaceChildren(panel(s, t));
    bar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.t === t)));
  };
  for (const [t, label] of TABS) bar.append(h("button", { type: "button", role: "tab", class: "tab", "data-t": t, onClick: () => show(t) }, label));
  show("demo");
  return h("div", { class: "page" },
    h("p", { class: "muted" }, h("a", { href: `#/categoria/${s.categoryId}` }, cat?.title ?? "")),
    h("h1", {}, s.title), h("p", { class: "lead" }, s.summary),
    h("p", { class: "meta" }, statusBadge(s.status), h("span", { class: "muted" }, `Validação: ${s.validation}`), ...s.tags.map((t) => h("span", { class: "tag" }, t))),
    bar, body);
}
