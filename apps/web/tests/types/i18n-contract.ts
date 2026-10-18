import { translateMessage, type Translate, type MessageKey } from '../../src/i18n/messages';

export function translationTypeContract(t: Translate) {
  t('actions.copyPrompt');
  t('search.noResults', { query: 'user text' });
  translateMessage('en', 'composer.heading', { count: 3 });
  // @ts-expect-error Unknown keys must fail rather than silently display the source text.
  t('actions.doesNotExist');
  // @ts-expect-error Required placeholder parameters cannot be omitted.
  t('search.noResults');
  // @ts-expect-error Placeholder names are checked.
  t('search.noResults', { search: 'wrong name' });
  // @ts-expect-error A parameterless message cannot accept unrelated parameters.
  t('actions.copyPrompt', { query: 'extra' });
  // @ts-expect-error Locale dictionaries must cover every key.
  const incompleteEnglish: Record<MessageKey, string> = {};
  void incompleteEnglish;
}
