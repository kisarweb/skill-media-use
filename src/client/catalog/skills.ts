import type { Reference, SkillPage } from "./types.js";

const SKILL_URL = "https://www.skills.sh/heygen-com/hyperframes/media-use";
const ref = (filePath: string): Reference => ({ title: filePath, filePath });

// Fábrica de fichas "pendentes". Por quê: enquanto não lemos o SKILL.md real e validamos o fluxo
// ponta a ponta, a página mostra apenas o que o resumo da skill afirma, sem comando inventado
// e sem controles falsos (Fluxo C do PRD).
function planned(p: { id: string; categoryId: string; title: string; summary: string; tags: string[]; deps?: string[]; refs: string[] }): SkillPage {
  return {
    id: p.id, categoryId: p.categoryId, title: p.title, summary: p.summary, description: p.summary,
    status: "planned", validation: "planejada", tags: p.tags, prerequisites: [], dependencies: p.deps ?? [],
    demo: { mode: "unavailable", explanation: "Implementação pendente. Os comandos reais ainda não foram conferidos na documentação da skill, e nenhuma execução é simulada aqui." },
    tutorial: { objective: p.summary, steps: [] },
    examples: [],
    references: [{ title: "Skill media-use", url: SKILL_URL }, ...p.refs.map(ref)],
    limitations: ["Ficha informativa: parâmetros e comandos serão documentados depois da leitura do SKILL.md e das referências reais."],
  };
}

export const skills: SkillPage[] = [
  planned({ id: "resolver-midia", categoryId: "resolver-midia", title: "Resolver mídia por intenção", summary: "Localiza ou cria um ativo (música, efeito sonoro, imagem, ícone, logo, voz ou grade de cor) a partir do tipo e da intenção descrita.", tags: ["resolve", "ativos", "intent", "ledger"], refs: ["references/resolve.md"] }),
  planned({ id: "inventario-reutilizacao", categoryId: "resolver-midia", title: "Inventário e reutilização de ativos", summary: "Consulta o que já existe no projeto para reutilizar e adotar ativos antes de gerar mídia nova.", tags: ["candidates", "inventário", "reuso"], refs: ["references/resolve.md"] }),

  planned({ id: "correcao-visual", categoryId: "tratamento-visual", title: "Correção de imagem e vídeo", summary: "Corrige gravações que estão escuras, planas ou mornas.", tags: ["media-treatment", "correção"], refs: ["references/media-treatments.md"] }),
  planned({ id: "luts-gradacao", categoryId: "tratamento-visual", title: "LUTs, gradação e comparação de looks", summary: "Aplica LUTs e grades de cor e compara looks lado a lado (grade-compare), a partir do catálogo de LUTs.", tags: ["lut", "grade-compare", "cor"], refs: ["references/grading.md", "luts/"] }),
  planned({ id: "efeitos-visuais", categoryId: "tratamento-visual", title: "Efeitos visuais", summary: "Estiliza a mídia com efeitos como VHS, glitch, ASCII e halftone.", tags: ["vhs", "glitch", "ascii", "halftone"], refs: ["references/media-treatments.md"] }),

  planned({ id: "corte-recorte", categoryId: "operacoes-midia", title: "Corte e recorte", summary: "Corta e recorta trechos de mídia, incluindo corte baseado em palavras a partir de transcrição.", tags: ["cortar", "recortar", "transcript-cut"], refs: ["references/operations.md", "scripts/transcript-cut.mjs"] }),
  planned({ id: "reframing", categoryId: "operacoes-midia", title: "Reframing", summary: "Reenquadra a mídia para outras proporções de tela.", tags: ["reframe", "proporção"], refs: ["references/operations.md"] }),
  planned({ id: "silenciar-trechos", categoryId: "operacoes-midia", title: "Silenciamento de trechos", summary: "Silencia passagens específicas de uma mídia.", tags: ["silenciar", "áudio"], refs: ["references/operations.md"] }),
  planned({ id: "remocao-fundo", categoryId: "operacoes-midia", title: "Remoção de fundo", summary: "Remove o fundo de imagens ou vídeos.", tags: ["cutout", "fundo"], refs: ["audio/references/remove-background.md"] }),
  planned({ id: "upscaling", categoryId: "operacoes-midia", title: "Upscaling", summary: "Amplia a resolução da mídia.", tags: ["upscale", "resolução"], refs: ["references/operations.md"] }),
  planned({ id: "lipsync-traducao", categoryId: "operacoes-midia", title: "Lip-sync e tradução", summary: "Sincroniza lábios e traduz mídia, por meio de receitas HeyGen.", tags: ["lipsync", "tradução", "heygen"], deps: ["Conta HeyGen autenticada (a confirmar)"], refs: ["references/operations.md"] }),

  planned({ id: "tts-narracao", categoryId: "audio", title: "Narração (TTS)", summary: "Gera narração a partir de texto. Provedores citados no resumo: HeyGen, ElevenLabs, Kokoro (local) e Gemini.", tags: ["tts", "voz", "narração"], deps: ["Provedor de TTS (HeyGen, ElevenLabs, Kokoro local ou Gemini)"], refs: ["audio/references/tts.md", "scripts/heygen-tts.mjs"] }),
  planned({ id: "bgm-musica", categoryId: "audio", title: "Música de fundo (BGM)", summary: "Recupera música de fundo pelo HeyGen ou gera localmente (Lyria ou MusicGen).", tags: ["bgm", "música"], refs: ["audio/references/bgm.md"] }),
  planned({ id: "sfx-efeitos", categoryId: "audio", title: "Efeitos sonoros (SFX)", summary: "Busca efeitos sonoros no Openverse ou em uma biblioteca local.", tags: ["sfx", "openverse"], refs: ["audio/references/sfx.md"] }),
  planned({ id: "legendas-transcricao", categoryId: "audio", title: "Legendas e transcrição", summary: "Transcreve áudio e gera legendas usando Parakeet ou Whisper.", tags: ["whisper", "parakeet", "legendas"], refs: ["audio/references/transcribe.md", "audio/references/captions/"] }),
  planned({ id: "mixagem-ducking", categoryId: "audio", title: "Mixagem, ducking e loudness", summary: "Mixa faixas, reduz a música durante a fala (ducking) e normaliza o loudness.", tags: ["mixagem", "ducking", "loudness"], refs: ["references/mixing.md", "scripts/audio-duck.mjs"] }),

  planned({ id: "video-avatar", categoryId: "voz-video", title: "Vídeo com avatar", summary: "Gera vídeo com avatar pelo HeyGen ou localmente com LTX 2.3.", tags: ["avatar", "ltx", "heygen"], deps: ["HeyGen ou ambiente local com LTX 2.3 (a confirmar)"], refs: ["references/operations.md"] }),
  planned({ id: "geracao-imagens", categoryId: "voz-video", title: "Geração de imagens", summary: "Gera imagens localmente (mflux) ou via codex.", tags: ["imagem", "mflux", "codex"], refs: ["references/resolve.md"] }),

  planned({ id: "instalacao-provedores", categoryId: "ambiente", title: "Instalação, login e provedores", summary: "Instalação da skill, sign-in, configuração de provedores e requisitos de RAM.", tags: ["doctor", "setup", "auth", "ram"], refs: ["references/setup-providers.md"] }),
  planned({ id: "comandos-locais", categoryId: "processamento-local", title: "Comandos locais", summary: "Grade de cor, recorte de fundo (cutout), loudness e detecção de batidas executados localmente.", tags: ["grade", "cutout", "loudness", "beats"], refs: ["references/local.md"] }),
  {
    id: "preferencias-receitas",
    categoryId: "preferencias",
    title: "Preferências e receitas",
    summary: "Memórias e preferências lembradas, e receitas congeladas para repetir trabalhos semelhantes.",
    description: "Permite salvar e carregar preferências e receitas de uso repetido. As receitas podem incluir configurações de processamento anteriormente aplicadas, como parâmetros de correção, filtros de áudio ou sequências de operações. Esta demonstração usa o localStorage do navegador como armazenamento local, simulando o comportamento esperado da skill real.",
    status: "simulated",
    validation: "em-progresso",
    tags: ["memória", "prefs", "recipe"],
    prerequisites: [],
    dependencies: [],
    demo: {
      mode: "simulation",
      componentKey: "preferences-recipes",
      explanation: "Esta demonstração mostra como salvar e carregar receitas usando o armazenamento local do navegador. Na implementação real, estas receitas seriam persistidas e carregadas pela skill media-use através de comandos como `media-use recipe save` e `media-use recipe load`."
    },
    tutorial: {
      objective: "Entender como criar, salvar e aplicar receitas reutilizáveis para evitar reconfigurações repetitivas em fluxos de trabalho de mídia.",
      steps: [
        { title: "Entendendo receitas", content: "Receitas são conjuntos de parâmetros previamente definidos que podem ser reaplicados a novos projetos. Elas armazenam configurações de processamento, como valores de correção (exposure, gamma, saturation), filtros de áudio (ducking threshold, loudness target) ou sequências de operações (ex: recortar → aplicar LUT → exportar)." },
        { title: "Estrutura de uma receita", content: "Uma receita típica contém: nome amigável, descrição opcional, parêmetros do processamento e metadados (data de criação, última modificação).", code: `{
  "name": "correcao-basica",
  "description": "Correção de imagens escuras",
  "params": {
    "exposure": 0.8,
    "gamma": 1.2,
    "saturation": 1.1
  },
  "createdAt": "2025-01-15T10:30:00Z"
}`, language: "json", filePath: "~/.media-use/recipes/correcao-basica.json" },
        { title: "Salvando uma receita", content: "Use o comando `media-use recipe save --name <nome> --params '<json>'` para salvar uma receita. No backend local, isso cria um arquivo JSON em `~/.media-use/recipes/`.", code: "media-use recipe save --name correcao-basica --params '{\"exposure\": 0.8, \"gamma\": 1.2, \"saturation\": 1.1}'", language: "bash" },
        { title: "Carregando uma receita", content: "Use `media-use recipe load --name <nome>` para aplicar os parâmetros salvos ao processo atual.", code: "media-use recipe load --name correcao-basica", language: "bash" },
        { title: "Listando receitas", content: "Liste todas as receitas salvas com `media-use recipe list`.", code: "media-use recipe list", language: "bash" },
        { title: "Apagando uma receita", content: "Remova uma receita com `media-use recipe delete --name <nome>`." },
      ]
    },
    examples: [
      {
        id: "ex-recipe-correcao",
        title: "Correção de vídeo escuro",
        description: "Salva os parâmetros de correção aplicados a um vídeo e reaproxia-los em outro.",
        useCase: "Quando você ajusta settings de correção para um clip específico e quer aplicar os mesmos ajustes a outros clipes da mesma gravação.",
        inputs: ["Vídeo escuro", "Parâmetros de correção ajustados"],
        expectedOutput: "Vídeo com exposição, gama e saturação corrigidos",
        dependencies: [],
        codeSnippet: "media-use recipe save --name video-corrigido --params '{\"exposure\": 0.9, \"gamma\": 1.2}'"
      },
      {
        id: "ex-recipe-audio",
        title: "Mixagem com ducking otimizada",
        description: "Salva a configuração de ducking aplicada a uma faixa de narração e música.",
        useCase: "Quando você encontra os níveis ideais de ducking para uma voz e música de fundo e quer reutilizar em outros projetos.",
        inputs: ["Faixa de áudio", "Configurações de ducking"],
        expectedOutput: "Áudio mixado com voice-ducking automático",
        dependencies: ["Provedor de ducking configurado"],
        codeSnippet: "media-use recipe save --name ducking-podcast --params '{\"ducking_ratio\": 0.3, \"fade_ms\": 50}'"
      }
    ],
    references: [
      { title: "Skill media-use", url: SKILL_URL },
      { title: "references/memory.md", filePath: "references/memory.md" },
      { title: "scripts/prefs.mjs", filePath: "scripts/prefs.mjs" },
      { title: "scripts/recipe.mjs", filePath: "scripts/recipe.mjs" }
    ],
    limitations: [
      "Esta demonstração usa localStorage do navegador, não o sistema de receitas da skill real.",
      "Os comandos da skill real (`media-use recipe save/load`) exigem instalação completa do ambiente."
    ]
  },
];
