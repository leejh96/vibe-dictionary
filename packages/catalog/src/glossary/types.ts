import type { Locale } from '../localization';

export interface GlossaryTermBodyText {
  definition: string;
  example: string;
  promptSnippet: string;
}

export interface GlossaryTermBody {
  aliases: Record<Locale, string[]>;
  text: Record<Locale, GlossaryTermBodyText>;
}
