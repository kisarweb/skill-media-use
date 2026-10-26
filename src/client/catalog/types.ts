// Modelo de dados do catálogo (baseado na seção 14 do PRD).
// "status" diz o que o recurso É hoje; "validation" diz o quanto foi testado ponta a ponta.
export type ImplementationStatus = "working" | "simulated" | "planned";
export type ValidationStatus = "planejada" | "em-progresso" | "validada" | "quebrada";
export type DemoMode = "real" | "simulation" | "unavailable";

export interface TutorialStep { title: string; content: string; code?: string; language?: string; filePath?: string }
export interface SkillExample {
  id: string; title: string; description: string; useCase: string;
  inputs: string[]; expectedOutput: string; dependencies?: string[]; codeSnippet?: string;
}
export interface Reference { title: string; url?: string; filePath?: string }
export interface Category { id: string; title: string; summary: string }

export interface SkillPage {
  id: string; // também é o slug da rota: #/habilidade/<id>
  title: string;
  categoryId: string;
  summary: string;
  description: string;
  status: ImplementationStatus;
  validation: ValidationStatus;
  tags: string[];
  prerequisites: string[];
  dependencies: string[];
  demo: { mode: DemoMode; componentKey?: string; explanation: string };
  tutorial: { objective: string; steps: TutorialStep[] };
  examples: SkillExample[];
  references: Reference[];
  limitations: string[];
}
