import { useLocale } from '../../../i18n/LocaleContext';
import { ChevronRight } from 'lucide-react';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

const SAMPLE: JsonValue = { name: 'Vibe', theme: { dark: true, radius: 12 }, tags: ['ui', 'web'], note: null };

function JsonNode({ name, value, root = false }: { name: string; value: JsonValue; root?: boolean }) {
  const { t } = useLocale();
  if (value === null || typeof value !== 'object') {
    return <div className="pn-json-leaf"><span className="pn-json-key">{name}: </span><code data-type={value === null ? 'null' : typeof value}>{JSON.stringify(value)}</code></div>;
  }
  const array = Array.isArray(value);

  return <details className="pn-json-node" open={root}>
    <summary aria-label={root ? t('demo.additions.panel.jsonRoot') : t(array ? 'demo.additions.panel.jsonArray' : 'demo.additions.panel.jsonObject', { name })}>
      <ChevronRight size={12} aria-hidden="true" />
      <span className="pn-json-label">{name && <><span className="pn-json-key">{name}</span>: </>}{array ? '[' : '{'}<span className="pn-json-collapsed" aria-hidden="true">…{array ? ']' : '}'}</span></span>
    </summary>
    <ul className="pn-json-children">{Object.entries(value).map(([key, child]) => <li key={key}><JsonNode name={key} value={child} /></li>)}</ul>
    <span className="pn-json-close">{array ? ']' : '}'}</span>
  </details>;
}

export function JsonTreeDemo() {
  return <div className="panel-demo"><div className="pn-json-frame"><JsonNode name="" value={SAMPLE} root /></div></div>;
}
