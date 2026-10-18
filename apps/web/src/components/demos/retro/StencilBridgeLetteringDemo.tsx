import { useLocale } from '../../../i18n/LocaleContext';

export function StencilBridgeLetteringDemo() {
  const { t } = useLocale();
  return <div className="retro-demo">
    <svg className="rt-stencil-art" viewBox="0 0 264 144" role="img" aria-label={t('demo.additions.retro.stencilArtwork')}>
      <g aria-hidden="true" fill="#354b40">
        <path d="M28 29H236V115H28Z M30 31V113H234V31Z" fillRule="evenodd" />
        <path d="M40 43H52V101H40Z M56 43H64C78 43 83 50 83 58C83 66 79 70 73 72C81 74 85 79 85 87C85 96 78 101 66 101H56V90H65C70 90 73 88 73 85C73 82 70 80 65 80H56V68H63C69 68 71 65 71 61C71 57 68 54 63 54H56Z" />
        <path d="M111 42C98 42 92 52 92 72C92 92 98 102 111 102V90C106 90 104 85 104 72C104 59 106 54 111 54Z M115 42C128 42 134 52 134 72C134 92 128 102 115 102V90C120 90 122 85 122 72C122 59 120 54 115 54Z" />
        <path d="M144 43H156V89H176V101H144Z" />
        <path d="M185 43H197V101H185Z M201 43H205C221 43 229 53 229 72C229 91 221 101 205 101H201V89H205C213 89 217 84 217 72C217 60 213 55 205 55H201Z" />
      </g>
    </svg>
  </div>;
}
