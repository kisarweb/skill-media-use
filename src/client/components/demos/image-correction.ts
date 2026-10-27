// Demo de correção de imagem. Usa Canvas para simular correções reais de exposição, gamma e saturação.
// Esta é uma SIMULAÇÃO - não faz chamadas à skill real, apenas demonstra o fluxo esperado.
import { h } from "../../lib/dom.js";
import { MediaUploader } from "../shared/MediaUploader.js";
import { ResultViewer, type Result } from "../shared/ResultViewer.js";
import { codeBlock } from "../shared/ui.js";
import type { FileRules } from "../../lib/validation.js";

// Ajustes simplificados de correção. Na skill real, viria do backend/server.
const RULES: FileRules = { accept: ["image/"], maxBytes: 5 * 1048576 };

export function imageCorrectionDemo(host: HTMLElement): void {
  const originalImg = h("img", { class: "demo-img", alt: "Pré-correção", style: "max-width:100%;display:block;margin-bottom:8px;opacity:0.7" });
  const correctedImg = h("img", { class: "demo-img", alt: "Pós-correção", style: "max-width:100%;display:block;margin-bottom:8px;opacity:0" });
  const statusEl = h("p", { class: "muted", role: "status" });
  const form = h("form", { class: "correction-form" },
    h("label", { for: "exp" }, "Exposição"),
    h("input", { type: "range", id: "exp", min: -2, max: 2, step: 0.1, value: 0, class: "slider" }),
    h("label", { for: "gam" }, "Gama"),
    h("input", { type: "range", id: "gam", min: 0.4, max: 2.6, step: 0.1, value: 1, class: "slider" }),
    h("label", { for: "sat" }, "Saturação"),
    h("input", { type: "range", id: "sat", min: 0.4, max: 2, step: 0.1, value: 1, class: "slider" }),
    h("button", { type: "button", class: "btn", id: "apply-btn" }, "Aplicar correção")
  );

  let originalDataURL = "";

  const applyCorrection = () => {
    if (!originalDataURL) return;
    const exp = parseFloat((document.getElementById("exp") as HTMLInputElement).value);
    const gam = parseFloat((document.getElementById("gam") as HTMLInputElement).value);
    const sat = parseFloat((document.getElementById("sat") as HTMLInputElement).value);

    const img = new Image();
    img.src = originalDataURL;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;

      // Passo 1: Desenhar imagem original
      ctx.drawImage(img, 0, 0);

      // Passo 2: Correção de exposição (brightness)
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Exposição (brightness)
        data[i] = Math.min(255, Math.max(0, data[i] + (exp * 255)));           // R
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + (exp * 255)));   // G
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + (exp * 255)));   // B

        // Gama
        const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
        data[i] = Math.pow(r, 1 / gam) * 255;
        data[i + 1] = Math.pow(g, 1 / gam) * 255;
        data[i + 2] = Math.pow(b, 1 / gam) * 255;

        // Saturação
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = lum + (data[i] - lum) * sat;
        data[i + 1] = lum + (data[i + 1] - lum) * sat;
        data[i + 2] = lum + (data[i + 2] - lum) * sat;
      }

      ctx.putImageData(imgData, 0, 0);
      correctedImg.src = canvas.toDataURL();

      // Resultado simulado (não real, mas demonstra o fluxo)
      const result: Result = {
        kind: "image",
        origin: "simulation",
        caption: `Imagem corrigida: exp=${exp.toFixed(1)}, gam=${gam.toFixed(1)}, sat=${sat.toFixed(1)}`,
        src: canvas.toDataURL()
      };
      statusEl.textContent = "Correção aplicada (simulação).";
    };
  };

  (document.getElementById("apply-btn") as HTMLButtonElement)?.addEventListener("click", applyCorrection);

  // Uploader
  const uploader = MediaUploader({
    label: "Carregar imagem para corrigir",
    rules: RULES,
    destination: "Este navegador (preview local). O arquivo não é enviado ao servidor.",
    onFile: (f: File) => {
      originalDataURL = URL.createObjectURL(f);
      originalImg.src = originalDataURL;
      originalImg.style.opacity = "1";
      correctedImg.style.opacity = "0";
      statusEl.textContent = f.name;
    },
    onError: (msg: string) => { statusEl.textContent = msg; }
  });

  // Montagem final do componente
  const previewSection = h("div", { class: "preview" },
    h("h3", {}, "Visualização"),
    h("div", { class: "split" },
      h("div", { class: "half" },
        h("strong", {}, "Antes"),
        originalImg
      ),
      h("div", { class: "half" },
        h("strong", {}, "Depois"),
        correctedImg
      )
    )
  );
  const codeSection = h("details", { class: "demo-code" },
    h("summary", {}, "Comandos reais da skill"),
    codeBlock({
      code: `# Install media-use CLI\nnpm install -g @heygen/media-use-skill\n\n# Corrigir imagem\nnpx hyperframes media-use correct input.mp4 --exposure 0.8 --gamma 1.2 --saturation 1.1 --output corrected.mp4\n\n# Verificar parâmetros disponíveis\nmedia-use correct --help`,
      language: "bash",
      filePath: "~/.media-use/bin/hyperframes"
    })
  );

  host.append(
    h("div", { class: "demo-form" },
      uploader,
      form,
      statusEl,
      previewSection,
      codeSection
    )
  );
}