import type { TechniqueItem } from '@vibe-dictionary/catalog';

export interface DomainKnowledgeViewProps {
  onViewTechnique: (item: TechniqueItem) => void;
}
