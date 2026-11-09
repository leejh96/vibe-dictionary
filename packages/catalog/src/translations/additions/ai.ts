import type { TechniqueTranslation } from '../../localization';

export const EN_AI_TECHNIQUES: Record<string, TechniqueTranslation> = {
  'ai-prompt-box': {
    vibeTag: 'Expands smoothly to fit your input length',
    vibeKeywords: ['prompt box', 'autoresize textarea', 'model toggle', 'prompt submit', 'input card'],
    summary: 'Textarea expands smoothly with text length while managing Fast/Pro model switching, file attach, and submission states.',
    promptSnippet:
      'Build an interactive prompt input box that expands with text length in the specified area. Inside a container of width 100% and min-height 180px, create a card frame with 1px border (light #e2e8f0, dark #334155), 16px rounded corners, and background (light #ffffff, dark #0f172a). Place a textarea at the top (min-height 48px, max-height 120px, overflow-y auto, resize none, font size 14px, padding 12px) that dynamically adjusts its height based on scrollHeight as the user types. In the bottom toolbar, provide a 2-segment button group on the left to toggle between Fast and Pro modes (height 28px, font size 11px, 8px rounded corners, active state with #6366f1 background and white text) along with an attachment button. On the right, include a circular submit button (diameter 32px, #6366f1 background, white arrow icon) that activates when text is present. Pressing Enter submits the prompt while Shift+Enter inserts a new line. Submitting clears the input and resets height to 48px. Implement with pure React and Tailwind CSS without external libraries.',
  },
  'ai-slash-command': {
    vibeTag: 'Invokes quick commands on typing a slash',
    vibeKeywords: ['slash command', 'prompt commands', 'command popover', 'shortcut menu', 'keyboard palette'],
    summary: 'Typing a slash opens a floating command palette with keyboard navigation and instant autocomplete.',
    promptSnippet:
      'Create a slash command popover interaction triggered by the slash (/) character in the specified area. In a container of width 100% and min-height 180px, provide a single input or textarea. When the user types /, display a 220px wide floating menu above the input with a 150ms fade-in transition. The popover menu displays 4 command options: Summarize (/summarize), Translate (/translate), Generate Code (/code), and Refactor (/refactor), each with height 36px, padding 8px, font size 12px, and an icon. Allow users to navigate the focused item using Up/Down arrow keys, and select an option via Enter key or click to replace / with the command prompt and dismiss the popover. Pressing Escape cancels the popover. Support light (#ffffff background / #e2e8f0 border) and dark (#1e293b background / #475569 border) themes using pure React state without external dependencies.',
  },
  'ai-context-pill': {
    vibeTag: 'Visualizes attached context and token consumption at a glance',
    vibeKeywords: ['context gauge', 'token bar', 'document tag pills', 'context window', 'token usage'],
    summary: 'Manage referenced document tags and track context window token capacity with a color-coded progress gauge.',
    promptSnippet:
      'Create a context management UI featuring attached document tag pills and a real-time token gauge in the specified area. Inside a container of width 100% and min-height 180px, build a card with 12px rounded corners and 1px border. At the top, list attached context chips (e.g., API_Spec.pdf at 1200 tokens, System_Prompt at 400 tokens) in a horizontal flex layout, where each chip has height 24px, font size 11px, and an X button to remove on click. Clicking an [Add Document] button appends a new sample chip (800 tokens). At the bottom, display an 8px tall progress bar showing token consumption relative to the total limit of 8000 tokens. The gauge color changes dynamically: #10b981 green below 70%, #f59e0b amber between 70% and 90%, and #ef4444 red at or above 90%. Adjust gauge width smoothly with a 200ms transition upon adding or removing chips.',
  },
  'ai-streaming-text': {
    vibeTag: 'Generates text character-by-character in real time',
    vibeKeywords: ['streaming text', 'pulsing cursor', 'typing effect', 'stop response', 'realtime generation'],
    summary: 'Simulate live response streaming with a blinking pulse caret and an immediate stop button.',
    promptSnippet:
      'Create a real-time text streaming typing effect with a blinking pulse caret in the specified area. Inside a card of width 100% and min-height 180px, clicking [Generate Response] streams a predefined 150 character AI answer character-by-character at 30ms intervals. At the trailing edge of the text, render an inline caret consisting of a 2px wide, 14px tall vertical bar colored #6366f1 that pulses every 0.8 seconds. While streaming, the button switches to [Stop Generating] with a red border and font size 12px, which immediately clears the timer and hides the caret upon click. Once complete or stopped, allow the user to replay from the start via [Regenerate]. Ensure contrast in light (#1e293b text) and dark (#f8fafc text) modes, and clean up the timer on unmount.',
  },
  'ai-code-runner': {
    vibeTag: 'Toggles seamlessly between syntax highlighting and live preview',
    vibeKeywords: ['interactive code block', 'code highlight', 'result preview', 'one-click copy', 'execution tab'],
    summary: 'Tabbed code container with language badge, copy confirmation, and interactive component preview.',
    promptSnippet:
      'Build an interactive code block that toggles between code view and live preview in the specified area. Inside a dark card of width 100% and min-height 180px (#0f172a background, 12px corners, 1px #334155 border), construct a top header (height 36px, padding 12px). The header features [Code] and [Preview] tab buttons on the left (font size 12px, active tab with a #6366f1 bottom 2px indicator) and a TypeScript badge, with a [Copy] button on the right. Clicking copy temporarily displays [Copied ✓] for 1.5 seconds. The Code tab renders syntax-highlighted source code, while switching to Preview displays the live interactive counter button rendered by that code. Smoothly transition between tabs using a 150ms fade effect.',
  },
  'ai-message-branch': {
    vibeTag: 'Navigate freely across regenerated response branches',
    vibeKeywords: ['branch switcher', 'regenerate history', 'response switcher', 'branch navigation', 'version comparison'],
    summary: 'Explore multiple regenerated AI response variations using previous and next pagination buttons.',
    promptSnippet:
      'Create a response branch switcher UI allowing users to flip through multiple regenerated AI response versions in the specified area. Inside a container of width 100% and min-height 180px, place a message card (12px corners, padding 16px, 1px border) with a version navigation control formatted as < 1 / 3 > at the bottom (height 28px, font size 11px). Clicking the left or right arrow updates the version index and transitions between response texts (e.g., version 1 concise, version 2 detailed, version 3 tabular) with a 200ms slide animation. Provide a [Generate New Version] button in the top right that appends a 4th version to the array and jumps to it immediately. Disable the previous button on the first version and the next button on the last version.',
  },
  'ai-thinking-accordion': {
    vibeTag: 'Transparently unfolds the step-by-step AI reasoning',
    vibeKeywords: ['thinking accordion', 'reasoning toggle', 'thinking log', 'chain of thought', 'elapsed time'],
    summary: 'Inspect the AI internal Chain-of-Thought log with an elapsed time badge and collapsible accordion.',
    promptSnippet:
      'Create an accordion UI to inspect the AI Chain-of-Thought reasoning steps in the specified area. Inside a container of width 100% and min-height 180px, build a card with 12px rounded corners and 1px border. The top bar (height 40px, padding 12px) contains a lightbulb icon, "Thinking Process (4s elapsed)" label, a pulsing dot animation, and a rotating arrow on the right. Clicking the bar toggles the body open or closed with a 200ms transition. The expanded body (padding 12px, font size 12px, muted text) reveals a 3-step reasoning timeline ("1. Query intent analyzed", "2. 3 relevant docs indexed", "3. Final answer synthesized") with checkmark icons. Ensure natural background (#f8fafc vs #1e293b) and border adaptation across light and dark modes.',
  },
  'ai-source-citation': {
    vibeTag: 'Reveals verifiable source cards upon hovering reference chips',
    vibeKeywords: ['source citation chips', 'inline reference', 'source preview', 'citation popover', 'evidence card'],
    summary: 'Hovering inline citation badges displays a popover card with site favicon, title, and key excerpt.',
    promptSnippet:
      'Create an inline citation badge and hover preview card interaction in the specified area. Inside a container of width 100% and min-height 180px, render an AI answer sentence ending with small citation chips like [1] and [2] (height 18px, horizontal padding 6px, font size 11px, border-radius 9999px, #6366f1 text). Hovering or focusing a citation chip triggers a 240px wide preview popover card (12px corners, padding 10px, 1px border, shadow) above the chip with a 150ms fade-in transition. The popover card includes a document icon, web page title ("React 19 Migration Guide"), domain URL ("react.dev"), and a 2-line snippet excerpt. The popover gracefully disappears when the cursor leaves.',
  },
  'ai-tool-call-card': {
    vibeTag: 'Visualizes tool invocation arguments and execution output',
    vibeKeywords: ['tool execution card', 'tool call', 'function calling', 'execution status badge', 'parameter fold'],
    summary: 'Displays tool invocation name, parameters, execution spinner, and returned output in an expandable card.',
    promptSnippet:
      'Build a tool execution card displaying agent tool invocation status and parameters in the specified area. Inside a container of width 100% and min-height 180px, construct a box with 12px corners and 1px border. The card header shows a wrench icon, tool name ("search_docs"), and a status badge (blue spinner with "Running..." during execution, green check with "Success (120ms)" on completion). Clicking a [Re-run Tool] button sets the status to running for 1.2 seconds before returning to completed. The body features a collapsible accordion containing input arguments JSON (query: "vibe coding") and returned output summary. Support monospace typography and light/dark theme backgrounds.',
  },
  'ai-human-in-the-loop': {
    vibeTag: 'Requests human confirmation before executing critical operations',
    vibeKeywords: ['approval guardrail', 'human in the loop', 'action approval modal', 'safety confirmation', 'execution consent'],
    summary: 'Prompts users with risk severity badges and impact summaries for explicit approval or rejection before critical actions.',
    promptSnippet:
      'Create a Human-in-the-loop approval card interaction for critical agent operations in the specified area. Inside a container of width 100% and min-height 180px, position a card with an amber warning border (1px #f59e0b) and 12px rounded corners. The top section displays a warning triangle icon, "File Deletion Approval Required" title, and a red [High] risk badge. The center outlines the command to execute ("rm -rf ./temp_cache") and lists 3 affected files. The bottom bar provides a [Reject] button (gray border, height 32px) and an [Approve & Execute] button (amber/red background, white text, height 32px). Clicking approve transitions the card into a green "Operation Approved" state, while clicking reject updates it to a gray "Operation Cancelled" state with an option to restore.',
  },
};
