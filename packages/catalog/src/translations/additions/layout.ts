import type { TechniqueTranslation } from '../../localization';

export const EN_LAYOUT_TECHNIQUES = {
  "closable-document-tabs": {
    "summary": "Close the selected tab and continue in an adjacent document or restore the examples.",
    "vibeTag": "Keep working after closing a document",
    "vibeKeywords": [
      "close document tab",
      "dynamic tabs",
      "workspace tabs"
    ],
    "promptSnippet": "Create closable example document tabs in the designated area with a maximum width of 240px and minimum height of 116px. Initially keep two documents, Note and Record, with real panels and select Note. Lay out the top as a minmax(0,1fr) tab group and a 44px close button with an 8px gap. Inside a tablist named Open documents, use real tab buttons of equal width and 44px height. Mark only the active tab with a 3px indigo underline, a pale theme surface, accent text, aria-selected true and tabIndex 0. Connect each tab aria-controls and panel aria-labelledby with instance-unique IDs, and exclude inactive panels using hidden and display none. Each panel has an 8px top gap, minimum height 64px, 12px padding, a 1px border, 10.4px corners, a theme surface and tabIndex 0; center only a 24px FileText SVG and its document name. Clicking, Enter, Space and focus select the tab. Left and right arrows cycle through remaining documents; Home and End move selection and focus to the first and last document. Preserve default scrolling for up and down arrows. Tab moves from the active tab through the independent close button to the current panel. The close button uses an 18px X SVG, a 44px target and an accessible name combining the current document name with Close document. Clicking it or pressing Delete on a tab removes that document tab and panel from the DOM and moves selection and focus to the next document on the right, or the previous one on the left if no right neighbor exists. After closing the last document, show only a 44px Restore documents button with a 16px RotateCcw SVG within the same minimum height and move focus to it. Restore both example documents to their initial state and focus the first Note tab. Do not steal focus on initial mount; reconnect focus to the new DOM only after close or restore. Reuse existing tab, panel and icon-button CSS, but handle document removal lifetime in a separate small component. Match light and dark contrast, 2px focus outlines, narrow-screen boundaries and top toolbar clearance. Do not add real file deletion, saving, timers, animation, a separate heading, description or execution count."
  },
  "sticky-announcement-banner": {
    "summary": "Keep a recommendation banner genuinely sticky at the top of an independent scrolling list.",
    "vibeTag": "Recommendations remain while the list scrolls",
    "vibeKeywords": [
      "sticky banner",
      "sticky announcement",
      "scrolling recommendations"
    ],
    "promptSnippet": "Create an independent vertical scrolling viewport inside an outer frame with maximum width 240px, height 170px, a 1px theme border, 12px corners, a theme surface and overflow hidden. The inner viewport uses 100% width and height, overflow-y auto, overscroll-behavior-y contain, scrollbar-width thin and scrollbar-color theme-border-color/transparent by default. In browsers supporting ::-webkit-scrollbar, reset both standard scrollbar properties to auto and draw an arrow-free scrollbar with 6px width, a transparent track, a rounded theme-border-color thumb at least 24px tall and hidden scrollbar-button elements. Give the track 42px top and 6px bottom clearance so the thumb does not overlap the 36px header. Name the role region Program list and use tabIndex 0 to support mouse-wheel, touch and keyboard scrolling. Paint the inner viewport background with a linear-gradient: accent color for its upper 36px and theme surface below, extending the banner color behind the thin scrollbar. Clip both scrollbar and content within the rounded frame. Initially show the entire 36px banner and three entire 44px rows. The top recommendation banner must use real position sticky, top 0 and z-index 1, with minimum height 36px, vertical padding 8px, horizontal padding 12px and an 8px gap between a 16px Sparkles SVG and bold 12px text This week's picks. Its opaque indigo surface and contrasting text cover the list below while remaining at the same top position inside the scrolling viewport. Follow it with a real ul/li list of Light exhibition, Summer performance, Weekend workshop, Space walk and Small concert. Each row uses minimum height 44px, 13px text, vertical padding 8px, horizontal padding 12px and a subtle separator. List contents move with real scrolling while the initial banner DOM remains. Use a white list, dark text, dark indigo banner and white banner text in light mode; use a slate list, bright text, light indigo banner and dark banner text in dark mode, with color-scheme dark on the dark viewport. Show a 2px focus outline with offset 2px on frame focus-within and remove only the inner viewport's default outline. Align banner and rows and respect narrow-screen boundaries and top toolbar clearance. Do not fix the entire page or add scroll events, timers, state, click-based fake scrolling, automatic animation, buttons, a separate heading, scrolling instructions or execution counts."
  },
  "folded-edge-ribbon": {
    "summary": "Express a ribbon badge with a small fold outside a card and a notched tail.",
    "vibeTag": "A folded edge adds depth",
    "vibeKeywords": [
      "ribbon banner",
      "folded tag",
      "notched ribbon"
    ],
    "promptSnippet": "Create a centered collection card in the designated area, no wider than 200px and 112px tall, with a 1px theme border and 12px corners. Add 24px top padding to its content and center only a 24px Sparkles SVG and the collection name with an 8px gap. Position an 88px-wide, 24px-tall ribbon at left -6px and top 12px of the card. The inner ribbon strip uses the real badge text News, bold 12px type, 8px right padding and an indigo background. Use clip-path polygon(0 0,100% 0,calc(100% - 8px) 50%,100% 100%,0 100%) to cut an 8px V notch into the right tail. On the outer ribbon wrapper, create an after triangle at left 0 and top 24px using border-top 6px and transparent border-left 6px to represent the folded face behind the card edge. Apply clip-path only to the inner strip so it does not cut off the fold, and do not hide the ribbon outside the card. In light mode use a white card, dark indigo strip, white badge text and a darker folded face; in dark mode use a slate card, light indigo strip, dark badge text and a medium indigo fold. Hide the decorative SVG from accessibility and keep the ribbon wording as one real text instance. Check the 6px protrusion, corners and content alignment on narrow screens and within top toolbar clearance. Do not add buttons, timers, animation, a separate heading, description or execution counts."
  },
  "vertical-rail-tabs": {
    "summary": "Connect a left vertical tab rail to right panels and select content with up and down arrows.",
    "vibeTag": "Switch content quickly from a side rail",
    "vibeKeywords": [
      "vertical tabs",
      "left rail",
      "side tabs"
    ],
    "promptSnippet": "Create a vertical tab layout in the designated area with maximum width 240px, a 76px left column and minmax(0,1fr) right column separated by 8px. Stack Document and Colors tab buttons on the left with 4px gaps and initially select Document. Name the tablist Preview type, set aria-orientation vertical and show a neutral divider on the right. Tabs use minimum height 44px, bold 13px text and a transparent 3px left border; only the active tab has an indigo border, accent text and pale theme surface. Connect actual tabs and right panels bidirectionally using instance-unique IDs, aria-controls and aria-labelledby. Only the selected tab uses aria-selected true and tabIndex 0; others use -1. Up and down arrows cycle focus and selection vertically; Home and End move to first and last tabs. Do not intercept left/right arrows or normal Tab behavior. Click, Enter, Space, touch and focus also select that tab, and Tab moves to the current panel. Right panels use minimum height 96px, 12px padding, a theme surface, 1px border, 10.4px corners, role tabpanel and tabIndex 0. In Document show a 24px FileText SVG with the name Note; in Colors show indigo, mint and amber swatches sized 36×24px with 8px gaps and accessible color names. Hide inactive panels using hidden and display none while keeping their DOM. In narrow right-hand space wrap the swatches and let the layout height grow to fit. If horizontal tabs already exist, reuse their state, ID, panel and focus logic and change only arrow direction and rail layout. Match light/dark contrast, 2px focus outlines, narrow-screen boundaries and top toolbar clearance. Do not add initial autofocus, timers, animation, networking, a separate heading, description or execution counts."
  },
  "dot-wave-waiting-bubble": {
    "summary": "Show a compact waiting indicator with three staggered moving dots inside a speech bubble.",
    "vibeTag": "Small dots convey waiting in sequence",
    "vibeKeywords": [
      "waiting bubble",
      "three-dot loader",
      "dot wave"
    ],
    "promptSnippet": "Create a small centered waiting bubble in the designated area, no wider than 88px and 48px tall. Use a 1px neutral theme border, theme surface and asymmetric corners of 16px 16px 16px 4px, with centered flex layout and 6px gaps. Inside, place three non-shrinking 8px circular dots, dark indigo in light mode and light indigo in dark mode. Each dot uses aria-hidden true and a 1.2-second ease-in-out infinite animation: translateY(0) and opacity .7 at 0%, 60% and 100%, and translateY(-5px) and opacity 1 at 30%. Stagger their animation-delay values by 0ms, 160ms and 320ms to create a continuous wave. Give the outer bubble role status and exactly one screen-reader-only text Waiting for a response so dot movements do not repeatedly announce status. With reduced motion, remove movement and repetition and leave three stationary dots with opacity 1. Match dots, spacing, border, color contrast and central alignment in light/dark modes, narrow screens and within top toolbar clearance. Demonstrate only a waiting appearance without actual messages, AI, response generation, completion transitions, JS timers, focus manipulation, buttons, visual headings, descriptions or execution counts."
  },
  "stable-skeleton-content": {
    "summary": "Toggle equal-sized skeleton and content states to avoid layout shifts.",
    "vibeTag": "Content appears without moving its place",
    "vibeKeywords": [
      "skeleton transition",
      "stable loading placeholder",
      "content reveal"
    ],
    "promptSnippet": "Create a centered frame in the designated area with maximum width 240px, two columns minmax(0,1fr) and 44px, and an 8px gap. The left side is a Note preview 88px tall with 12px padding, a 1px border and 12px corners; the right side is a 44px toggle button. Give the preview a unique ID, role group, accessible name Note preview and initial aria-busy true. Initially hide real content and show an absolute skeleton inset 12px. Align a 36px square and two bars of different widths and heights 10px and 8px with a 10px gap; pulse opacity 1→.45→1 over 1.4 seconds ease-in-out indefinitely. Separate the bars by 8px and make the second bar 65% wide. Hide the whole skeleton with aria-hidden true and use the theme track color. The toggle button is named Show example content and uses an 18px Eye SVG and aria-controls pointing to the preview ID; click, Enter, Space or touch toggles content state. In content state set aria-busy false, skeleton visibility hidden and stop its animation; in the same preview show a 36px icon area with a 24px FileText SVG, title Weekly notes and content Design collection using a 250ms opacity 0→1 transition. Content initially has aria-hidden true and visibility hidden, changing to false and visible when ready. The button changes to the name Show loading appearance again and an 18px RotateCcw SVG; pressing it again restores the initial skeleton. Preserve the DOM, dimensions and focus of the card, entire frame and button in both states, without initial autofocus. With reduced motion remove both skeleton repetition and content fade. Match light/dark surfaces, body text, track, accent and focus contrast, and the alignment of the 88px card and 44px button on narrow screens and inside top toolbar clearance. This is a local comparison of fixed loading/content examples; do not add real requests, successful completion, JS timers, a separate heading, description or execution counts."
  },
  "manual-banner-carousel": {
    "summary": "Cycle banners with fixed previous/next controls and expose only the current slide.",
    "vibeTag": "Choose each banner yourself",
    "vibeKeywords": [
      "manual banner",
      "previous next",
      "banner carousel"
    ],
    "promptSnippet": "Create a manual banner in the designated area with maximum width 240px. Give the outside role group, accessible name This month's programs and aria-roledescription carousel, initially showing the first of three slides: Light exhibition, Summer performance and Weekend workshop. Inside a window 88px tall with a 1px border, 12px corners and overflow hidden, put a flex track containing three non-shrinking slides, each width 100%. Transition the track translateX(-activeIndex * 100%) with 350ms ease. Each slide has 16px padding, a real 14px title and a right-hand 36px Frame/Music2/Paintbrush SVG. Use pale indigo, pink and mint surfaces with dark text in light mode, and their dark surfaces with bright text in dark mode. Give each slide role group, aria-roledescription slide and aria-labelledby pointing to its unique title ID; expose only the current slide using aria-hidden false. The track uses aria-live polite and aria-atomic false; hide decorative image SVGs. Below the window with an 8px gap, put a three-column row containing a 44px Previous program button, three decorative center dots and a 44px Next program button. Buttons use fixed 18px ChevronLeft/ChevronRight SVGs; click, Enter, Space and touch cycle the index backward or forward. Previous on the first wraps to the last; next on the last wraps to the first, using the same track transition. Even batched rapid input must preserve every move and retain the activated button and its focus. Center dots are 6px circles, with only the current one changing to an 18px capsule and accent color. Hide them with aria-hidden so they do not become separate Tab controls or execution counts. Do not add another heading, description or number besides slide titles. With reduced motion change the track immediately; fit the banner, 44px buttons, focus outlines and contrast inside narrow-screen and top toolbar boundaries. This is a local banner demonstration without real content requests, navigation links, dragging, autoplay or timers."
  },
  "circular-sweep-spinner": {
    "summary": "Combine rotation and changing arc length to show circular loading without a completion percentage.",
    "vibeTag": "An expanding arc flows around a circle",
    "vibeKeywords": [
      "circular spinner",
      "rotating loader",
      "sweep loading"
    ],
    "promptSnippet": "Create a centered 48px-square circular indeterminate spinner in the designated area. The outer div uses role progressbar named Content loading, with no aria-valuenow or percentage. Hide the inner 48×48 SVG with viewBox 0 0 48 48 using aria-hidden true. Overlay two circles, one track and one active circle, with cx 24, cy 24, r 18, fill none and stroke-width 4. Use track colors light #e0e7ff and dark #334155, and active arc colors light #4338ca and dark #a5b4fc with round linecap. Normalize the active circle pathLength to 100. Animate it indefinitely over 1.8 seconds ease-in-out from stroke-dasharray 5 95 and dashoffset 0, through 70 30 and -25 at 50%, to 5 95 and -100 at the end. Simultaneously rotate the whole SVG infinitely from -90deg to 270deg over 1.4 seconds linear. Implement rotation and arc length using CSS animation only, without repeatedly generating DOM, state or JS timers. With reduced motion remove both animations and show a fixed arc with SVG -90deg, dasharray 25 75 and dashoffset 0. Do not announce the stationary arc as 25% progress; retain the indeterminate loading name. Match the centers, dimensions, rounded ends and contrast of both circles, and their placement within narrow-screen and top toolbar boundaries. This is a local loading demonstration without actual requests or completion transitions. Do not add headings, descriptions, success wording, execution counts or control buttons."
  },
  "indeterminate-linear-loader": {
    "summary": "Use two repeatedly moving bars to indicate loading with no known completion percentage.",
    "vibeTag": "Flow conveys waiting without a percentage",
    "vibeKeywords": [
      "indeterminate loading",
      "linear loader",
      "in-progress indicator"
    ],
    "promptSnippet": "Create a centered indeterminate linear loader in the designated area with maximum width 240px, height 8px and rounded capsule ends. Use overflow hidden on the track and colors light pale indigo #e0e7ff and dark slate #334155. Give the track role progressbar named Content loading. Because completion is unknown, do not provide aria-valuenow or a visible percentage. Overlay two decorative span bars positioned absolute at left 0, height 100% and width 40%, with aria-hidden true. Use bar colors light #4338ca and dark #a5b4fc. Move each infinitely over 1.8 seconds ease-in-out from translateX(-100%) scaleX(.5), through translateX(120%) scaleX(1) at 50%, to translateX(350%) scaleX(.5). Offset the second bar by a -.9-second delay, half a cycle, and clip both ends within the track. With reduced motion stop all movement, leave only the first bar stationary at left 30% and width 40%, and hide the second bar. This stationary length does not mean 40% progress; retain the loading state name. Match track size, alignment and theme contrast on narrow screens and inside top toolbar clearance. This is a local, never-completing loading appearance demonstration. Do not add actual requests, progress percentages, completion transitions, JS timers, a separate heading, description, success wording, execution counts or control buttons."
  },
  "underline-content-tabs": {
    "summary": "Mark the current tab with an underline and connect keyboard selection to real content panels.",
    "vibeTag": "Selected content follows its underline",
    "vibeKeywords": [
      "content tabs",
      "underline tabs",
      "tab panels"
    ],
    "promptSnippet": "Create two tabs, Document and Colors, and content panels in the designated area with maximum width 240px. Initially activate Document and show a 24px FileText SVG beside the name Note in its panel. The Colors panel shows three indigo, mint and amber swatches sized 36×24px with 8px gaps, providing each color name for screen readers. Give the tab group role tablist named Preview type. Each actual button uses role tab, a unique ID, aria-controls and aria-selected, with tabIndex 0 only on the active tab and -1 on the others. Tabs have equal width, height 44px and bold 13px type; mark selection with a bottom 3px underline and pale theme surface. Click, Enter, Space, touch and focus select a tab. Left and right arrows cycle focus and immediately select; Home and End move focus and selection to the first and last tabs. Do not block default scrolling for up and down arrows. Tab exits from the active tab to its current panel and Shift+Tab returns to the active tab. Each panel uses role tabpanel, a unique ID, aria-labelledby pointing to its tab and tabIndex 0. Exclude inactive panels from display, focus and the accessibility tree with hidden. Panels sit 8px below the tabs, with minimum height 64px, 12px padding, a 1px border, 10.4px corners and a theme surface. Keep both panels in the DOM. Match light/dark text, indigo accent and border contrast and 2px keyboard focus outlines for tabs and panels; place them within narrow-screen boundaries and top toolbar clearance. Isolate IDs per instance and do not add initial autofocus, timers, animation, networking, a separate heading, description or execution counts."
  }
} satisfies Record<string, TechniqueTranslation>;
