import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { ValueBubbleSliderDemo } from '../src/components/demos/control/ValueBubbleSliderDemo';
import { MixedCheckboxDemo } from '../src/components/demos/control/MixedCheckboxDemo';
import { PreviewSelectDemo } from '../src/components/demos/control/PreviewSelectDemo';
import { QuantityStepperDemo } from '../src/components/demos/control/QuantityStepperDemo';
import { TokenInputDemo } from '../src/components/demos/control/TokenInputDemo';
import { DualRangeDemo } from '../src/components/demos/control/DualRangeDemo';
import { ColorSwatchDemo } from '../src/components/demos/control/ColorSwatchDemo';
import { FilePickerDemo } from '../src/components/demos/control/FilePickerDemo';
import { SearchComboboxDemo } from '../src/components/demos/control/SearchComboboxDemo';
import { DateFieldDemo } from '../src/components/demos/control/DateFieldDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('control language switches update sample labels while preserving selections, raw edits and native fields', t => {
  let tree!: ReturnType<typeof create>;
  let changeLocale!: ReturnType<typeof useLocale>['setLocale'];
  function LocaleSwitch() { changeLocale = useLocale().setLocale; return null; }
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LocaleSwitch /><DateFieldDemo /><SearchComboboxDemo /><SearchComboboxDemo /><FilePickerDemo /><ColorSwatchDemo /><DualRangeDemo /><TokenInputDemo /><QuantityStepperDemo /><PreviewSelectDemo /><MixedCheckboxDemo /><ValueBubbleSliderDemo /></LocaleProvider>, {
    createNodeMock: () => ({ focus() {}, scrollIntoView() {}, indeterminate: false }),
  }); });
  t.after(() => { act(() => tree.unmount()); });
  const originalInputs = tree.root.findAllByType('input');
  const [combo, freeCombo] = tree.root.findAllByType(SearchComboboxDemo);
  const comboInput = combo.findByType('input');
  act(() => comboInput.props.onFocus());
  act(() => combo.findAllByProps({ role: 'option' })[1].props.onClick());
  act(() => freeCombo.findByType('input').props.onChange({ currentTarget: { value: '사용자 입력' } }));
  const tokens = tree.root.findByType(TokenInputDemo);
  const tokenInput = tokens.findByType('input');
  act(() => tokenInput.props.onChange({ target: { value: '사용자 태그' } }));
  act(() => tokens.findByProps({ 'aria-label': '태그 추가' }).props.onClick());
  act(() => tokenInput.props.onChange({ target: { value: '  메모  ' } }));
  const attachment = tree.root.findByType(FilePickerDemo);
  const file = { name: '시안{size}.txt', size: 1234 };
  act(() => attachment.findByType('input').props.onChange({ currentTarget: { files: [file] } }));
  const color = tree.root.findByType(ColorSwatchDemo).findByType('input');
  act(() => color.props.onInput({ currentTarget: { value: '#123456' } }));
  const [lower, upper] = tree.root.findByType(DualRangeDemo).findAllByType('input');
  act(() => lower.props.onChange({ target: { value: '35' } }));
  const quantity = tree.root.findByType(QuantityStepperDemo).findByType('input');
  act(() => quantity.props.onChange({ target: { value: '12' } }));
  const select = tree.root.findByType(PreviewSelectDemo).findByType('select');
  act(() => select.props.onChange({ target: { value: '36' } }));
  const checks = tree.root.findByType(MixedCheckboxDemo).findAllByType('input');
  act(() => checks[2].props.onChange({ target: { checked: true } }));
  const range = tree.root.findByType(ValueBubbleSliderDemo).findByType('input');
  act(() => range.props.onChange({ target: { value: '35' } }));

  act(() => changeLocale('en'));
  assert.equal(comboInput.props.value, 'Color system');
  assert.equal(comboInput.props.placeholder, 'Search fields');
  assert.equal(freeCombo.findByType('input').props.value, '사용자 입력');
  assert.equal(freeCombo.findByProps({ role: 'status' }).children.join(''), 'No suggestions');
  assert.deepEqual(tokens.findAllByType('li').map(item => item.findByType('span').children.join('')), ['UI', 'Motion', '사용자 태그']);
  assert.equal(tokenInput.props.value, '  메모  ');
  assert.ok(tokens.findByProps({ 'aria-label': 'Remove 사용자 태그 tag' }));
  assert.ok(attachment.findByProps({ 'aria-label': 'Remove 시안{size}.txt attachment' }));
  assert.equal(attachment.findByProps({ className: 'ct-file-info' }).findAllByType('span')[0].children.join(''), file.name);
  assert.equal(color.props.value, '#123456');
  assert.deepEqual([lower.props.value, upper.props.value], [35, 80]);
  assert.equal(lower.props['aria-label'], 'Minimum');
  assert.equal(quantity.props.value, '12');
  assert.equal(select.props.value, 36);
  assert.deepEqual(select.findAllByType('option').map(option => option.children.join('')), ['Small · 20px', 'Medium · 28px', 'Large · 36px']);
  assert.deepEqual(checks.map(input => input.props.checked), [false, true, true, false]);
  assert.equal(range.props.value, 35);
  assert.equal(range.props['aria-valuetext'], '35%');
  const date = tree.root.findByType(DateFieldDemo).findByType('input');
  assert.equal(date.props.value, undefined);
  assert.equal(date.props.defaultValue, '2026-10-18');
  assert.deepEqual(tree.root.findAllByType('input'), originalInputs);
  assert.ok(tree.root.findAllByType('label').some(label => label.children.includes('Date')));

  act(() => changeLocale('ko'));
  assert.equal(comboInput.props.value, '컬러 시스템');
  assert.equal(tokenInput.props.value, '  메모  ');
  assert.deepEqual(tokens.findAllByType('li').map(item => item.findByType('span').children.join('')), ['UI', '모션', '사용자 태그']);
  assert.deepEqual(checks.map(input => input.props.checked), [false, true, true, false]);
  assert.equal(tree.root.findByType(PreviewSelectDemo).findByType('select'), select);
});

test('native date fields have independent labels and leave date editing to the browser without adding date rules', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><DateFieldDemo /><DateFieldDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [input, other] = tree.root.findAllByType('input');
  assert.equal(input.props.type, 'date');
  assert.equal(input.props.defaultValue, '2026-10-18');
  assert.equal(input.props.value, undefined);
  assert.notEqual(input.props.id, other.props.id);
  assert.equal(tree.root.findAllByType('label')[0].props.htmlFor, input.props.id);
  assert.equal(input.props.min, undefined);
  assert.equal(input.props.max, undefined);
  assert.equal(input.props.required, undefined);
  assert.equal(input.props.onChange, undefined);
});

test('manual combobox filters without auto-selection, navigates current options and commits only explicit choices', t => {
  let tree!: ReturnType<typeof create>;
  let focused = 0, scrolled = 0, prevented = 0;
  act(() => { tree = create(<><SearchComboboxDemo /><SearchComboboxDemo /></>, { createNodeMock: element => element.type === 'input' ? { focus: () => { focused++; } } : element.type === 'li' ? { scrollIntoView: () => { scrolled++; } } : null }); });
  t.after(() => { act(() => tree.unmount()); });
  const [input, other] = tree.root.findAllByType('input');
  const [list] = tree.root.findAllByType('ul');
  assert.notEqual(input.props.id, other.props.id);
  assert.equal(input.props['aria-expanded'], false);
  assert.equal(input.props['aria-controls'], list.props.id);
  const key = (key: string, composing = false) => act(() => input.props.onKeyDown({ key, nativeEvent: { isComposing: composing }, preventDefault: () => { prevented++; }, stopPropagation() {} }));
  act(() => input.props.onFocus());
  assert.equal(input.props['aria-expanded'], true);
  assert.equal(input.props['aria-activedescendant'], undefined);
  key('ArrowUp');
  assert.equal(input.props['aria-activedescendant'], `${input.props.id}-icon`);
  key('Enter', true);
  assert.equal(input.props.value, '');
  key('Escape');
  assert.equal(input.props['aria-expanded'], false);
  assert.equal(input.props['aria-activedescendant'], undefined);
  key('ArrowDown'); key('ArrowDown'); key('Enter');
  assert.equal(input.props.value, '컬러 시스템');
  assert.equal(input.props['aria-expanded'], false);
  act(() => input.props.onChange({ currentTarget: { value: '아이' } }));
  assert.equal(list.findAllByProps({ role: 'option' }).length, 1);
  assert.equal(input.props['aria-activedescendant'], undefined);
  key('ArrowDown'); key('Tab');
  assert.equal(input.props.value, '아이');
  assert.equal(input.props['aria-expanded'], false);
  act(() => input.props.onChange({ currentTarget: { value: '없는 분야' } }));
  assert.equal(input.props['aria-expanded'], false);
  assert.equal(tree.root.findByProps({ role: 'status' }).children.join(''), '추천 항목 없음');
  key('ArrowDown'); key('Enter');
  assert.equal(input.props.value, '없는 분야');
  act(() => input.props.onChange({ currentTarget: { value: '' } }));
  const option = list.findAllByProps({ role: 'option' })[0];
  act(() => option.props.onPointerDown({ button: 0, preventDefault: () => { prevented++; } }));
  act(() => option.props.onClick());
  assert.equal(input.props.value, '타이포그래피');
  assert.equal(other.props.value, '');
  assert.equal(tree.root.findAllByType('input')[0], input);
  assert.ok(focused > 0 && scrolled > 0 && prevented > 0);
});

test('file attachment replaces real metadata, clears native selection and returns focus without replacing the input', t => {
  let tree!: ReturnType<typeof create>;
  let focused = 0;
  const natives: { value: string; focus: () => void }[] = [];
  act(() => { tree = create(<><FilePickerDemo /><FilePickerDemo /></>, { createNodeMock: element => {
    if (element.type !== 'input') return null;
    const native = { value: 'C:\\fakepath\\example.txt', focus: () => { focused++; } };
    natives.push(native);
    return native;
  } }); });
  t.after(() => { act(() => tree.unmount()); });
  const [frame, other] = tree.root.findAllByProps({ className: 'ct-file-frame' });
  const input = frame.findByType('input');
  assert.equal(input.props.type, 'file');
  assert.equal(input.props.multiple, undefined);
  assert.equal(input.props.accept, undefined);
  assert.equal(frame.findByType('label').props.htmlFor, input.props.id);
  assert.notEqual(input.props.id, other.findByType('input').props.id);
  assert.equal(frame.findAllByType('button').length, 0);
  for (const file of [{ name: '디자인-시안.txt', size: 1234 }, { name: 'empty.txt', size: 0 }]) {
    act(() => input.props.onChange({ currentTarget: { files: [file] } }));
    const info = frame.findByProps({ className: 'ct-file-info' }).findAllByType('span');
    assert.deepEqual(info.map(span => span.children.join('')), [file.name, `${file.size.toLocaleString('ko-KR')} B`]);
    assert.equal(frame.findByType('button').props['aria-label'], `${file.name} 첨부 제거`);
    assert.equal(frame.findByType('input'), input);
    assert.equal(other.findAllByType('button').length, 0);
  }
  act(() => frame.findByType('button').props.onClick());
  assert.equal(natives[0].value, '');
  assert.equal(natives[1].value, 'C:\\fakepath\\example.txt');
  assert.equal(focused, 1);
  assert.equal(frame.findAllByType('button').length, 0);
  assert.equal(frame.findByType('input'), input);
  act(() => input.props.onChange({ currentTarget: { files: [{ name: 'empty.txt', size: 0 }] } }));
  assert.equal(frame.findAllByType('button').length, 1);
  act(() => input.props.onChange({ currentTarget: { files: [] } }));
  assert.equal(frame.findAllByType('button').length, 0);
});

test('color swatch preserves the native field and mirrors its RGB value without affecting another instance', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><ColorSwatchDemo /><ColorSwatchDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [input, other] = tree.root.findAllByType('input');
  const [output] = tree.root.findAllByType('output');
  assert.equal(input.props.type, 'color');
  assert.equal(input.props.value, '#8b5cf6');
  assert.notEqual(input.props.id, other.props.id);
  assert.equal(tree.root.findAllByType('label')[0].props.htmlFor, input.props.id);
  assert.equal(output.props.htmlFor, input.props.id);
  assert.equal(output.props['aria-hidden'], 'true');
  for (const color of ['#ffffff', '#000000', '#22c55e']) {
    act(() => input.props.onInput({ currentTarget: { value: color } }));
    assert.equal(input.props.value, color);
    assert.equal(output.children.join(''), color.toUpperCase());
    assert.equal(other.props.value, '#8b5cf6');
    assert.equal(tree.root.findAllByType('input')[0], input);
  }
});

test('dual range clamps against current peer values, updates accessible bounds and keeps thumb order', t => {
  let tree!: ReturnType<typeof create>;
  const focused: string[] = [];
  act(() => { tree = create(<><DualRangeDemo /><DualRangeDemo /></>, { createNodeMock: element => element.type === 'input' ? { focus: () => focused.push(element.props.id) } : null }); });
  t.after(() => { act(() => tree.unmount()); });
  const [frame, other] = tree.root.findAllByType('fieldset');
  const [lower, upper] = frame.findAllByType('input');
  const values = () => frame.findAllByType('input').map(input => input.props.value);
  const change = (input: typeof lower, value: number) => input.props.onChange({ target: { value: String(value) } });
  assert.deepEqual(values(), [20, 80]);
  assert.notEqual(lower.props.id, other.findAllByType('input')[0].props.id);
  act(() => { change(lower, 100); change(upper, 0); });
  assert.deepEqual(values(), [60, 80]);
  assert.equal(lower.props['aria-valuemax'], 60);
  assert.equal(upper.props['aria-valuemin'], 80);
  let prevented = 0;
  const key = (input: typeof lower, key: string) => act(() => input.props.onKeyDown({ key, preventDefault: () => prevented++ }));
  key(lower, 'Home');
  key(upper, 'Home');
  assert.deepEqual(values(), [0, 20]);
  key(upper, 'End');
  key(lower, 'End');
  assert.deepEqual(values(), [80, 100]);
  key(lower, 'Tab');
  assert.equal(prevented, 4);
  const field = frame.findByProps({ className: 'ct-dual-field' });
  const target = { getBoundingClientRect: () => ({ left: 0, width: 244 }) };
  act(() => field.props.onPointerDown({ currentTarget: target, target, button: 0, isPrimary: true, clientX: 22, preventDefault: () => prevented++ }));
  assert.deepEqual(values(), [0, 100]);
  assert.equal(focused.at(-1), lower.props.id);
  act(() => field.props.onPointerDown({ currentTarget: target, target: {}, button: 0, isPrimary: true, clientX: 122, preventDefault: () => prevented++ }));
  assert.equal(prevented, 5);
  assert.equal(frame.findAllByType('input')[0], lower);
  assert.equal(frame.findAllByType('input')[1], upper);
  assert.deepEqual(other.findAllByType('input').map(input => input.props.value), [20, 80]);
});

test('token input ignores composing Enter, trims additions, avoids duplicates and returns removal focus to the same input', t => {
  let tree!: ReturnType<typeof create>;
  const focused: string[] = [];
  act(() => { tree = create(<><TokenInputDemo /><TokenInputDemo /></>, { createNodeMock: element => element.type === 'input' ? { focus: () => focused.push(element.props.id) } : null }); });
  t.after(() => { act(() => tree.unmount()); });
  const [frame, other] = tree.root.findAllByProps({ className: 'ct-token-frame' });
  const input = frame.findByType('input');
  const add = frame.findByProps({ 'aria-label': '태그 추가' });
  const names = () => frame.findByType('ul').findAllByType('li').map(item => item.findByType('span').children.join(''));
  assert.notEqual(input.props.id, other.findByType('input').props.id);
  assert.equal(frame.findByType('label').props.htmlFor, input.props.id);
  assert.equal(focused.length, 0);
  assert.equal(add.props['aria-disabled'], true);
  act(() => input.props.onChange({ target: { value: '  접근성  ' } }));
  let prevented = 0;
  const key = (composing: boolean) => act(() => input.props.onKeyDown({ key: 'Enter', nativeEvent: { isComposing: composing }, preventDefault: () => prevented++ }));
  key(true);
  assert.deepEqual(names(), ['UI', '모션']);
  assert.equal(input.props.value, '  접근성  ');
  assert.equal(prevented, 0);
  key(false);
  assert.deepEqual(names(), ['UI', '모션', '접근성']);
  assert.equal(input.props.value, '');
  assert.equal(prevented, 1);
  assert.equal(focused.at(-1), input.props.id);
  act(() => input.props.onChange({ target: { value: 'UI' } }));
  act(() => add.props.onClick());
  assert.deepEqual(names(), ['UI', '모션', '접근성']);
  act(() => input.props.onChange({ target: { value: '  ' } }));
  act(() => add.props.onClick());
  assert.deepEqual(names(), ['UI', '모션', '접근성']);
  for (const name of ['UI', '모션', '접근성']) act(() => frame.findByProps({ 'aria-label': `${name} 태그 제거` }).props.onClick());
  assert.equal(frame.findByType('ul').props.hidden, true);
  assert.equal(focused.at(-1), input.props.id);
  assert.equal(frame.findByType('input'), input);
  assert.equal(other.findAllByType('li').length, 2);
});

test('quantity stepper preserves editing and delegates steps to the native input while guarding endpoints', t => {
  let tree!: ReturnType<typeof create>;
  let up = 0, down = 0;
  const native = { value: '3', stepUp() { up++; this.value = '6'; }, stepDown() { down++; this.value = '2'; } };
  act(() => { tree = create(<QuantityStepperDemo />, { createNodeMock: element => element.type === 'input' ? native : null }); });
  t.after(() => { act(() => tree.unmount()); });
  const input = tree.root.findByType('input');
  const [decrease, increase] = tree.root.findAllByType('button');
  assert.equal(tree.root.findByType('label').props.htmlFor, input.props.id);
  assert.deepEqual([input.props.type, input.props.min, input.props.max, input.props.step, input.props.value], ['number', 0, 9, 1, '3']);
  assert.equal(increase.props['aria-controls'], input.props.id);
  act(() => increase.props.onClick());
  assert.equal(up, 1);
  assert.equal(input.props.value, '6');
  act(() => decrease.props.onClick());
  assert.equal(down, 1);
  assert.equal(input.props.value, '2');
  const edit = (value: string) => act(() => input.props.onChange({ target: { value } }));
  edit('');
  assert.equal(input.props.value, '');
  assert.equal(decrease.props['aria-disabled'], false);
  edit('12');
  assert.equal(input.props.value, '12');
  assert.equal(increase.props['aria-disabled'], true);
  act(() => increase.props.onClick());
  assert.equal(up, 1);
  edit('0');
  assert.equal(decrease.props['aria-disabled'], true);
  act(() => decrease.props.onClick());
  assert.equal(down, 1);
  edit('2.5');
  assert.equal(input.props.value, '2.5');
  assert.equal(tree.root.findByType('input'), input);
});

test('native select changes only its linked preview and retains the same input and sample', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><PreviewSelectDemo /><PreviewSelectDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [select, other] = tree.root.findAllByType('select');
  const [preview, otherPreview] = tree.root.findAllByProps({ className: 'ct-size-preview' });
  assert.notEqual(select.props.id, other.props.id);
  assert.equal(tree.root.findAllByType('label')[0].props.htmlFor, select.props.id);
  assert.equal(select.props.value, 28);
  assert.deepEqual(select.findAllByType('option').map(option => option.props.value), [20, 28, 36]);
  assert.equal(preview.props['aria-hidden'], 'true');
  for (const size of [36, 20, 28]) {
    act(() => select.props.onChange({ target: { value: String(size) } }));
    assert.equal(select.props.value, size);
    assert.equal(preview.props.style.fontSize, size);
    assert.equal(preview.children.join(''), 'Aa');
    assert.equal(otherPreview.props.style.fontSize, 28);
    assert.equal(tree.root.findAllByType('select')[0], select);
    assert.equal(tree.root.findAllByProps({ className: 'ct-size-preview' })[0], preview);
  }
});

test('checkbox group derives all and mixed states, changes individual options and isolates groups', t => {
  let tree!: ReturnType<typeof create>;
  const masters: { indeterminate: boolean }[] = [];
  act(() => { tree = create(<><MixedCheckboxDemo /><MixedCheckboxDemo /></>, { createNodeMock: element => {
    if (element.type !== 'input') return null;
    const node = { indeterminate: false };
    masters.push(node);
    return node;
  } }); });
  t.after(() => { act(() => tree.unmount()); });
  const [group, other] = tree.root.findAllByType('fieldset');
  const [master, color, type, layout] = group.findAllByType('input');
  const values = () => group.findAllByType('input').map(input => input.props.checked);
  const change = (input: typeof master, checked: boolean) => act(() => input.props.onChange({ target: { checked } }));
  assert.notEqual(master.props.id, other.findAllByType('input')[0].props.id);
  assert.deepEqual(values(), [false, true, false, false]);
  assert.equal(masters[0].indeterminate, true);
  change(master, true);
  assert.deepEqual(values(), [true, true, true, true]);
  assert.equal(masters[0].indeterminate, false);
  change(type, false);
  assert.deepEqual(values(), [false, true, false, true]);
  assert.equal(masters[0].indeterminate, true);
  change(color, false);
  change(layout, false);
  assert.deepEqual(values(), [false, false, false, false]);
  assert.equal(masters[0].indeterminate, false);
  change(master, true);
  change(master, false);
  assert.deepEqual(values(), [false, false, false, false]);
  assert.equal(group.findAllByType('input')[0], master);
  assert.deepEqual(other.findAllByType('input').map(input => input.props.checked), [false, true, false, false]);
});

test('value bubble follows the native range value, exposes its percentage and isolates instances', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><ValueBubbleSliderDemo /><ValueBubbleSliderDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const [input, other] = tree.root.findAllByType('input');
  const [label] = tree.root.findAllByType('label');
  const [output] = tree.root.findAllByType('output');
  assert.notEqual(input.props.id, other.props.id);
  assert.equal(label.props.htmlFor, input.props.id);
  assert.deepEqual([input.props.type, input.props.min, input.props.max, input.props.step, input.props.value], ['range', 0, 100, 5, 50]);
  assert.equal(output.props['aria-hidden'], 'true');
  for (const value of [0, 100, 35]) {
    act(() => input.props.onChange({ target: { value: String(value) } }));
    assert.equal(input.props.value, value);
    assert.equal(input.props['aria-valuetext'], `${value}%`);
    assert.equal(output.children.join(''), `${value}%`);
    assert.equal(tree.root.findAllByProps({ className: 'ct-range-frame' })[0].props.style['--ct-fill'], `${value}%`);
    assert.equal(other.props.value, 50);
    assert.equal(tree.root.findAllByType('input')[0], input);
  }
});

test('control additions including inline editing are searchable and mapped without helper captions', () => {
  const originals = new Set(['before-after-slider', 'drag-snap-slot', 'elastic-toggle-switch', 'combo-gauge-pop', 'gooey-menu-fab', 'otp-pin-focus-bounce', 'peek-password-lamp']);
  const additions = TECHNIQUES.filter(item => item.category === 'control' && !originals.has(item.id));
  assert.equal(additions.length, 11);
  assert.equal(new Set(TECHNIQUES.map(item => item.id)).size, TECHNIQUES.length);
  for (const item of additions) {
    assert.ok(matchesSearch(item, item.titleKo));
    assert.ok(item.promptSnippet.trim());
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={item.id} />); });
    assert.notEqual(tree.toJSON(), null);
    assert.equal(tree.root.findAllByType('p').length, 0);
    assert.equal(tree.root.findAllByType('h3').length, 0);
    act(() => tree.unmount());
  }
});
