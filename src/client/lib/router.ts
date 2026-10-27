// Rotas por hash (#/...): funcionam abrindo o HTML direto, sem configurar o servidor.
export type Route =
  | { name: "dashboard" }
  | { name: "category"; id: string }
  | { name: "skill"; id: string }
  | { name: "search"; q: string }
  | { name: "settings" }
  | { name: "notfound" };

export function parseHash(hash: string): Route {
  const [seg = "", arg = ""] = hash.replace(/^#\/?/, "").split("/");
  let val = "";
  try { val = decodeURIComponent(arg); } catch { return { name: "notfound" }; }
  switch (seg) {
    case "": return { name: "dashboard" };
    case "categoria": return val ? { name: "category", id: val } : { name: "notfound" };
    case "habilidade": return val ? { name: "skill", id: val } : { name: "notfound" };
    case "busca": return { name: "search", q: val };
    case "configuracoes": return { name: "settings" };
    default: return { name: "notfound" };
  }
}
