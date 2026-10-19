import { useDemoToggle } from '../../../hooks/useDemoAutoplay';
import { useId, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUpRight, BookOpen, Bookmark, Check, ChevronDown, Flower2, Headphones, Heart, Mail } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

export function SelectableCardDemo() {
  const { t } = useLocale();
  const [selected, setSelected] = useState('personal');
  const name = useId();
  return <div className="card-demo">
    <div className="cd-plan-grid" role="radiogroup" aria-label={t('demo.additions.card.workspaceType')}>
      {([{ id: 'personal', title: 'demo.additions.card.personal', detail: 'demo.additions.card.soloWork' }, { id: 'team', title: 'demo.additions.card.team', detail: 'demo.additions.card.workTogether' }] as const).map(option => <label key={option.id} className="cd-select-card">
        <input className="cd-choice-input" type="radio" name={name} value={option.id} checked={selected === option.id} onChange={() => setSelected(option.id)} />
        <span className="cd-plan-body">
          <span className="cd-plan-mark" aria-hidden="true">{selected === option.id && <Check size={10} />}</span>
          <strong>{t(option.title)}</strong><span className="cd-detail">{t(option.detail)}</span>
        </span>
      </label>)}
    </div>
  </div>;
}

const PRODUCT_COLORS = [{ id: 'mint', label: 'demo.additions.card.mint' }, { id: 'rust', label: 'demo.additions.card.coral' }, { id: 'violet', label: 'demo.additions.card.violet' }] as const;

export function ProductSwatchDemo() {
  const { t } = useLocale();
  const [color, setColor] = useState<typeof PRODUCT_COLORS[number]>(PRODUCT_COLORS[0]);
  return <div className="card-demo">
    <div className={`cd-product-card cd-tone-${color.id}`}>
      <div className="cd-product-object" aria-hidden="true"><Headphones size={46} strokeWidth={1.6} /></div>
      <div className="cd-product-info">
        <div className="cd-product-heading"><strong>{t('demo.additions.card.orbit')}</strong><span className="cd-detail">{t(color.label)}</span></div>
        <div className="cd-swatches" role="group" aria-label={t('demo.additions.card.headphoneColors')}>
          {PRODUCT_COLORS.map(option => <button type="button" className={`cd-swatch cd-tone-${option.id}`} aria-label={t(option.label)} aria-pressed={color.id === option.id} key={option.id} onClick={() => setColor(option)}><span aria-hidden="true" /></button>)}
        </div>
      </div>
    </div>
  </div>;
}

function LandscapeArt() {
  return <svg className="cd-landscape" aria-hidden="true" viewBox="0 0 80 64"><rect width="80" height="64" fill="var(--cd-art-sky)" /><circle cx="60" cy="16" r="8" fill="var(--cd-art-sun)" /><path d="M0 50L28 20L58 55L80 34V64H0Z" fill="var(--cd-art-far)" /><path d="M0 64L37 34L68 64Z" fill="var(--cd-art-ground)" /></svg>;
}

function LandscapeCard({ effect, title }: { effect: string; title: string }) {
  return <div className="card-demo">
    <button type="button" className={`cd-image-card ${effect}`}>
      <span className="cd-image-window"><LandscapeArt /></span>
      <strong>{title}</strong><ArrowUpRight size={18} aria-hidden="true" />
    </button>
  </div>;
}

export function LiftShadowCardDemo() {
  const { t } = useLocale();
  return <LandscapeCard effect="cd-lift-card" title={t('demo.additions.card.walkJournal')} />;
}

export function ImageZoomCardDemo() {
  const { t } = useLocale();
  return <LandscapeCard effect="cd-imagezoom-card" title={t('demo.additions.card.landscapeCollection')} />;
}

export function FoldoutCardDemo() {
  const { t } = useLocale();
  const [open, setOpen] = useDemoToggle(false);
  const contentId = useId();
  return <div className="card-demo cd-fold-demo">
    <button type="button" className="cd-fold-card" aria-label={t(open ? 'demo.additions.card.foldAlbum' : 'demo.additions.card.unfoldAlbum')} aria-expanded={open} aria-controls={contentId} onClick={() => setOpen(value => !value)}>
      <span className="cd-fold-front"><BookOpen size={22} aria-hidden="true" /><strong>{t('demo.additions.card.travelAlbum')}</strong></span>
      <span className="cd-fold-page" id={contentId} role="img" aria-label={t('demo.additions.card.mountainLandscape')} aria-hidden={!open}><LandscapeArt /></span>
    </button>
  </div>;
}

export function ExpandableDetailCardDemo() {
  const { t } = useLocale();
  return <div className="card-demo">
    <details className="cd-detail-card">
      <summary><span className="cd-studio-mark"><Flower2 size={20} aria-hidden="true" /></span><strong>{t('demo.additions.card.gardenStudio')}</strong><ChevronDown className="cd-detail-chevron" size={16} aria-hidden="true" /></summary>
      <div className="cd-contact-detail"><Mail size={15} aria-hidden="true" /><span>{t('demo.additions.card.sampleEmail')}</span></div>
    </details>
  </div>;
}

export function MediaActionCardDemo() {
  const { t } = useLocale();
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  return <div className="card-demo">
    <div className="cd-media-card" role="group" aria-label={t('demo.additions.card.coastalCollection')}>
      <svg className="cd-media-scene" viewBox="0 0 280 112" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="280" height="112" fill="var(--cd-art-sky)" /><circle cx="58" cy="29" r="12" fill="var(--cd-art-sun)" /><path d="M0 56Q80 40 150 59T280 47V112H0Z" fill="var(--cd-art-far)" /><path d="M164 112Q168 80 231 75T280 66V112Z" fill="var(--cd-art-ground)" /></svg>
      <strong className="cd-media-title">{t('demo.additions.card.coastalWalk')}</strong>
      <div className="cd-media-actions">
        <button type="button" aria-label={t('demo.additions.card.saveCollection')} aria-pressed={saved} onClick={() => setSaved(value => !value)}><Bookmark size={18} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" /></button>
        <button type="button" aria-label={t('demo.additions.card.likeCollection')} aria-pressed={liked} onClick={() => setLiked(value => !value)}><Heart size={18} fill={liked ? 'currentColor' : 'none'} aria-hidden="true" /></button>
      </div>
    </div>
  </div>;
}

export function FolderPeekCardDemo() {
  const { t } = useLocale();
  return <div className="card-demo">
    <button type="button" className="cd-folder-card" aria-label={t('demo.additions.card.previewResources')}>
      <span className="cd-folder-back" aria-hidden="true" />
      <span aria-hidden="true">{[-1, 0, 1].map((side, index) => <span className="cd-folder-paper" key={side} style={{ '--paper-side': side, transitionDelay: `${index * 35}ms` } as CSSProperties}><svg viewBox="0 0 48 56"><path d="M12 16H36 M12 24H36 M12 32H29" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></span>)}</span>
      <span className="cd-folder-front"><strong>{t('demo.additions.card.resources')}</strong></span>
    </button>
  </div>;
}

export function ProfileFanCardDemo() {
  const { t } = useLocale();
  return <div className="card-demo">
    <button type="button" className="cd-profile-card" aria-label={t('demo.additions.card.teamMembers')}>
      <strong>{t('demo.additions.card.designTeam')}</strong>
      <span className="cd-avatar-row" aria-hidden="true">{([{ initial: 'demo.additions.card.minseoInitial', tone: 'rose' }, { initial: 'demo.additions.card.jiwooInitial', tone: 'sky' }, { initial: 'demo.additions.card.harinInitial', tone: 'amber' }] as const).map((member, index) => <span key={member.tone} className={`cd-avatar cd-avatar-${member.tone}`} style={{ '--avatar-side': index - 1, transitionDelay: `${index * 30}ms` } as CSSProperties}>{t(member.initial)}</span>)}</span>
    </button>
  </div>;
}
