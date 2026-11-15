export interface GlossaryTargetRequest {
  id: string;
  key: number;
}

export interface GlossaryViewProps {
  headerHeight?: number;
  onViewTechnique: (techniqueId: string) => void;
  onViewDomainKnowledge: (domainId: string) => void;
  targetRequest?: GlossaryTargetRequest | null;
}
