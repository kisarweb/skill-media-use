// Servidor local. Só serve o front e expõe rotas FIXAS de leitura.
// Regra de segurança (PRD): nenhum endpoint recebe um comando livre para executar.
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = express();
app.disable("x-powered-by");
app.use(express.static(path.join(root, "public")));

app.get("/api/health", (_req, res) => { res.json({ ok: true }); });

// Fase 1: só informa o que o próprio Node sabe. A checagem real da skill
// (`npx hyperframes media-use resolve --doctor`) entra na Fase 3, com comando fixo.
app.get("/api/env", (_req, res) => {
  res.json({
    backend: "online",
    node: process.version,
    platform: process.platform,
    mediaUse: { checked: false, note: "A verificação da skill será implementada na Fase 3." },
  });
});

const port = Number(process.env.PORT ?? 3000);
// 127.0.0.1: o backend fica acessível apenas nesta máquina.
app.listen(port, "127.0.0.1", () => console.log(`Media-Use Lab em http://127.0.0.1:${port}`));
