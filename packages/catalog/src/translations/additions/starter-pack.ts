import type { TechniqueTranslation } from '../../localization';

export const EN_STARTER_PACK_TECHNIQUES: Record<string, TechniqueTranslation> = {
  'ui-ai-streaming-pulse': {
    summary: 'A typing effect outputs text letter by letter, followed by a smoothly pulsing and breathing gradient glow cursor.',
    vibeTag: 'Typing as if thinking with a breathing pulse cursor',
    vibeKeywords: ['streaming pulse cursor', 'AI streaming', 'typing effect', 'pulse cursor', 'streaming text', 'generative UI'],
    promptSnippet: 'Create an AI streaming text demo in a 280×150 area. At the top, place an 11px status badge with a shimmering circular AI generation indicator. In the center text container, stream fixed sample text character by character every 40ms. Immediately after the printed characters, append an inline 8×15px purple-to-teal gradient pulse cursor with a 1-second breathing loop (opacity 0.2 to 1 and slight scale motion). While typing, the cursor follows the trailing character immediately; upon completion, it stays in a gentle breathing pulse. Clicking restarts the typing stream from the beginning. Support light theme (#f8fafc surface, #0f172a text, #6366f1 accent) and dark theme (#0f172a surface, #f8fafc text, #818cf8 accent), bind role="status" and aria-live="polite" for screen readers, and show the full text and static cursor immediately under reduced motion.',
  },
  'ui-particle-burst-heart': {
    summary: 'Clicking the heart button triggers a spring bounce along with an 8-way burst of colorful confetti particles and an expanding ring.',
    vibeTag: 'Stars and rings bursting open on click',
    vibeKeywords: ['particle burst heart', 'like motion', 'micro interaction', 'celebration particle', 'bounce button'],
    promptSnippet: 'Create an interactive 48×48 heart button with a particle burst effect in the specified area. Use a native button element showing an outlined gray heart and counter by default. Clicking toggles an active state: upon activation, the heart bounces from scale 0.8 to 1.25 down to 1.0 over 300ms cubic-bezier(.17,.89,.32,1.28). Simultaneously, expand a translucent shockwave ring (opacity 1 to 0, scale 0.2 to 1.8) outward up to 36px radius, while 8 round confetti particles in 4 pastel shades (pink, yellow, violet, teal) fly radially outward and fade out over 400ms. Clicking again smoothly reverts the heart without particles. The counter increments by 1 when active. Support both themes, keyboard access (Enter/Space), and aria-pressed, and toggle colors and counts immediately without animations under reduced motion.',
  },
  'mg-ambient-aurora-blob': {
    summary: 'Three organic pastel neon gradient blobs rotate and overlap slowly behind a blur filter to create a glowing aurora backdrop.',
    vibeTag: 'Dreamy overlapping streams of aurora light',
    vibeKeywords: ['ambient aurora blob', 'aurora background', 'gradient motion', 'aurora shader', 'hero background', 'organic blur'],
    promptSnippet: 'Build a dreamy ambient aurora background as a 280×150 SVG frame in the specified area. Use deep navy (#090d16) as the base, topped with three large elliptical blobs in violet (#8b5cf6), cyan (#06b6d4), and coral pink (#f43f5e). Animate each blob through organic orbits and gentle scaling (0.85 to 1.2) across 8 to 12 second periods inside a feGaussianBlur(stdDeviation="22") filter. When blobs overlap in the center, simulate an amplified light bloom similar to screen or color-dodge blending. Clip to the frame with overflow: hidden and 12px rounded corners. Float a polished glassmorphism badge (translucent white, backdrop-blur 6px, subtle 1px white border) in the top center to demonstrate depth. Clicking resets the cycle, the frame loop pauses when offscreen, and reduced motion displays a static still aurora gradient frame.',
  },
  'lay-bottom-sheet-modal': {
    summary: 'A mobile-style drawer panel that slides up smoothly from the bottom with a dimmed backdrop when the handle bar is clicked.',
    vibeTag: 'A bottom sheet sliding up smoothly like a mobile app',
    vibeKeywords: ['drawer bottom sheet', 'mobile drawer', 'sheet modal', 'slide up', 'mobile UI', 'handle bar'],
    promptSnippet: 'Create an interactive bottom sheet panel simulating a mobile viewport (240×150 preview) in the specified area. Initially, expose only the top 34px peek of the sheet featuring 16px rounded top corners and a centered 36×4px pill handle bar. Clicking the handle or sheet top triggers a 350ms cubic-bezier(.16,1,.3,1) spring slide up to translateY(0), while a translucent dark backdrop fades in (opacity 0 to 0.45). Inside the opened sheet, present two action menu items (Share, Save) and a close text button. Clicking the backdrop or close button slides the panel back down to translateY(116px). Bind role="dialog", aria-modal="true", and aria-expanded, support Escape key closing, support light theme (#ffffff sheet, #1e293b text) and dark theme (#1e293b sheet, #f8fafc text), and open and close immediately without sliding under reduced motion.',
  },
  'ui-swipe-to-confirm': {
    summary: 'Dragging a circular knob across a horizontal track confirms an action once past 80%, springing back if released early.',
    vibeTag: 'A reassuring slider that must be dragged all the way to confirm',
    vibeKeywords: ['swipe confirm slider', 'slide to unlock', 'swipe to pay', 'action slider', 'mistake prevention'],
    promptSnippet: 'Build a 220×46 swipe-to-confirm slider button in the specified area. On a pill-shaped track (#e2e8f0 track, dark #1e293b), center a subtle 12px label ("Slide to Pay") and place a 38×38 circular drag knob (#ffffff, dark #334155, right arrow icon) on the left. Dragging the knob rightward fills the track with a green gradient and dims the hint text based on progress (0 to 100%). If released before 80%, smoothly spring back to 0 over 250ms; past 80%, lock into a confirmed state with a green checkmark and success copy. Clicking in the confirmed state resets back to idle. Bind role="slider", aria-valuemin="0", aria-valuemax="100", aria-valuenow, support left/right keyboard arrows, and confirm in one click without drag animations under reduced motion.',
  },
  'ui-cli-command-switcher': {
    summary: 'A developer-docs terminal component that swaps commands instantly across npm, pnpm, yarn, and bun tabs with copy feedback.',
    vibeTag: 'A terminal switching between npm and pnpm with one click',
    vibeKeywords: ['cli command switcher', 'package manager tabs', 'terminal copy', 'command snippet', 'codeblock'],
    promptSnippet: 'Create a 260×110 CLI command code block for modern developer documentation in the specified area. On a deep slate (#0f172a) background, place four mini tabs for npm, pnpm, yarn, and bun (active tab has #334155 background with light text) in the top header alongside a square copy button on the right. Clicking a tab immediately replaces the console command with the chosen package manager syntax (e.g., npm i vs pnpm add vs yarn add vs bun add). Prefix the line with a purple terminal prompt ("$"), and clicking copy writes to clipboard and turns into a green checkmark and "Copied!" feedback for 1.5 seconds. Bind role="tablist", role="tab", aria-selected, fit narrow screens without horizontal overflow, and switch icons immediately without transitions under reduced motion.',
  },
  'ui-interactive-kbd-key': {
    summary: 'A mechanical 3D keycap badge with realistic depth shadow that compresses down when clicked or pressed on keyboard.',
    vibeTag: 'Keyboard shortcut badges pressing down like real keycaps',
    vibeKeywords: ['interactive kbd badge', 'shortcut badge', 'kbd tag', 'keycap interaction', 'key press feedback'],
    promptSnippet: 'Create an interactive KBD shortcut component in the specified area that simulates real mechanical keycap presses. Display two keycaps for "⌘ Command" and "K" side-by-side, each styled with a 3D bottom shadow (box-shadow: 0 4px 0 #94a3b8, dark #1e293b), 1px border, and 6px rounded corners. Clicking or pressing keys translates the keycap down by translateY(3px) over 100ms while compressing the shadow to 1px to mimic a physical tactile switch press. Triggering the keys flashes a pill badge underneath reading "Command Palette opened!". Use standard kbd tags, support Enter and Space keyboard events, maintain both theme contrasts, and show pressed states immediately under reduced motion.',
  },
  'ui-tear-off-coupon-card': {
    summary: 'A perforated ticket coupon with side circular punch holes where claiming tears the stub away and stamps an ISSUED seal.',
    vibeTag: 'Perforated line tearing open with a stamped seal',
    vibeKeywords: ['tear off coupon voucher', 'ticket card', 'perforated stub', 'coupon voucher', 'issued stamp'],
    promptSnippet: 'Create a 260×90 perforated coupon ticket card in the specified area. Divide the card into left and right zones separated by 16px semicircular edge cutouts and a dashed vertical tear line (border-right: 2px dashed). The left zone highlights "15% OFF" and "WELCOME VIBE", while the right stub holds a "Claim" button. Clicking shifts the right stub rightward by 8px and tilts it 3 degrees over 400ms to simulate paper tearing, while a red "ISSUED" seal stamps onto the main voucher with a 300ms bounce. Clicking again when claimed resets back to initial. Support both themes, keyboard access (Enter/Space), and transition immediately to the stamped state without tear animations under reduced motion.',
  },
  'ui-file-dropzone-uploader': {
    summary: 'A drag-and-drop file upload zone with a pulsating border on hover, animated progress bar, and completion checkmark.',
    vibeTag: 'Upload zone responding softly on drag over',
    vibeKeywords: ['file dropzone uploader', 'drag and drop upload', 'file attachment progress', 'upload input widget', 'upload progress bar'],
    promptSnippet: 'Build a modern 260×110 file dropzone uploader in the specified area. By default, show a cloud upload icon and "Drag & drop or click to upload" hint inside a dashed gray border (border: 2px dashed #cbd5e1). Hovering or dragging over turns the border into vibrant indigo (#6366f1) with a soft pulsing glow. Clicking triggers a simulated upload: a file icon appears with "document_vibe.pdf (2.4 MB)" info as a horizontal progress bar fills smoothly from 0% to 100% over 800ms. Upon 100%, transition into a green checkmark badge and "Upload Complete" state; clicking again resets to idle. Support keyboard accessibility (Enter/Space), dual themes (#ffffff / #1e293b), and jump directly to complete without progress animation under reduced motion.',
  },
  'ui-liquid-segmented-control': {
    summary: 'An iOS-style segmented control where the floating pill indicator elastically stretches and snaps to the active tab.',
    vibeTag: 'A pill tab stretching like jelly and snapping into place',
    vibeKeywords: ['liquid segmented control', 'jelly pill tab', 'spring segment toggle', 'elastic tab switcher', 'iOS segment'],
    promptSnippet: 'Create an iOS-style elastic segmented control in the specified area. Inside a pill-shaped track (#e2e8f0 surface, dark #0f172a), lay out three tab buttons ("Daily", "Weekly", "Monthly"). Behind the active tab, float a white pill indicator (box-shadow: 0 2px 8px rgba(0,0,0,0.12)). When switching tabs, elastically stretch the pill horizontally by 1.25x in the direction of travel before snapping into the target position with spring damping. Transition active tab text to bold dark and inactive tabs to muted gray. Support role="tablist", role="tab", aria-selected, left/right keyboard arrows, and move immediately without elastic stretching under reduced motion.',
  },
  'ui-3d-interactive-bank-card': {
    summary: 'A 3D payment card with embossed metallic digits that flips 180 degrees to reveal the magnetic strip and CVC code.',
    vibeTag: 'A premium card flipping front and back in 3D',
    vibeKeywords: ['3d interactive payment card', 'credit card 3d flip', 'embossed bank card', 'checkout form card flip', 'fintech card flip'],
    promptSnippet: 'Create a premium 240×140 3D credit card component in the specified area. The front shows a deep sapphire navy gradient, golden EMV microchip, 16-digit embossed number ("•••• •••• •••• 4242"), expiry date ("12/28"), and metallic brand logo. The back features a top black magnetic strip, white signature panel, and 3-digit CVC code ("883"). Clicking a "Flip Card" toggle smoothly rotates the card 180 degrees around the Y-axis over 500ms cubic-bezier(.16,1,.3,1) with perspective(800px) and backface-visibility: hidden. Hovering sweeps a soft diagonal metallic sheen across the surface. Support keyboard access and switch faces immediately without rotation under reduced motion.',
  },
  'ui-voice-note-waveform': {
    summary: 'A messenger-style voice note player where audio waveform bars fill on playback with click-to-seek progress.',
    vibeTag: 'Listening to voice notes by tapping audio waves',
    vibeKeywords: ['voice note waveform', 'audio message mini player', 'audio wave seeking', 'sound wave progress', 'waveform seek'],
    promptSnippet: 'Create a 260×64 messenger-style voice note player in the specified area. In a rounded capsule card (#f1f5f9, dark #1e293b), place a 36×36 play/pause toggle button (vibrant coral pink #f43f5e with white icon) on the left, 20 rounded waveform bars of varying heights (6px to 28px) in the center, and remaining time ("0:12") in 11px bold text on the right. Playing counts down time while progressively filling bars from gray to vibrant coral pink; clicking any bar seeks the playback head immediately to that timestamp. Support role="progressbar" or "slider" accessibility, dual themes, and static full bars under reduced motion.',
  },
};
