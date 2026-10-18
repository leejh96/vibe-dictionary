import type { ComponentType } from 'react';
import { MemphisPatternDemo } from './MemphisPatternDemo';
import { ArtDecoFrameDemo } from './ArtDecoFrameDemo';
import { RisographPrintDemo } from './RisographPrintDemo';
import { SevenSegmentLedDemo } from './SevenSegmentLedDemo';
import { LinocutBotanicalDemo } from './LinocutBotanicalDemo';
import { ArtNouveauWhiplashDemo } from './ArtNouveauWhiplashDemo';
import { ConstructivistPosterDemo } from './ConstructivistPosterDemo';
import { StencilBridgeLetteringDemo } from './StencilBridgeLetteringDemo';
import { PsychedelicSwellDemo } from './PsychedelicSwellDemo';
import { CyanotypePhotogramDemo } from './CyanotypePhotogramDemo';

export const RETRO_ADDITION_DEMOS: Record<string, ComponentType> = {
  'st-memphis-geometric-pattern': MemphisPatternDemo,
  'st-art-deco-sunburst-frame': ArtDecoFrameDemo,
  'st-risograph-ink-registration': RisographPrintDemo,
  'st-seven-segment-led': SevenSegmentLedDemo,
  'st-linocut-carved-botanical': LinocutBotanicalDemo,
  'st-art-nouveau-whiplash-ornament': ArtNouveauWhiplashDemo,
  'st-constructivist-diagonal-poster': ConstructivistPosterDemo,
  'st-stencil-bridge-lettering': StencilBridgeLetteringDemo,
  'st-psychedelic-swell-lettering': PsychedelicSwellDemo,
  'st-cyanotype-contact-photogram': CyanotypePhotogramDemo,
};
