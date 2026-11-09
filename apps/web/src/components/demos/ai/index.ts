import type { ComponentType } from 'react';
import { AiPromptBoxDemo } from './AiPromptBoxDemo';
import { AiSlashCommandDemo } from './AiSlashCommandDemo';
import { AiContextPillDemo } from './AiContextPillDemo';
import { AiStreamingTextDemo } from './AiStreamingTextDemo';
import { AiCodeRunnerDemo } from './AiCodeRunnerDemo';
import { AiMessageBranchDemo } from './AiMessageBranchDemo';
import { AiThinkingAccordionDemo } from './AiThinkingAccordionDemo';
import { AiSourceCitationDemo } from './AiSourceCitationDemo';
import { AiToolCallCardDemo } from './AiToolCallCardDemo';
import { AiHumanInTheLoopDemo } from './AiHumanInTheLoopDemo';

export const AI_ADDITION_DEMOS: Record<string, ComponentType> = {
  'ai-prompt-box': AiPromptBoxDemo,
  'ai-slash-command': AiSlashCommandDemo,
  'ai-context-pill': AiContextPillDemo,
  'ai-streaming-text': AiStreamingTextDemo,
  'ai-code-runner': AiCodeRunnerDemo,
  'ai-message-branch': AiMessageBranchDemo,
  'ai-thinking-accordion': AiThinkingAccordionDemo,
  'ai-source-citation': AiSourceCitationDemo,
  'ai-tool-call-card': AiToolCallCardDemo,
  'ai-human-in-the-loop': AiHumanInTheLoopDemo,
};
