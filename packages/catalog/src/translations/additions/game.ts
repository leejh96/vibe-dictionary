import type { TechniqueTranslation } from '../../localization';

export const EN_GAME_TECHNIQUES: Record<string, TechniqueTranslation> = {
  'game-delayed-health-bar': {
    vibeTag: 'Delayed damage trail catches up behind instant health drops',
    vibeKeywords: ['delayed health bar', 'shield HUD', 'ghost trail bar', 'damage trail', 'combat health bar'],
    summary: 'Shield-first absorption, instant crimson HP loss, a 220ms-delayed 450ms white/amber ghost trail, and low-HP danger warning.',
    promptSnippet:
      'Build a combat delayed-trail health and shield bar HUD in the specified area. Inside a container of width 100% and min-height 180px, create a card with 12px rounded corners and a 1px border. Display max HP 100 and max Shield 40 so incoming damage depletes Shield first before subtracting remaining damage immediately from HP. Render a trailing ghost bar from the previous HP width that holds for 220ms and smoothly catches up over 450ms. Highlight the frame and warning badge in red when HP drops to 25% or below (disabling pulse animation under prefers-reduced-motion). Include Hit -18, Heavy -35, Heal +25, and Reset controls with native progressbar semantics and aria-valuenow.',
  },
  'game-radial-weapon-wheel': {
    vibeTag: 'Expands circular sectors to switch weapons or skills intuitively',
    vibeKeywords: ['weapon wheel', 'radial menu', 'circular quickslot', 'skill wheel', 'gear wheel'],
    summary: 'Six-sector SVG wheel where the active slice pops outward by 6px with pointer click and arrow-key cycling.',
    promptSnippet:
      'Create a 6-slot radial weapon and skill wheel selector in the specified area. Inside a container of width 100% and min-height 180px with 12px rounded corners, place an SVG circular wheel around 180px in diameter. Across 6 wedge sectors (Sword, Bow, Staff, Shield, Potion, Bomb), push the active or focused slice outward by 6px with a 150ms transition and display the selected item name and slot number in the center hub. Support both pointer selection and ArrowLeft/ArrowRight keyboard cycling with aria-pressed states and clear focus-visible outlines.',
  },
  'game-boss-phase-bar': {
    vibeTag: 'Displays phase threshold notches alongside a stagger gauge',
    vibeKeywords: ['boss health bar', 'phase transition bar', 'stagger gauge', 'boss HUD', 'boss HP bar'],
    summary: 'Multi-phase boss HUD combining 66% and 33% threshold markers, phase-shift flash alerts, and a secondary stagger meter.',
    promptSnippet:
      'Build a multi-phase boss health bar HUD in the specified area. Inside a container of width 100% and min-height 180px with 12px rounded corners, show the boss title, current phase badge (Phase 1, 2, or 3), a 100-point main health bar with vertical threshold notches at 66% and 33%, and a secondary stagger gauge below it. Provide Attack -20, Heavy -35, and Reset controls. Crossing below 66% or 33% triggers a 500ms phase-shift alert banner, filling the stagger gauge to 100% triggers a Staggered break state, and Reset restores Phase 1 (100%).',
  },
  'game-damage-number-pop': {
    vibeTag: 'Spawns rising floating damage popups with critical hit flashes',
    vibeKeywords: ['floating damage', 'damage popups', 'critical hit numbers', 'hit flash', 'combat numbers'],
    summary: 'Normal (-124), critical (-480), and weak-point (-310) strikes spawn 750ms rising damage popups with 70ms flash and 140ms micro-shake.',
    promptSnippet:
      'Create an interactive floating damage and critical popup demo in the specified area. Inside a container of width 100% and min-height 180px with 12px rounded corners, render a target dummy badge paired with Hit (-124), Crit (-480), and Weak Point (-310) buttons. Each click spawns a floating damage popup above the target that rises and fades out over 750ms with cleaned-up timers. Trigger a 70ms hit flash and 140ms micro-shake on impact while omitting the shake under prefers-reduced-motion and keeping popups and total damage readable.',
  },
  'game-combo-rank-meter': {
    vibeTag: 'Escalates style combo ranks and decays smoothly when idle',
    vibeKeywords: ['combo rank meter', 'style rank', 'combo decay gauge', 'hit counter', 'action combo'],
    summary: 'Climb D to SS style ranks with normal hits and skill chains while a decay bar ticks down every 100ms when idle.',
    promptSnippet:
      'Build a style combo rank and decay meter in the specified area. Inside a container of width 100% and min-height 180px with 12px rounded corners, display the active style rank badge (D, C, B, A, S, SS), hit count, and a rank decay gauge bar. Clicking Hit (+1 combo, +20 gauge) or Skill Chain (+3 combo, +45 gauge) boosts the meter and advances ranks at threshold boundaries, while an idle 100ms interval ticks the gauge down and drops rank one tier upon reaching 0. Start in Rank A at 35% decay gauge for immediate preview, include a Reset control, and clear all intervals on unmount.',
  },
  'game-hitstop-impact-frame': {
    vibeTag: 'Compares 80ms hitstop freeze frames and damped screen shake',
    vibeKeywords: ['hitstop simulator', 'game feel', 'impact freeze frame', 'screen shake', 'hit freeze'],
    summary: 'Independent 80ms Hitstop and 6px Screen Shake toggles let developers feel freeze-frame impact vs 160ms recoil recovery.',
    promptSnippet:
      'Create an interactive Hitstop and Screen Shake impact simulator in the specified area. Inside a container of width 100% and min-height 180px with 12px rounded corners, build a strike stage showing an attacker blade and target block alongside independent 80ms Hitstop and 6px Screen Shake toggle buttons. Triggering Strike holds an impact ring freeze frame for 80ms when Hitstop is enabled before settling with a 160ms recoil, and applies damped 6px stage shake when Screen Shake is enabled while displaying active timing badges. Clean up all timers on unmount and suppress shake under prefers-reduced-motion.',
  },
  'game-loot-rarity-reveal': {
    vibeTag: 'Appraises tiered loot cards with a 380ms sheen burst and glow',
    vibeKeywords: ['loot rarity card', 'item reveal sheen', 'rarity border', 'loot appraisal', 'tier glow card'],
    summary: 'Four rarity tiers (Common, Rare, Epic, Legendary) with a 380ms diagonal sheen burst, star count, and substat readout.',
    promptSnippet:
      'Create a tiered loot rarity reveal card interaction in the specified area. Inside a container of width 100% and min-height 180px with 12px rounded corners, provide 4 rarity tier buttons (Common, Rare, Epic, Legendary) and an [Appraise / Reveal] button. Switching tiers or clicking Reveal plays a 380ms diagonal sheen sweep and rarity border glow while updating the item name, star rating (1 to 4 stars), and two stat bonus lines. Maintain strong contrast across light and dark modes and clean up animation timers on unmount.',
  },
  'game-skill-tree-node': {
    vibeTag: 'Allocates skill points through prerequisite-linked tree nodes',
    vibeKeywords: ['skill tree', 'dependency nodes', 'skill point allocation', 'talent tree', 'RPG progression'],
    summary: 'Five SVG-connected nodes with a 3 SP budget enforcing parent prerequisites before child nodes can unlock.',
    promptSnippet:
      'Build a 5-node dependency skill tree unlocker in the specified area. Inside a container of width 100% and min-height 180px with 12px rounded corners, display remaining skill points (initial 3 SP) and 5 nodes connected by SVG paths (Base Slash -> 2 intermediate branches -> Ultimate Mastery). Enforce parent prerequisites so child nodes remain disabled until their parent is unlocked, highlighting active nodes and connector lines with a 160ms transition. Provide a Reset button to refund spent points back to 3 SP.',
  },
  'game-matchmaking-ready-check': {
    vibeTag: 'Flows from queue timer to a 10s ready check with player pips',
    vibeKeywords: ['matchmaking queue', 'ready check', 'match found modal', 'queue timer', 'lobby queue'],
    summary: 'Four-stage multiplayer queue card spanning Idle, Searching timer, 10s Ready Check (3/4 player pips), and Match Confirmed/Cancelled.',
    promptSnippet:
      'Build a multiplayer matchmaking queue and ready-check card in the specified area. Inside a container of width 100% and min-height 180px with 12px rounded corners, implement Idle -> Searching (with a 1000ms elapsed timer and Cancel button) -> Ready Check (with a 10s countdown bar and 4 player status pips showing 3/4 ready) -> Match Confirmed or Cancelled states. Include a [Simulate Match Found] button during Searching and [Accept] / [Decline] buttons during Ready Check, plus a [Re-queue] recovery button. Clear all interval timers on unmount.',
  },
  'game-save-slot-manager': {
    vibeTag: 'Guards occupied save slots with inline two-step overwrite confirmation',
    vibeKeywords: ['save slot manager', 'save slot', 'overwrite confirmation', 'save and load', 'checkpoint slots'],
    summary: 'Manage Auto-save (14h 22m), Manual, and Empty slots with safe inline Confirm/Cancel overwrite prompts and live status feedback.',
    promptSnippet:
      'Create a 3-slot save and load manager panel in the specified area. Inside a container of width 100% and min-height 180px with 12px rounded corners, list 3 slots: Auto-save (Slot 1, playtime 14h 22m), Manual Save (Slot 2), and Empty (Slot 3). Provide [Save] and [Load] buttons per row; clicking [Save] on an occupied slot must open an inline 2-step [Confirm Overwrite] / [Cancel] prompt inside that row instead of overwriting immediately. Disable [Load] on empty slots, populate empty slots immediately on save, and announce the latest action in a polite status region.',
  },
};
