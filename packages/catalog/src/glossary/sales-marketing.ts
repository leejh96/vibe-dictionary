import type { GlossaryTermBody } from './types';

export const SALES_MARKETING_GLOSSARY_DATA: Record<string, GlossaryTermBody> = {
  'sales-lead': {
    aliases: {
      ko: ['리드', '잠재고객', '잠재 고객', '영업 리드', '문의 리드'],
      en: ['lead', 'sales prospect', 'sales lead', 'inbound lead'],
    },
    text: {
      ko: {
        definition: '도입 문의, 자료 요청, 데모 신청 등을 통해 구매 또는 계약 가능성을 보인 개인이나 조직(잠재 고객)입니다. 이미 결제한 유료 고객이나 성사된 거래(Closed-won), 단순 연락처 명단과는 구분됩니다.',
        example: '웹사이트에서 제품 데모 신청 양식을 제출한 담당자를 영업 리드로 등록해 유입 경로와 담당자를 배정하고, 실제 유료 전환 전까지는 기존 고객 계정과 분리해 후속 상담을 진행합니다.',
        promptSnippet: '잠재 고객(Sales Lead) 접수·관리 흐름을 만들 때 마케팅·연락 수신 동의 여부, 담당자 배정, 유입 출처, 후속 접촉 이력을 함께 추적하고 유료 고객이나 단순 연락처 목록과 상태를 구분해 줘.',
      },
      en: {
        definition: 'An individual or organization that has expressed interest as a sales opportunity candidate, distinct from paying customers, closed-won deals, or an unvetted raw contact list.',
        example: 'Record someone who submits a demo request form as a sales lead with intake source and assigned owner, tracking outreach before any paid conversion occurs.',
        promptSnippet: 'Design a Sales Lead intake and tracking flow that records consent status, owner assignment, intake source, and follow-up contact history while keeping leads distinct from paying customers and raw contact lists.',
      },
    },
  },
  'customer-relationship-management': {
    aliases: {
      ko: ['CRM', '고객 관리', '고객 관계 관리', '영업 이력 관리', '고객 파이프라인'],
      en: ['CRM', 'customer relationship management', 'customer management', 'sales pipeline CRM'],
    },
    text: {
      ko: {
        definition: '잠재 고객과 기존 고객을 대상으로 상담·영업·지원 상호작용과 거래 이력을 한 흐름으로 관리하는 체계입니다. 단순 스프레드시트 목록이나 특정 상용 제품명과 동일시하지 않습니다.',
        example: '문의 접수부터 상담 메모, 제안 단계, 계약 후 지원 이력까지 고객 단위로 연결해 담당자가 바뀌어도 맥락을 이어서 응대할 수 있게 합니다.',
        promptSnippet: '고객 관계 관리(CRM) 기능을 설계할 때 접근 제어, 중복 고객 병합·방지, 개인정보(PII) 최소화, 담당자 지정, 단계·상태 관리를 포함하고 단순 표나 특정 제품 종속 구조로 두지 말아 줘.',
      },
      en: {
        definition: 'A workflow and system for managing interactions, consultations, sales stages, and support history across leads and existing customers, not synonymous with spreadsheets or any specific vendor product.',
        example: 'Link inquiry notes, consultation history, deal stages, and post-sale support records under a deduplicated account timeline with clear ownership.',
        promptSnippet: 'Architect Customer Relationship Management (CRM) workflows with role-based access control, record deduplication, PII minimization, owner assignment, and explicit status lifecycle management.',
      },
    },
  },
};
