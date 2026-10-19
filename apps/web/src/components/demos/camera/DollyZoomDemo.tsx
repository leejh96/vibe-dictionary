import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export function DollyZoomDemo() {
  const { t } = useLocale();
  const [position, setPosition] = useDemoNumber(0, 0, 100, 1);
  const sceneId = useId();
  const distance = 4 + position * .08;
  const frames = [3, 9, 21, 45].map(depth => {
    const scale = 8 * distance / (distance + depth);
    return { depth, x: 132 - 17 * scale, y: 69 - 12 * scale, width: 34 * scale, height: 24 * scale };
  });
  const back = frames[frames.length - 1];

  return (
    <div className="camera-demo ca-dolly-demo">
      <svg id={sceneId} className="ca-dolly-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.camera.dollyScene')}>
        <g aria-hidden="true">
          <path className="ca-dolly-ceiling" d={`M-4 -27H268L${back.x + back.width} ${back.y}H${back.x}Z`} />
          <path className="ca-dolly-floor" d={`M-4 165H268L${back.x + back.width} ${back.y + back.height}H${back.x}Z`} />
          <path className="ca-dolly-rays" d={`M-4 -27L${back.x} ${back.y}M268 -27L${back.x + back.width} ${back.y}M-4 165L${back.x} ${back.y + back.height}M268 165L${back.x + back.width} ${back.y + back.height}`} />
          {frames.map(frame => <rect key={frame.depth} className="ca-dolly-frame" x={frame.x} y={frame.y} width={frame.width} height={frame.height} />)}
          <rect className="ca-dolly-door" x={back.x + back.width * .25} y={back.y + back.height * .2} width={back.width * .5} height={back.height * .8} />
          <g className="ca-dolly-subject">
            <ellipse className="ca-dolly-shadow" cx="132" cy="137" rx="23" ry="4" />
            <circle cx="132" cy="61" r="8" />
            <path d="M125 73Q132 70 139 73L146 96L140 99L137 87V108L145 133H136L132 114L128 133H119L127 108V87L124 99L118 96Z" />
          </g>
        </g>
      </svg>
      <div className="ca-dolly-control">
        <span aria-hidden="true">{t('demo.additions.camera.wide')}</span>
        <input type="range" min="0" max="100" step="1" value={position} aria-label={t('demo.additions.camera.dollyControl')} aria-valuetext={position === 0 ? t('demo.additions.camera.nearWide') : position === 100 ? t('demo.additions.camera.farTelephoto') : t('demo.additions.camera.dollyBetween', { value: position })} aria-controls={sceneId} onChange={event => setPosition(Number(event.currentTarget.value))} />
        <span aria-hidden="true">{t('demo.additions.camera.telephoto')}</span>
      </div>
    </div>
  );
}
