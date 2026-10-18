import { useLocale } from '../../../i18n/LocaleContext';
import { useState } from 'react';

export function CinemagraphDemo() {
  const { t } = useLocale();
  const [paused, setPaused] = useState(false);

  return (
    <div className="promo-demo">
      <button type="button" className="pr-cine-button" aria-label={t('demo.additions.promo.cine.pause')} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        <svg className="pr-cine-scene" viewBox="0 0 264 148" aria-hidden="true">
          <path className="pr-cine-arch" d="M62 148V77A70 70 0 0 1 202 77V148Z" />
          <ellipse className="pr-cine-ground" cx="132" cy="130" rx="72" ry="8" />
          <g className="pr-cine-still">
            <ellipse className="pr-cine-plinth" cx="132" cy="125" rx="50" ry="9" />
            <path className="pr-cine-jar" d="M100 77V117C100 132 164 132 164 117V77Z" />
            <path className="pr-cine-jar-edge" d="M105 87V116M159 87V116" />
            <ellipse className="pr-cine-wax" cx="132" cy="77" rx="32" ry="8" />
            <ellipse className="pr-cine-wax-pool" cx="132" cy="77" rx="17" ry="4" />
            <path className="pr-cine-wick" d="M132 77V69" />
            <path className="pr-cine-leaf" d="M128 109C114 106 115 94 128 95C141 93 146 84 146 84C147 100 144 112 128 109Z" />
            <path className="pr-cine-leaf-vein" d="M122 104L142 91" />
          </g>
          <g className="pr-cine-flame" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
            <path className="pr-cine-halo" d="M132 72C108 60 113 41 130 24C125 44 154 48 145 64Q141 73 132 72Z" />
            <path className="pr-cine-fire" d="M132 72C117 64 119 48 130 32C128 47 146 51 141 64Q138 72 132 72Z" />
            <path className="pr-cine-core" d="M132 72C125 67 127 59 131 54C132 62 138 63 136 68Q135 72 132 72Z" />
          </g>
        </svg>
      </button>
    </div>
  );
}
