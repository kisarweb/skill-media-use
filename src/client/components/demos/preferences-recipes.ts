import { h } from "../../lib/dom.js";
import { codeBlock } from "../shared/ui.js";

// Demo de preferências e receitas. Usa localStorage como substituto do sistema real da skill.
// Sempre exibe "Simulação" para deixar claro que não há execução real da skill media-use.

const RECIPES_KEY = "mul:recipes";

function readRecipes(): Record<string, { name: string; params: string; savedAt: string }> {
  try {
    const raw = localStorage.getItem(RECIPES_KEY);
    return raw ? (JSON.parse(raw) as Record<string, { name: string; params: string; savedAt: string }>) : {};
  } catch { return {}; }
}

function writeRecipes(recipes: Record<string, { name: string; params: string; savedAt: string }>): void {
  try { localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes)); } catch { /* sem persistência */ }
}

export function preferencesRecipesDemo(host: HTMLElement): void {
  const recipes = readRecipes();
  const listEl = h("div", { class: "recipe-list" });
  const statusEl = h("p", { class: "muted", role: "status" });
  const nameInput = h("input", { type: "text", placeholder: "Nome da receita", class: "input" });
  const paramsInput = h("textarea", {
    placeholder: '{ "exposure": 0.8, "gamma": 1.2 }',
    class: "textarea",
    rows: 4,
  });
  const loadBtn = h("button", { type: "button", class: "btn", onClick: () => {
    const name = nameInput.value.trim();
    const params = paramsInput.value.trim();
    if (!name || !params) { statusEl.textContent = "Preenche nome e parâmetros."; return; }
    try { JSON.parse(params); } catch { statusEl.textContent = "Parâmetros JSON inválidos."; return; }
    const updated = { ...readRecipes(), [name]: { name, params, savedAt: new Date().toISOString() } };
    writeRecipes(updated);
    nameInput.value = "";
    paramsInput.value = "";
    statusEl.textContent = `Receita "${name}" salva.`;
    render();
  } }, "Salvar receita");
  const applyBtn = h("button", { type: "button", class: "btn", onClick: () => {
    const name = nameInput.value.trim();
    const r = readRecipes()[name];
    if (!r) { statusEl.textContent = `Receita "${name}" não encontrada.`; return; }
    paramsInput.value = r.params;
    statusEl.textContent = `Receita "${name}" carregada.`;
  } }, "Carregar receita");

  const render = () => {
    const current = readRecipes();
    listEl.replaceChildren(...Object.entries(current).map(([key, r]) =>
      h("div", { class: "recipe-item" },
        h("strong", {}, r.name),
        h("pre", {}, r.params),
        h("small", { class: "muted" }, `Salva em: ${new Date(r.savedAt).toLocaleString("pt-BR")}`),
        h("button", { type: "button", class: "btn-small", onClick: () => {
          const updated = { ...readRecipes() };
          delete updated[key];
          writeRecipes(updated);
          statusEl.textContent = `Receita "${r.name}" removida.`;
          render();
        } }, "Remover")
      )
    ));
    if (!Object.keys(current).length) listEl.appendChild(h("p", { class: "muted" }, "Nenhuma receita salva. Crie uma acima."));
  };

  render();

  host.append(
    h("div", { class: "demo-form" },
      h("label", { for: "recipe-name" }, "Nome da receita"),
      nameInput,
      h("label", { for: "recipe-params" }, "Parâmetros (JSON)"),
      paramsInput,
      h("div", { class: "actions" }, loadBtn, applyBtn),
      statusEl
    ),
    h("div", { class: "recipes-section" },
      h("h3", {}, "Receitas salvas"),
      listEl
    ),
    h("details", { class: "demo-code" },
      h("summary", {}, "Como usar na skill real"),
      codeBlock({
        code: "media-use recipe save --name correcao-basica --params '{\"exposure\": 0.8, \"gamma\": 1.2}'\nmedia-use recipe load --name correcao-basica\nmedia-use recipe list",
        language: "bash",
        filePath: "~/.media-use/recipes/"
      })
    )
  );
}