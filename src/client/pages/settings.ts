import { h } from "../lib/dom.js";
import { applyTheme, clearRecents, loadTheme, saveTheme, type ThemePref } from "../lib/storage.js";

// Só entram aqui configurações que realmente funcionam hoje: tema e histórico local.
export function settingsPage(): HTMLElement {
  const msg = h("p", { class: "muted", role: "status" });
  const select = h("select", { id: "theme", onChange: () => { saveTheme(select.value as ThemePref); applyTheme(select.value as ThemePref); } },
    ...([["system", "Seguir o sistema"], ["light", "Claro"], ["dark", "Escuro"]] as const).map(([v, l]) => h("option", { value: v, selected: v === loadTheme() }, l)));
  return h("div", { class: "page" }, h("h1", {}, "Configurações"),
    h("section", {}, h("h2", {}, "Aparência"), h("label", { for: "theme" }, "Tema "), select),
    h("section", {}, h("h2", {}, "Histórico local"), h("p", { class: "muted" }, "As habilidades acessadas recentemente ficam só neste navegador."),
      h("button", { type: "button", class: "btn", onClick: () => { clearRecents(); msg.textContent = "Histórico limpo."; } }, "Limpar histórico"), msg));
}
