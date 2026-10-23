import type { TechniqueTranslation } from '../../localization';

export const EN_MOTION_COLLECTION: Record<string, TechniqueTranslation> = {
  "mg-spirograph-hypotrochoid": {
    "summary": "A looping curve repeatedly crosses itself like a spirograph trace",
    "vibeTag": "A flower drawn by rolling",
    "vibeKeywords": [
      "Spirograph Hypotrochoid",
      "spirograph",
      "hypotrochoid"
    ],
    "promptSnippet": "Build Spirograph Hypotrochoid in the specified area. Sample a from 0 to 10π at 501 points in a 280×160 SVG. Draw x=140+43cos(a)+(18+12p)cos(3.4a), y=80+43sin(a)-(18+12p)sin(3.4a) as a thin lavender polyline with a lime center dot. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-lissajous-ribbon": {
    "summary": "A 3:2 curve changes its knot shape as its phase shifts",
    "vibeTag": "Two rhythms, one curve",
    "vibeKeywords": [
      "Lissajous Curve Ribbon",
      "lissajous",
      "phase curve"
    ],
    "promptSnippet": "Build Lissajous Curve Ribbon in the specified area. Connect 240 samples over a=0–2π using x=140+110sin(3a+pπ), y=80+57sin(2a). Use an unfilled 3px cyan-to-pink gradient stroke with an instance-specific gradient ID. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-eccentric-ring-poster": {
    "summary": "Offset circles gather toward one side of an optical poster",
    "vibeTag": "Off-center circles",
    "vibeKeywords": [
      "Eccentric Ring Poster",
      "eccentric circles",
      "optical rings"
    ],
    "promptSnippet": "Build Eccentric Ring Poster in the specified area. Draw 11 circles with radius 65-i×5.4 and center (110+i×(3+2p),80). Alternate red and plum 2px outlines on cream and add a vertical reference line on the right. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-triangulated-color-mesh": {
    "summary": "Six colored triangles share a moving center vertex",
    "vibeTag": "Color across facets",
    "vibeKeywords": [
      "Triangulated Color Mesh",
      "triangle mesh",
      "colored facets"
    ],
    "promptSnippet": "Build Triangulated Color Mesh in the specified area. Join six fixed boundary points in order, forming each triangle from an edge and center (105+65p,65+30p). Cycle lavender, pink, cyan, lime and yellow fills and mark the center with a white dot. Use flat SVG faces rather than a gradient interpolation shader. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-recursive-circle-bloom": {
    "summary": "Nested circles form a repeated flower-like pattern",
    "vibeTag": "Circles within a bloom",
    "vibeKeywords": [
      "Recursive Circle Bloom",
      "nested circles",
      "circle bloom"
    ],
    "promptSnippet": "Build Recursive Circle Bloom in the specified area. At center 140,80 draw an outer circle of radius 62. Arrange six radius-23 circles on a radius-39 orbit at 60deg intervals, each containing three radius-9 circles. Rotate the whole group by 60p degrees, using cyan and lime outlines on dark. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-caustic-light-bands": {
    "summary": "Wavering intersecting bright curves approximate underwater caustics",
    "vibeTag": "Light beneath ripples",
    "vibeKeywords": [
      "Caustic Light Bands",
      "caustic light",
      "underwater light"
    ],
    "promptSnippet": "Build Caustic Light Bands in the specified area. Overlay nine horizontal quadratic curves and six vertical curves on teal using pale mint strokes. Vary control points and stroke widths with p and apply 1.2px Gaussian blur. This is an SVG approximation, not water-surface ray tracing. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-dappled-leaf-shadow": {
    "summary": "Soft leaf shadows sway across a warm paper-like surface",
    "vibeTag": "An afternoon under leaves",
    "vibeKeywords": [
      "Dappled Leaf Shadow",
      "leaf shadow",
      "dappled light"
    ],
    "promptSnippet": "Build Dappled Leaf Shadow in the specified area. Draw a diagonal stem and nine elongated dark leaves at opacity .38 over warm beige. Blur the group by 3px and rotate it from -8 to 8deg using -8+16p. Add a translucent paper rectangle in front for contrast. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-plasma-contour-field": {
    "summary": "Phase-shifted sine curves form a colorful flowing contour field",
    "vibeTag": "Glowing contour currents",
    "vibeKeywords": [
      "Plasma Contour Field",
      "plasma lines",
      "contour backdrop"
    ],
    "promptSnippet": "Build Plasma Contour Field in the specified area. Sample 17 horizontal lines with 65 points each. Use x=300v-10 and y=i×12-20+14sin(v×2π+4p+.23i)+9sin(v×4π-.3i). Use 2px strokes from a five-color palette on dark, without real terrain data. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-interference-line-lattice": {
    "summary": "Two equal line grids rotate out of alignment to create broad interference patterns",
    "vibeTag": "Waves where lines cross",
    "vibeKeywords": [
      "Rotating Lattice Interference",
      "lattice interference",
      "rotating moire"
    ],
    "promptSnippet": "Build Rotating Lattice Interference in the specified area. Create a cyan SVG line pattern with 13px spacing and overlay two rectangles using it. Keep the first fixed and rotate the larger second rectangle by 2+13p degrees around 140,80. Use a unique pattern ID. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-radial-star-tunnel": {
    "summary": "Radial star streaks expand away from a central vanishing point",
    "vibeTag": "Into a tunnel of stars",
    "vibeKeywords": [
      "Radial Star Tunnel",
      "star tunnel",
      "warp backdrop"
    ],
    "promptSnippet": "Build Radial Star Tunnel in the specified area. For 48 stars use angle i×2.39996 and radius 8+(i×17 mod 60)×(1+2p), compressing y by .65. Draw each as an outward streak of length 3+13p and width 1+p. Repeat a deterministic arrangement without a 3D particle engine. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-coupled-pendulum-beat": {
    "summary": "Two pendulums approximate alternating amplitude exchange",
    "vibeTag": "A shared oscillation",
    "vibeKeywords": [
      "Coupled Pendulum Beat",
      "coupled pendulum",
      "beating"
    ],
    "promptSnippet": "Build Coupled Pendulum Beat in the specified area. Hang two length-92 pendulums from x=90 and 190 with t=14p. Use angles .45cos(t)cos(.18t) and .45sin(t)sin(.18t), and draw a dashed connection halfway down. This analytically approximates beating with sine functions rather than numerically solving coupled equations. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-meshing-ratio-gears": {
    "summary": "Sixteen- and eight-tooth gears counter-rotate at a one-to-two ratio",
    "vibeTag": "Meshing at different rates",
    "vibeKeywords": [
      "Meshing Gear Ratio Rotation",
      "gear ratio",
      "meshing gears"
    ],
    "promptSnippet": "Build Meshing Gear Ratio Rotation in the specified area. Place radius-48 and radius-24 gears with centers 72 apart. Approximate 16 and 8 teeth with four alternating-radius points per tooth. Rotate the larger gear by 180p and the smaller by -360p+11.25 degrees, adding marker dots to show their ratio. This demonstrates gear motion rather than engineering involute tooth analysis. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-hanging-catenary-chain": {
    "summary": "A chain between fixed supports changes its catenary sag",
    "vibeTag": "A curve hanging under gravity",
    "vibeKeywords": [
      "Hanging Catenary Chain",
      "catenary",
      "chain sag"
    ],
    "promptSnippet": "Build Hanging Catenary Chain in the specified area. Sample 65 points over x=-100 to 100 with y=25+a(cosh(100/a)-cosh(x/a)), a=55+120p. Display at screen x=140+x with endpoints fixed at 40,25 and 240,25. Use a rounded dashed stroke for the chain. Changing a also changes chain length; this is not length-conserving dynamics. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-buoyancy-depth-balance": {
    "summary": "A block changes its submerged fraction relative to a fixed waterline",
    "vibeTag": "Finding a floating balance",
    "vibeKeywords": [
      "Buoyancy Submersion Ratio",
      "buoyancy",
      "submersion ratio"
    ],
    "promptSnippet": "Build Buoyancy Submersion Ratio in the specified area. Draw a waterline at y=86 and a 48px square block. Set fraction=.25+.55p and block y=86-48(1-fraction), displaying its submerged percentage. Add equal-length opposing arrows from its center to illustrate balance. This is a geometric density-ratio illustration without fluid or wave simulation. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-kepler-elliptic-orbit": {
    "summary": "An orbiting point changes speed along an ellipse as mean anomaly advances",
    "vibeTag": "An orbit with changing pace",
    "vibeKeywords": [
      "Kepler Elliptic Orbit",
      "elliptic orbit",
      "Kepler equation"
    ],
    "promptSnippet": "Build Kepler Elliptic Orbit in the specified area. For eccentricity .65 and semimajor radius 105, set M=2πp and solve E-.65sin(E)=M with six Newton iterations. Place the planet at x=140-105cos(E), y=80+105sqrt(1-.65²)×.68sin(E) and the sun at focus x=140-105×.65. The .68 vertical factor is a display projection; the triangular demo reverses direction on its return. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-folded-type-accordion": {
    "summary": "Letter panels fold in alternating directions like an accordion",
    "vibeTag": "Type folds and unfolds",
    "vibeKeywords": [
      "Folded Accordion Typography",
      "folded letters",
      "accordion typography"
    ],
    "promptSnippet": "Build Folded Accordion Typography in the specified area. Place the four letters of FOLD on alternating pale and dark lavender panels. Use 500px parent perspective, alternating rotateY of ±55p degrees and -8p overlap margins. This uses CSS face rotation rather than physical paper deformation. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-pinwheel-glyphs": {
    "summary": "Six glyphs rotate together in a radial pinwheel",
    "vibeTag": "Glyphs in a pinwheel",
    "vibeKeywords": [
      "Pinwheel Glyphs",
      "glyph pinwheel",
      "radial type"
    ],
    "promptSnippet": "Build Pinwheel Glyphs in the specified area. Arrange six R glyphs around 140,80 at 60deg intervals, each positioned at y=38 before its radial rotation. Rotate the group by 180p degrees and add a white center circle with a five-color glyph palette. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-pendulum-glyphs": {
    "summary": "Five suspended letters swing with staggered phases",
    "vibeTag": "A rhythm of hanging letters",
    "vibeKeywords": [
      "Hanging Pendulum Glyphs",
      "pendulum letters",
      "hanging type"
    ],
    "promptSnippet": "Build Hanging Pendulum Glyphs in the specified area. Hang the letters of SWING from y=20 at x=55+42i with 65px strings. Rotate each group around its top anchor by sin(2πp+.5i)×22 degrees. This is sine-driven typography without mass or collision calculations. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-elastic-tracking-type": {
    "summary": "A word expands around its center while its underline stretches",
    "vibeTag": "Elastic space between letters",
    "vibeKeywords": [
      "Elastic Tracking Typography",
      "tracking animation",
      "stretching word"
    ],
    "promptSnippet": "Build Elastic Tracking Typography in the specified area. Position the five letters of SPACE at x=140+(i-2)(30+18p), y=92+5sin(πp+.7i). Use bold 36px purple text and stretch a pink underline from 70-30p to 210+30p. Adjust positions directly without a variable font requirement. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-outline-type-tunnel": {
    "summary": "Layered outline words at different scales create a typographic tunnel",
    "vibeTag": "A tunnel through outlines",
    "vibeKeywords": [
      "Outline Type Tunnel",
      "type tunnel",
      "outline repetition"
    ],
    "promptSnippet": "Build Outline Type Tunnel in the specified area. Layer seven outlined ECHO words centered at 140,80. Use scale .22+.17i+.12p and opacity .2+.1i with no fill and .9px colored strokes. The shared progress makes the apparent tunnel depth breathe. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-split-diopter-shot": {
    "summary": "Foreground and distant objects remain sharp while the surrounding scene blurs",
    "vibeTag": "Near and far in focus",
    "vibeKeywords": [
      "Split Diopter Composition",
      "dual focus",
      "split diopter"
    ],
    "promptSnippet": "Build Split Diopter Composition in the specified area. Blur only the landscape background by 2+3p. Draw a large pink foreground object on the left and a small lime distant object on the right outside the filter. Add a faint central dotted divider. Approximate dual focus with independent layers rather than a lens or depth map. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-crane-arc-shot": {
    "summary": "Different foreground and background offsets suggest a rising crane shot",
    "vibeTag": "A smooth arc from above",
    "vibeKeywords": [
      "Crane Rise Composition",
      "crane shot",
      "rising camera"
    ],
    "promptSnippet": "Build Crane Rise Composition in the specified area. Move the landscape by translate(-20p,28p) scale(1+.18p) and the foreground pillar by translate(-65p,45p). Larger foreground displacement reveals the scene behind. This approximates a rising camera composition using 2D layers rather than a 3D camera path. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-handheld-camera-drift": {
    "summary": "Small translations and rotations suggest a handheld camera",
    "vibeTag": "A gentle handheld drift",
    "vibeKeywords": [
      "Handheld Camera Drift",
      "handheld",
      "camera shake"
    ],
    "promptSnippet": "Build Handheld Camera Drift in the specified area. Scale the landscape by 1.06 to hide edge gaps. Use x=3sin(19p)+1.5sin(37p), y=2cos(13p), and roll=1.2sin(17p) degrees. Keep four viewfinder corners fixed above it. Use deterministic motion without random noise or camera sensors. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-whip-pan-shot": {
    "summary": "A brief fast move to the adjacent scene gains horizontal blur",
    "vibeTag": "A scene swept sideways",
    "vibeKeywords": [
      "Whip Pan Scene Move",
      "whip pan",
      "fast pan"
    ],
    "promptSnippet": "Build Whip Pan Scene Move in the specified area. Place two landscapes at x=0 and 280. Set q=clamp((p-.35)/.3,0,1), translate the pair by -280q, and apply horizontal Gaussian blur 10sin(πq) with zero vertical blur. Hold before and after the brief pan. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-window-dolly-through": {
    "summary": "A rapidly expanding window frame and slowly growing landscape suggest moving through a window",
    "vibeTag": "Through the window",
    "vibeKeywords": [
      "Window Dolly Through",
      "through window",
      "dolly in"
    ],
    "promptSnippet": "Build Window Dolly Through in the specified area. Scale the landscape around 140,80 by 1+.12p and the foreground window frame by 1+2p. Build the frame from four thick outer edges and horizontal/vertical mullions, clipping overflow at the SVG boundary. Use scale differences rather than depth calculations. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-pixel-mosaic-transition": {
    "summary": "The same procedural landscape is redrawn in larger square pixels",
    "vibeTag": "A scene broken into pixels",
    "vibeKeywords": [
      "Pixel Mosaic Transition",
      "pixelation",
      "mosaic"
    ],
    "promptSnippet": "Build Pixel Mosaic Transition in the specified area. Use cell size 8+round(8p)×4 to tile a 280×160 area. Choose each cell color from a fixed sky, sun, mountain and ground palette according to its center position. This is a procedural landscape mosaic rather than a filter sampling uploaded images. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-scanline-displacement": {
    "summary": "Eight horizontal slices of a scene shift independently sideways",
    "vibeTag": "Displaced scan lines",
    "vibeKeywords": [
      "Scanline Horizontal Displacement",
      "scanline displacement",
      "slice glitch"
    ],
    "promptSnippet": "Build Scanline Horizontal Displacement in the specified area. Divide a 160px-high landscape into eight 20px clip strips. Translate a scene copy inside each strip by sin(9i+12p)×24p horizontally. Include instance and strip indices in clip IDs. Describe it as SVG displacement, not a real video-codec error. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-ink-blot-reveal": {
    "summary": "Growing circular mask lobes merge to reveal a landscape",
    "vibeTag": "A scene revealed in ink",
    "vibeKeywords": [
      "Ink Blot Mask Reveal",
      "ink reveal",
      "blot mask"
    ],
    "promptSnippet": "Build Ink Blot Mask Reveal in the specified area. Place nine white circles at deterministic offsets around the center of a black mask. Grow their radii as p×(80+(i mod 3)×20), revealing the landscape through their union. Initially show only the background. Use circle masks without fluid simulation or a noise shader. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-film-burn-flash": {
    "summary": "A warm orange-red light bloom sweeps across a landscape",
    "vibeTag": "Light burning through film",
    "vibeKeywords": [
      "Film Burn Light Flash",
      "film burn",
      "light leak"
    ],
    "promptSnippet": "Build Film Burn Light Flash in the specified area. Fill a 135×160-radius ellipse with a radial gradient from pale white through yellow and translucent red to transparent. Move its center to x=-60+400p, y=80 and use screen blending over the landscape. No real film damage or color-grading LUT is involved. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  },
  "mg-multiple-exposure-echo": {
    "summary": "Colored echoes show sampled earlier positions of a moving orb",
    "vibeTag": "A moment in multiple exposures",
    "vibeKeywords": [
      "Multiple Exposure Echo",
      "multiple exposure",
      "echo trail"
    ],
    "promptSnippet": "Build Multiple Exposure Echo in the specified area. Place seven circles at x=40+180p-14i, y=80+35sin(2π(p-.06i)). Decrease radius to 18-.6i and opacity to 1-.13i while cycling five colors. Approximate exposure trails with delayed formula samples rather than captured video frames. Use a linear triangular progress p, initially 0, reaching 1 at 4 seconds and returning to 0 at 8 seconds, repeating. Autoplay without a slider; clicking restarts the existing clock from the beginning. Pause the clock offscreen and in hidden tabs; reduced motion keeps the initial p=0 scene. Fit the composition into a responsive area up to 300px wide, with an accessible name, Korean and English copy, and light and dark themes. This is a local SVG/CSS/state demonstration without external images, servers or live data."
  }
};
