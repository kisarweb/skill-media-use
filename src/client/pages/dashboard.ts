import { h } from "../lib/dom.js";
import { categories, counts, getSkill, skillsOf } from "../catalog/index.js";
import { fetchEnv } from "../lib/env.js";
import { loadRecents } from "../lib/storage.js";
import { SkillCard } from "../components/shared/SkillCard.js";
import { emptyState, statusLane } from "../components/shared/ui.js";

const START_HERE = ["instalacao-provedores", "resolver-midia", "comandos-locais"];

export function dashboardPage(): HTMLElement {
  const c = counts();
  const stat = (label: string, n: number) => h("div", { class: "stat" }, h("dd", {}, String(n)), h("dt", {}, label));

  const envBox = h("p", { class: "muted" }, "Verificando o backend local…");
  fetchEnv().then((env) => envBox.replaceChildren(env
    ? `Backend online. Node ${env.node} em ${env.platform}. Skill media-use: ${env.mediaUse.checked ? "verificada" : "não verificada"}. ${env.mediaUse.note}`
    : "Backend não conectado. Rode `npm run dev` e abra http://127.0.0.1:3000 para habilitar as execuções reais."));

  const recents = loadRecents().map(getSkill).filter((s) => !!s);

  return h("div", { class: "page" },
    h("h1", {}, "Media-Use Lab"),
    h("p", { class: "lead" }, "Demos, tutoriais e exemplos da skill media-use do HeyGen Hyperframes. Cada recurso mostra seu estado real: funcional, simulação ou pendente."),
    h("dl", { class: "stats" }, stat("Habilidades", c.total), stat("Funcionais", c.working), stat("Simulações", c.simulated), stat("Pendentes", c.planned)),
    h("section", {}, h("h2", {}, "Estado do ambiente"), envBox),
    h("section", {}, h("h2", {}, "Categorias"),
      h("div", { class: "grid" }, ...categories.map((cat) => {
        const list = skillsOf(cat.id);
        return h("a", { class: "card", href: `#/categoria/${cat.id}` }, h("strong", {}, cat.title), h("span", { class: "muted" }, cat.summary),
          statusLane(counts(list)), h("small", { class: "muted" }, `${list.length} ${list.length === 1 ? "habilidade" : "habilidades"}`));
      }))),
    h("section", {}, h("h2", {}, "Por onde começar"), h("div", { class: "grid" }, ...START_HERE.map(getSkill).filter((s) => !!s).map((s) => SkillCard(s!)))),
    h("section", {}, h("h2", {}, "Acessadas recentemente"),
      recents.length ? h("div", { class: "grid" }, ...recents.map((s) => SkillCard(s!))) : emptyState("Nada por aqui ainda", "As habilidades que você abrir aparecem nesta lista.")));
}
