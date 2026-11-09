import type { Locale } from './localization';
import { EDUCATION_KNOWLEDGE } from './domain-knowledge/education';
import { COMMUNITY_KNOWLEDGE } from './domain-knowledge/community';
import { COMMERCE_KNOWLEDGE } from './domain-knowledge/commerce';
import { BOOKING_KNOWLEDGE } from './domain-knowledge/booking';
import { SUBSCRIPTION_KNOWLEDGE } from './domain-knowledge/subscription';
import { COLLABORATION_KNOWLEDGE } from './domain-knowledge/collaboration';
import { SUPPORT_KNOWLEDGE } from './domain-knowledge/support';
import { ACCOUNT_KNOWLEDGE } from './domain-knowledge/account';
import { NOTIFICATION_KNOWLEDGE } from './domain-knowledge/notification';
import { PUBLISHING_KNOWLEDGE } from './domain-knowledge/publishing';
import { MEDIA_KNOWLEDGE } from './domain-knowledge/media';
import { MARKETPLACE_KNOWLEDGE } from './domain-knowledge/marketplace';
import { EVENT_KNOWLEDGE } from './domain-knowledge/event';
import { RECRUITING_KNOWLEDGE } from './domain-knowledge/recruiting';
import { ANALYTICS_KNOWLEDGE } from './domain-knowledge/analytics';
import { SECURITY_KNOWLEDGE } from './domain-knowledge/security';
import { LOGISTICS_KNOWLEDGE } from './domain-knowledge/logistics';
import { FINTECH_KNOWLEDGE } from './domain-knowledge/fintech';
import { HEALTHCARE_KNOWLEDGE } from './domain-knowledge/healthcare';
import { AUTOMATION_KNOWLEDGE } from './domain-knowledge/automation';
import { AI_KNOWLEDGE } from './domain-knowledge/ai';

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
  ...COMMERCE_KNOWLEDGE,
  ...BOOKING_KNOWLEDGE,
  ...SUBSCRIPTION_KNOWLEDGE,
  ...COLLABORATION_KNOWLEDGE,
  ...SUPPORT_KNOWLEDGE,
  ...ACCOUNT_KNOWLEDGE,
  ...NOTIFICATION_KNOWLEDGE,
  ...PUBLISHING_KNOWLEDGE,
  ...MEDIA_KNOWLEDGE,
  ...MARKETPLACE_KNOWLEDGE,
  ...EVENT_KNOWLEDGE,
  ...RECRUITING_KNOWLEDGE,
  ...ANALYTICS_KNOWLEDGE,
  ...SECURITY_KNOWLEDGE,
  ...LOGISTICS_KNOWLEDGE,
  ...FINTECH_KNOWLEDGE,
  ...HEALTHCARE_KNOWLEDGE,
  ...AUTOMATION_KNOWLEDGE,
  ...AI_KNOWLEDGE,
];
