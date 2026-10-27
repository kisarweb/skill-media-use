// localStorage com try/catch: em modo privado ou com cota cheia o app continua funcionando.
export type ThemePref = "system" | "light" | "dark";
const P = "mul:";

function read<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(P + key); return raw ? (JSON.parse(raw) as T) : fallback; } catch { return fallback; }
}
function write(key: string, value: unknown): void {
  try { localStorage.setItem(P + key, JSON.stringify(value)); } catch { /* sem persistência: segue sem salvar */ }
}

export const loadTheme = (): ThemePref => read<ThemePref>("theme", "system");
export const saveTheme = (t: ThemePref): void => write("theme", t);
export const loadRecents = (): string[] => read<string[]>("recents", []);
export const clearRecents = (): void => write("recents", []);
export function pushRecent(id: string): void {
  write("recents", [id, ...loadRecents().filter((x) => x !== id)].slice(0, 6));
}

// O CSS só conhece "light" e "dark": resolvemos "system" aqui, no JS.
export function applyTheme(pref: ThemePref): void {
  const dark = pref === "dark" || (pref === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}
