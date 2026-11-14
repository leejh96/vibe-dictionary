import type { Locale } from './localization';

export const GLOSSARY_CATEGORIES = [
  'ui',
  'engineering',
  'workflow',
  'customer-support',
  'payments-settlement',
  'product-planning',
  'business-operations',
  'sales-marketing',
  'education-operations',
] as const;
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
  // UI (11)
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
  {
    id: 'call-to-action',
    name: { ko: '행동 유도(CTA)', en: 'Call to Action (CTA)' },
    category: 'ui',
    relatedTechniqueIds: ['morphing-state-button', 'split-action-button', 'liquid-slide-fill'],
    relatedDomainIds: ['commerce-order-inventory-and-refund', 'event-registration-ticket-and-checkin'],
  },
  {
    id: 'floating-action-button',
    name: { ko: '플로팅 액션 버튼(FAB)', en: 'Floating Action Button (FAB)' },
    category: 'ui',
    relatedTechniqueIds: ['gooey-menu-fab', 'ly-radial-pie-menu'],
    relatedDomainIds: [],
  },
  {
    id: 'safe-area',
    name: { ko: '안전 영역', en: 'Safe Area' },
    category: 'ui',
    relatedTechniqueIds: ['ly-bottom-destination-nav', 'ly-bottom-sheet', 'ly-dynamic-island-nav'],
    relatedDomainIds: [],
  },

  // Engineering (14)
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
  {
    id: 'http-live-streaming',
    name: { ko: 'HTTP 라이브 스트리밍(HLS)', en: 'HTTP Live Streaming (HLS)' },
    category: 'engineering',
    relatedTechniqueIds: [],
    relatedDomainIds: ['education-live-session-attendance-and-replay', 'file-upload-processing-and-access-control'],
  },
  {
    id: 'content-delivery-network',
    name: { ko: '콘텐츠 전송 네트워크(CDN)', en: 'Content Delivery Network (CDN)' },
    category: 'engineering',
    relatedTechniqueIds: [],
    relatedDomainIds: ['file-external-share-link-password-and-expiry', 'cms-publishing-schedule-and-versioning'],
  },
  {
    id: 'content-management-system',
    name: { ko: '콘텐츠 관리 시스템(CMS)', en: 'Content Management System (CMS)' },
    category: 'engineering',
    relatedTechniqueIds: ['ly-context-code-diff', 'inline-edit-field'],
    relatedDomainIds: [
      'cms-publishing-schedule-and-versioning',
      'cms-category-taxonomy-and-navigation-order',
      'cms-localization-translation-sync-and-fallback',
    ],
  },
  {
    id: 'supervised-learning',
    name: { ko: '지도 학습', en: 'Supervised Learning' },
    category: 'engineering',
    relatedTechniqueIds: ['ly-transposable-comparison-matrix', 'ly-heatmap-grid'],
    relatedDomainIds: ['automation-batch-import-validation-and-rollback', 'analytics-goal-target-pro-rata-and-forecast'],
  },
  {
    id: 'unsupervised-learning',
    name: { ko: '비지도 학습', en: 'Unsupervised Learning' },
    category: 'engineering',
    relatedTechniqueIds: ['ly-heatmap-grid', 'mg-particle-network'],
    relatedDomainIds: ['analytics-anomaly-threshold-alert-and-mute'],
  },
  {
    id: 'reinforcement-learning',
    name: { ko: '강화 학습', en: 'Reinforcement Learning' },
    category: 'engineering',
    relatedTechniqueIds: ['vd-node-flow-pipeline', 'ly-vertical-journey-rail'],
    relatedDomainIds: ['ai-agent-state-memory-and-branching'],
  },

  // Workflow and business domain operations (17)
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
    category: 'customer-support',
    relatedTechniqueIds: ['ly-sortable-data-table', 'faceted-filter-chips'],
    relatedDomainIds: ['support-sla-priority-and-escalation', 'support-ticket-routing-and-resolution'],
  },
  {
    id: 'know-your-customer',
    name: { ko: '고객 확인 절차 (KYC)', en: 'Know Your Customer (KYC)' },
    category: 'payments-settlement',
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
    category: 'payments-settlement',
    relatedTechniqueIds: ['hold-to-confirm-ring', 'horizontal-milestone-rail'],
    relatedDomainIds: ['marketplace-escrow-settlement-and-dispute', 'marketplace-quote-custom-offer-and-milestone'],
  },
  {
    id: 'proration',
    name: { ko: '일할 계산', en: 'Proration' },
    category: 'payments-settlement',
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
  {
    id: 'voice-of-customer',
    name: { ko: '고객의 소리(VOC)', en: 'Voice of Customer (VOC)' },
    category: 'customer-support',
    relatedTechniqueIds: ['character-budget-feedback', 'sentiment-radio-segments'],
    relatedDomainIds: ['support-csat-survey-and-quality-review', 'support-ticket-routing-and-resolution'],
  },
  {
    id: 'net-promoter-score',
    name: { ko: '순추천지수(NPS)', en: 'Net Promoter Score (NPS)' },
    category: 'product-planning',
    relatedTechniqueIds: ['vd-diverging-bar-reveal'],
    relatedDomainIds: ['support-csat-survey-and-quality-review', 'automation-survey-anonymity-quota-and-duplicate-response'],
  },
  {
    id: 'active-users',
    name: { ko: '활성 사용자', en: 'Active Users' },
    category: 'product-planning',
    relatedTechniqueIds: ['vd-kpi-counter-explosion', 'ly-overview-detail-chart'],
    relatedDomainIds: ['analytics-metric-aggregation-and-export', 'analytics-funnel-cohort-and-attribution-window'],
  },
  {
    id: 'objectives-and-key-results',
    name: { ko: '목표와 핵심 결과(OKR)', en: 'Objectives and Key Results (OKR)' },
    category: 'business-operations',
    relatedTechniqueIds: ['vd-bullet-target-comparison', 'horizontal-milestone-rail'],
    relatedDomainIds: ['analytics-goal-target-pro-rata-and-forecast', 'workspace-dependency-subtask-and-milestone'],
  },
  {
    id: 'learning-management-system',
    name: { ko: '학습 관리 시스템(LMS)', en: 'Learning Management System (LMS)' },
    category: 'education-operations',
    relatedTechniqueIds: ['onboarding-progress-checklist', 'vertical-rail-tabs'],
    relatedDomainIds: [
      'coding-lesson-objectives-and-practice',
      'education-curriculum-prerequisite-and-cohort',
      'education-exam-timer-grading-and-appeal',
    ],
  },
  {
    id: 'sales-lead',
    name: { ko: '잠재 고객', en: 'Sales Lead' },
    category: 'sales-marketing',
    relatedTechniqueIds: ['ly-kanban-board', 'inline-email-validation'],
    relatedDomainIds: ['notification-scheduled-campaign-and-unsubscribe', 'automation-form-branching-validation-and-partial-save'],
  },
  {
    id: 'customer-relationship-management',
    name: { ko: '고객 관계 관리(CRM)', en: 'Customer Relationship Management (CRM)' },
    category: 'sales-marketing',
    relatedTechniqueIds: ['ly-master-detail-split', 'ly-activity-timeline'],
    relatedDomainIds: ['support-canned-response-and-merge-tickets', 'workspace-template-custom-field-and-archiving'],
  },
  {
    id: 'account-deactivation',
    name: { ko: '계정 비활성화', en: 'Account Deactivation' },
    category: 'workflow',
    relatedTechniqueIds: ['inline-delete-confirmation', 'undo-delete-snackbar'],
    relatedDomainIds: ['account-dormancy-lockout-and-reactivation', 'subscription-seat-license-and-member-change'],
  },
  {
    id: 'curriculum-alignment',
    name: { ko: '교육과정 연계', en: 'Curriculum Alignment' },
    category: 'education-operations',
    relatedTechniqueIds: ['ly-dual-list-transfer', 'ly-transposable-comparison-matrix'],
    relatedDomainIds: ['education-curriculum-prerequisite-and-cohort', 'coding-lesson-objectives-and-practice'],
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
