import type { ComponentType } from 'react';
import { WordHighlightSubtitlesDemo } from './WordHighlightSubtitlesDemo';
import { EndCreditRollDemo } from './EndCreditRollDemo';
import { GreenDifferenceKeyDemo } from './GreenDifferenceKeyDemo';
import { CornerPictureInPictureDemo } from './CornerPictureInPictureDemo';
import { BroadcastColorBarsDemo } from './BroadcastColorBarsDemo';
import { DipToBlackDemo } from './DipToBlackDemo';
import { FaceBlurMaskDemo } from './FaceBlurMaskDemo';
import { CinematicLetterboxDemo } from './CinematicLetterboxDemo';
import { AlphaChannelViewDemo } from './AlphaChannelViewDemo';
import { FreezeFrameHoldDemo } from './FreezeFrameHoldDemo';

export const BROADCAST_ADDITION_DEMOS: Record<string, ComponentType> = {
  'vd-word-highlight-subtitles': WordHighlightSubtitlesDemo,
  'vd-end-credit-roll': EndCreditRollDemo,
  'vd-green-difference-key': GreenDifferenceKeyDemo,
  'vd-corner-picture-in-picture': CornerPictureInPictureDemo,
  'vd-broadcast-color-bars': BroadcastColorBarsDemo,
  'vd-dip-to-black': DipToBlackDemo,
  'vd-face-blur-mask': FaceBlurMaskDemo,
  'vd-cinematic-letterbox': CinematicLetterboxDemo,
  'vd-alpha-channel-view': AlphaChannelViewDemo,
  'vd-freeze-frame-hold': FreezeFrameHoldDemo,
};
