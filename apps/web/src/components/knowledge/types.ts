import type { TechniqueItem } from '@vibe-dictionary/catalog';

export interface DomainKnowledgeTargetRequest {
  id: string;
  key: number;
}

export interface DomainKnowledgeViewProps {
  onViewTechnique: (item: TechniqueItem) => void;
  onViewGlossaryTerm?: (termId: string) => void;
  targetRequest?: DomainKnowledgeTargetRequest | null;
}
