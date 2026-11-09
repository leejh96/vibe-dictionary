import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES } from '@vibe-dictionary/catalog';
import { AI_ADDITION_DEMOS } from '../src/components/demos/ai';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('all 10 AI additions are present in TECHNIQUES with unique IDs and categories', () => {
  const aiItems = TECHNIQUES.filter((t) => t.domain === 'ai');
  assert.equal(aiItems.length, 10);
  assert.equal(new Set(aiItems.map((t) => t.id)).size, 10);

  const expectedCategories = ['ai_input', 'ai_streaming', 'ai_reasoning', 'ai_agent'];
  for (const item of aiItems) {
    assert.ok(expectedCategories.includes(item.category), `${item.id} has invalid category ${item.category}`);
    assert.ok(item.titleKo.trim());
    assert.ok(item.titleEn.trim());
    assert.ok(item.vibeKeywords.length > 0);
  }
});

test('every AI technique ID maps to a valid demo component', () => {
  const aiItems = TECHNIQUES.filter((t) => t.domain === 'ai');
  for (const item of aiItems) {
    const Component = AI_ADDITION_DEMOS[item.id];
    assert.ok(Component, `Missing demo component for ${item.id}`);

    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(
        <LocaleProvider initialLocale="ko">
          <Component />
        </LocaleProvider>
      );
    });
    assert.ok(tree.root);
    act(() => tree.unmount());
  }
});

test('ai-prompt-box updates input and toggles models', () => {
  const Component = AI_ADDITION_DEMOS['ai-prompt-box'];
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="ko">
        <Component />
      </LocaleProvider>
    );
  });

  const textarea = tree.root.findByType('textarea');
  assert.equal(textarea.props.value, '');

  act(() => {
    textarea.props.onChange({ target: { value: 'Hello AI' } });
  });
  assert.equal(textarea.props.value, 'Hello AI');

  const buttons = tree.root.findAllByType('button');
  const proBtn = buttons.find((b) => b.props['aria-pressed'] !== undefined && b.props['aria-pressed'] === false);
  assert.ok(proBtn);
  act(() => {
    proBtn.props.onClick();
  });
  assert.equal(proBtn.props['aria-pressed'], true);

  act(() => tree.unmount());
});

test('ai-streaming-text can be started and cleanly unmounted', () => {
  const Component = AI_ADDITION_DEMOS['ai-streaming-text'];
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="ko">
        <Component />
      </LocaleProvider>
    );
  });

  const startBtn = tree.root.findAllByType('button').find((b) => b.props.onClick);
  assert.ok(startBtn);
  act(() => {
    startBtn.props.onClick();
  });

  act(() => tree.unmount());
});

test('ai-message-branch navigates across versions', () => {
  const Component = AI_ADDITION_DEMOS['ai-message-branch'];
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="ko">
        <Component />
      </LocaleProvider>
    );
  });

  const nextBtn = tree.root.findAllByType('button').find((b) => b.props.title === '다음 버전');
  assert.ok(nextBtn);
  assert.equal(nextBtn.props.disabled, false);

  act(() => {
    nextBtn.props.onClick();
  });

  act(() => tree.unmount());
});

test('ai-thinking-accordion toggles open and closed state', () => {
  const Component = AI_ADDITION_DEMOS['ai-thinking-accordion'];
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="ko">
        <Component />
      </LocaleProvider>
    );
  });

  const toggleBtn = tree.root.findAllByType('button').find((b) => b.props['aria-expanded'] !== undefined);
  assert.ok(toggleBtn);
  assert.equal(toggleBtn.props['aria-expanded'], true);

  act(() => {
    toggleBtn.props.onClick();
  });
  assert.equal(toggleBtn.props['aria-expanded'], false);

  act(() => tree.unmount());
});

test('ai-human-in-the-loop accepts approval and rejection', () => {
  const Component = AI_ADDITION_DEMOS['ai-human-in-the-loop'];
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="ko">
        <Component />
      </LocaleProvider>
    );
  });

  const approveBtn = tree.root.findAllByType('button').find((b) => b.children.includes('승인하여 실행'));
  assert.ok(approveBtn);

  act(() => {
    approveBtn.props.onClick();
  });

  const successText = tree.root.findAllByType('span').find((s) => s.children.some((c) => typeof c === 'string' && c.includes('승인되어')));
  assert.ok(successText);

  act(() => tree.unmount());
});
