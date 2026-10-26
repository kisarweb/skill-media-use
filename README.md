<<<<<<< HEAD
# skill-media-use
Aplicação com exemplo de usos de casos da skill media-use do site: https://www.skills.sh/
=======
# skill-media-use (Media-Use Lab)

Plataforma web de demos, tutoriais e exemplos da skill **media-use** do HeyGen Hyperframes.
Cada habilidade tem 3 pilares: **demonstração**, **tutorial técnico** e **exemplos de uso**.

- Skill: https://www.skills.sh/heygen-com/hyperframes/media-use
- Repositório da skill: https://github.com/heygen-com/hyperframes
- PRD: `docs/PRD-media-use-lab.md` (especificação do produto)

## Stack
HTML + CSS (Flexbox) + TypeScript puro (SPA com rotas por hash) + Node.js/Express (backend local).
Sem banco de dados na v1: catálogo estático e histórico no `localStorage`.

## Como rodar
```bash
npm install
npm test       # valida catálogo e regras de upload
npm run dev    # compila o front e sobe http://127.0.0.1:3000
```

## Regra de transparência
Todo recurso tem um status **real e verdadeiro**: `working` (funcional), `simulated` (simulação
identificada) ou `planned` (pendente). Nada simulado aparece como execução real, e nenhum comando
da skill é escrito antes de ser conferido na documentação oficial.

## Estrutura
```
src/client/catalog/    # categorias e habilidades (dados tipados) + busca
src/client/components/ # layout, shared (DemoShell, MediaUploader...) e demos por habilidade
src/client/pages/      # dashboard, categoria, habilidade, busca, configurações
server/                # Express local (API fixa, sem executor genérico de comandos)
scripts/               # testes de catálogo
docs/demos/            # nota curta por demo (comando usado, limites, aprendizados)
```

## Commits
Um commit por etapa, no padrão `tipo(escopo): descrição` (feat, fix, chore, docs, test).
>>>>>>> 33355e6 (chore: estrutura inicial, README e PRD)
