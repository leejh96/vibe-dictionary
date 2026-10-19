import { useDemoNumber } from '../../../hooks/useDemoAutoplay';
import { useId } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';
import { RotateCcw } from 'lucide-react';

export function DutchRollDemo() {
  const { t } = useLocale();
  const [roll, setRoll] = useDemoNumber(0, -25, 25, 1);
  const sceneId = useId();

  return (
    <div className="camera-demo ca-roll-demo">
      <svg id={sceneId} className="ca-roll-scene" viewBox="0 0 264 148" role="img" aria-label={t('demo.additions.camera.rollScene')}>
        <g aria-hidden="true">
          <g className="ca-roll-world" transform={`rotate(${-roll} 132 74)`}>
            <rect className="ca-roll-sky" x="-60" y="-118" width="384" height="384" />
            <circle className="ca-roll-sun" cx="175" cy="36" r="15" />
            <rect className="ca-roll-ground" x="-60" y="84" width="384" height="182" />
            <path className="ca-roll-road" d="M125 84H139L250 266H14Z" />
            <path className="ca-roll-city" d="M54 84V35H70V27H88V84H100V43H127V84H150V35H174V84H190V54H214V84Z" />
            <path className="ca-roll-windows" d="M64 42H78M64 54H78M64 66H78M108 54H119M108 66H119M157 47H167M157 59H167M157 71H167M197 66H207" />
            <path className="ca-roll-horizon" d="M-60 84H324" />
          </g>
          <path className="ca-roll-viewfinder" d="M12 24V12H24M240 12H252V24M12 124V136H24M240 136H252V124" />
        </g>
      </svg>
      <div className="ca-roll-control">
        <input type="range" min="-25" max="25" step="1" value={roll} aria-label={t('demo.additions.camera.rollControl')} aria-valuetext={roll === 0 ? t('demo.additions.camera.rollLevel') : t(roll < 0 ? 'demo.additions.camera.leftDegrees' : 'demo.additions.camera.rightDegrees', { value: Math.abs(roll) })} aria-controls={sceneId} onChange={event => setRoll(Number(event.currentTarget.value))} />
        <button type="button" aria-label={t('demo.additions.camera.restoreLevel')} aria-controls={sceneId} aria-disabled={roll === 0} onClick={() => { if (roll !== 0) setRoll(0); }}><RotateCcw size={18} aria-hidden="true" /></button>
      </div>
    </div>
  );
}
