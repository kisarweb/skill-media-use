// Registro das demos executáveis: componentKey (no catálogo) -> função que monta a demo.
import { preferencesRecipesDemo } from "./preferences-recipes.js";
import { imageCorrectionDemo } from "./image-correction.js";

export const demoComponents: Record<string, (host: HTMLElement) => void> = {
  "preferences-recipes": preferencesRecipesDemo,
  "image-correction": imageCorrectionDemo,
};
