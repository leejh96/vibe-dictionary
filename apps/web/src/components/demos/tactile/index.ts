import type { ComponentType } from 'react';
import { PlainWeaveDemo } from './PlainWeaveDemo';
import { KnotWoodDemo } from './KnotWoodDemo';
import { BrushedMetalDemo } from './BrushedMetalDemo';
import { PebbledLeatherDemo } from './PebbledLeatherDemo';
import { TerrazzoDemo } from './TerrazzoDemo';
import { CorrugatedCardboardDemo } from './CorrugatedCardboardDemo';
import { CrackleCeramicDemo } from './CrackleCeramicDemo';
import { MarbleVeinDemo } from './MarbleVeinDemo';
import { WoolFeltDemo } from './WoolFeltDemo';
import { StockinetteKnitDemo } from './StockinetteKnitDemo';

export const TACTILE_ADDITION_DEMOS: Record<string, ComponentType> = {
  'st-stockinette-knit-surface': StockinetteKnitDemo,
  'st-compressed-wool-felt': WoolFeltDemo,
  'st-white-marble-veining': MarbleVeinDemo,
  'st-crackle-ceramic-glaze': CrackleCeramicDemo,
  'st-corrugated-cardboard': CorrugatedCardboardDemo,
  'st-terrazzo-aggregate-surface': TerrazzoDemo,
  'st-pebbled-leather': PebbledLeatherDemo,
  'st-brushed-metal-surface': BrushedMetalDemo,
  'st-knotty-wood-grain': KnotWoodDemo,
  'st-plain-weave-textile': PlainWeaveDemo,
};
