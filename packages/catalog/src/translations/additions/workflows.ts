import type { TechniqueTranslation } from '../../localization';

export const EN_WORKFLOW_TECHNIQUES: Record<string, TechniqueTranslation> = {
  'billing-cycle-pricing-card': {
    summary: 'Switch billing periods to update the monthly equivalent, actual bill, and annual savings together.',
    vibeTag: 'Price and billing terms at a glance', vibeKeywords: ['pricing card', 'billing cycle', 'annual discount', 'subscription pricing'],
    promptSnippet: 'Build a Studio pricing card with Monthly and Annual buttons in the target area. Start on Monthly: $20 per month, billed $20 monthly. Annual shows a $16 monthly equivalent, $192 billed yearly, and $48 annual savings. Keep an annual 20% savings badge above and distinguish the monthly equivalent from the actual billing period. Synchronize aria-pressed and a raised pill background with selection, and announce price changes with aria-live polite. Support Enter and Space without automatic switching. These are fixed demo USD amounts; do not implement checkout, signup, currency conversion, or tax calculations. Support narrow cards, Korean and English text, light/dark contrast, and visible keyboard focus.',
  },
  'faceted-filter-chips': {
    summary: 'Combine Design and Ready filters to update results and counts, then remove individual conditions or reset all.',
    vibeTag: 'Small chips that narrow the list', vibeKeywords: ['filter chips', 'faceted filtering', 'multiple filters', 'clear filters'],
    promptSnippet: 'Build a resource list with a result count and Design and Ready filter chips. Initially show Brand brief (design and ready), User research (ready), and Icon assets (design and draft). Keep the two filters as independent booleans; combine active conditions with AND so both leave only Brand brief. Mark active chips with a tinted background, border, X icon, and aria-pressed. Clicking the entire chip again removes that condition. Reset clears both and is disabled when neither is active. Announce result counts with aria-live polite and give status dots accessible names. Reserve list height to avoid card jumps, and use keyboard-operable buttons. Use fixed local data without network search or automatic filtering. Support both themes and mobile widths.',
  },
  'bulk-selection-action-bar': {
    summary: 'Selecting documents reveals an action bar with a count and Archive action, including mixed and select-all states.',
    vibeTag: 'Actions appear for the selected items', vibeKeywords: ['bulk actions', 'multi select', 'selection toolbar', 'batch archive'],
    promptSnippet: 'Build three document rows with native checkboxes and a select-all checkbox. Start with no selection. Set the header checkbox indeterminate for partial selection and checked when all visible rows are selected. When at least one is selected, reveal a reserved bottom action bar with the count and Archive button, using opacity 0 and translateY(5px) to normal over 180ms ease-out. Archive removes only selected rows from local state, announces the cumulative archived count, clears selection, and hides the bar. Move focus to select-all after archiving, or to Reset if the list is empty. Guard against empty selection and disable select-all for an empty list. Reset restores all three rows, no selection, and zero archived count. Do not use server storage, persistence, or automatic selection. Support native keyboard controls, status announcements, light/dark themes, narrow widths, and reduced motion.',
  },
  'undo-delete-snackbar': {
    summary: 'Deleting a document reveals an Undo action that restores the most recently deleted item in its original order.',
    vibeTag: 'A quick way back after a mistake', vibeKeywords: ['undo delete', 'snackbar', 'restore item', 'undo notification'],
    promptSnippet: 'Build Brand brief, User research, and Icon assets rows with individual Delete buttons. Delete removes that row from local state and shows a snackbar in reserved bottom space with the document name and Undo. Animate from opacity 0 and translateY(5px) over 180ms ease-out and move focus to Undo after deletion. Store only the last deleted ID; another deletion replaces the previous recovery target. Undo restores only that item in original order, closes the snackbar, and focuses Reset. There is no expiration timer. Reset restores all rows and clears deletion history. Announce deletion with role status and include document names in Delete button labels. Do not delete actual files, make server requests, or persist state. Support keyboard use, both themes, narrow widths, and reduced motion.',
  },
  'onboarding-progress-checklist': {
    summary: 'Toggle setup steps to update a progress bar and completion count, with a finished message when every step is checked.',
    vibeTag: 'Turn getting started into small wins', vibeKeywords: ['onboarding checklist', 'getting started', 'setup progress', 'completion steps'],
    promptSnippet: 'Build a Get started card with a completion badge, native progress bar, and Set up profile, Invite teammates, and First project buttons. Start at 0/3. Allow steps in any order and toggle completed IDs on click. Replace each completed step number with a check icon, strike through its label, and synchronize aria-pressed. Set progress max to 3 and value to the completed count; transition fill width over 200ms. At 3/3 show a ready message; unchecking any step restores the selection hint. Provide accessible live announcements for the badge and completion message. Do not auto-progress. This demo only toggles completion markers; it does not change profiles, send invites, create projects, or persist state. Support light/dark themes, mobile widths, keyboard focus, and reduced motion.',
  },
};
