export interface GlossaryTargetRequest {
  id: string;
  key: number;
}

export interface GlossaryViewProps {
  onViewTechnique: (techniqueId: string) => void;
  onViewDomainKnowledge: (domainId: string) => void;
  targetRequest?: GlossaryTargetRequest | null;
}
