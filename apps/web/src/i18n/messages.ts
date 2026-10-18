import type { Locale } from '@vibe-dictionary/catalog';
import { KO_MESSAGES, type MessageKey } from './messages.ko';
import { EN_MESSAGES } from './messages.en';

export type { MessageKey } from './messages.ko';
type Placeholders<S extends string> = S extends `${string}{${infer Name}}${infer Rest}` ? Name | Placeholders<Rest> : never;
export type MessageArgs<K extends MessageKey> = [Placeholders<typeof KO_MESSAGES[K]>] extends [never]
  ? [] : [params: Record<Placeholders<typeof KO_MESSAGES[K]>, string | number>];
export type Translate = <K extends MessageKey>(key: K, ...args: MessageArgs<K>) => string;

export function translateMessage<K extends MessageKey>(locale: Locale, key: K, ...args: MessageArgs<K>): string {
  const messages = locale === 'en' ? EN_MESSAGES : KO_MESSAGES;
  if (!Object.prototype.hasOwnProperty.call(messages, key)) throw new Error('Unknown translation key: ' + key);
  const params = args[0] as Record<string, string | number> | undefined;
  return messages[key].replace(/\{([a-zA-Z]\w*)\}/g, (_, name: string) => {
    if (!params || !Object.prototype.hasOwnProperty.call(params, name)) throw new Error('Missing translation parameter: ' + key + '.' + name);
    return String(params[name]);
  });
}
export const koreanTranslate: Translate = (key, ...args) => translateMessage('ko', key, ...args);
