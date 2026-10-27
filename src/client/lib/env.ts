// Estado do backend local. Retorna null quando o servidor não responde (ex.: HTML aberto sem `npm run dev`).
export interface EnvInfo { backend: "online"; node: string; platform: string; mediaUse: { checked: boolean; note: string } }

let cache: Promise<EnvInfo | null> | null = null;
export function fetchEnv(): Promise<EnvInfo | null> {
  cache ??= fetch("/api/env", { signal: AbortSignal.timeout(3000) })
    .then((r) => (r.ok ? (r.json() as Promise<EnvInfo>) : null))
    .catch(() => null);
  return cache;
}
