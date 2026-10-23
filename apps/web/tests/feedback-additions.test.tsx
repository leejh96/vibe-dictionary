import { COLLECTION_IDS } from './helpers/collection';
import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { InlineValidationDemo } from '../src/components/demos/feedback/InlineValidationDemo';
import { NotificationBadgeDemo, StarRatingDemo } from '../src/components/demos/feedback/FeedbackDemos';
import { TooltipDemo } from '../src/components/demos/feedback/TooltipDemo';
import { DismissibleBannerDemo } from '../src/components/demos/feedback/DismissibleBannerDemo';
import { InlineConfirmDemo } from '../src/components/demos/feedback/InlineConfirmDemo';
import { ClipboardFeedbackDemo } from '../src/components/demos/feedback/ClipboardFeedbackDemo';
import { EmptySearchDemo } from '../src/components/demos/feedback/EmptySearchDemo';
import { CharacterBudgetDemo } from '../src/components/demos/feedback/CharacterBudgetDemo';
import { ErrorSummaryDemo } from '../src/components/demos/feedback/ErrorSummaryDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';
import type { Locale } from '@vibe-dictionary/catalog';

function LocaleCapture({ capture }: { capture: (setLocale: (locale: Locale) => void) => void }) {
  capture(useLocale().setLocale);
  return null;
}

test('feedback fields translate active errors and counts while preserving native inputs and original values', t => {
  let setLocale!: (locale: Locale) => void;
  const native: Record<string, { value: string; validity: { valid: boolean }; focus: () => void }> = {};
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LocaleCapture capture={setter => { setLocale = setter; }} /><ErrorSummaryDemo /><CharacterBudgetDemo /><InlineValidationDemo /></LocaleProvider>, { createNodeMock: element => {
    if (element.type === 'input') {
      const node = { value: '', validity: { valid: false }, focus() {} };
      native[element.props.id] = node;
      return node;
    }
    return null;
  } }); });
  t.after(() => { act(() => tree.unmount()); });
  const inputs = tree.root.findAllByType('input');
  const memo = tree.root.findByType('textarea');
  act(() => tree.root.findByType('form').props.onSubmit({ preventDefault() {} }));
  act(() => memo.props.onChange({ target: { value: '한'.repeat(41) } }));
  act(() => inputs[2].props.onChange({ currentTarget: { value: '사용자@', validity: { valid: false } } }));
  act(() => inputs[2].props.onBlur({ currentTarget: { validity: { valid: false } } }));
  native[inputs[0].props.id].value = '사용자 이름';
  act(() => setLocale('en'));
  assert.deepEqual(tree.root.findAllByType('a').map(link => link.children.join('')), ['Please enter your name.', 'Please enter your email.']);
  assert.equal(tree.root.findByProps({ className: 'fd-error' }).children.join(''), 'Please check the email format.');
  assert.equal(tree.root.findByProps({ className: 'fd-budget-count' }).children.join(''), 'Characters over limit: 1');
  assert.equal(memo.props.value, '한'.repeat(41));
  assert.equal(inputs[2].props.value, '사용자@');
  assert.equal(native[inputs[0].props.id].value, '사용자 이름');
  assert.deepEqual(tree.root.findAllByType('input'), inputs);
  assert.equal(tree.root.findByType('textarea'), memo);
  assert.ok(inputs.every(input => input.props['aria-invalid']));
  act(() => setLocale('ko'));
  assert.equal(tree.root.findByProps({ className: 'fd-budget-count' }).children.join(''), '1자 초과');
  assert.equal(tree.root.findByProps({ className: 'fd-error' }).children.join(''), '이메일 형식을 확인해 주세요.');
});

test('feedback controls keep selected, dismissed, confirmation, tooltip and read states across a live language switch', t => {
  let setLocale!: (locale: Locale) => void;
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LocaleCapture capture={setter => { setLocale = setter; }} /><StarRatingDemo /><NotificationBadgeDemo /><InlineConfirmDemo /><DismissibleBannerDemo /><TooltipDemo /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const radios = tree.root.findAllByType('input');
  const badgeButton = tree.root.findByProps({ className: 'fd-notification-button' });
  const tooltipButton = tree.root.findByProps({ className: 'fd-tooltip-button' });
  act(() => radios[3].props.onChange());
  act(() => badgeButton.props.onClick());
  act(() => tree.root.findByProps({ className: 'fd-confirm-delete' }).props.onClick());
  act(() => tree.root.findByProps({ className: 'fd-banner-close' }).props.onClick());
  act(() => tooltipButton.props.onFocus());
  act(() => setLocale('en'));
  assert.equal(radios[3].props.checked, true);
  assert.equal(radios[3].props['aria-label'], '4 out of 5 stars');
  assert.equal(badgeButton.props['data-read'], true);
  assert.equal(badgeButton.props['aria-label'], 'No unread notifications, show notifications again');
  assert.equal(tree.root.findAllByProps({ className: 'fd-notification-badge' }).length, 0);
  assert.equal(tree.root.findByProps({ role: 'group' }).props['aria-label'], 'Confirm draft deletion');
  assert.equal(tree.root.findByProps({ className: 'fd-confirm-action' }).children.join(''), 'Cancel');
  assert.equal(tree.root.findByProps({ className: 'fd-banner-restore' }).props['aria-label'], 'Show notice again');
  assert.equal(tree.root.findByProps({ role: 'tooltip' }).props['aria-hidden'], false);
  assert.equal(tree.root.findByProps({ role: 'tooltip' }).children.join(''), 'Brightness and text size');
  assert.equal(tree.root.findByProps({ className: 'fd-tooltip-button' }), tooltipButton);
  assert.deepEqual(tree.root.findAllByType('input'), radios);
  act(() => tree.root.findByProps({ className: 'fd-confirm-action fd-confirm-danger' }).props.onClick());
  act(() => tree.root.findByProps({ className: 'fd-banner-restore' }).props.onClick());
  act(() => setLocale('ko'));
  assert.equal(tree.root.findByProps({ className: 'fd-confirm-restore' }).props['aria-label'], '초안 다시 표시');
  assert.equal(tree.root.findByProps({ className: 'fd-banner-copy' }).children.join(''), '검토할 변경 사항이 있어요.');
});

test('empty-search samples translate but edited queries and cleared state survive language switches', t => {
  let setLocale!: (locale: Locale) => void;
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LocaleCapture capture={setter => { setLocale = setter; }} /><EmptySearchDemo /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const input = tree.root.findByType('input');
  act(() => setLocale('en'));
  assert.equal(input.props.value, 'sea');
  assert.equal(tree.root.findByProps({ role: 'status' }).children.join(''), 'No search results');
  act(() => tree.root.findByType('button').props.onClick());
  assert.deepEqual(tree.root.findAllByType('li').map(li => li.findByType('span').children.join('')), ['Walking notes', 'Light journal']);
  act(() => setLocale('ko'));
  assert.equal(input.props.value, '');
  assert.deepEqual(tree.root.findAllByType('li').map(li => li.findByType('span').children.join('')), ['산책 노트', '빛 기록']);
  act(() => input.props.onChange({ target: { value: '사용자 {query}' } }));
  act(() => setLocale('en'));
  assert.equal(input.props.value, '사용자 {query}');
  assert.equal(tree.root.findByType('input'), input);
  assert.equal(tree.root.findAllByType('li').length, 0);
});

test('error summary focuses only after a failed check, links to each input and clears current errors while editing', t => {
  let tree!: ReturnType<typeof create>;
  const focused: string[] = [];
  const native: Record<string, { value: string; validity: { valid: boolean }; focus: () => void }> = {};
  act(() => { tree = create(<ErrorSummaryDemo />, { createNodeMock: element => {
    if (element.type === 'input') {
      const node = { value: '', validity: { valid: false }, focus: () => focused.push(element.props.id) };
      native[element.props.id] = node;
      return node;
    }
    if (element.props.role === 'alert') return { focus: () => focused.push('summary') };
    return null;
  } }); });
  t.after(() => { act(() => tree.unmount()); });
  const [name, email] = tree.root.findAllByType('input');
  const form = tree.root.findByType('form');
  const submit = () => act(() => form.props.onSubmit({ preventDefault() {} }));
  assert.deepEqual(focused, []);
  assert.equal(tree.root.findAllByProps({ role: 'alert' }).length, 0);
  submit();
  assert.equal(focused.at(-1), 'summary');
  assert.equal(tree.root.findAllByType('a').length, 2);
  for (const [index, input] of [name, email].entries()) {
    const link = tree.root.findAllByType('a')[index];
    assert.equal(link.props.href, `#${input.props.id}`);
    assert.equal(tree.root.findByProps({ id: input.props['aria-describedby'] }).children.join(''), link.children.join(''));
    act(() => link.props.onClick({ preventDefault() {} }));
    assert.equal(focused.at(-1), input.props.id);
  }
  native[name.props.id].validity.valid = true;
  native[name.props.id].value = '예시';
  native[email.props.id].value = 'bad';
  const previousFocus = focused.length;
  act(() => form.props.onChange());
  assert.equal(focused.length, previousFocus);
  assert.equal(tree.root.findAllByType('a').length, 1);
  assert.equal(tree.root.findByType('a').children.join(''), '이메일 형식을 확인해 주세요.');
  native[email.props.id].validity.valid = true;
  act(() => form.props.onChange());
  assert.equal(tree.root.findAllByProps({ role: 'alert' }).length, 0);
  assert.equal(tree.root.findByType('button').props['data-valid'], true);
  assert.equal(email.props['aria-describedby'], undefined);
  submit();
  assert.equal(focused.length, previousFocus);
  native[email.props.id].value = '';
  native[email.props.id].validity.valid = false;
  act(() => form.props.onChange());
  assert.equal(focused.length, previousFocus);
  assert.equal(tree.root.findByType('a').children.join(''), '이메일을 입력해 주세요.');
  submit();
  assert.equal(focused.at(-1), 'summary');
  assert.equal(tree.root.findAllByType('input')[0], name);
});

test('character budget preserves over-limit input and counts Unicode code points with isolated descriptions', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><CharacterBudgetDemo /><CharacterBudgetDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [input, other] = tree.root.findAllByType('textarea');
  const counts = tree.root.findAllByProps({ className: 'fd-budget-count' });
  assert.notEqual(input.props.id, other.props.id);
  assert.equal(input.props['aria-describedby'], counts[0].props.id);
  assert.equal(tree.root.findAllByType('label')[0].props.htmlFor, input.props.id);
  assert.equal(counts[0].children.join(''), '40자 남음');
  const change = (value: string) => act(() => input.props.onChange({ target: { value } }));
  change('가'.repeat(40));
  assert.equal(counts[0].children.join(''), '0자 남음');
  assert.equal(input.props['aria-invalid'], false);
  const over = '가'.repeat(41);
  change(over);
  assert.equal(input.props.value, over);
  assert.equal(counts[0].children.join(''), '1자 초과');
  assert.equal(input.props['aria-invalid'], true);
  assert.equal(input.props.maxLength, undefined);
  change('가😀\n ');
  assert.equal(counts[0].children.join(''), '36자 남음');
  assert.equal(input.props['aria-invalid'], false);
  assert.equal(other.props.value, '');
  assert.equal(tree.root.findAllByType('textarea')[0], input);
});

test('empty search restores real results and input focus, then filters literal text without replacing the input', t => {
  let tree!: ReturnType<typeof create>;
  let focuses = 0;
  act(() => { tree = create(<EmptySearchDemo />, { createNodeMock: element => element.type === 'input' ? { focus: () => focuses++ } : null }); });
  t.after(() => { act(() => tree.unmount()); });
  const input = tree.root.findByType('input');
  assert.equal(input.props.value, '바다');
  assert.equal(tree.root.findAllByType('li').length, 0);
  assert.equal(tree.root.findByProps({ role: 'status' }).children.join(''), '검색 결과 없음');
  act(() => tree.root.findByType('button').props.onClick());
  assert.equal(input.props.value, '');
  assert.equal(focuses, 1);
  assert.deepEqual(tree.root.findAllByType('li').map(li => li.findByType('span').children.join('')), ['산책 노트', '빛 기록']);
  assert.equal(tree.root.findAllByType('button').length, 0);
  act(() => input.props.onChange({ target: { value: ' 빛 ' } }));
  assert.equal(tree.root.findAllByType('li').length, 1);
  assert.equal(tree.root.findByType('li').findByType('span').children.join(''), '빛 기록');
  act(() => input.props.onChange({ target: { value: '.*' } }));
  assert.equal(tree.root.findAllByType('li').length, 0);
  assert.equal(tree.root.findAllByType('button').length, 1);
  act(() => input.props.onChange({ target: { value: '  ' } }));
  assert.equal(tree.root.findAllByType('li').length, 2);
  assert.equal(tree.root.findByType('input'), input);
});

test('inline copy waits for real success, blocks a pending duplicate and exposes rejection with retry', async t => {
  let setLocale!: (locale: Locale) => void;
  const original = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  let resolve!: () => void;
  let reject!: (error: Error) => void;
  const writes: string[] = [];
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { clipboard: { writeText: (text: string) => {
    writes.push(text);
    return new Promise<void>((yes, no) => { resolve = yes; reject = no; });
  } } } });
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LocaleCapture capture={setter => { setLocale = setter; }} /><ClipboardFeedbackDemo /></LocaleProvider>); });
  t.after(() => {
    act(() => tree.unmount());
    if (original) Object.defineProperty(globalThis, 'navigator', original);
    else Reflect.deleteProperty(globalThis, 'navigator');
  });
  const button = tree.root.findByType('button');
  assert.equal(button.props['aria-label'], '빌드 명령어 복사');
  let pending!: Promise<void>;
  await act(async () => { pending = button.props.onClick(); });
  assert.equal(button.props['aria-busy'], true);
  assert.equal(button.props['data-status'], 'copying');
  act(() => setLocale('en'));
  assert.equal(button.props['aria-label'], 'Copying build command');
  assert.equal(button.props['data-status'], 'copying');
  await act(async () => { await button.props.onClick(); });
  assert.deepEqual(writes, [tree.root.findByType('code').children.join('')]);
  await act(async () => { resolve(); await pending; });
  assert.equal(button.props['data-status'], 'copied');
  assert.equal(tree.root.findByProps({ role: 'status' }).children.join(''), 'Build command copied.');
  assert.equal(button.props['aria-label'], 'Build command copied');
  act(() => setLocale('ko'));
  assert.equal(button.props['data-status'], 'copied');
  await act(async () => { pending = button.props.onClick(); });
  await act(async () => { reject(new Error('NotAllowedError')); await pending; });
  assert.equal(button.props['data-status'], 'error');
  assert.equal(button.props['aria-disabled'], false);
  assert.equal(button.props['aria-label'], '복사 실패, 다시 시도');
  await act(async () => { pending = button.props.onClick(); });
  await act(async () => { resolve(); await pending; });
  assert.equal(button.props['data-status'], 'copied');
  assert.equal(tree.root.findByType('button'), button);
});

test('inline confirmation defaults to cancel, removes only after confirmation and restores focus through all phases', t => {
  let tree!: ReturnType<typeof create>;
  const focused: string[] = [];
  act(() => { tree = create(<InlineConfirmDemo />, { createNodeMock: element => element.type === 'button' ? { focus: () => focused.push(element.props['aria-label']) } : null }); });
  t.after(() => { act(() => tree.unmount()); });
  const button = (name: string) => tree.root.findAllByType('button').find(node => node.props['aria-label'] === name)!;
  assert.deepEqual(focused, []);
  act(() => button('초안 삭제').props.onClick());
  assert.equal(tree.root.findAllByProps({ className: 'fd-confirm-item' }).length, 1);
  assert.equal(focused.at(-1), '삭제 취소');
  act(() => tree.root.findByProps({ className: 'feedback-demo fd-confirm-demo' }).props.onKeyDown({ key: 'Escape' }));
  assert.equal(focused.at(-1), '초안 삭제');
  act(() => button('초안 삭제').props.onClick());
  act(() => button('삭제 취소').props.onClick());
  assert.equal(focused.at(-1), '초안 삭제');
  act(() => button('초안 삭제').props.onClick());
  act(() => button('초안 삭제 확인').props.onClick());
  assert.equal(tree.root.findAllByProps({ className: 'fd-confirm-item' }).length, 0);
  assert.equal(focused.at(-1), '초안 다시 표시');
  act(() => button('초안 다시 표시').props.onClick());
  assert.equal(tree.root.findAllByProps({ className: 'fd-confirm-item' }).length, 1);
  assert.equal(focused.at(-1), '초안 삭제');
});

test('dismissible banner transfers focus after actions without stealing initial focus', t => {
  let tree!: ReturnType<typeof create>;
  const focused: string[] = [];
  act(() => { tree = create(<DismissibleBannerDemo />, { createNodeMock: element => element.type === 'button' ? { focus: () => focused.push(element.props['aria-label']) } : null }); });
  t.after(() => { act(() => tree.unmount()); });
  assert.deepEqual(focused, []);
  assert.equal(tree.root.findByProps({ role: 'status' }).children.join(''), '검토할 변경 사항이 있어요.');
  act(() => tree.root.findByType('button').props.onClick());
  assert.equal(tree.root.findAllByProps({ role: 'status' }).length, 0);
  assert.equal(tree.root.findByType('button').props['aria-label'], '안내 다시 표시');
  assert.deepEqual(focused, ['안내 다시 표시']);
  act(() => tree.root.findByType('button').props.onClick());
  assert.equal(tree.root.findByType('button').props['aria-label'], '안내 닫기');
  assert.equal(tree.root.findAllByProps({ role: 'status' }).length, 1);
  assert.deepEqual(focused, ['안내 다시 표시', '안내 닫기']);
});

test('native star rating isolates groups and fills only the chosen score prefix', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><StarRatingDemo /><StarRatingDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const groups = tree.root.findAllByType('fieldset');
  const inputs = groups[0].findAllByType('input');
  const other = groups[1].findAllByType('input');
  const fills = () => groups[0].findAllByType('svg').map(svg => svg.props.fill);
  assert.equal(new Set(inputs.map(input => input.props.name)).size, 1);
  assert.notEqual(inputs[0].props.name, other[0].props.name);
  assert.ok([...inputs, ...other].every(input => input.props.checked === false));
  act(() => inputs[3].props.onChange());
  assert.deepEqual(inputs.map(input => input.props.checked), [false, false, false, true, false]);
  assert.deepEqual(fills(), ['currentColor', 'currentColor', 'currentColor', 'currentColor', 'none']);
  assert.ok(other.every(input => input.props.checked === false));
  act(() => inputs[0].props.onChange());
  assert.deepEqual(fills(), ['currentColor', 'none', 'none', 'none', 'none']);
  assert.equal(groups[0].findAllByType('input')[0], inputs[0]);
});

test('tooltip keeps focused or hovered content open, dismisses on Escape and supports tap without toggling shut', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><TooltipDemo /><TooltipDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [button, other] = tree.root.findAllByType('button');
  const [frame] = tree.root.findAllByProps({ className: 'fd-tooltip-frame' });
  const [tip, otherTip] = tree.root.findAllByProps({ role: 'tooltip' });
  assert.notEqual(tip.props.id, otherTip.props.id);
  assert.equal(button.props['aria-describedby'], undefined);
  act(() => button.props.onPointerEnter({ pointerType: 'touch' }));
  assert.equal(tip.props['aria-hidden'], true);
  act(() => { button.props.onFocus(); button.props.onClick(); });
  assert.equal(tip.props['aria-hidden'], false);
  assert.equal(button.props['aria-describedby'], tip.props.id);
  assert.equal(other.props['aria-describedby'], undefined);
  act(() => frame.props.onPointerLeave());
  assert.equal(tip.props['aria-hidden'], false);
  act(() => frame.props.onKeyDown({ key: 'Escape' }));
  assert.equal(tip.props['aria-hidden'], true);
  assert.equal(button.props['aria-describedby'], undefined);
  act(() => button.props.onClick());
  assert.equal(tip.props['aria-hidden'], false);
  act(() => button.props.onBlur());
  assert.equal(tip.props['aria-hidden'], true);
  act(() => button.props.onPointerEnter({ pointerType: 'mouse' }));
  assert.equal(tip.props['aria-hidden'], false);
  act(() => frame.props.onPointerLeave());
  assert.equal(tip.props['aria-hidden'], true);
});

test('notification badge removes and recreates its unread count without replacing the control', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<NotificationBadgeDemo />); });
  t.after(() => { act(() => tree.unmount()); });
  const button = tree.root.findByType('button');
  const badges = () => tree.root.findAllByProps({ className: 'fd-notification-badge' });
  const firstBadge = badges()[0];
  assert.equal(firstBadge.children.join(''), '3');
  assert.equal(firstBadge.props['aria-hidden'], 'true');
  assert.equal(button.props['aria-label'], '읽지 않은 알림 3개, 모두 읽음으로 표시');
  act(() => button.props.onClick());
  assert.equal(badges().length, 0);
  assert.equal(button.props['data-read'], true);
  assert.equal(button.props['aria-label'], '읽지 않은 알림 없음, 알림 다시 표시');
  act(() => button.props.onClick());
  assert.equal(button.props['data-read'], false);
  assert.notEqual(badges()[0], firstBadge);
  assert.equal(tree.root.findByType('button'), button);
});

test('inline validation waits for blur, updates while editing and keeps the error association current', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><InlineValidationDemo /><InlineValidationDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [input, other] = tree.root.findAllByType('input');
  const errors = () => tree.root.findAllByProps({ role: 'alert' });
  const change = (value: string, valid: boolean) => act(() => input.props.onChange({ currentTarget: { value, validity: { valid } } }));
  const blur = (valid: boolean) => act(() => input.props.onBlur({ currentTarget: { validity: { valid } } }));
  assert.notEqual(input.props.id, other.props.id);
  assert.deepEqual(tree.root.findAllByType('label').map(label => label.props.htmlFor), [input.props.id, other.props.id]);
  change('bad', false);
  assert.equal(errors().length, 0);
  assert.equal(input.props['aria-invalid'], false);
  blur(false);
  assert.equal(errors()[0].children.join(''), '이메일 형식을 확인해 주세요.');
  assert.equal(input.props['aria-describedby'], errors()[0].props.id);
  assert.equal(input.props['aria-invalid'], true);
  assert.equal(other.props['aria-invalid'], false);
  change('name@example.com', true);
  assert.equal(errors().length, 0);
  assert.equal(input.props['aria-describedby'], undefined);
  assert.equal(input.props['aria-invalid'], false);
  assert.equal(tree.root.findAllByProps({ 'data-valid': true }).length, 1);
  change('', false);
  assert.equal(errors()[0].children.join(''), '이메일을 입력해 주세요.');
  assert.equal(tree.root.findAllByType('input')[0], input);
});

test('feedback additions have unique searchable techniques with mapped scenes without extra demo captions', () => {
  const originalIds = new Set(['confetti-burst', 'error-shake-tooltip', 'heart-like-burst', 'toast-slide-stack', 'hold-to-confirm-ring']);
  const additions = TECHNIQUES.filter(item => !COLLECTION_IDS.has(item.id) && item.category === 'feedback' && !originalIds.has(item.id));
  assert.equal(additions.length, 11);
  assert.equal(new Set(TECHNIQUES.map(item => item.id)).size, TECHNIQUES.length);
  for (const item of additions) {
    assert.ok(matchesSearch(item, item.titleKo));
    assert.ok(item.promptSnippet.trim());
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
    assert.notEqual(tree.toJSON(), null);
    const paragraphs = tree.root.findAllByType('p');
    assert.equal(paragraphs.length, item.id === 'dismissible-inline-banner' ? 1 : 0);
    assert.ok(paragraphs.every(p => p.props.className === 'fd-banner-copy'));
    assert.equal(tree.root.findAllByType('h3').length, 0);
    act(() => tree.unmount());
  }
});
