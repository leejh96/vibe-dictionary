import { useLocale } from '../../../i18n/LocaleContext';

export function ArtDecoFrameDemo() {
  const { t } = useLocale();
  return <div className="retro-demo">
    <svg className="rt-art-deco-frame" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.retro.artDecoArtwork')}>
      <g aria-hidden="true" fill="none" stroke="#e9c06b" strokeWidth="1.5" strokeLinejoin="miter">
        <path d="M18 42H32V28H46V18H218V28H232V42H246V102H232V116H218V126H46V116H32V102H18Z" />
        <path d="M25 49H39V35H53V25H211V35H225V49H239V95H225V109H211V119H53V109H39V95H25Z" stroke="#927546" strokeWidth="1" />
        <path d="M72 96A60 60 0 0 1 192 96M72 96H192M132 96L76.6 73M132 96L89.6 53.6M132 96L109 40.6M132 96V36M132 96L155 40.6M132 96L174.4 53.6M132 96L187.4 73" />
        <path d="M132 73L145 96L132 105L119 96Z" fill="#e9c06b" />
        <path d="M46 65L52 72L46 79L40 72ZM218 65L224 72L218 79L212 72Z" />
        <path d="M95 108H113V115H151V108H169" />
      </g>
    </svg>
  </div>;
}
