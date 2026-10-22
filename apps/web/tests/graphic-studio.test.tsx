import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, getTechniqueText, searchTechniques } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';

const ids = ['mg-halftone-dot-shading', 'mg-isometric-voxel-landscape', 'mg-ribbon-over-under-weave', 'mg-guilloche-curve-engraving', 'mg-gradient-stroke-ribbon'];

test('graphic studio entries are searchable in both languages and expose localized prompts', () => {
  for (const id of ids) {
    const item = TECHNIQUES.find(item => item.id === id)!;
    assert.ok(item);
    for (const locale of ['ko', 'en'] as const) {
      const text = getTechniqueText(item, locale);
      assert.equal(searchTechniques({ query: text.title })[0]?.item.id, id);
      assert.ok(text.promptSnippet.length > 300);
    }
  }
});

test('graphic studio previews have no sliders or reversal buttons', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<>{ids.map(id => <InteractiveDemo key={id} techniqueId={id} />)}</>); });
  t.after(() => act(() => tree.unmount()));
  assert.equal(tree.root.findAllByType('input').length, 0);
  assert.equal(tree.root.findAllByType('button').length, 0);
  assert.equal(tree.root.findAllByType('svg').length, 5);
});

test('gradient references stay local when multiple studio demos are mounted', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<>{[ids[3], ids[4], ids[3], ids[4]].map((id, i) => <InteractiveDemo key={i} techniqueId={id} />)}</>); });
  t.after(() => act(() => tree.unmount()));
  const gradients = tree.root.findAllByType('linearGradient');
  assert.equal(new Set(gradients.map(gradient => gradient.props.id)).size, 4);
  for (const svg of tree.root.findAllByType('svg')) {
    const id = svg.findByType('linearGradient').props.id;
    assert.ok(svg.findAllByType('path').filter(path => path.props.stroke.startsWith('url(')).every(path => path.props.stroke === `url(#${id})`));
  }
});
