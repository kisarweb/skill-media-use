# PRD — Media-Use Lab
## Plataforma interativa de demonstrações, tutoriais e exemplos da skill `media-use`

**Versão:** 1.0  
**Status:** Especificação inicial para desenvolvimento  
**Tipo de produto:** Aplicação web educacional e técnica  
**Idioma inicial:** Português (pt-BR)  
**Público principal:** Desenvolvedores, criadores de vídeo, profissionais de mídia e pessoas que desejam aprender a integrar as habilidades da skill `media-use`.

---

## 1. Visão geral

Desenvolver uma aplicação web que funcione como um catálogo interativo de habilidades da skill `media-use`, organizada a partir de um dashboard principal e de páginas específicas para cada grupo de recursos.

A plataforma deverá permitir que o usuário:

1. Descubra as habilidades disponíveis por meio de categorias, pesquisa e navegação.
2. Interaja com uma demonstração funcional ou com um ambiente de demonstração claramente identificado.
3. Aprenda a implementar o recurso por meio de um tutorial progressivo, com explicações e código pontual e detalhado.
4. Consulte exemplos de uso, variações, entradas, saídas esperadas e limitações.
5. Acesse configurações globais e configurações específicas quando forem necessárias para determinado recurso.

A aplicação não deve ser apenas uma galeria de páginas estáticas. Cada página de habilidade deve conectar demonstração, aprendizado técnico e exemplos práticos.

## 2. Contexto e fonte de escopo

O escopo funcional inicial deriva do arquivo fornecido com a lista de habilidades da skill `media-use`. O arquivo descreve as seguintes áreas:

- Resolver/encontrar mídia.
- Tratamento de mídia visual.
- Operações com mídia.
- Áudio.
- Voz e vídeo.
- Documentação de referência para resolução, gradação, áudio, operações, tratamentos, provedores, mixagem, comandos locais e memória/preferências.
- Scripts relacionados a áudio, TTS, transcrição, corte baseado em palavras, ducking, processamento de áudio, preferências e receitas.
- Catálogo de LUTs, grades e looks de cor.

O arquivo de origem não contém a implementação completa de cada comando, API ou provedor. Portanto, os tutoriais devem ser escritos a partir da documentação técnica correspondente, quando disponível. Não inventar parâmetros, endpoints, resultados ou garantias que não estejam confirmados.

## 3. Objetivos do produto

### 3.1 Objetivos principais

- Reunir exemplos de uso em uma interface única, navegável e consistente.
- Demonstrar o funcionamento de habilidades específicas com entradas controláveis e resultados observáveis.
- Ensinar como implementar cada habilidade com instruções reproduzíveis.
- Oferecer exemplos práticos que ajudem o usuário a reconhecer quando e por que utilizar cada recurso.
- Facilitar a expansão da biblioteca sem exigir a reconstrução da arquitetura a cada nova habilidade.
- Deixar explícitas as dependências técnicas, custos potenciais, requisitos de credenciais e limitações de cada demonstração.

### 3.2 Fora dos objetivos iniciais

- Reimplementar integralmente todos os recursos da skill dentro do navegador.
- Disponibilizar, sem autorização, serviços pagos de provedores externos.
- Prometer processamento de mídia real quando a demonstração usar apenas dados fictícios.
- Criar um editor de vídeo profissional completo.
- Gerenciar cobrança, assinatura ou múltiplos usuários administradores na primeira versão, salvo decisão posterior.
- Executar comandos de sistema arbitrários enviados pelo usuário.

## 4. Usuários e necessidades

### Persona A — Desenvolvedor que está aprendendo

Precisa entender como um recurso funciona, quais dependências instalar e como reproduzir o exemplo no próprio ambiente.

### Persona B — Criador de conteúdo

Quer testar possibilidades de tratamento visual, áudio, narração, legendas e edição antes de adotar um fluxo de trabalho.

### Persona C — Desenvolvedor de automações ou agente de IA

Precisa entender entradas, saídas, pré-condições, erros, limites e formas de integrar a habilidade em um fluxo automatizado.

## 5. Princípios de experiência

1. **Demonstração antes da teoria:** o usuário deve visualizar rapidamente o que o recurso faz.
2. **Código reproduzível:** todo tutorial deve indicar pré-requisitos, arquivos envolvidos, comando de execução e resultado esperado.
3. **Transparência:** diferenciar claramente execução real, simulação visual e demonstração indisponível por falta de configuração.
4. **Consistência:** as páginas de habilidades devem compartilhar uma estrutura visual e de navegação.
5. **Progressão:** começar por uma explicação simples e permitir aprofundamento técnico.
6. **Segurança:** não executar comandos arbitrários nem expor chaves de API no cliente.
7. **Expansibilidade:** novas habilidades devem poder ser adicionadas por configuração e componentes reutilizáveis.

## 6. Arquitetura de navegação

### 6.1 Layout global

A aplicação terá:

- **Barra lateral principal:** dashboard, categorias, páginas de habilidades, exemplos e documentação.
- **Cabeçalho superior:** nome da plataforma, busca global, breadcrumb, estado do ambiente e acesso às configurações.
- **Área principal:** conteúdo da página selecionada.
- **Menu de usuário ou preferências:** tema, idioma se houver suporte futuro, preferências de visualização e informações do ambiente.
- **Área de notificações:** mensagens de sucesso, falha, avisos de dependências e estados de processamento.

A barra lateral deverá poder ser recolhida. Em dispositivos móveis, deve ser substituída por navegação adaptada, como menu lateral sobreposto.

### 6.2 Mapa de páginas

```text
/
├── Dashboard
├── Explorar habilidades
│   ├── Resolver e encontrar mídia
│   │   ├── Busca/resolução de mídia
│   │   ├── Inventário e reutilização de ativos
│   │   └── Adoção/organização de ativos
│   ├── Tratamento visual
│   │   ├── Correção de imagem/vídeo
│   │   ├── LUTs e gradação de cor
│   │   ├── Comparação de gradação
│   │   └── Efeitos visuais
│   ├── Operações com mídia
│   │   ├── Corte e recorte
│   │   ├── Reframing
│   │   ├── Montagem/transformação
│   │   ├── Silenciamento de trechos
│   │   ├── Remoção de fundo
│   │   ├── Upscaling
│   │   ├── Lip-sync
│   │   ├── Tradução
│   │   └── Clipping
│   ├── Áudio
│   │   ├── Text-to-speech (TTS)
│   │   ├── Música de fundo (BGM)
│   │   ├── Efeitos sonoros (SFX)
│   │   ├── Legendas e transcrição
│   │   ├── Transcrição com Parakeet/Whisper
│   │   ├── Mixagem
│   │   ├── Ducking
│   │   └── Normalização de loudness
│   ├── Voz e vídeo
│   │   ├── Vídeo com avatar
│   │   ├── Geração de vídeo local
│   │   └── Geração de imagens
│   ├── Ambiente e provedores
│   │   ├── Instalação e pré-requisitos
│   │   ├── Configuração de provedores
│   │   └── Verificação de recursos/RAM
│   ├── Processamento local
│   │   ├── Grade
│   │   ├── Cutout
│   │   ├── Loudness
│   │   └── Beats
│   ├── Preferências e receitas
│   │   ├── Preferências
│   │   ├── Memória de preferências
│   │   └── Receitas reutilizáveis
│   └── LUTs e looks
│       ├── Catálogo de LUTs
│       └── Comparação de looks
├── Exemplos práticos
├── Tutoriais
├── Documentação e referências
├── Histórico de execuções (se aplicável)
└── Configurações
    ├── Geral
    ├── Ambiente de execução
    ├── Provedores e integrações
    ├── Credenciais e variáveis
    ├── Preferências de demonstração
    └── Diagnóstico
```

**Nota de escopo:** os itens acima são a proposta de organização da plataforma com base nos nomes e tópicos encontrados no arquivo. Antes de declarar cada subpágina como uma implementação real, confirmar sua correspondência com os comandos e arquivos de referência disponíveis na instalação completa da skill. Se um recurso não tiver detalhes técnicos suficientes, a página pode ser publicada inicialmente como ficha explicativa, marcada como “implementação pendente”.

## 7. Dashboard principal

### 7.1 Finalidade

O dashboard será a página inicial e o ponto central de acesso a todas as categorias e subpáginas.

### 7.2 Componentes

- **Resumo de habilidades:** total de habilidades cadastradas, disponíveis, dependentes de configuração e ainda pendentes.
- **Busca global:** pesquisa por nome, descrição, categoria, provedor, comando ou palavra-chave.
- **Categorias:** cartões para Resolver mídia, Tratamento visual, Operações, Áudio, Voz e vídeo, Ambiente, Processamento local e Preferências/receitas.
- **Acessados recentemente:** páginas visitadas recentemente, armazenadas localmente no navegador na primeira versão.
- **Destaques para começar:** seleção curada de demonstrações introdutórias.
- **Estado do ambiente:** indica se a página é somente demonstrativa, se o recurso está configurado ou se depende de serviço externo.
- **Ações rápidas:** explorar todas as habilidades, abrir tutoriais, consultar dependências e acessar configurações.
- **Avisos:** credenciais ausentes, provedor não configurado ou recurso indisponível, quando o sistema puder verificar esses estados com segurança.

### 7.3 Comportamento

- Ao selecionar uma categoria, abrir sua página de índice com os recursos relacionados.
- Ao selecionar uma habilidade, abrir a página detalhada da habilidade.
- A busca deve filtrar os resultados sem recarregar a aplicação.
- Cartões e indicadores devem apresentar estados reais provenientes do catálogo e da configuração do ambiente; não usar números fictícios.
- Se ainda não houver execuções reais, não mostrar estatísticas inventadas. Exibir estados vazios informativos.

## 8. Modelo obrigatório das páginas de habilidades: três pilares

Todas as páginas de habilidade devem conter os três pilares descritos abaixo.

### Pilar 1 — Aplicação concreta funcionando

Cada habilidade deve ter uma demonstração interativa adequada à sua natureza.

Requisitos:

- Explicar em uma frase o que a demonstração faz.
- Apresentar entradas e controles relevantes para o recurso.
- Validar os dados antes da execução.
- Mostrar estado de processamento, sucesso, falha e cancelamento quando aplicável.
- Apresentar o resultado real, prévia, arquivo ou saída estruturada.
- Permitir reiniciar a demonstração.
- Mostrar dependências e requisitos antes de executar.
- Distinguir visualmente e por texto:
  - **Execução real:** o processamento foi realizado pelo recurso configurado.
  - **Simulação:** a interface demonstra o fluxo, mas não executa o processamento real.
  - **Indisponível:** faltam dependências, configuração ou credenciais.
- Quando houver processamento de arquivo, exibir limites de formato e tamanho.
- Não enviar arquivos a serviços externos sem informar o usuário e obter consentimento quando necessário.

Exemplos de demonstração:

- Resolver mídia: preencher uma intenção, selecionar um tipo de ativo e visualizar os parâmetros/resultados retornados pelo mecanismo real ou uma simulação explicitamente identificada.
- Tratamento visual: selecionar um arquivo de teste, escolher um tratamento e comparar antes/depois quando houver processamento real.
- TTS: inserir texto, selecionar provedor/voz disponível e reproduzir o áudio gerado quando configurado.
- Transcrição: carregar um áudio de teste, executar a transcrição e mostrar o texto com metadados disponíveis.
- Ducking: comparar uma faixa de voz com música de fundo e demonstrar a redução de volume da música durante a fala.
- LUTs: selecionar um look e comparar a prévia original com a tratada.

### Pilar 2 — Tutorial técnico detalhado

Cada habilidade deve ter uma seção de tutorial que explique como implementar o recurso fora da interface da demonstração.

Estrutura obrigatória:

1. Objetivo do recurso.
2. Pré-requisitos e versões, quando conhecidas.
3. Dependências e provedores necessários.
4. Estrutura de arquivos relevante.
5. Passo a passo de instalação/configuração.
6. Exemplo mínimo funcional.
7. Explicação dos parâmetros utilizados.
8. Código completo do exemplo principal.
9. Comando de execução.
10. Saída esperada ou como verificar o resultado.
11. Tratamento de erros comuns.
12. Segurança, custos e limitações.
13. Links para documentação oficial ou arquivos de referência disponíveis.

Regras para o código:

- Exibir código com realce de sintaxe e botão para copiar.
- Informar o nome e o caminho do arquivo em que o código deve ser colocado.
- Não apresentar pseudocódigo como se fosse código executável.
- Se o exemplo depender de credenciais, usar variáveis de ambiente e valores fictícios claramente marcados.
- Não expor segredos no frontend.
- Indicar a linguagem, runtime, sistema operacional ou ferramenta quando relevante.
- Se não houver documentação suficiente para confirmar a implementação, identificar o trecho como exemplo ilustrativo ou deixar a implementação pendente.

### Pilar 3 — Exemplos de uso

Cada habilidade deve oferecer exemplos adicionais, com foco em cenários reais.

Cada exemplo deve conter:

- Nome e descrição.
- Problema que resolve.
- Contexto de uso.
- Entradas necessárias.
- Resultado esperado.
- Requisitos ou dependências.
- Código ou configuração, quando aplicável.
- Variações possíveis.
- Limitações conhecidas.
- Ação para abrir a demonstração ou o tutorial relacionado.

Exemplos sugeridos:

- Resolver mídia: localizar música de fundo, efeito sonoro, imagem, ícone, logo ou voz apropriados para uma intenção.
- Tratamento visual: corrigir uma gravação escura, aplicar um estilo VHS ou comparar grades de cor.
- Operações: gerar um clipe curto, recortar uma proporção para redes sociais ou silenciar um trecho.
- Áudio: narrar um texto, gerar efeitos sonoros, transcrever uma gravação ou normalizar loudness.
- Voz e vídeo: avaliar um fluxo de vídeo com avatar ou geração local, conforme os provedores disponíveis.
- Preferências e receitas: reaplicar uma configuração previamente salva em trabalhos semelhantes.

Os exemplos devem estar relacionados à habilidade correta. Não criar exemplos genéricos sem demonstrar a ligação com o recurso específico.

## 9. Páginas de índice por categoria

Cada categoria terá uma página de índice com:

- Título, resumo e objetivo da categoria.
- Campo de busca/filtro dentro da categoria.
- Lista ou grade de habilidades.
- Indicador do estado de implementação.
- Dependências principais, quando conhecidas.
- Acesso direto à demonstração, tutorial e exemplos.
- Filtros por estado: todas, funcionais, simulações e pendentes.
- Mensagem de estado vazio quando não houver resultados.

## 10. Página detalhada de habilidade

### 10.1 Cabeçalho

- Nome da habilidade.
- Categoria.
- Descrição curta.
- Estado: funcional, simulação ou pendente.
- Dependências relevantes.
- Links para documentação ou referência técnica.

### 10.2 Abas ou navegação interna

Usar abas ou seções claramente separadas:

1. **Demonstração**
2. **Tutorial**
3. **Exemplos**
4. **Referências e limitações**

Em telas pequenas, as abas devem permanecer utilizáveis sem ultrapassar a largura da tela.

### 10.3 Conteúdo persistente

A página deve manter visível, quando útil, o estado da configuração necessária. Se o usuário abrir uma demonstração sem provedor configurado, mostrar instruções para configurar o ambiente, sem revelar segredos.

## 11. Configurações

As configurações devem ser organizadas conforme a necessidade real do sistema, evitando opções sem função.

### 11.1 Configurações gerais

- Tema claro/escuro/sistema.
- Preferências de navegação, se necessárias.
- Limpeza do histórico local de páginas visitadas.
- Preferências de demonstrações, se aplicáveis.

### 11.2 Ambiente de execução

- Estado das dependências verificáveis.
- Informações de runtime e ferramentas disponíveis, quando fornecidas pelo backend.
- Diagnóstico de recursos locais.
- Mensagens para dependências ausentes e instruções de instalação.

### 11.3 Provedores e integrações

- Lista de provedores suportados pela implementação.
- Estado da configuração de cada provedor.
- Instruções para obter e configurar credenciais.
- Teste de conexão somente quando a integração real existir.
- Indicação de custos potenciais e tratamento de dados.

### 11.4 Credenciais e segurança

- Segredos devem ser mantidos no backend ou em um gerenciador seguro de segredos.
- Nunca incluir chaves privadas em bundles do frontend, código de exemplo público ou logs.
- Se o produto for apenas local e de demonstração, não implementar armazenamento de credenciais sem necessidade.
- Não criar um campo de “API key” que aparente funcionar se não existir integração segura no backend.

### 11.5 Configuração por habilidade

Quando uma habilidade exigir parâmetros específicos, exibir configurações contextualizadas na própria página e, quando fizer sentido, um link para a seção global correspondente.

## 12. Requisitos funcionais

| ID | Requisito | Prioridade |
|---|---|---|
| RF-01 | Exibir dashboard como página inicial. | P0 |
| RF-02 | Exibir navegação lateral com categorias e subpáginas. | P0 |
| RF-03 | Permitir recolher/expandir a navegação lateral. | P1 |
| RF-04 | Disponibilizar busca global de habilidades. | P0 |
| RF-05 | Exibir página de índice para cada categoria cadastrada. | P0 |
| RF-06 | Disponibilizar página de detalhes para cada habilidade publicada. | P0 |
| RF-07 | Exigir os três pilares em cada página de habilidade publicada. | P0 |
| RF-08 | Identificar execução real, simulação e recurso pendente. | P0 |
| RF-09 | Apresentar tutorial com código, explicações e instruções de execução. | P0 |
| RF-10 | Apresentar exemplos relacionados à habilidade. | P0 |
| RF-11 | Exibir pré-requisitos, limitações e dependências. | P0 |
| RF-12 | Oferecer configurações globais e contextuais quando necessárias. | P1 |
| RF-13 | Permitir copiar trechos de código. | P1 |
| RF-14 | Manter histórico local de páginas visitadas recentemente. | P2 |
| RF-15 | Permitir filtrar por estado de implementação. | P1 |
| RF-16 | Exibir estados de carregamento, erro, sucesso e estado vazio. | P0 |
| RF-17 | Permitir adicionar novas habilidades sem reescrever o layout comum. | P0 |
| RF-18 | Validar entradas antes de iniciar processamentos. | P0 |
| RF-19 | Informar o usuário antes de enviar mídia para um serviço externo. | P0 |
| RF-20 | Não registrar estatísticas ou execuções fictícias como dados reais. | P0 |

P0 = indispensável para a primeira versão; P1 = importante; P2 = melhoria posterior.

## 13. Requisitos não funcionais

### Usabilidade e acessibilidade

- Interface responsiva para desktop, tablet e celular.
- Navegação por teclado nos controles principais.
- Contraste adequado e rótulos claros.
- Estados de foco visíveis.
- Ícones acompanhados de texto ou rótulos acessíveis quando necessário.
- Mensagens de erro que expliquem como resolver o problema.

### Desempenho

- Carregar primeiro a estrutura da página e os metadados.
- Carregar demonstrações pesadas sob demanda.
- Evitar baixar grandes arquivos de mídia automaticamente.
- Exibir progresso para tarefas longas quando o backend permitir acompanhar o processamento.
- Não bloquear a interface durante operações demoradas.

### Segurança e privacidade

- Validar arquivos e parâmetros no cliente e no servidor.
- Limitar tipos e tamanhos de upload.
- Isolar processos de mídia no backend quando houver execução de comandos.
- Não executar shell arbitrário ou código enviado pelo usuário.
- Usar permissões mínimas e limites de tempo para tarefas.
- Não expor credenciais ou informações sensíveis em logs.
- Definir política de retenção e exclusão para arquivos enviados.
- Informar claramente quando houver envio para provedores externos.

### Manutenibilidade

- Componentes reutilizáveis.
- Catálogo de habilidades separado da apresentação visual.
- Tipagem e validação dos metadados.
- Testes automatizados para navegação, estados e validação.
- Documentação de configuração e execução do projeto.

## 14. Modelo de dados sugerido

Cada habilidade deve ser cadastrada por meio de metadados estruturados. Exemplo ilustrativo:

```ts
type ImplementationStatus = "working" | "simulated" | "planned";

type SkillExample = {
  id: string;
  title: string;
  description: string;
  useCase: string;
  inputs: string[];
  expectedOutput: string;
  dependencies?: string[];
  codeSnippet?: string;
};

type SkillPage = {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  summary: string;
  description: string;
  status: ImplementationStatus;
  tags: string[];
  prerequisites: string[];
  dependencies: string[];
  demo: {
    mode: "real" | "simulation" | "unavailable";
    componentKey?: string;
    explanation: string;
  };
  tutorial: {
    objective: string;
    steps: Array<{
      title: string;
      content: string;
      code?: string;
      language?: string;
      filePath?: string;
    }>;
  };
  examples: SkillExample[];
  references: Array<{
    title: string;
    url?: string;
    filePath?: string;
  }>;
  limitations: string[];
};
```

O modelo é uma proposta de estrutura de dados, não uma afirmação de que todas as habilidades já têm conteúdo completo. Campos obrigatórios devem ser validados antes de publicar a página.

## 15. Arquitetura técnica recomendada

A stack definitiva deve ser confirmada antes de iniciar a implementação. Como orientação inicial:

### Frontend

- Aplicação web em React com TypeScript.
- Framework com roteamento de páginas, por exemplo Next.js, ou outra opção equivalente aprovada pela equipe.
- Biblioteca de componentes acessíveis e consistentes.
- Estilização com sistema de design e tokens reutilizáveis.
- Realce de sintaxe para blocos de código.
- Catálogo de habilidades armazenado em JSON/TypeScript ou em banco de dados, conforme a necessidade.

### Backend

Necessário para habilidades que executam processamento real, acessam credenciais, invocam provedores ou executam ferramentas locais.

Responsabilidades:

- Validar solicitações.
- Orquestrar tarefas.
- Manter segredos fora do cliente.
- Controlar tempo, tamanho e concorrência.
- Retornar estados e resultados.
- Registrar erros técnicos sem incluir segredos.
- Aplicar limpeza de arquivos temporários.

### Execução de mídia

A skill descrita inclui comandos de linha de comando e processamento local. Portanto, uma aplicação hospedada apenas no navegador não poderá executar esses comandos diretamente no computador do usuário.

Para execução real, escolher e documentar uma destas estratégias:

1. **Backend controlado:** o servidor possui as ferramentas e dependências necessárias.
2. **Agente local:** um serviço local autorizado executa comandos na máquina do usuário e comunica-se com a interface por uma API segura.
3. **Provedor externo:** o backend integra-se a uma API de terceiros.
4. **Modo demonstração:** a interface simula o fluxo, com identificação explícita de que não há processamento real.

Não implementar um executor genérico de comandos de terminal acessível publicamente.

### Persistência

- Primeira versão: catálogo estático e preferências/histórico local quando suficientes.
- Banco de dados: adicionar somente se houver necessidade de usuários, histórico de execuções reais, projetos, favoritos sincronizados ou gerenciamento de conteúdo.
- Arquivos de mídia: armazenamento temporário com prazo de expiração e exclusão definidos.

## 16. Organização de pastas sugerida

Exemplo conceitual; adaptar à stack escolhida:

```text
src/
├── app/
│   ├── page.tsx
│   ├── explore/
│   │   └── page.tsx
│   ├── categories/
│   │   └── [categorySlug]/
│   │       └── page.tsx
│   ├── skills/
│   │   └── [skillSlug]/
│   │       └── page.tsx
│   ├── examples/
│   │   └── page.tsx
│   ├── tutorials/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
├── components/
│   ├── layout/
│   ├── dashboard/
│   ├── navigation/
│   ├── skills/
│   ├── demos/
│   ├── tutorials/
│   ├── examples/
│   ├── code/
│   └── settings/
├── catalog/
│   ├── categories.ts
│   └── skills/
├── lib/
│   ├── validation/
│   ├── status/
│   └── utils/
├── services/
│   ├── media/
│   ├── providers/
│   └── jobs/
├── types/
└── tests/
```

A estrutura acima é uma referência. Não é obrigatório criar serviços de backend para recursos que, na primeira fase, sejam somente conteúdo educacional ou demonstrações simuladas.

## 17. Diretrizes de design

- Visual moderno, técnico e limpo.
- Dashboard com cartões de categoria e acesso rápido.
- Hierarquia visual clara entre nome da habilidade, estado, demonstração e conteúdo educacional.
- Usar cores de estado com significado consistente, acompanhadas de texto:
  - funcional;
  - simulação;
  - pendente;
  - erro/configuração necessária.
- Evitar excesso de cartões dentro de cartões.
- Não usar animações decorativas que prejudiquem a leitura.
- Dar prioridade à demonstração e ao conteúdo técnico.
- Exibir código em blocos legíveis, com botão de cópia e indicação do arquivo.
- Garantir consistência entre desktop e dispositivos móveis.

## 18. Fluxos principais

### Fluxo A — Explorar uma habilidade

1. Usuário abre o dashboard.
2. Seleciona uma categoria ou pesquisa pelo nome da habilidade.
3. Abre a página da habilidade.
4. Consulta o estado de disponibilidade e os requisitos.
5. Testa a demonstração.
6. Consulta o tutorial para aprender a implementação.
7. Abre um exemplo prático relacionado.

### Fluxo B — Recurso dependente de provedor

1. Usuário abre uma habilidade.
2. A página informa que um provedor ou uma credencial é necessário.
3. Usuário abre as configurações relevantes.
4. Segue as instruções para configurar o provedor.
5. Executa um teste de conexão, se houver suporte real.
6. Retorna à demonstração.
7. A aplicação apresenta o resultado ou um erro acionável.

### Fluxo C — Recurso ainda não implementado

1. Usuário abre a página.
2. A interface identifica o recurso como pendente.
3. Exibe o objetivo, o caso de uso e referências disponíveis.
4. Não mostra controles falsos como se executassem o processamento.
5. Permite consultar o tutorial ou exemplos apenas quando houver conteúdo confiável.

## 19. Critérios de aceitação

A primeira versão será considerada aceitável quando:

- [ ] O dashboard for a página inicial e permitir acessar as categorias.
- [ ] Todas as categorias definidas no catálogo forem navegáveis.
- [ ] A busca global encontrar habilidades por nome, descrição e tags.
- [ ] Cada habilidade publicada tiver os três pilares: demonstração, tutorial e exemplos.
- [ ] O estado de implementação estiver visível e for verdadeiro.
- [ ] Demonstrações simuladas estiverem explicitamente identificadas.
- [ ] Os blocos de código tiverem linguagem e botão de cópia.
- [ ] Os tutoriais apresentarem pré-requisitos e instruções de execução quando conhecidos.
- [ ] As páginas indicarem dependências e limitações relevantes.
- [ ] As configurações exibirem somente opções que tenham função definida.
- [ ] Nenhuma credencial secreta for exposta no navegador.
- [ ] A interface apresentar estados de carregamento, erro, sucesso e vazio.
- [ ] O layout funcionar em desktop e dispositivos móveis.
- [ ] Testes automatizados cobrirem navegação principal, busca e validação dos metadados.
- [ ] Nenhum resultado simulado for apresentado como execução real.

## 20. Plano de implementação por fases

### Fase 1 — Estrutura e catálogo

- Criar layout global e dashboard.
- Implementar navegação lateral, cabeçalho, breadcrumbs e busca.
- Criar catálogo estruturado de categorias e habilidades.
- Implementar páginas de índice e páginas detalhadas com os três pilares.
- Publicar inicialmente as páginas com conteúdo confirmado e estados de implementação explícitos.

### Fase 2 — Conteúdo técnico inicial

- Selecionar um conjunto pequeno e representativo de habilidades.
- Produzir demonstrações e tutoriais completos.
- Adicionar exemplos de uso reproduzíveis.
- Validar os comandos e dependências contra a documentação real da skill.
- Criar testes para os fluxos de cada demonstração.

### Fase 3 — Execução real

- Definir a estratégia de execução: backend, agente local ou provedores externos.
- Implementar uma integração por vez.
- Adicionar validação, limites de execução, estados de tarefa e tratamento de erros.
- Implementar configuração segura de credenciais.
- Testar processamento de mídia real com arquivos controlados.

### Fase 4 — Configurações e diagnóstico

- Criar páginas de configurações necessárias.
- Implementar testes de conexão e diagnóstico somente para integrações existentes.
- Documentar custos, limites, privacidade e requisitos de cada provedor.

### Fase 5 — Expansão e qualidade

- Expandir o catálogo.
- Melhorar pesquisa, filtros e histórico.
- Testar acessibilidade, responsividade, desempenho e segurança.
- Revisar a precisão de todos os tutoriais e exemplos.

## 21. Estratégia de testes

### Testes de interface

- Dashboard abre corretamente.
- Navegação para categorias e habilidades funciona.
- Busca retorna resultados corretos.
- Abas da habilidade exibem os três pilares.
- Menu de configurações abre as páginas correspondentes.
- Layout se adapta a telas pequenas.

### Testes de catálogo

- IDs e slugs são únicos.
- Toda habilidade aponta para uma categoria existente.
- Toda habilidade publicada contém demonstração, tutorial e pelo menos um exemplo.
- Estados e referências são válidos.
- Links externos possuem URL válida quando fornecida.

### Testes de demonstração

- Entrada inválida é rejeitada com mensagem clara.
- Recurso simulado permanece identificado como simulação.
- Falha de provedor não derruba a interface.
- Arquivos incompatíveis ou grandes demais são rejeitados.
- Operações demoradas mostram o estado de processamento quando suportado.

### Testes de segurança

- Segredos não aparecem no código do cliente nem nos logs.
- Arquivos temporários seguem a política de retenção.
- Comandos não podem ser construídos livremente a partir de entrada do usuário.
- APIs validam autorização, tipos e limites.

## 22. Riscos e decisões em aberto

1. **Documentação incompleta:** o arquivo fornecido lista habilidades e caminhos de referência, mas não traz o conteúdo completo de cada referência. Será necessário consultar a instalação/documentação real para implementar tutoriais executáveis.
2. **Dependências de provedores:** algumas funções podem exigir contas, chaves, modelos, recursos de hardware ou serviços externos.
3. **Processamento local:** recursos de linha de comando não serão executados diretamente pelo navegador sem um componente local ou backend apropriado.
4. **Custos:** TTS, geração de vídeo, avatares e outros serviços podem gerar custos. Cada integração deverá documentar o que se sabe.
5. **Escopo amplo:** implementar todas as habilidades com processamento real desde o início pode tornar a primeira entrega excessivamente grande. Recomenda-se construir a arquitetura e validar uma seleção inicial antes de expandir.
6. **Privacidade de mídia:** arquivos de áudio e vídeo podem conter informações pessoais; upload, retenção e exclusão devem ser tratados desde o início.

### Decisões que devem ser confirmadas antes do desenvolvimento

- A aplicação será apenas educacional ou executará a skill de verdade?
- O processamento ocorrerá em servidor, máquina local ou serviços externos?
- Qual stack deve ser utilizada?
- Haverá autenticação e usuários?
- O histórico será local ou sincronizado?
- Quais provedores e comandos estarão disponíveis no ambiente real?
- Quais habilidades serão priorizadas para a primeira demonstração funcional?

## 23. Instrução final para a ferramenta de desenvolvimento

Implemente o produto de forma incremental, respeitando este PRD.

Antes de desenvolver uma integração, verifique a documentação e as dependências reais do recurso. Não invente APIs, parâmetros, comandos, resultados ou credenciais. Quando não houver informação suficiente, crie a estrutura da página, identifique claramente a lacuna e não simule uma execução real sem informar o usuário.

Priorize primeiro a arquitetura reutilizável, o dashboard, a navegação e o modelo de dados. Em seguida, implemente um pequeno conjunto de habilidades representativas de ponta a ponta, cobrindo os três pilares. Só depois expanda o catálogo.

Cada página publicada deve permitir ao usuário responder a três perguntas:

1. **O que este recurso faz e consigo observar seu funcionamento?**
2. **Como posso implementar esse recurso no meu próprio ambiente?**
3. **Em quais situações práticas posso utilizá-lo?**

O resultado esperado é uma plataforma de aprendizado e experimentação técnica, organizada, expansível, confiável e transparente quanto ao que realmente executa.
