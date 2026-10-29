import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { DEMO_REGISTRY } from '../src/components/demos/demoRegistry';
import { DEMO_GROUPS, DEMO_LOADERS } from '../src/components/demos/demoLoaders';
import { LazyInteractiveDemo } from '../src/components/demos/LazyInteractiveDemo';

test('lazy group IDs resolve to the same components as the demo registry', async () => {
  assert.equal(DEMO_GROUPS.reduce((total, group) => total + group.ids.length, 0), DEMO_LOADERS.size, 'duplicate lazy demo ID');
  assert.deepEqual([...DEMO_LOADERS.keys()].sort(), [...DEMO_REGISTRY.keys()].sort());
  for (const [id, component] of DEMO_REGISTRY) {
    const group = await DEMO_LOADERS.get(id)!();
    assert.equal(group[id], component, `wrong group for ${id}`);
  }
});

test('demo loading, success, failure, reload and unmount use the selected group', async () => {
  const id = 'test-lazy-demo';
  const Demo = () => <div>loaded</div>;
  let resolve!: (group: Record<string, typeof Demo>) => void;
  DEMO_LOADERS.set(id, () => new Promise(done => { resolve = done; }));
  let tree!: ReturnType<typeof create>;
  await act(async () => { tree = create(<LazyInteractiveDemo techniqueId={id} playback="interactive" clock={false} restartOnAction={false} />); });
  assert.equal(tree.root.findByProps({ role: 'status' }).children.join(''), '데모를 불러오는 중입니다.');
  await act(async () => { resolve({ [id]: Demo }); });
  assert.equal(tree.root.findByType(Demo).children[0].children.join(''), 'loaded');
  act(() => tree.unmount());

  const failureId = 'test-failed-demo';
  DEMO_LOADERS.set(failureId, () => Promise.reject(new Error('network error')));
  await act(async () => { tree = create(<LazyInteractiveDemo techniqueId={failureId} playback="interactive" clock={false} restartOnAction={false} />); });
  assert.match(tree.root.findByProps({ role: 'alert' }).children[0].children.join(''), /불러오지 못했습니다/);
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  let reloaded = false;
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { location: { reload: () => { reloaded = true; } } } });
  try { act(() => tree.root.findByType('button').props.onClick()); assert.equal(reloaded, true); }
  finally { if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow); else Reflect.deleteProperty(globalThis, 'window'); }
  act(() => tree.unmount());

  const unmountedId = 'test-unmounted-demo';
  DEMO_LOADERS.set(unmountedId, () => new Promise(done => { resolve = done; }));
  await act(async () => { tree = create(<LazyInteractiveDemo techniqueId={unmountedId} playback="interactive" clock={false} restartOnAction={false} />); });
  act(() => tree.unmount());
  await act(async () => { resolve({ [unmountedId]: Demo }); });
  for (const key of [id, failureId, unmountedId]) DEMO_LOADERS.delete(key);
});
