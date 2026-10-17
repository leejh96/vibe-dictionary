import assert from 'node:assert/strict';
import test from 'node:test';
import { TECHNIQUES, getTechniqueText, getSearchMetadata, SEARCH_METADATA, searchTechniques } from '../src/index';
import { ENGLISH_TECHNIQUES } from '../src/translations/en';

test('every catalog ID has English content and reviewed bilingual usage metadata', () => {
  const ids = TECHNIQUES.map(item => item.id).sort();
  assert.deepEqual(Object.keys(ENGLISH_TECHNIQUES).sort(), ids);
  assert.deepEqual(Object.keys(SEARCH_METADATA).sort(), ids);
  for (const item of TECHNIQUES) {
    const english = getTechniqueText(item, 'en');
    assert.equal(english.title, item.titleEn);
    for (const value of [english.summary, english.vibeTag, english.promptSnippet, ...english.vibeKeywords]) {
      assert.ok(value.trim(), item.id);
      assert.doesNotMatch(value, /[가-힣]/, item.id);
    }
    // Preserve substantial numeric literals across all prompts; written "ten" is equivalent to 10.
    const translatedNumbers = new Set(english.promptSnippet.replace(/\bten\b/g, '10').match(/\d+(?:\.\d+)?/g) ?? []);
    const originalNumbers = new Set(item.promptSnippet.match(/\d+(?:\.\d+)?/g) ?? []);
    for (const number of originalNumbers) {
      if (number.includes('.') || Number(number) > 9) assert.ok(translatedNumbers.has(number), item.id + ': ' + number);
    }
    const metadata = getSearchMetadata(item);
    assert.ok(metadata.targets.length && metadata.triggers.length, item.id);
    assert.ok(metadata.useCases.ko.length && metadata.useCases.en.length, item.id);
    assert.doesNotMatch(metadata.useCases.en.join(' '), /[가-힣]/);
    assert.equal(getTechniqueText(item).promptSnippet, item.promptSnippet);
  }
});

test('effect and usage queries put the intended technique first in both languages', () => {
  const cases = [
    ['마우스를 올리면 버튼이 자석처럼 따라오는 디자인', 'magnetic-hover'],
    ['make a button follow the mouse cursor', 'magnetic-hover'],
    ['자석 CTA', 'magnetic-hover'], ['MAGNETIC', 'magnetic-hover'],
    ['클릭한 곳에서 물결 퍼지는 버튼', 'ripple-click'], ['click ripple button', 'ripple-click'],
    ['커서 방향으로 기울어지는 카드', 'tilt-3d-card'], ['mouse tilt card', 'tilt-3d-card'],
    ['frosted glass card', 'glassmorphism-card'], ['버튼을 길게 눌러 확인', 'hold-to-confirm-ring'],
    ['SVG outline drawing', 'mg-svg-line-draw'], ['speaker name lower third', 'vd-lower-third-banner'],
    ['before after image comparison', 'before-after-slider'], ['영수증', 'st-receipt-thermal-mono'],
  ];
  for (const [query, expected] of cases) {
    const results = searchTechniques({ query });
    assert.equal(results[0]?.item.id, expected, query);
    assert.ok(results[0].matchedOn.length, query);
    assert.ok(results.every((item, i) => i === 0 || results[i - 1].score >= item.score));
  }
});

test('browsing is stable, filters intersect, and irrelevant queries do not fall back to the full catalog', () => {
  assert.deepEqual(searchTechniques().map(({ item }) => item.id), TECHNIQUES.map(item => item.id));
  assert.deepEqual(searchTechniques({ query: '  \t ' }), searchTechniques());
  for (const query of ['존재하지않는효과12345', 'banana cooking recipe button']) assert.deepEqual(searchTechniques({ query }), [], query);
  const filtered = searchTechniques({ query: 'mouse', target: 'card', trigger: 'pointer-move', domain: 'ui' });
  assert.ok(filtered.some(({ item }) => item.id === 'tilt-3d-card'));
  assert.ok(filtered.every(({ item }) => item.domain === 'ui' && getSearchMetadata(item).targets.includes('card') && getSearchMetadata(item).triggers.includes('pointer-move')));
  assert.deepEqual(searchTechniques({ domain: 'video', category: 'hover' }), []);
  assert.ok(!searchTechniques({ trigger: 'drag' }).some(({ item }) => item.id === 'ly-bottom-sheet'));
  assert.equal(searchTechniques({ query: 'magnetic-hover' })[0]?.item.id, 'magnetic-hover');
});

test('translated prompts preserve representative timing, reset and simulation limits', () => {
  const prompt = (id: string) => getTechniqueText(TECHNIQUES.find(item => item.id === id)!, 'en').promptSnippet;
  for (const value of ['42%', '0.05s', '0.45s', '(0, 0)']) assert.ok(prompt('magnetic-hover').includes(value));
  for (const value of ['55ms', 'Stop', 'clears']) assert.ok(prompt('typewriter-streaming').includes(value));
  assert.match(prompt('otp-pin-focus-bounce'), /not real input autofocus or server authentication/);
  assert.match(prompt('vd-audio-spectrum-visualizer'), /no real audio analysis, playback/);
  assert.match(prompt('ly-bottom-sheet'), /no actual drag gesture/);
});
