import { h } from "../../lib/dom.js";
import { validateFile, type FileRules } from "../../lib/validation.js";

// Entrada de mídia reutilizável. `destination` diz ao usuário, com honestidade, para onde o arquivo vai (RF-19).
export function MediaUploader(o: { label: string; rules: FileRules; destination: string; onFile: (f: File) => void; onError: (msg: string) => void }): HTMLElement {
  const input = h("input", { type: "file", accept: o.rules.accept.join(","), onChange: () => {
    const f = input.files?.[0];
    if (!f) return;
    const err = validateFile(f, o.rules);
    if (err) { input.value = ""; o.onError(err); } else o.onFile(f);
  } });
  return h("label", { class: "uploader" }, h("span", {}, o.label), input,
    h("small", {}, `Limite de ${Math.round(o.rules.maxBytes / 1048576)} MB. Formatos: ${o.rules.accept.join(", ")}. ${o.destination}`));
}
