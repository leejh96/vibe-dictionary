import { useLocale } from '../../../i18n/LocaleContext';

const STICKERS = [
  { transform: 'translate(38 12) rotate(-12 40 40)', color: '#fde047', path: 'M40 4L48 25L70 14L59 36L80 43L58 51L69 73L47 62L39 82L31 60L9 71L20 49L0 41L23 33L13 11L34 23Z' },
  { transform: 'translate(155 18) rotate(10 28 44)', color: '#5eead4', path: 'M33 0L5 43H26L16 87L56 32H34L45 0Z' },
  { transform: 'translate(100 65) rotate(10 36 33)', color: '#fda4af', path: 'M36 66C31 60 4 44 4 25C4 6 25 2 36 17C47 2 68 6 68 25C68 44 41 60 36 66Z' },
] as const;

export function StickerCollageDemo() {
  const { t } = useLocale();
  return (
    <div className="modern-demo">
      <svg className="md-sticker-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.modern.sticker.image')}>
        <g aria-hidden="true">
          {STICKERS.map(({ transform, color, path }) => (
            <g className="md-sticker-shape" key={color} transform={transform} strokeLinejoin="round">
              <path d={path} fill="#fff" stroke="#fff" strokeWidth={10} />
              <path d={path} fill={color} stroke="#1e1b4b" strokeWidth={1.5} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
