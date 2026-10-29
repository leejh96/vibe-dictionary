import type { ComponentType } from 'react';
import { EnvelopeInviteDemo, CylinderCarouselDemo, LiquidProgressDemo, GlassShatterDemo, BlackHoleDemo, InfiniteZoomDemo, InkEnsoDemo, PearlInlayDemo, ThermalViewDemo, CrtPowerOffDemo } from '../patterns/SignatureDemos';

export const SIGNATURE_DEMOS: Record<string, ComponentType> = {
  'envelope-invitation-reveal': EnvelopeInviteDemo,
  'cylinder-card-carousel': CylinderCarouselDemo,
  'liquid-wave-progress-orb': LiquidProgressDemo,
  'mg-glass-shatter-transition': GlassShatterDemo,
  'mg-black-hole-accretion-disk': BlackHoleDemo,
  'mg-infinite-zoom-frames': InfiniteZoomDemo,
  'mg-ink-wash-enso-stroke': InkEnsoDemo,
  'st-mother-of-pearl-inlay': PearlInlayDemo,
  'st-thermal-imaging-view': ThermalViewDemo,
  'vd-crt-power-off': CrtPowerOffDemo,
};
