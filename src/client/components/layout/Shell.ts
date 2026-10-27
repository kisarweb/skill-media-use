import { h } from "../../lib/dom.js";
import { categories, skillsOf } from "../../catalog/index.js";
import { statusLabel } from "../shared/ui.js";

export interface ShellRefs { app: HTMLElement; view: HTMLElement; crumbs: HTMLElement; envChip: HTMLElement; search: HTMLInputElement }

export function buildShell(root: HTMLElement, onSearch: (q: string) => void): ShellRefs {
  const mobile = () => matchMedia("(max-width: 800px)").matches;
  const app = h("div", { class: "app" });

  const nav = h("nav", { class: "sidebar", "aria-label": "Navegação principal" },
    h("a", { class: "brand", href: "#/" }, "Media-Use Lab"),
    h("a", { class: "nav-link", href: "#/" }, "Dashboard"),
    ...categories.map((c) => h("details", {}, h("summary", {}, c.title),
      h("ul", {}, ...skillsOf(c.id).map((s) => h("li", {}, h("a", { class: "nav-link", href: `#/habilidade/${s.id}` },
        h("span", { class: `dot dot-${s.status}`, role: "img", "aria-label": statusLabel(s.status) }), s.title)))))),
    h("a", { class: "nav-link", href: "#/configuracoes" }, "Configurações"));

  const toggle = h("button", { type: "button", class: "icon-btn", "aria-label": "Alternar menu", onClick: () => app.classList.toggle(mobile() ? "nav-open" : "nav-collapsed") }, "☰");
  const search = h("input", { type: "search", class: "search", placeholder: "Buscar habilidade, tag ou provedor", "aria-label": "Buscar habilidades", onInput: () => onSearch(search.value.trim()) });
  const envChip = h("span", { class: "chip", role: "status" }, "Backend: verificando…");
  const crumbs = h("nav", { class: "crumbs", "aria-label": "Trilha de navegação" });
  const view = h("main", { class: "view", id: "view", tabIndex: -1 });

  app.append(nav, h("div", { class: "content" }, h("header", { class: "top" }, toggle, search, envChip), crumbs, view));
  root.replaceChildren(app);
  return { app, view, crumbs, envChip, search };
}

export function setActiveNav(root: HTMLElement): void {
  const cur = location.hash || "#/";
  root.querySelectorAll<HTMLAnchorElement>(".sidebar a.nav-link").forEach((a) => {
    const on = a.getAttribute("href") === cur;
    if (on) { a.setAttribute("aria-current", "page"); a.closest("details")?.setAttribute("open", ""); } else a.removeAttribute("aria-current");
  });
}

// Trilha: Dashboard > Categoria > Habilidade. `href` ausente = página atual.
export function renderCrumbs(el: HTMLElement, items: { label: string; href?: string }[]): void {
  el.replaceChildren(h("ol", {}, ...items.map((i) => h("li", {}, i.href ? h("a", { href: i.href }, i.label) : h("span", { "aria-current": "page" }, i.label)))));
}
