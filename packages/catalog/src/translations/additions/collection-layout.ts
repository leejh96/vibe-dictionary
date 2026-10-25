import type { TechniqueTranslation } from '../../localization';

export const EN_LAYOUT_COLLECTION: Record<string, TechniqueTranslation> = {
  "ly-circular-thumbnail-gallery": {
    "summary": "Selecting a perimeter thumbnail updates the central preview",
    "vibeTag": "Scenes around a circle",
    "vibeKeywords": [
      "Circular Thumbnail Gallery",
      "circular gallery",
      "ring layout"
    ],
    "promptSnippet": "Build Circular Thumbnail Gallery in the specified area. Arrange five 36px buttons around an ellipse with horizontal radius 85 and vertical radius 53. Initially select the first, reflecting its color and number in a central 56px disk. Clicking updates selected index and aria-pressed while preserving focus visibility. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-triangle-tessellation-grid": {
    "summary": "Alternating upright and inverted triangles tile a geometric field",
    "vibeTag": "A field of triangles",
    "vibeKeywords": [
      "Triangle Tile Tessellation",
      "triangle grid",
      "tessellation"
    ],
    "promptSnippet": "Build Triangle Tile Tessellation in the specified area. Tile six columns and four rows of triangle pairs in a 280×160 SVG using 40px width and 35px height units. Each pair contains upright and inverted triangles with colors cycling by row and column. Clip at the SVG boundary. Keep this a static composition with no autoplay or input behavior. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-justified-image-rows": {
    "summary": "Different thumbnail proportions fill equal-height rows from edge to edge",
    "vibeTag": "Images fitted into rows",
    "vibeKeywords": [
      "Justified Image Rows",
      "justified gallery",
      "equal height photos"
    ],
    "promptSnippet": "Build Justified Image Rows in the specified area. Use two flex rows of three landscapes, each 65px high. Set ratios to 1.6:1:1.3 and .8:1.8:1.3 with 5px gaps. Fill cells with preserveAspectRatio slice and use min-width 0 to fit narrow widths. Keep this a static composition with no autoplay or input behavior. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-overlap-editorial-grid": {
    "summary": "An oversized headline overlaps image columns in a magazine-style layout",
    "vibeTag": "An overlapping editorial rhythm",
    "vibeKeywords": [
      "Overlapping Editorial Grid",
      "overlap layout",
      "magazine heading"
    ],
    "promptSnippet": "Build Overlapping Editorial Grid in the specified area. Use six columns and rows of 30, 65 and 45px. Place a landscape across columns 3–6 and all rows, then overlap a bold 35px serif headline across columns 1–5 in the second row at z-index 1. Add a small edition caption at bottom left. Keep this a static composition with no autoplay or input behavior. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-alternating-feature-rows": {
    "summary": "Feature rows alternate the image and text order",
    "vibeTag": "A story alternating sides",
    "vibeKeywords": [
      "Alternating Feature Rows",
      "alternating rows",
      "feature layout"
    ],
    "promptSnippet": "Build Alternating Feature Rows in the specified area. Create three rows with a 75×40 colored symbol tile beside a title and short rule. Reverse only the middle row with flex-direction row-reverse and keep 12px spacing. Keep each feature text group together despite the visual alternation. Keep this a static composition with no autoplay or input behavior. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-perspective-text-crawl": {
    "summary": "Tilted text moves toward an upper vanishing point",
    "vibeTag": "Words receding into distance",
    "vibeKeywords": [
      "Perspective Text Crawl",
      "perspective crawl",
      "opening text"
    ],
    "promptSnippet": "Build Perspective Text Crawl in the specified area. Use a 155px viewport with 200px perspective and four centered yellow lines. Around a bottom-center origin apply rotateX(35deg) translateY(70-210p px). Drive this preview by automatic progress rather than requiring page scrolling. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-sticky-stacked-cards": {
    "summary": "Later cards layer over earlier sticky cards as the local viewport scrolls",
    "vibeTag": "Cards stacking in sequence",
    "vibeKeywords": [
      "Sticky Stacked Cards",
      "sticky stack",
      "stacking cards"
    ],
    "promptSnippet": "Build Sticky Stacked Cards in the specified area. Inside a 140px scroll viewport place three 108px cards with 45px bottom margins. Set each to sticky top=i×7px so later DOM siblings layer over earlier ones. Set scrollTop=p×(scrollHeight-clientHeight) automatically so the demonstration needs no scrollbar manipulation. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-horizontal-timeline-track": {
    "summary": "An automatic horizontal sweep reveals a connected timeline of years and events",
    "vibeTag": "Move along a timeline",
    "vibeKeywords": [
      "Horizontal Timeline Track",
      "timeline scroll",
      "history track"
    ],
    "promptSnippet": "Build Horizontal Timeline Track in the specified area. Build a 580px flex track with five year/event cards for 2022–2026, each 100px wide with 16px gaps. Give the track 8px horizontal padding and position relative, with left: 100p% and translateX(-100p%) inside an overflow-hidden viewport. The left percentage uses the viewport width while translation uses the track width, aligning both right edges at p=1 at every available width. Automatically demonstrate horizontal exploration without requiring scroll input. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-footer-uncover-scroll": {
    "summary": "The scrolling page uncovers a footer held behind it",
    "vibeTag": "A footer uncovered",
    "vibeKeywords": [
      "Footer Uncover Scroll",
      "footer reveal",
      "uncover footer"
    ],
    "promptSnippet": "Build Footer Uncover Scroll in the specified area. In a 140px scroll viewport place a 290px page at relative position and z-index 1, followed by a 75px footer at sticky bottom 0. The opaque page and its shadow conceal the footer until the scroll approaches the end. Set scrollTop to p times the maximum scroll distance. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-scroll-linked-path": {
    "summary": "A document preview scrolls while an adjacent curve is drawn",
    "vibeTag": "A path drawn as you read",
    "vibeKeywords": [
      "Scroll Linked Path Drawing",
      "scroll path",
      "document path"
    ],
    "promptSnippet": "Build Scroll Linked Path Drawing in the specified area. Overlay a pale vertical S-path and purple stroke on the left. Use pathLength 1, strokeDasharray 1 and strokeDashoffset 1-p. Drive a 140px list viewport on the right with the same p times its maximum scroll distance. This automatically coordinated preview does not read a manually scrolled position. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-document-minimap-navigation": {
    "summary": "Miniature page buttons jump the larger preview to a selected section",
    "vibeTag": "A small map of the document",
    "vibeKeywords": [
      "Document Minimap Navigation",
      "document minimap",
      "page minimap"
    ],
    "promptSnippet": "Build Document Minimap Navigation in the specified area. Stack three pages in a 140px-high viewport on the left and place 40px miniature buttons on the right. Start at the first page; selecting a button transitions the content to translateY(-140×index) over 350ms. Show current position through aria-pressed and an outline. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-collapsed-breadcrumb-path": {
    "summary": "Middle breadcrumb items collapse into an ellipsis and can be expanded",
    "vibeTag": "A long path made compact",
    "vibeKeywords": [
      "Collapsed Breadcrumb Path",
      "breadcrumb ellipsis",
      "collapsed path"
    ],
    "promptSnippet": "Build Collapsed Breadcrumb Path in the specified area. Show the first and last of four breadcrumb items, replacing the middle two with an ellipsis button. Clicking expands the middle items and reveals Collapse. Path buttons update a local selected-location output without real navigation; initially select the final item. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-flyout-branch-menu": {
    "summary": "A parent item reveals child choices in an adjacent menu column",
    "vibeTag": "Choices that branch out",
    "vibeKeywords": [
      "Branch Flyout Menu",
      "child flyout",
      "branch menu"
    ],
    "promptSnippet": "Build Branch Flyout Menu in the specified area. Place an Images/Documents child panel beside a Library button. Start with the child panel hidden and toggle it together with the parent aria-expanded state. Child selection updates a local index, output label and aria-pressed. Do not require mouse hover. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-vertical-journey-rail": {
    "summary": "A vertical rail of steps switches the current journey preview",
    "vibeTag": "A journey one step at a time",
    "vibeKeywords": [
      "Vertical Journey Rail",
      "journey steps",
      "vertical rail"
    ],
    "promptSnippet": "Build Vertical Journey Rail in the specified area. Stack Start, Explore and Finish buttons beside a purple vertical rule, showing the selected symbol and name on the right. Initially select Start; clicking updates aria-current step and aria-pressed. Do not infer completion of earlier steps or modify real workflow data. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-workspace-switcher": {
    "summary": "A disclosure button lets the user choose a different sample workspace",
    "vibeTag": "Switch your workspace",
    "vibeKeywords": [
      "Workspace Switcher",
      "workspace picker",
      "team switcher"
    ],
    "promptSnippet": "Build Workspace Switcher in the specified area. Initially show Personal from Personal, Studio and Team. The top button opens choices; selecting one changes the selected index and closes the list. Use native buttons with aria-expanded and aria-pressed. There is no account switching or server request. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-multitrack-clip-timeline": {
    "summary": "Selecting clips on video, title and audio tracks updates a local inspector",
    "vibeTag": "Time arranged across tracks",
    "vibeKeywords": [
      "Multitrack Clip Timeline",
      "clip timeline",
      "track editor"
    ],
    "promptSnippet": "Build Multitrack Clip Timeline in the specified area. Place fixed labels beside three horizontal tracks. Set clip starts to i×13% and widths to 85-i×18%, using selectable buttons. Initially select the first clip and show its track name and clip number below. No real media playback or timing editing is involved. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-collapsible-run-log": {
    "summary": "A console panel independently expands preparation, validation and completion log groups",
    "vibeTag": "Expand the log you need",
    "vibeKeywords": [
      "Collapsible Run Log",
      "log groups",
      "collapsible console"
    ],
    "promptSnippet": "Build Collapsible Run Log in the specified area. Stack three native details elements in a dark panel, initially opening only the first. Each summary shows a stage name and check, with small monospace sample log text inside. Demonstrate disclosure behavior without executing commands. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-column-visibility-table": {
    "summary": "Checkboxes independently show or hide value and status columns",
    "vibeTag": "Keep the columns you need",
    "vibeKeywords": [
      "Column Visibility Table",
      "hide columns",
      "column picker"
    ],
    "promptSnippet": "Build Column Visibility Table in the specified area. Render a native table with Item, Value and Status columns and three sample rows. Value and Status checkboxes start checked; toggling either renders or removes its header and every associated cell together. Keep the Item column and all data values unchanged. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-crossfilter-summary-bars": {
    "summary": "Selecting a bar changes a summary total to that group value",
    "vibeTag": "Selection updates the summary",
    "vibeKeywords": [
      "Crossfilter Summary Bars",
      "crossfilter",
      "selection total"
    ],
    "promptSnippet": "Build Crossfilter Summary Bars in the specified area. Show bars with values 34, 67 and 48 and an initial total of 149. Clicking a bar selects it, displays its value in the summary and dims the others to opacity .3. Clicking it again clears selection and restores the total. Update aria-pressed. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "ly-overview-detail-chart": {
    "summary": "Move a window over an overview chart to update the detailed segment above",
    "vibeTag": "Overview and detail together",
    "vibeKeywords": [
      "Overview and Detail Chart",
      "overview detail",
      "windowed chart"
    ],
    "promptSnippet": "Build Overview and Detail Chart in the specified area. Draw a fixed 14-value series as a miniature overview and show seven values from start in a larger line chart above. Start at zero and adjust using a 0–7 range. Move the 128px overview window to x=start×20+6 and output the displayed start/end indices. Keep user changes until the next explicit interaction; do not drive input state automatically. Native buttons and inputs must work with a keyboard, and reduced motion removes transitions. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  }
};
