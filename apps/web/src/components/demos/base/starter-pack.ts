import type { ComponentType } from 'react';
import {
  AiStreamingDemo,
  ParticleBurstDemo,
  AmbientAuroraDemo,
  BottomSheetDemo,
  SwipeToConfirmDemo,
  CliCommandSwitcherDemo,
  InteractiveKbdDemo,
  TearOffCouponDemo,
  FileDropzoneDemo,
  LiquidSegmentedDemo,
  BankCard3dDemo,
  VoiceNoteWaveformDemo,
} from '../patterns/StarterPackDemos';

export const STARTER_PACK_DEMOS: Record<string, ComponentType> = {
  'ui-ai-streaming-pulse': AiStreamingDemo,
  'ui-particle-burst-heart': ParticleBurstDemo,
  'mg-ambient-aurora-blob': AmbientAuroraDemo,
  'lay-bottom-sheet-modal': BottomSheetDemo,
  'ui-swipe-to-confirm': SwipeToConfirmDemo,
  'ui-cli-command-switcher': CliCommandSwitcherDemo,
  'ui-interactive-kbd-key': InteractiveKbdDemo,
  'ui-tear-off-coupon-card': TearOffCouponDemo,
  'ui-file-dropzone-uploader': FileDropzoneDemo,
  'ui-liquid-segmented-control': LiquidSegmentedDemo,
  'ui-3d-interactive-bank-card': BankCard3dDemo,
  'ui-voice-note-waveform': VoiceNoteWaveformDemo,
};
