import type { ComponentType } from 'react';
import { GameDelayedHealthBarDemo } from './GameDelayedHealthBarDemo';
import { GameRadialWeaponWheelDemo } from './GameRadialWeaponWheelDemo';
import { GameBossPhaseBarDemo } from './GameBossPhaseBarDemo';
import { GameDamageNumberPopDemo } from './GameDamageNumberPopDemo';
import { GameComboRankMeterDemo } from './GameComboRankMeterDemo';
import { GameHitstopImpactFrameDemo } from './GameHitstopImpactFrameDemo';
import { GameLootRarityRevealDemo } from './GameLootRarityRevealDemo';
import { GameSkillTreeNodeDemo } from './GameSkillTreeNodeDemo';
import { GameMatchmakingReadyCheckDemo } from './GameMatchmakingReadyCheckDemo';
import { GameSaveSlotManagerDemo } from './GameSaveSlotManagerDemo';

export const GAME_ADDITION_DEMOS: Record<string, ComponentType> = {
  'game-delayed-health-bar': GameDelayedHealthBarDemo,
  'game-radial-weapon-wheel': GameRadialWeaponWheelDemo,
  'game-boss-phase-bar': GameBossPhaseBarDemo,
  'game-damage-number-pop': GameDamageNumberPopDemo,
  'game-combo-rank-meter': GameComboRankMeterDemo,
  'game-hitstop-impact-frame': GameHitstopImpactFrameDemo,
  'game-loot-rarity-reveal': GameLootRarityRevealDemo,
  'game-skill-tree-node': GameSkillTreeNodeDemo,
  'game-matchmaking-ready-check': GameMatchmakingReadyCheckDemo,
  'game-save-slot-manager': GameSaveSlotManagerDemo,
};
