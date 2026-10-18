import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES, matchesSearch } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { CutoutMaskDemo } from '../src/components/demos/graphic/CutoutMaskDemo';
import { ConnectorMarkerDemo } from '../src/components/demos/graphic/ConnectorMarkerDemo';
import { RosetteDemo } from '../src/components/demos/graphic/RosetteDemo';
import { HatchFillDemo } from '../src/components/demos/graphic/HatchFillDemo';
import { FixedStrokeZoomDemo } from '../src/components/demos/graphic/FixedStrokeZoomDemo';
import { BezierEditorDemo } from '../src/components/demos/graphic/BezierEditorDemo';
import { IntersectionClipDemo } from '../src/components/demos/graphic/IntersectionClipDemo';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';

test('graphic controls preserve edited values and zoom DOM while labels switch languages live', t => {
  let switchLocale!: ReturnType<typeof useLocale>['setLocale'];
  function LanguageControl() {
    switchLocale = useLocale().setLocale;
    return null;
  }
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<LocaleProvider initialLocale="ko"><LanguageControl /><IntersectionClipDemo /><BezierEditorDemo /><FixedStrokeZoomDemo /></LocaleProvider>); });
  t.after(() => { act(() => tree.unmount()); });
  const inputs = tree.root.findAllByType('input');
  const button = tree.root.findByType('button');
  act(() => {
    inputs[0].props.onChange({ currentTarget: { value: '100' } });
    inputs[1].props.onChange({ currentTarget: { value: '50' } });
    inputs[2].props.onChange({ currentTarget: { value: '90' } });
    button.props.onClick();
  });
  const zoomScene = tree.root.findByProps({ className: 'gd-zoom-canvas' });
  const controlId = button.props['aria-controls'];
  act(() => switchLocale('en'));
  assert.deepEqual(inputs.map(input => input.props.value), [100, 50, 90]);
  assert.deepEqual(inputs.map(input => input.props['aria-label']), ['Circle overlap', 'Control point horizontal', 'Control point vertical']);
  assert.deepEqual(tree.root.findAllByType('input'), inputs);
  assert.equal(tree.root.findByType('button'), button);
  assert.equal(button.props['aria-controls'], controlId);
  assert.ok(button.children.includes('Original size'));
  assert.ok(zoomScene.props['aria-label'].includes('double size'));
  assert.ok(zoomScene.findByType('g').props.transform.includes('scale(2)'));
  assert.equal(tree.root.findByProps({ className: 'gd-bezier-curve' }).props.d, 'M24 88 Q50 90 216 24');
  assert.equal(tree.root.findByType('clipPath').findByType('circle').props.cx, 120);
  act(() => switchLocale('ko'));
  assert.deepEqual(inputs.map(input => input.props.value), [100, 50, 90]);
  assert.equal(inputs[0].props['aria-label'], '두 원 겹침');
  assert.ok(button.children.includes('원래 크기'));
});

test('intersection clips stay local and both moving circles follow the same overlap input', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><IntersectionClipDemo /><IntersectionClipDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const scenes = tree.root.findAllByType('svg');
  const inputs = tree.root.findAllByType('input');
  const clips = scenes.map(scene => scene.findByType('clipPath'));
  assert.notEqual(clips[0].props.id, clips[1].props.id);
  for (let i = 0; i < 2; i++) {
    assert.equal(clips[i].props.clipPathUnits, 'userSpaceOnUse');
    assert.equal(scenes[i].findByProps({ className: 'gd-intersection-fill' }).props.clipPath, `url(#${clips[i].props.id})`);
    assert.equal(clips[i].findByType('circle').props.cx, 144);
  }
  for (const [value, cx] of [['0', 168], ['100', 120]] as const) {
    act(() => inputs[0].props.onChange({ currentTarget: { value } }));
    assert.equal(tree.root.findAllByType('input')[0], inputs[0]);
    assert.equal(clips[0].findByType('circle').props.cx, cx);
    assert.equal(scenes[0].findByProps({ className: 'gd-intersection-outlines' }).findAllByType('circle')[1].props.cx, cx);
    assert.equal(clips[1].findByType('circle').props.cx, 144);
  }
});

test('bezier editor converts scaled pointer coordinates, preserves grab offset and stops canceled drags', t => {
  const captures = new Set<number>();
  const target = { setPointerCapture: (id: number) => captures.add(id), hasPointerCapture: (id: number) => captures.has(id), releasePointerCapture: (id: number) => captures.delete(id) };
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<BezierEditorDemo />, { createNodeMock: element => element.props.className === 'gd-bezier-frame' ? { getBoundingClientRect: () => ({ left: 10, top: 20, width: 120, height: 56 }) } : null }); });
  t.after(() => { act(() => tree.unmount()); });
  const handle = tree.root.findByProps({ className: 'gd-bezier-handle' });
  const inputs = tree.root.findAllByType('input');
  const event = (x: number, y: number, id = 1) => ({ button: 0, isPrimary: true, pointerId: id, clientX: x, clientY: y, currentTarget: target, preventDefault() {} });
  act(() => handle.props.onPointerDown(event(73, 34)));
  assert.ok(captures.has(1));
  act(() => handle.props.onPointerMove(event(83, 44, 2)));
  assert.equal(inputs[0].props.value, 120);
  act(() => handle.props.onPointerMove(event(83, 44)));
  assert.equal(inputs[0].props.value, 140);
  assert.equal(inputs[1].props.value, 44);
  assert.equal(tree.root.findByProps({ className: 'gd-bezier-curve' }).props.d, 'M24 88 Q140 44 216 24');
  act(() => handle.props.onPointerCancel(event(83, 44)));
  assert.equal(captures.size, 0);
  act(() => handle.props.onPointerMove(event(1000, 1000)));
  assert.equal(inputs[0].props.value, 140);
  act(() => handle.props.onPointerDown(event(80, 42)));
  act(() => handle.props.onPointerUp(event(1000, -1000)));
  assert.equal(inputs[0].props.value, 216);
  assert.equal(inputs[1].props.value, 22);
  assert.equal(captures.size, 0);
  act(() => inputs[0].props.onChange({ currentTarget: { value: '50' } }));
  act(() => inputs[1].props.onChange({ currentTarget: { value: '90' } }));
  assert.equal(tree.root.findByProps({ className: 'gd-bezier-curve' }).props.d, 'M24 88 Q50 90 216 24');
  act(() => handle.props.onPointerDown(event(35, 65)));
  act(() => handle.props.onLostPointerCapture(event(35, 65)));
  act(() => handle.props.onPointerMove(event(200, 200)));
  assert.equal(inputs[0].props.value, 50);
});

test('fixed stroke zoom toggles the same control and vector while isolating each instance', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><FixedStrokeZoomDemo /><FixedStrokeZoomDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const buttons = tree.root.findAllByType('button');
  const scenes = tree.root.findAllByType('svg').filter(svg => svg.props.role === 'img');
  assert.notEqual(scenes[0].props.id, scenes[1].props.id);
  assert.equal(buttons[0].props['aria-controls'], scenes[0].props.id);
  const group = scenes[0].findByType('g');
  assert.ok(group.props.transform.includes('scale(1)'));
  act(() => buttons[0].props.onClick());
  assert.equal(tree.root.findAllByType('button')[0], buttons[0]);
  assert.equal(scenes[0].findByType('g'), group);
  assert.ok(group.props.transform.includes('scale(2)'));
  assert.ok(scenes[1].findByType('g').props.transform.includes('scale(1)'));
  assert.equal(scenes[0].findAllByType('path').find(path => path.props.vectorEffect)?.props.vectorEffect, 'non-scaling-stroke');
  assert.ok(scenes[0].props['aria-label'].includes('두 배'));
  act(() => buttons[0].props.onClick());
  assert.ok(group.props.transform.includes('scale(1)'));
  assert.ok(scenes[0].props['aria-label'].includes('기본'));
});

test('hatch fills reuse a local user-space pattern and isolate IDs between instances', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><HatchFillDemo /><HatchFillDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const ids: string[] = [];
  for (const svg of tree.root.findAllByType('svg')) {
    const pattern = svg.findByType('pattern');
    ids.push(pattern.props.id);
    assert.equal(pattern.props.patternUnits, 'userSpaceOnUse');
    assert.equal(pattern.props.patternContentUnits, 'userSpaceOnUse');
    const group = svg.findByType('g');
    assert.equal(group.props.fill, `url(#${pattern.props.id})`);
    assert.equal(group.findAllByType('circle').length, 1);
    assert.equal(group.findAllByType('rect').length, 1);
  }
  assert.notEqual(ids[0], ids[1]);
});

test('rosette copies reuse one local petal and isolate their reference across instances', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><RosetteDemo /><RosetteDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const ids: string[] = [];
  for (const svg of tree.root.findAllByType('svg')) {
    const petal = svg.findByType('path');
    ids.push(petal.props.id);
    const copies = svg.findAllByType('use');
    assert.equal(copies.length, 12);
    assert.ok(copies.every(copy => copy.props.href === `#${petal.props.id}`));
    assert.deepEqual(copies.map(copy => copy.props.transform), Array.from({ length: 12 }, (_, index) => `rotate(${index * 30})`));
  }
  assert.notEqual(ids[0], ids[1]);
});

test('connector paths reuse their local marker without sharing marker IDs across instances', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><ConnectorMarkerDemo /><ConnectorMarkerDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const markers = tree.root.findAllByType('marker');
  assert.notEqual(markers[0].props.id, markers[1].props.id);
  for (const svg of tree.root.findAllByType('svg')) {
    const marker = svg.findByType('marker');
    const connections = svg.findAllByType('path').filter(path => path.props.markerEnd);
    assert.equal(connections.length, 2);
    assert.ok(connections.every(path => path.props.markerEnd === `url(#${marker.props.id})`));
    assert.equal(marker.props.markerUnits, 'userSpaceOnUse');
    assert.equal(marker.props.orient, 'auto');
  }
});

test('cutout masks and gradients keep their references inside each mounted instance', t => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<><CutoutMaskDemo /><CutoutMaskDemo /></>); });
  t.after(() => { act(() => tree.unmount()); });
  const ids: string[] = [];
  for (const svg of tree.root.findAllByType('svg')) {
    const mask = svg.findByType('mask');
    const gradient = svg.findByType('linearGradient');
    ids.push(mask.props.id, gradient.props.id);
    const shape = svg.findAllByType('rect').find(rect => rect.props.mask);
    assert.equal(shape?.props.mask, `url(#${mask.props.id})`);
    assert.equal(shape?.props.fill, `url(#${gradient.props.id})`);
    assert.equal(mask.props.maskUnits, 'userSpaceOnUse');
    assert.equal(mask.props.maskContentUnits, 'userSpaceOnUse');
    assert.equal(mask.props.style.maskType, 'luminance');
  }
  assert.equal(new Set(ids).size, 4);
});

test('new graphic techniques have unique searchable metadata, mapped scenes and no helper captions', () => {
  const originals = new Set(['mg-svg-line-draw', 'mg-liquid-blob-morph', 'mg-gooey-metaball', 'mg-orbit-rotation', 'mg-morphing-grid-wave']);
  const additions = TECHNIQUES.filter(item => item.category === 'graphic' && !originals.has(item.id));
  assert.equal(additions.length, 10);
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
