import type { TechniqueTranslation } from '../../localization';

export const EN_PATTERN_TECHNIQUES: Record<string, TechniqueTranslation> = {
  'zoom-lightbox-gallery': {
    summary: 'Open an image viewer inside the card, then zoom, drag, or move between three images.',
    vibeTag: 'From tiny thumbnails to an immersive image view',
    vibeKeywords: ['lightbox', 'image zoom', 'photo gallery', 'product images'],
    promptSnippet: 'Build a gallery with three named SVG landscape thumbnails: Coast, Dunes, and Peaks. Click, Enter, or Space opens a larger image viewer inside the same card with a 380ms cubic-bezier(.2,.8,.2,1) entrance from scale .78 and opacity .3 to full size and opacity. Previous/next buttons and Left/Right keys cycle through the images. A zoom button toggles center scale 1/1.65. Changing images resets zoom and pan. Capture the primary pointer to pan a zoomed image within ±35px horizontally and ±20px vertically. Without zoom, a horizontal swipe exceeding 35px selects the next/previous image. Clear drag references on cancellation or lost capture. Close and Escape restore the thumbnail gallery; Escape returns focus to the first thumbnail. This is an in-card viewer, not a page modal, and has no pinch zoom or external image requests. Do not open or change images automatically; retain the viewer state chosen by the user. Support light/dark themes, narrow screens, focus outlines, and reduced motion.',
  },
  'selection-bubble-toolbar': {
    summary: 'A small formatting bubble appears above selected text and applies bold to the selected substring.',
    vibeTag: 'The tools appear right above your selection',
    vibeKeywords: ['text selection', 'bubble toolbar', 'floating formatting', 'document editor'],
    promptSnippet: 'Read actual browser text selection inside the specified paragraph and show a bubble with one Bold button above the selected range. Handle pointer selection end and keyboard selection changes; hide for empty or outside selection. Clamp its horizontal center within 25–75% of the paragraph width and keep it inside the top boundary. Enter over 180ms from 5px below and opacity zero, with a small triangular tail. Prevent pointer defaults on the toolbar button from clearing selection. Apply bold only to the selected substring, then hide the bubble. Keep the toolbar hidden until real text is selected; do not simulate selection or formatting automatically. Do not add link/comment actions or a full editor integration. Support light/dark contrast, narrow widths, keyboard operation, and reduced motion.',
  },
  'ly-collapsing-scroll-header': {
    summary: 'An automatic simulation compresses a large cover and title into a small top bar, then expands them again.',
    vibeTag: 'A large title smoothly becomes a compact top bar',
    vibeKeywords: ['collapsing header', 'scroll header', 'shrinking navigation', 'large title transition'],
    promptSnippet: 'Build a 110px-tall travel-detail preview inside the specified card. Include cover artwork, a large title, a back arrow, and three body lines. Animate a progress value p between 0 and 1 to simulate scroll compression. Interpolate header height from 82 to 38px, title font size from 23 to 13px, and title translation from (26,40) to (24,5)px. Move the cover up 48px while opacity goes from 1 to .2, move body lines up 28px, and fill the header from transparent to the themed surface. In the dictionary, loop 0→1→0 over 8 seconds. Click, Enter, or Space cancels the previous playback and restarts once from the beginning. Show the effect without scrollbars or range inputs. This is a progress simulation, not real page scroll detection or back navigation. Preserve card boundaries, top-toolbar spacing, light/dark themes, narrow layouts, and focus outlines. Disable automatic movement and transitions for reduced motion.',
  },
  'rich-hover-preview': {
    summary: 'Hover, focus, or press an author name to reveal a profile preview with a banner, avatar, and short biography.',
    vibeTag: 'A quick peek before you navigate away',
    vibeKeywords: ['hover card', 'profile preview', 'link preview', 'rich tooltip'],
    promptSnippet: 'Place a Created by label and author-name button above a profile preview card in the specified area. Include a gradient banner, overlapping circular avatar, name, role, and one-line biography. Open on name hover or keyboard focus; click and touch toggle it. Keep it open while the pointer moves from the name into the preview. Close when the pointer leaves the entire area or focus moves outside. Hide closed content with hidden and match the trigger aria-expanded state. Enter over 200ms from 5px below and opacity zero. Keep the preview closed before user input; do not open it or move real focus automatically. No actual profile lookup, external link, follow action, or server call is performed. Support light/dark surface and text contrast, narrow widths, focus outlines, and reduced motion.',
  },
  'inline-edit-field': {
    summary: 'Press a project name to replace it with an input in the same place, then save or cancel back to text.',
    vibeTag: 'Edit in place without leaving the screen',
    vibeKeywords: ['inline edit', 'edit in place', 'rename', 'save cancel field'],
    promptSnippet: 'Build a card with a Project name label and an edit button containing the name and a pencil icon. Start with New project. Pressing it replaces the value in place with an input plus Save and Cancel buttons. Keep draft text separate from the saved name. Save or Enter trims whitespace and stores the name in local state before returning to read mode. Disable Save for whitespace-only input and guard the handler too. Cancel or Escape discards the draft and keeps the saved name. Do not enter edit mode or change values automatically. Retain the draft and saved name entered by the user. There is no server persistence, durable storage, or fake request-success message. Support light/dark contrast, narrow input/button boundaries, keyboard operation, focus outlines, and reduced motion.',
  },
};
