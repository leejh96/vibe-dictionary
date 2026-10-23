import type { TechniqueTranslation } from '../../localization';

export const EN_UI_COLLECTION: Record<string, TechniqueTranslation> = {
  "hover-image-preview-link": {
    "summary": "A small landscape floats above a link on hover or keyboard focus",
    "vibeTag": "A scene on approach",
    "vibeKeywords": [
      "Image Preview Link",
      "hover image",
      "link preview"
    ],
    "promptSnippet": "Build Image Preview Link in the specified area. Position a 100×58 SVG landscape above an underlined button. Transition from opacity 0 and translateY(12px) to opacity 1 and translateY(0) over 250ms on hover or focus-visible, keeping a -8deg tilt. Clicking does not navigate. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "hover-wavy-underline": {
    "summary": "A wavy underline moves closer to its label on hover or focus",
    "vibeTag": "A ripple under the words",
    "vibeKeywords": [
      "Wavy Underline Offset Hover",
      "wavy underline",
      "underline offset"
    ],
    "promptSnippet": "Build Wavy Underline Offset Hover in the specified area. Give the text button a 2px purple wavy underline. Transition text-underline-offset from 8px to 3px in 250ms on hover or focus-visible, returning on exit. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "hover-split-curtain": {
    "summary": "Two button background halves slide apart to expose the underlying color",
    "vibeTag": "A curtain opens",
    "vibeKeywords": [
      "Split Curtain Hover Button",
      "split hover",
      "curtain button"
    ],
    "promptSnippet": "Build Split Curtain Hover Button in the specified area. Cover a pale yellow button with two lavender pseudo-elements occupying its left and right halves. Keep the label above them. On hover or focus-visible translate the halves -101% and +101% over 350ms; reverse on exit. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "hover-arrow-conveyor": {
    "summary": "A diagonal arrow exits a clipped window as a horizontal arrow enters",
    "vibeTag": "A continuous direction",
    "vibeKeywords": [
      "Arrow Conveyor Hover",
      "arrow swap",
      "rolling arrow"
    ],
    "promptSnippet": "Build Arrow Conveyor Hover in the specified area. Place a 20px-high overflow-hidden window beside the button label. Stack a diagonal and horizontal arrow with 20px line height. Move both up 20px over 350ms on hover or focus-visible. Mark the arrows decorative. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "hover-radial-ink": {
    "summary": "A small circle expands from the button center to flood the background",
    "vibeTag": "An ink-filled moment",
    "vibeKeywords": [
      "Radial Ink Spread Hover",
      "ink flood",
      "radial fill"
    ],
    "promptSnippet": "Build Radial Ink Spread Hover in the specified area. Place a 10px lavender circle at the button center, initially scale 0. Scale it to 22 over 450ms on hover or focus-visible, clipped by button overflow. Keep the label above the ink and use dark text in the active state. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "perforated-admission-ticket": {
    "summary": "An admission ticket divided by a perforated seam and semicircular notches",
    "vibeTag": "A ticket to enter",
    "vibeKeywords": [
      "Perforated Admission Ticket",
      "admission pass",
      "ticket stub"
    ],
    "promptSnippet": "Build Perforated Admission Ticket in the specified area. Build a two-column ticket with a flexible main section and 64px vertical number stub. Add a dashed seam and 18px circular notches at its top and bottom. Use a lavender surface, event title and edition; match notch colors to the surrounding theme. Keep this a static composition with no autoplay or input behavior. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "hinged-book-cover-card": {
    "summary": "A cover swings around the left spine to reveal an inner page",
    "vibeTag": "Open the cover",
    "vibeKeywords": [
      "Hinged Book Cover Card",
      "book cover",
      "opening book"
    ],
    "promptSnippet": "Build Hinged Book Cover Card in the specified area. Layer a purple cover button over a cream inner page in a 120×130 book. Start closed; clicking rotates the cover -125deg around its left edge over 600ms with a 650px perspective and hidden back face. Provide a separate toggle to close it again. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "fan-spread-deck": {
    "summary": "Three stacked cards open into a fan around a pivot below their faces",
    "vibeTag": "A hand of cards",
    "vibeKeywords": [
      "Fan Spread Card Deck",
      "fan deck",
      "spread cards"
    ],
    "promptSnippet": "Build Fan Spread Card Deck in the specified area. Stack three 78×104 cards, initially unrotated. Any card toggles the fan, rotating the cards -23, 0 and 23deg around 50% 130%. Lift the outer cards 4px and transition over 400ms. Give each button a numbered accessible label. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "scratch-mask-reveal-card": {
    "summary": "A range input extends a zigzag scratch mask through a silver covering",
    "vibeTag": "Scratch into luck",
    "vibeKeywords": [
      "Scratch Mask Reveal Card",
      "scratch card",
      "scratch reveal"
    ],
    "promptSnippet": "Build Scratch Mask Reveal Card in the specified area. Cover a lime reward message with a silver rectangle. Its white mask contains a black zigzag path with 40px round strokes and pathLength 100. A range value from 0 to 100, initially 0, controls strokeDasharray reveal 100 to expose the scratched track. This is a preset path, not freehand scratching; isolate mask IDs. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "product-hotspot-card": {
    "summary": "Three product hotspots reveal the selected part label",
    "vibeTag": "Discover the details",
    "vibeKeywords": [
      "Product Hotspot Card",
      "product annotations",
      "image hotspot"
    ],
    "promptSnippet": "Build Product Hotspot Card in the specified area. Place three numbered buttons over the cap, label and body of an SVG bottle. Initially select the first hotspot. Clicking updates the selected index and aria-pressed, displaying the selected part name in a bottom output area. Do not cycle selection automatically. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "circular-scene-switch": {
    "summary": "A growing circular clip exposes a second landscape",
    "vibeTag": "A circular scene change",
    "vibeKeywords": [
      "Circular Scene Switch",
      "circle transition",
      "scene clip"
    ],
    "promptSnippet": "Build Circular Scene Switch in the specified area. Overlay a second landscape using a circular clip centered at 140,80 in a 280×160 SVG. A button toggles its radius between 0 and 170 over 600ms. Use an instance-specific clip ID. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "domino-tile-transition": {
    "summary": "Five tiles tilt sequentially with a 100ms stagger",
    "vibeTag": "One tile after another",
    "vibeKeywords": [
      "Domino Tile Transition",
      "domino motion",
      "staggered fall"
    ],
    "promptSnippet": "Build Domino Tile Transition in the specified area. Stand five 65px tiles in a row with bottom-right transform origins. Toggle rotation between 0 and 65deg, using a 300ms ease-in transition and index×100ms delay. This is a CSS stagger, without collision simulation. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "zipper-panel-opening": {
    "summary": "Two panels with dashed inner seams part to reveal a message",
    "vibeTag": "An opening down the middle",
    "vibeKeywords": [
      "Zipper Panel Opening",
      "zipper reveal",
      "split opening"
    ],
    "promptSnippet": "Build Zipper Panel Opening in the specified area. Cover a lime message with two purple half-panels. Add 5px pale dashed borders along their inner edges as zipper teeth. Toggle the halves between closed and -100%/+100% horizontal translations over 600ms. This does not simulate zipper physics. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "cube-panel-switch": {
    "summary": "A panel rotates 90 degrees to reveal its adjacent cube face",
    "vibeTag": "Turn to another face",
    "vibeKeywords": [
      "Cube Face Panel Switch",
      "cube transition",
      "rotating panel"
    ],
    "promptSnippet": "Build Cube Face Panel Switch in the specified area. Place 110×110 front and side faces at translateZ(55px) and rotateY(90deg) translateZ(55px). Use 500px perspective, preserve-3d and hidden backs. Toggle cube rotation from 0 to -90deg over 700ms. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "stack-to-grid-transition": {
    "summary": "Four overlapping cards spread into a two-by-two grid and restack",
    "vibeTag": "From stack to spread",
    "vibeKeywords": [
      "Stack to Grid Transition",
      "stack grid",
      "spread layout"
    ],
    "promptSnippet": "Build Stack to Grid Transition in the specified area. Stack four 72×52 cards centrally with small position and rotation offsets. A button moves them into two columns and two rows and resets their rotation to zero. Transition left, top and transform over 500ms while retaining a single layout boolean. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "balanced-headline-wrap": {
    "summary": "A width control demonstrates balanced headline wrapping",
    "vibeTag": "Balanced lines",
    "vibeKeywords": [
      "Balanced Headline Wrapping",
      "text wrap balance",
      "balanced heading"
    ],
    "promptSnippet": "Build Balanced Headline Wrapping in the specified area. Apply text-wrap balance and 1.15 line height to a bold 25px headline. Start at 220px wide and let a range input adjust between 130 and 270px, bounded by max-width 100%. Keep the sentence fixed and show actual CSS wrapping. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ruby-reading-annotation": {
    "summary": "Small reading annotations sit above large base lettering",
    "vibeTag": "A small reading cue",
    "vibeKeywords": [
      "Ruby Reading Annotation",
      "ruby annotation",
      "reading gloss"
    ],
    "promptSnippet": "Build Ruby Reading Annotation in the specified area. Use native ruby and rt elements to position a 12px purple reading annotation above 38px serif base text. Center the composition and localize the base and annotation through separate message keys. Keep this a static composition with no autoplay or input behavior. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "proofreading-text-marks": {
    "summary": "Deleted and revised words are contrasted with a strike and wavy underline",
    "vibeTag": "Marks with character",
    "vibeKeywords": [
      "Proofreading Text Marks",
      "proofreading marks",
      "insert delete"
    ],
    "promptSnippet": "Build Proofreading Text Marks in the specified area. Center two 25px serif lines. Use del with a red 2px strike for the first and ins with a purple wavy underline offset 8px for the second. This is a visual hierarchy example, not an editable proofreader. Keep this a static composition with no autoplay or input behavior. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "inline-footnote-disclosure": {
    "summary": "A superscript reference button reveals supplementary text below",
    "vibeTag": "Notes on demand",
    "vibeKeywords": [
      "Inline Footnote Disclosure",
      "footnote",
      "supplementary note"
    ],
    "promptSnippet": "Build Inline Footnote Disclosure in the specified area. Add a small superscript reference button after the text. Start collapsed; toggle open with click or keyboard and connect aria-expanded and aria-controls. Keep the body text stable and control a uniquely identified note with the hidden attribute. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vertical-editorial-type": {
    "summary": "A vertical headline and small caption sit beside a colored arch",
    "vibeTag": "A vertical rhythm",
    "vibeKeywords": [
      "Vertical Editorial Typography",
      "vertical type",
      "vertical writing"
    ],
    "promptSnippet": "Build Vertical Editorial Typography in the specified area. Place a 28px vertical-rl headline beside a 12px caption with 2px and 3px letter spacing; keep the headline on one line. Add a 55×100 gradient arch alongside them, keeping the composition within 140px height. Keep this a static composition with no autoplay or input behavior. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "password-rule-checklist": {
    "summary": "Live checks show whether a sample password meets length, digit and uppercase conditions",
    "vibeTag": "One rule at a time",
    "vibeKeywords": [
      "Password Rule Checklist",
      "password requirements",
      "password checklist"
    ],
    "promptSnippet": "Build Password Rule Checklist in the specified area. Start with an empty password field. Check length of at least eight, presence of a digit and presence of an uppercase Latin letter. Update three checks and a satisfied-count/3 bar. Keep input in memory only; do not store or send it, or claim these checks guarantee security. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "dirty-note-save-state": {
    "summary": "The current text is compared with a local saved snapshot to show dirty state",
    "vibeTag": "A clear saved state",
    "vibeKeywords": [
      "Dirty Note Save State",
      "dirty state",
      "save status"
    ],
    "promptSnippet": "Build Dirty Note Save State in the specified area. Start current and saved text as empty strings. When value differs from saved, show an unsaved status and enable Save. Saving copies value to saved; disable Save when equal. Explain that this is a local demonstration with no persistence across reloads or server request. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "chunked-progress-feedback": {
    "summary": "A button fills one of five progress chunks at a time",
    "vibeTag": "Progress in pieces",
    "vibeKeywords": [
      "Chunked Progress Feedback",
      "chunk progress",
      "segmented progress"
    ],
    "promptSnippet": "Build Chunked Progress Feedback in the specified area. Start count at zero; each button click increments it up to five. Fill cells whose index is below count and announce the count politely. At five the button becomes Reset and returns to zero. This is manual progress visualization without an upload or network operation. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "toggle-reaction-picker": {
    "summary": "Choose one of three reactions or toggle the selected reaction off",
    "vibeTag": "A quick reaction",
    "vibeKeywords": [
      "Toggle Reaction Picker",
      "reaction buttons",
      "reaction picker"
    ],
    "promptSnippet": "Build Toggle Reaction Picker in the specified area. Place three symbol buttons in a row and start with no selection. Clicking selects an index; clicking it again clears selection. Lift only the selected button 8px, update aria-pressed and display the localized reaction name. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "simulated-connectivity-banner": {
    "summary": "A local toggle changes the online/offline banner color and message",
    "vibeTag": "Connection at a glance",
    "vibeKeywords": [
      "Simulated Connectivity Banner",
      "offline banner",
      "connection status"
    ],
    "promptSnippet": "Build Simulated Connectivity Banner in the specified area. Start with online true and toggle it locally. Use a green left border and tint for online, pink for offline, updating a status message. Always explain that the demo does not detect the actual network. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "avatar-overflow-cluster": {
    "summary": "Overlapping avatars use a +2 disclosure for additional participants",
    "vibeTag": "A gathering of faces",
    "vibeKeywords": [
      "Avatar Overflow Cluster",
      "avatar group",
      "participant overflow"
    ],
    "promptSnippet": "Build Avatar Overflow Cluster in the specified area. Overlap three 46px avatars using negative margins and white borders. A +2 native button starts collapsed and toggles the remaining two participants with aria-expanded. No automatic opening or account integration is involved. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "grouped-chat-bubbles": {
    "summary": "Bubble corners and spacing distinguish consecutive messages and their sender",
    "vibeTag": "A conversation grouped",
    "vibeKeywords": [
      "Grouped Chat Bubbles",
      "message grouping",
      "chat bubbles"
    ],
    "promptSnippet": "Build Grouped Chat Bubbles in the specified area. Group two left-aligned bubbles below their sender with a 4px gap. Align a purple reply to the right, change the small tail corner to the lower right and add a read caption. This is a static conversation sample without sending or input. Keep this a static composition with no autoplay or input behavior. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "horizontal-milestone-rail": {
    "summary": "A connecting rail and checks fill up to the selected milestone",
    "vibeTag": "Milestones along the way",
    "vibeKeywords": [
      "Horizontal Milestone Rail",
      "milestone rail",
      "step progress"
    ],
    "promptSnippet": "Build Horizontal Milestone Rail in the specified area. Arrange Plan, Make and Ship buttons horizontally, initially selecting Plan. Earlier circles show checks, the current one shows its number and aria-current step, and later ones stay pale. Transition the connecting line width over 300ms and output the selected stage name below. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "static-month-calendar": {
    "summary": "A seven-column month layout contrasts empty boundary cells and a highlighted day",
    "vibeTag": "A month at a glance",
    "vibeKeywords": [
      "Static Month Calendar Grid",
      "calendar layout",
      "month grid"
    ],
    "promptSnippet": "Build Static Month Calendar Grid in the specified area. Build a seven-column, five-row grid with two leading empty cells, days 1–30 and trailing empty cells. Highlight day 16 in purple. Label it as a sample month rather than a real current calendar; do not add date selection. Keep this a static composition with no autoplay or input behavior. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "pinned-panel-action-footer": {
    "summary": "Only the list scrolls while the bottom action remains visible",
    "vibeTag": "Actions within reach",
    "vibeKeywords": [
      "Pinned Panel Action Footer",
      "pinned footer",
      "panel actions"
    ],
    "promptSnippet": "Build Pinned Panel Action Footer in the specified area. Use a 145px flex-column panel with a flex-1 overflow-y-auto list and a separate footer. Add eight rows and contain overscroll. The footer Apply button increments a local counter to demonstrate that it remains usable while the list scrolls. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "range-linked-rotary-dial": {
    "summary": "A range input updates the rotary knob indicator and numeric value",
    "vibeTag": "Dial in the angle",
    "vibeKeywords": [
      "Range Linked Rotary Dial",
      "rotary knob",
      "dial input"
    ],
    "promptSnippet": "Build Range Linked Rotary Dial in the specified area. Connect a native 0–100 range, initially 35, to an SVG knob centered at 140,80. Rotate the indicator by -135+value×2.7 degrees. Separate the outer 270deg arc, inner disk and numeric value; the knob itself is not directly draggable. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "sentiment-radio-segments": {
    "summary": "A native radio group allows exactly one of three sentiments",
    "vibeTag": "A mood in three choices",
    "vibeKeywords": [
      "Sentiment Radio Segments",
      "sentiment choice",
      "radio segments"
    ],
    "promptSnippet": "Build Sentiment Radio Segments in the specified area. Group Low, Medium and High native radios into labeled symbol cells. Initially select Medium and give the checked cell a purple background and white text. Use a unique radio name for each demo instance so choices do not affect other cards. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "duration-preset-select": {
    "summary": "Selecting a duration preset updates the hour-and-minute display",
    "vibeTag": "Choose a duration",
    "vibeKeywords": [
      "Duration Preset Select",
      "duration input",
      "time preset"
    ],
    "promptSnippet": "Build Duration Preset Select in the specified area. Provide a native select for 5, 15, 30, 60 and 90 minutes, initially 15. Store numeric minutes, showing floor(minutes/60) and minutes%60 as two-digit hour and minute fields. Do not start a real timer or countdown. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "two-axis-coordinate-pad": {
    "summary": "Click the pad or use two range inputs to set a point on both axes",
    "vibeTag": "A position on two axes",
    "vibeKeywords": [
      "Two Axis Coordinate Pad",
      "coordinate input",
      "XY pad"
    ],
    "promptSnippet": "Build Two Axis Coordinate Pad in the specified area. Start a point at 50,50 on a grid. Convert pointerdown coordinates relative to the pad bounds into percentages. Provide two native 0–100 ranges for horizontal and vertical positions, preserving the other axis when either changes. The pad selects on click rather than continuous dragging. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "pointer-numeric-scrubber": {
    "summary": "Drag a number horizontally or use arrow keys to adjust it",
    "vibeTag": "Slide to a value",
    "vibeKeywords": [
      "Pointer Numeric Scrubber",
      "numeric drag",
      "scrub input"
    ],
    "promptSnippet": "Build Pointer Numeric Scrubber in the specified area. Create a focusable role-slider number, initially 50, clamped to 0–100. On pointerdown store its value and x position, capture the pointer and change the value by one per 2px horizontal movement. Clear drag state on release, cancel or lost capture. Arrow keys change by one; Home/End go to bounds. Update aria-valuenow. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  }
};
