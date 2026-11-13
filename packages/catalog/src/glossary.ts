import type { Locale } from './localization';
import { GLOSSARY_LINK_META, type GlossaryLinkMeta } from './glossary-links';
import type { GlossaryTermBody } from './glossary/types';
import { UI_GLOSSARY_DATA } from './glossary/ui';
import { ENGINEERING_GLOSSARY_DATA } from './glossary/engineering';
import { WORKFLOW_GLOSSARY_DATA } from './glossary/workflow';

export interface GlossaryTermText {
  name: string;
  definition: string;
  example: string;
  promptSnippet: string;
}

export interface GlossaryTerm extends GlossaryLinkMeta {
  aliases: Record<Locale, string[]>;
  text: Record<Locale, GlossaryTermText>;
}

const GLOSSARY_BODIES: Record<string, GlossaryTermBody> = {
  ...UI_GLOSSARY_DATA,
  ...ENGINEERING_GLOSSARY_DATA,
  ...WORKFLOW_GLOSSARY_DATA,
};

function buildGlossaryTerm(meta: GlossaryLinkMeta): GlossaryTerm {
  const body = GLOSSARY_BODIES[meta.id];
  if (!body) {
    throw new Error(`Missing glossary body data for term "${meta.id}"`);
  }
  return {
    ...meta,
    aliases: body.aliases,
    text: {
      ko: { name: meta.name.ko, ...body.text.ko },
      en: { name: meta.name.en, ...body.text.en },
    },
  };
}

export const GLOSSARY_TERMS: GlossaryTerm[] = GLOSSARY_LINK_META.map(buildGlossaryTerm);

const GLOSSARY_BY_ID = new Map<string, GlossaryTerm>(GLOSSARY_TERMS.map(term => [term.id, term]));

export function getGlossaryTerm(id: string): GlossaryTerm | undefined {
  return GLOSSARY_BY_ID.get(id);
}
