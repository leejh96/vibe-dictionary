import type { Locale } from './localization';

export const GLOSSARY_CATEGORIES = ['ui', 'engineering', 'workflow'] as const;
export type GlossaryCategory = typeof GLOSSARY_CATEGORIES[number];

export interface GlossaryLinkRef {
  id: string;
  name: Record<Locale, string>;
  category: GlossaryCategory;
}

export interface GlossaryLinkMeta extends GlossaryLinkRef {
  relatedTechniqueIds: string[];
  relatedDomainIds: string[];
}

export const GLOSSARY_LINK_META: GlossaryLinkMeta[] = [
  // UI (8)
  {
    id: 'skeleton-loading',
    name: { ko: '스켈레톤 로딩', en: 'Skeleton Loading' },
    category: 'ui',
    relatedTechniqueIds: ['stable-skeleton-content', 'skeleton-shimmer'],
    relatedDomainIds: ['file-upload-processing-and-access-control', 'analytics-metric-aggregation-and-export'],
  },
  {
    id: 'empty-state',
    name: { ko: '빈 상태', en: 'Empty State' },
    category: 'ui',
    relatedTechniqueIds: ['recoverable-search-empty-state'],
    relatedDomainIds: ['workspace-task-assignment-and-status', 'analytics-metric-aggregation-and-export'],
  },
  {
    id: 'inline-validation',
    name: { ko: '인라인 유효성 검증', en: 'Inline Validation' },
    category: 'ui',
    relatedTechniqueIds: ['inline-email-validation', 'linked-form-error-summary', 'character-budget-feedback'],
    relatedDomainIds: ['account-auth-recovery-and-deletion', 'automation-form-branching-validation-and-partial-save'],
  },
  {
    id: 'progressive-disclosure',
    name: { ko: '점진적 공개', en: 'Progressive Disclosure' },
    category: 'ui',
    relatedTechniqueIds: ['smooth-accordion', 'inline-footnote-disclosure', 'ly-expandable-data-rows'],
    relatedDomainIds: ['automation-form-branching-validation-and-partial-save', 'support-faq-self-service-and-deflection'],
  },
  {
    id: 'toast-and-snackbar',
    name: { ko: '토스트와 스낵바', en: 'Toast and Snackbar' },
    category: 'ui',
    relatedTechniqueIds: ['toast-slide-stack', 'undo-delete-snackbar', 'dismissible-inline-banner'],
    relatedDomainIds: ['notification-channels-preferences-and-read-state'],
  },
  {
    id: 'command-palette',
    name: { ko: '커맨드 팔레트', en: 'Command Palette' },
    category: 'ui',
    relatedTechniqueIds: ['ly-command-palette', 'ai-slash-command', 'manual-search-combobox'],
    relatedDomainIds: ['workspace-task-assignment-and-status', 'support-canned-response-and-merge-tickets'],
  },
  {
    id: 'focus-trap',
    name: { ko: '포커스 트랩', en: 'Focus Trap' },
    category: 'ui',
    relatedTechniqueIds: ['lay-bottom-sheet-modal', 'spotlight-focus', 'spring-bounce-modal'],
    relatedDomainIds: ['account-mfa-stepup-and-backup-codes'],
  },
  {
    id: 'virtual-scrolling',
    name: { ko: '가상 스크롤', en: 'Virtual Scrolling' },
    category: 'ui',
    relatedTechniqueIds: ['ly-fixed-row-virtual-scroll', 'ly-prepend-scroll-anchor'],
    relatedDomainIds: ['notification-chat-room-delivery-and-recall', 'analytics-metric-aggregation-and-export'],
  },

  // Engineering (8)
  {
    id: 'debounce',
    name: { ko: '디바운스', en: 'Debounce' },
    category: 'engineering',
    relatedTechniqueIds: ['manual-search-combobox', 'recoverable-search-empty-state', 'search-match-highlight'],
    relatedDomainIds: ['support-faq-self-service-and-deflection'],
  },
  {
    id: 'optimistic-update',
    name: { ko: '낙관적 업데이트', en: 'Optimistic Update' },
    category: 'engineering',
    relatedTechniqueIds: ['toggle-reaction-picker', 'heart-like-burst', 'dirty-note-save-state'],
    relatedDomainIds: ['community-comment-thread-mention-and-reaction', 'workspace-task-assignment-and-status'],
  },
  {
    id: 'idempotency',
    name: { ko: '멱등성', en: 'Idempotency' },
    category: 'engineering',
    relatedTechniqueIds: [],
    relatedDomainIds: [
      'fintech-wallet-ledger-idempotency-and-hold',
      'automation-webhook-retry-dead-letter-and-replay',
      'notification-channels-preferences-and-read-state',
    ],
  },
  {
    id: 'role-based-access-control',
    name: { ko: '역할 기반 접근 제어 (RBAC)', en: 'Role-Based Access Control (RBAC)' },
    category: 'engineering',
    relatedTechniqueIds: ['ly-workspace-switcher', 'ly-column-visibility-table'],
    relatedDomainIds: [
      'security-rbac-role-assignment-and-least-privilege',
      'community-post-visibility-and-moderation',
      'account-organization-switch-and-membership',
    ],
  },
  {
    id: 'server-sent-events',
    name: { ko: '서버 전송 이벤트 (SSE)', en: 'Server-Sent Events (SSE)' },
    category: 'engineering',
    relatedTechniqueIds: ['ai-streaming-text', 'ui-ai-streaming-pulse'],
    relatedDomainIds: ['ai-streaming-response-and-reconnection', 'notification-chat-room-delivery-and-recall'],
  },
  {
    id: 'retrieval-augmented-generation',
    name: { ko: '검색 증강 생성 (RAG)', en: 'Retrieval-Augmented Generation (RAG)' },
    category: 'engineering',
    relatedTechniqueIds: ['ai-source-citation', 'ai-context-pill'],
    relatedDomainIds: ['ai-rag-retrieval-and-source-attribution', 'ai-prompt-context-and-token-budget'],
  },
  {
    id: 'dead-letter-queue',
    name: { ko: '데드 레터 큐 (DLQ)', en: 'Dead-Letter Queue (DLQ)' },
    category: 'engineering',
    relatedTechniqueIds: ['ly-collapsible-run-log'],
    relatedDomainIds: ['automation-webhook-retry-dead-letter-and-replay', 'subscription-invoice-tax-and-payment-retry'],
  },
  {
    id: 'audit-log',
    name: { ko: '감사 로그', en: 'Audit Log' },
    category: 'engineering',
    relatedTechniqueIds: ['ly-activity-timeline', 'ly-context-code-diff'],
    relatedDomainIds: ['security-audit-log-retention-and-tamper-evidence', 'file-version-replacement-and-download-audit'],
  },

  // Workflow (8)
  {
    id: 'human-in-the-loop',
    name: { ko: '인간 개입 승인 (HITL)', en: 'Human-in-the-Loop (HITL)' },
    category: 'workflow',
    relatedTechniqueIds: ['ai-human-in-the-loop', 'ai-tool-call-card'],
    relatedDomainIds: ['ai-tool-calling-and-human-approval', 'security-approval-maker-checker-and-breakglass'],
  },
  {
    id: 'service-level-agreement',
    name: { ko: '서비스 수준 협약 (SLA)', en: 'Service-Level Agreement (SLA)' },
    category: 'workflow',
    relatedTechniqueIds: ['ly-sortable-data-table', 'faceted-filter-chips'],
    relatedDomainIds: ['support-sla-priority-and-escalation', 'support-ticket-routing-and-resolution'],
  },
  {
    id: 'know-your-customer',
    name: { ko: '고객 확인 절차 (KYC)', en: 'Know Your Customer (KYC)' },
    category: 'workflow',
    relatedTechniqueIds: ['onboarding-progress-checklist', 'linked-form-error-summary'],
    relatedDomainIds: ['fintech-limit-tier-kyc-and-aml-review', 'marketplace-seller-onboarding-kyc-and-payout-account'],
  },
  {
    id: 'user-onboarding',
    name: { ko: '사용자 온보딩', en: 'User Onboarding' },
    category: 'workflow',
    relatedTechniqueIds: ['onboarding-progress-checklist', 'horizontal-milestone-rail'],
    relatedDomainIds: ['marketplace-seller-onboarding-kyc-and-payout-account', 'coding-lesson-objectives-and-practice'],
  },
  {
    id: 'escrow-settlement',
    name: { ko: '에스크로 정산', en: 'Escrow Settlement' },
    category: 'workflow',
    relatedTechniqueIds: ['hold-to-confirm-ring', 'horizontal-milestone-rail'],
    relatedDomainIds: ['marketplace-escrow-settlement-and-dispute', 'marketplace-quote-custom-offer-and-milestone'],
  },
  {
    id: 'proration',
    name: { ko: '일할 계산', en: 'Proration' },
    category: 'workflow',
    relatedTechniqueIds: ['billing-cycle-pricing-card'],
    relatedDomainIds: ['subscription-plan-entitlement-and-billing', 'subscription-seat-license-and-member-change'],
  },
  {
    id: 'grace-period',
    name: { ko: '유예 기간', en: 'Grace Period' },
    category: 'workflow',
    relatedTechniqueIds: ['dismissible-inline-banner', 'sticky-announcement-banner'],
    relatedDomainIds: [
      'subscription-plan-entitlement-and-billing',
      'account-auth-recovery-and-deletion',
      'security-api-key-webhook-and-secret-rotation',
    ],
  },
  {
    id: 'maker-checker-approval',
    name: { ko: '이중 승인 (메이커-체커)', en: 'Dual-Control Approval (Maker-Checker)' },
    category: 'workflow',
    relatedTechniqueIds: ['inline-delete-confirmation', 'ly-activity-timeline'],
    relatedDomainIds: [
      'security-approval-maker-checker-and-breakglass',
      'workspace-approval-stage-and-signoff',
      'recruiting-offer-approval-and-expiration',
    ],
  },
];

function toLinkRef({ id, name, category }: GlossaryLinkMeta): GlossaryLinkRef {
  return { id, name, category };
}

export function getGlossaryLinksForTechnique(techniqueId: string, max = 2): GlossaryLinkRef[] {
  if (max <= 0 || !Number.isFinite(max)) return [];
  return GLOSSARY_LINK_META
    .filter(meta => meta.relatedTechniqueIds.includes(techniqueId))
    .slice(0, Math.floor(max))
    .map(toLinkRef);
}

export function getGlossaryLinksForDomain(domainId: string, max = 2): GlossaryLinkRef[] {
  if (max <= 0 || !Number.isFinite(max)) return [];
  return GLOSSARY_LINK_META
    .filter(meta => meta.relatedDomainIds.includes(domainId))
    .slice(0, Math.floor(max))
    .map(toLinkRef);
}
