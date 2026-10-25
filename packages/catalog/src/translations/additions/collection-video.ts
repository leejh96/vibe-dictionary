import type { TechniqueTranslation } from '../../localization';

export const EN_VIDEO_COLLECTION: Record<string, TechniqueTranslation> = {
  "vd-squeeze-tube-dispense": {
    "summary": "A tube narrows as a cream-like stroke appears below its nozzle",
    "vibeTag": "A soft squeeze of cream",
    "vibeKeywords": [
      "Squeeze Tube Dispense Shot",
      "tube packshot",
      "cream dispense"
    ],
    "promptSnippet": "Build Squeeze Tube Dispense Shot in the specified area. Move the lower tube sides inward by 10p px and the tube downward by 8p px. Reveal a cream path below the nozzle using pathLength 1, strokeDashoffset 1-p, a 12px warm contact shadow stroke (#c9bda6) and a 9px white round stroke. No viscosity or pressure simulation is involved. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-color-swatch-fan-reveal": {
    "summary": "Five color swatches fan out from a shared pin",
    "vibeTag": "A fan of color choices",
    "vibeKeywords": [
      "Color Swatch Fan Reveal",
      "color chips",
      "swatch fan"
    ],
    "promptSnippet": "Build Color Swatch Fan Reveal in the specified area. Stack five 40×130 paper swatches around a shared pivot at 140,135. Rotate each by (i-2)×24p degrees, placing color in a 32×90 upper area and a pin below. Start stacked, fan outward and return. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-floating-ingredient-packshot": {
    "summary": "Leaves and fruit slices float around a central product bottle",
    "vibeTag": "A product surrounded by ingredients",
    "vibeKeywords": [
      "Floating Ingredient Packshot",
      "floating ingredients",
      "ingredient packshot"
    ],
    "promptSnippet": "Build Floating Ingredient Packshot in the specified area. Keep a central bottle fixed and place five leaf/fruit shapes on an ellipse of radii 87 and 53. Use angle 2πi/5+.7p and individual rotation 40i+30p degrees. This decorative packshot does not assert ingredient facts or simulate physical levitation. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-pull-tab-can-opening": {
    "summary": "A can tab lifts as the opening and small bubbles become visible",
    "vibeTag": "The moment a tab lifts",
    "vibeKeywords": [
      "Pull Tab Can Opening",
      "pull tab",
      "can opening"
    ],
    "promptSnippet": "Build Pull Tab Can Opening in the specified area. Place a pull tab made from two ellipses on the can top. Change its vertical scale to 1-.8p and rotation to -20p degrees, enlarging the dark opening below. Move five small bubbles upward with opacity p. This approximates lifting without gas or 3D hinge simulation. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-pouch-seal-opening": {
    "summary": "The front and back pouch lips separate to reveal a dark interior",
    "vibeTag": "A pouch seal opens",
    "vibeKeywords": [
      "Pouch Seal Opening",
      "pouch opening",
      "package seal"
    ],
    "promptSnippet": "Build Pouch Seal Opening in the specified area. Keep a kraft pouch body fixed and vary the opening ellipse ry as 2+16p. Separate the front and back lip curves toward y=39+16p and y=39-16p using 7px light-kraft strokes. Do not simulate tearing or falling contents. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-diagonal-type-conveyor": {
    "summary": "Three diagonal type bands move in alternating directions",
    "vibeTag": "A message on the diagonal",
    "vibeKeywords": [
      "Diagonal Typography Conveyor",
      "diagonal copy",
      "type bands"
    ],
    "promptSnippet": "Build Diagonal Typography Conveyor in the specified area. Set three repeated MOVE lines in bold 30px type and tilt the group -14deg. Use a lime middle band with dark text and lavender text for the outer lines. Alternate translateX by ±90p, clipping at the viewport. This is a back-and-forth preview rather than seamless infinite motion. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-price-strike-replacement": {
    "summary": "A strike crosses an old sample price before a new price appears below",
    "vibeTag": "Strike through to a new price",
    "vibeKeywords": [
      "Price Strike Replacement",
      "price replacement",
      "sale typography"
    ],
    "promptSnippet": "Build Price Strike Replacement in the specified area. Grow a pink strike over an old sample price to width min(1,2p)×110%, tilted -8deg. Reveal a new price below with opacity=max(0,(p-.3)/.7) and translateY=(1-p)×12px. Prices are fixed sample copy without actual discounts, purchases or product data. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-circular-word-burst": {
    "summary": "Eight short words spread outward from the center",
    "vibeTag": "Words bursting outward",
    "vibeKeywords": [
      "Circular Word Burst",
      "word burst",
      "radial typography"
    ],
    "promptSnippet": "Build Circular Word Burst in the specified area. Place eight NEW words at 45deg intervals, spreading them over horizontal radius 18+68p and vertical radius 12+42p. Use font size 12+4p and rotate each word to its radial angle. Grow a central lime disk to radius 8+7p. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-elastic-word-stamp": {
    "summary": "A framed word compresses and settles like an elastic stamp",
    "vibeTag": "A word stamped with bounce",
    "vibeKeywords": [
      "Elastic Word Stamp",
      "word stamp",
      "stamp motion"
    ],
    "promptSnippet": "Build Elastic Word Stamp in the specified area. Tilt a red-framed APPROVED word by -9deg. Use q=min(1,2p), b=sin(3πq)(1-q), scaleX=.65+.35q+.12b and scaleY=1.4-.4q-.15b to compress and settle it. Set opacity=.2+.8q. This decorative word does not perform an approval action. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-quote-bracket-reveal": {
    "summary": "Quotation marks separate to expose a centered line of copy",
    "vibeTag": "A quote between brackets",
    "vibeKeywords": [
      "Quote Bracket Copy Reveal",
      "quote copy",
      "quotation reveal"
    ],
    "promptSnippet": "Build Quote Bracket Copy Reveal in the specified area. Place large quotation marks at the upper left and lower right of the copy, initially moving each 80px inward. As p grows return translateX to zero and set the centered text horizontal clip insets to (1-p)×50% with opacity p. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-slopegraph-paired-reveal": {
    "summary": "Connected before/after points reveal the direction of change",
    "vibeTag": "Change between two points",
    "vibeKeywords": [
      "Slopegraph Paired Reveal",
      "slope chart",
      "before after lines"
    ],
    "promptSnippet": "Build Slopegraph Paired Reveal in the specified area. Plot before values 30, 65 and 45 at x=48 with after targets 72, 44 and 57 at x=232. Move right points using x=48+184p and value=before+(after-before)p, updating connecting lines and bold 12px numbers together. Use y=136-1.2×value. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-waffle-percent-fill": {
    "summary": "A hundred-cell grid fills toward a target percentage",
    "vibeTag": "A percentage filled in cells",
    "vibeKeywords": [
      "Waffle Percent Fill",
      "waffle chart",
      "hundred-cell share"
    ],
    "promptSnippet": "Build Waffle Percent Fill in the specified area. Arrange 100 squares in a 10×10 grid with 10px cells and 3px gaps. Fill the first count=round(68p) cells in purple and show count% beside them. Each cell represents exactly 1%, approaching a sample share of 68%. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-diverging-bar-reveal": {
    "summary": "Negative and positive bars grow in opposite directions from zero",
    "vibeTag": "Values on both sides of zero",
    "vibeKeywords": [
      "Diverging Bar Reveal",
      "diverging bars",
      "positive negative chart"
    ],
    "promptSnippet": "Build Diverging Bar Reveal in the specified area. Use a vertical zero axis at x=140 for values -45, 62, -28 and 83. Bar width is abs(value)×p; negative bars start at 140+value×p and positive bars at 140. Use pink for negatives and purple for positives, synchronizing labels to round(value×p). Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-bullet-target-comparison": {
    "summary": "An actual-value bar is compared with a target marker over qualitative bands",
    "vibeTag": "Actual against target",
    "vibeKeywords": [
      "Bullet Target Comparison",
      "bullet chart",
      "target comparison"
    ],
    "promptSnippet": "Build Bullet Target Comparison in the specified area. Map a 230px width to values 0–100 and show three pale-purple bands with boundaries at 40, 60 and 100. Grow the actual bar to 72p while keeping the target marker at 80. Display actual and target numbers below for an exact comparison. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-polar-area-reveal": {
    "summary": "Equal-angle sectors grow with areas proportional to their values",
    "vibeTag": "Data opening around a center",
    "vibeKeywords": [
      "Polar Area Reveal",
      "polar area chart",
      "rose chart"
    ],
    "promptSnippet": "Build Polar Area Reveal in the specified area. Place values 80, 45, 65, 30 and 95 in equal 72deg sectors. Set radius=65sqrt(value/100×p) so area is proportional to value and leave .07 radians between sectors. Add three reference circles and a value list below. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-interview-split-screen": {
    "summary": "Host and guest panels alternate an active-speaker outline",
    "vibeTag": "Two viewpoints side by side",
    "vibeKeywords": [
      "Interview Split Screen",
      "split interview",
      "conversation layout"
    ],
    "promptSnippet": "Build Interview Split Screen in the specified area. Place two silhouettes in equal-width 140px-high panels with Host and Guest lower labels. Highlight only the left panel when p<.5 and the right otherwise with a lime outline. This composition demo does not use cameras, audio or speaker detection. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-safe-frame-overlay": {
    "summary": "Two inset frames and a center cross show illustrative caption margins",
    "vibeTag": "Safe margins inside the frame",
    "vibeKeywords": [
      "Safe Frame Guide Overlay",
      "safe frame",
      "caption margins"
    ],
    "promptSnippet": "Build Safe Frame Guide Overlay in the specified area. Overlay a 280×160 landscape with a white dashed frame inset 5% on each edge and a lime solid frame inset 10%. Add a center cross and translucent caption box below. These illustrative margins do not guarantee compliance with a broadcast or platform specification. Keep this a static composition with no autoplay or input behavior. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-sports-score-bug": {
    "summary": "A fixed score overlay updates above a stylized playing field",
    "vibeTag": "A score alongside the action",
    "vibeKeywords": [
      "Sports Score Bug",
      "score bug",
      "broadcast scoreboard"
    ],
    "promptSnippet": "Build Sports Score Bug in the specified area. Place two team names and a central score block over a green field, center line and circle. Set the left score to min(5,floor(6p)), keep the right at 2 and move a small ball horizontally along a sine-shaped path. These are sample scores, not live sports data. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-replay-stinger-panel": {
    "summary": "A skewed colored panel carrying a replay label crosses the frame",
    "vibeTag": "A cue for the replay",
    "vibeKeywords": [
      "Replay Stinger Panel",
      "replay transition",
      "stinger panel"
    ],
    "promptSnippet": "Build Replay Stinger Panel in the specified area. Place a 310px lime panel and a white leading stripe over the scene, skewing the group -15deg. Move it with x=-310+620p to enter and exit the frame. Center REPLAY on the panel without rewinding video or changing playback speed. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "vd-countdown-film-slate": {
    "summary": "Large numbers inside double rings and a rotating line evoke a film leader",
    "vibeTag": "A scene begins with a countdown",
    "vibeKeywords": [
      "Countdown Film Slate",
      "film leader",
      "countdown slate"
    ],
    "promptSnippet": "Build Countdown Film Slate in the specified area. Draw a crosshair and double rings of radii 64 and 58 on gray, rotating a radial line inside by 2πp. Display max(0,10-floor(10p)). This is a 10→0→10 visual sequence on the shared eight-second triangular clock, not a ten-second timer. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  }
};
