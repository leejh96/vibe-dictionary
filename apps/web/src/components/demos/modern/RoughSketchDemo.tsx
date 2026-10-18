import { useLocale } from '../../../i18n/LocaleContext';

export function RoughSketchDemo() {
  const { t } = useLocale();
  return (
    <div className="modern-demo">
      <svg className="md-sketch-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.modern.sketch.image')}>
        <g aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M25 25C85 22 177 27 238 24C242 48 239 87 241 119C166 122 94 117 24 120C21 89 25 54 25 25Z" fill="var(--md-sketch-paper)" strokeWidth={1.8} />
          <path d="M23 27C83 25 178 24 240 27C238 56 242 89 239 121C166 118 94 123 22 118C25 89 21 56 23 27Z" strokeWidth={1} opacity={.5} />
          <path d="M45 49L85 50L83 90L43 88Z" fill="var(--md-sketch-accent)" fillOpacity={.1} strokeWidth={1.6} />
          <path d="M43 51L83 48L86 88L45 91Z" strokeWidth={1} opacity={.5} />
          <g stroke="var(--md-sketch-accent)">
            <path d="M52 69Q58 75 63 80Q70 65 80 58" strokeWidth={3.2} />
            <path d="M51 70Q57 76 64 79Q71 65 79 57" strokeWidth={1} opacity={.5} />
          </g>
          <path d="M104 58Q155 55 216 59M104 79Q143 82 196 78M104 101Q135 99 169 102" strokeWidth={1.8} />
          <path d="M105 60Q156 58 214 61M103 81Q145 78 194 81M105 103Q136 101 171 104" strokeWidth={.9} opacity={.45} />
        </g>
      </svg>
    </div>
  );
}
