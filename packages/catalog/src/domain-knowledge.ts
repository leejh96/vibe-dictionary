import type { Locale } from './localization';
import { EDUCATION_KNOWLEDGE } from './domain-knowledge/education';
import { COMMUNITY_KNOWLEDGE } from './domain-knowledge/community';

export interface DomainKnowledgeText {
  domain: string;
  title: string;
  summary: string;
  overview: string;
  concepts: { name: string; description: string }[];
  workflow: { name: string; description: string }[];
  pitfalls: { name: string; description: string }[];
  questions: string[];
  example: string;
  relatedDesigns: { id: string; reason: string }[];
  promptSnippet: string;
}

export interface DomainKnowledge {
  id: string;
  keywords: Record<Locale, string[]>;
  aliases: Record<Locale, string[]>;
  useCases: Record<Locale, string[]>;
  text: Record<Locale, DomainKnowledgeText>;
  sources: { title: string; url: string }[];
}

export const DOMAIN_KNOWLEDGE: DomainKnowledge[] = [
  ...EDUCATION_KNOWLEDGE,
  ...COMMUNITY_KNOWLEDGE,
];
