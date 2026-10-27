import { h } from "./lib/dom.js";
import { parseHash, type Route } from "./lib/router.js";
import { applyTheme, loadTheme, pushRecent } from "./lib/storage.js";
import { fetchEnv } from "./lib/env.js";
import { getCategory, getSkill } from "./catalog/index.js";
import { buildShell, renderCrumbs, setActiveNav } from "./components/layout/Shell.js";
import { emptyState } from "./components/shared/ui.js";
import { dashboardPage } from "./pages/dashboard.js";
import { categoryPage } from "./pages/category.js";
import { skillPage } from "./pages/skill.js";
import { searchPage } from "./pages/search.js";
import { settingsPage } from "./pages/settings.js";

const root = document.getElementById("app")!;
applyTheme(loadTheme());
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => applyTheme(loadTheme()));

const shell = buildShell(root, (q) => { location.hash = q ? `#/busca/${encodeURIComponent(q)}` : "#/"; });
const notFound = () => h("div", { class: "page" }, h("h1", {}, "Página não encontrada"), emptyState("Esse endereço não existe", "Volte ao Dashboard pelo menu."));
const DASH = { label: "Dashboard", href: "#/" };

function build(route: Route): { page: HTMLElement; crumbs: { label: string; href?: string }[]; title: string } {
  switch (route.name) {
    case "dashboard": return { page: dashboardPage(), crumbs: [{ label: "Dashboard" }], title: "Dashboard" };
    case "category": {
      const cat = getCategory(route.id), page = categoryPage(route.id);
      if (cat && page) return { page, crumbs: [DASH, { label: cat.title }], title: cat.title };
      break;
    }
    case "skill": {
      const s = getSkill(route.id), page = skillPage(route.id);
      if (s && page) {
        pushRecent(s.id);
        return { page, crumbs: [DASH, { label: getCategory(s.categoryId)?.title ?? "", href: `#/categoria/${s.categoryId}` }, { label: s.title }], title: s.title };
      }
      break;
    }
    case "search": return { page: searchPage(route.q), crumbs: [DASH, { label: "Busca" }], title: "Busca" };
    case "settings": return { page: settingsPage(), crumbs: [DASH, { label: "Configurações" }], title: "Configurações" };
  }
  return { page: notFound(), crumbs: [DASH, { label: "Não encontrada" }], title: "Não encontrada" };
}

function render(): void {
  const route = parseHash(location.hash);
  const { page, crumbs, title } = build(route);
  shell.view.replaceChildren(page);
  renderCrumbs(shell.crumbs, crumbs);
  setActiveNav(root);
  if (route.name === "search") shell.search.value = route.q;
  document.title = `${title} | Media-Use Lab`;
  shell.app.classList.remove("nav-open");
  scrollTo(0, 0);
  shell.view.focus({ preventScroll: true });
}

addEventListener("hashchange", render);
render();
fetchEnv().then((env) => {
  shell.envChip.textContent = env ? `Backend online, Node ${env.node}` : "Backend não conectado";
  shell.envChip.classList.toggle("chip-on", !!env);
});
