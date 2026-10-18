import { useId, useState } from 'react';
import { ChevronLeft, ChevronRight, Frame, Music2, Paintbrush } from 'lucide-react';
import { useLocale } from '../../../i18n/LocaleContext';

const SLIDES = [{ title: 'demo.additions.layout.lightExhibition', Icon: Frame }, { title: 'demo.additions.layout.summerPerformance', Icon: Music2 }, { title: 'demo.additions.layout.weekendWorkshop', Icon: Paintbrush }] as const;

export function ManualBannerDemo() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const id = useId();
  return <div className="layout-demo"><div className="ld-banner-frame" role="group" aria-roledescription={t('demo.additions.layout.carousel')} aria-label={t('demo.additions.layout.monthPrograms')}>
    <div className="ld-banner-window"><div className="ld-banner-track" style={{ transform: `translateX(${-active * 100}%)` }} aria-live="polite" aria-atomic="false">{SLIDES.map(({ title, Icon }, index) => <div className="ld-banner-slide" data-tone={index} role="group" aria-roledescription={t('demo.additions.layout.slide')} aria-labelledby={`${id}-slide-${index}`} aria-hidden={active !== index} key={title}>
      <strong id={`${id}-slide-${index}`}>{t(title)}</strong><Icon size={36} strokeWidth={1.5} aria-hidden="true" />
    </div>)}</div></div>
    <div className="ld-banner-controls">
      <button type="button" className="ld-banner-button" aria-label={t('demo.additions.layout.previousProgram')} onClick={() => setActive(value => (value + SLIDES.length - 1) % SLIDES.length)}><ChevronLeft size={18} aria-hidden="true" /></button>
      <span className="ld-banner-dots" aria-hidden="true">{SLIDES.map((slide, index) => <span key={slide.title} data-active={active === index} />)}</span>
      <button type="button" className="ld-banner-button" aria-label={t('demo.additions.layout.nextProgram')} onClick={() => setActive(value => (value + 1) % SLIDES.length)}><ChevronRight size={18} aria-hidden="true" /></button>
    </div>
  </div></div>;
}
