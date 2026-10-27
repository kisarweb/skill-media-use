import { h } from "../../lib/dom.js";

// Exibe o resultado e SEMPRE diz se veio de execução real ou de simulação (RF-08).
export interface Result { kind: "audio" | "video" | "image" | "json"; origin: "real" | "simulation"; caption: string; src?: string; data?: unknown }

export function ResultViewer(r: Result): HTMLElement {
  const media =
    r.kind === "audio" ? h("audio", { controls: true, src: r.src }) :
    r.kind === "video" ? h("video", { controls: true, src: r.src }) :
    r.kind === "image" ? h("img", { src: r.src, alt: r.caption }) :
    h("pre", {}, JSON.stringify(r.data, null, 2));
  return h("figure", { class: "result" },
    h("span", { class: `tag tag-${r.origin}` }, r.origin === "real" ? "Execução real" : "Simulação"),
    media, h("figcaption", {}, r.caption));
}
