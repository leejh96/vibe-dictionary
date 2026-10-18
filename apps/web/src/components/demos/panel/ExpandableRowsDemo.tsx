import { useLocale } from '../../../i18n/LocaleContext';
import { Fragment, useId, useState } from 'react';
import { ChevronRight } from 'lucide-react';

const ASSETS = [
  { id: 'cover', name: 'demo.additions.panel.cover', format: 'demo.additions.panel.svg', width: 1440, height: 900 },
  { id: 'poster', name: 'demo.additions.panel.poster', format: 'demo.additions.panel.png', width: 1080, height: 1920 },
] as const;

export function ExpandableRowsDemo() {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState([true, false]);
  const id = useId();

  return <div className="panel-demo">
    <div className="pn-table-frame">
      <table className="pn-expand-table" aria-label={t('demo.additions.panel.fileDetails')}>
        <thead><tr><th scope="col">{t('demo.additions.panel.file')}</th><th scope="col">{t('demo.additions.panel.format')}</th></tr></thead>
        <tbody>{ASSETS.map((asset, index) => <Fragment key={asset.id}>
          <tr>
            <th scope="row"><button className="pn-expand-toggle" type="button" aria-label={t('demo.additions.panel.assetDetails', { name: t(asset.name) })} aria-expanded={expanded[index]} aria-controls={`${id}-${asset.id}`} onClick={() => setExpanded(previous => previous.map((open, row) => row === index ? !open : open))}>
              <ChevronRight size={16} aria-hidden="true" />{t(asset.name)}
            </button></th>
            <td>{t(asset.format)}</td>
          </tr>
          <tr id={`${id}-${asset.id}`} hidden={!expanded[index]}>
            <td className="pn-expand-detail" colSpan={2}><dl>
              <div><dt>{t('demo.additions.panel.width')}</dt><dd>{t('demo.additions.panel.pixelValue', { value: asset.width })}</dd></div>
              <div><dt>{t('demo.additions.panel.height')}</dt><dd>{t('demo.additions.panel.pixelValue', { value: asset.height })}</dd></div>
            </dl></td>
          </tr>
        </Fragment>)}</tbody>
      </table>
    </div>
  </div>;
}
