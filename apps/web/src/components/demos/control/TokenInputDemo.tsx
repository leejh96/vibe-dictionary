import { useId, useRef, useState } from 'react';
import { Plus, Tag, X } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const INITIAL_TAGS = [
  { id: 'sample-ui', labelKey: 'demo.additions.control.uiSample' },
  { id: 'sample-motion', labelKey: 'demo.additions.control.motionSample' },
] as const;
type Token = string | typeof INITIAL_TAGS[number];

export function TokenInputDemo() {
  const { t } = useLocale();
  const [tags, setTags] = useState<Token[]>([...INITIAL_TAGS]);
  const [draft, setDraft] = useState('');
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const label = (tag: Token) => typeof tag === 'string' ? tag : t(tag.labelKey);
  const add = () => {
    const tag = draft.trim();
    if (!tag) return;
    setTags(current => current.some(item => label(item) === tag) ? current : [...current, tag]);
    setDraft('');
    input.current?.focus();
  };
  return <div className="control-demo"><div className="ct-token-frame">
    <label className="ct-control-label" htmlFor={id}><Tag size={16} aria-hidden="true" />{t('demo.additions.control.tags')}</label>
    <div className="ct-token-content">
      <ul className="ct-token-list" aria-label={t('demo.additions.control.addedTags')} hidden={tags.length === 0}>{tags.map(tag => <li className="ct-token" key={typeof tag === 'string' ? `user-${tag}` : tag.id}>
        <span>{label(tag)}</span><button type="button" className="ct-icon-button ct-token-remove" aria-label={t('demo.additions.control.removeTag', { name: label(tag) })} onClick={() => { setTags(current => current.filter(item => item !== tag)); input.current?.focus(); }}><X size={16} aria-hidden="true" /></button>
      </li>)}</ul>
      <div className="ct-token-editor">
        <input className="ct-token-input" ref={input} id={id} value={draft} placeholder={t('demo.additions.control.newTag')} onChange={event => setDraft(event.target.value)} onKeyDown={event => {
          if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;
          event.preventDefault();
          add();
        }} />
        <button type="button" className="ct-icon-button" aria-label={t('demo.additions.control.addTag')} aria-disabled={!draft.trim()} onClick={add}><Plus size={18} aria-hidden="true" /></button>
      </div>
    </div>
  </div></div>;
}
