import type { Category } from "./types.js";

// Categorias do dashboard (seção 7.2 do PRD). A ordem aqui é a ordem na interface.
export const categories: Category[] = [
  { id: "resolver-midia", title: "Resolver e encontrar mídia", summary: "Localizar ou criar ativos (música, efeitos, imagens, ícones, logos, voz, grades de cor) e reutilizar o que já existe." },
  { id: "tratamento-visual", title: "Tratamento visual", summary: "Corrigir ou estilizar gravações escuras, planas ou mornas com LUTs, grades de cor e efeitos." },
  { id: "operacoes-midia", title: "Operações com mídia", summary: "Cortar, recortar, reframar, silenciar trechos, remover fundo, ampliar, sincronizar lábios e traduzir." },
  { id: "audio", title: "Áudio", summary: "Narração, música de fundo, efeitos sonoros, legendas, transcrição e mixagem." },
  { id: "voz-video", title: "Voz e vídeo", summary: "Vídeo com avatar, geração de vídeo local e geração de imagens." },
  { id: "ambiente", title: "Ambiente e provedores", summary: "Instalação, login, provedores e requisitos de máquina." },
  { id: "processamento-local", title: "Processamento local", summary: "Comandos locais: grade, recorte de fundo, loudness e batidas." },
  { id: "preferencias", title: "Preferências e receitas", summary: "Memórias, preferências lembradas e receitas reutilizáveis." },
];
