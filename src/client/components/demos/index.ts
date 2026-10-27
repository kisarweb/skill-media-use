// Registro das demos executáveis: componentKey (no catálogo) -> função que monta a demo.
import { preferencesRecipesDemo } from "./preferences-recipes.js";

export const demoComponents: Record<string, (host: HTMLElement) => void> = {
  "preferences-recipes": preferencesRecipesDemo,
};
