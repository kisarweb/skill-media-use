import { h } from "../../lib/dom.js";
import { getCategory, type SkillPage } from "../../catalog/index.js";
import { statusBadge } from "./ui.js";

export const SkillCard = (s: SkillPage, showCategory = true): HTMLElement =>
  h("a", { class: "card skill-card", href: `#/habilidade/${s.id}` },
    h("span", { class: "card-head" }, h("strong", {}, s.title), statusBadge(s.status)),
    h("span", { class: "muted" }, s.summary),
    showCategory ? h("small", { class: "muted" }, getCategory(s.categoryId)?.title ?? "") : null);
