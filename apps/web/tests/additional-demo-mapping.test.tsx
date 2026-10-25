import { COLLECTION_REGISTRIES } from './helpers/collection';
import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { DEMO_REGISTRY } from '../src/components/demos/demoRegistry';
import { BASE_DEMOS } from '../src/components/demos/base';
import { GRID_ADDITION_DEMOS } from '../src/components/demos/grid';
import { NAV_ADDITION_DEMOS } from '../src/components/demos/nav';
import { PANEL_ADDITION_DEMOS } from '../src/components/demos/panel';
import { MODERN_ADDITION_DEMOS } from '../src/components/demos/modern';
import { CAMERA_ADDITION_DEMOS } from '../src/components/demos/camera';
import { VFX_ADDITION_DEMOS } from '../src/components/demos/vfx';
import { SCROLL_ADDITION_DEMOS } from '../src/components/demos/scroll';
import { TACTILE_ADDITION_DEMOS } from '../src/components/demos/tactile';
import { RETRO_ADDITION_DEMOS } from '../src/components/demos/retro';
import { SCIFI_ADDITION_DEMOS } from '../src/components/demos/scifi';
import { PROMO_ADDITION_DEMOS } from '../src/components/demos/promo';
import { KINETIC_AD_ADDITION_DEMOS } from '../src/components/demos/kinetic_ad';
import { INFOGRAPHIC_ADDITION_DEMOS } from '../src/components/demos/infographic';
import { BROADCAST_ADDITION_DEMOS } from '../src/components/demos/broadcast';

test('demo registries cannot shadow one another and every registered ID resolves through the app', t => {
  t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] });
  const originals = ['window', 'document', 'requestAnimationFrame', 'cancelAnimationFrame'].map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)] as const);
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { matchMedia: () => ({ matches: true }), setTimeout, clearTimeout, setInterval, clearInterval } });
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { hidden: false, addEventListener() {}, removeEventListener() {} } });
  Object.defineProperty(globalThis, 'requestAnimationFrame', { configurable: true, value: () => 0 });
  Object.defineProperty(globalThis, 'cancelAnimationFrame', { configurable: true, value: () => {} });
  t.after(() => { for (const [name, descriptor] of originals) { if (descriptor) Object.defineProperty(globalThis, name, descriptor); else Reflect.deleteProperty(globalThis, name); } });
  const registries = [BASE_DEMOS, ...COLLECTION_REGISTRIES, GRID_ADDITION_DEMOS, NAV_ADDITION_DEMOS, PANEL_ADDITION_DEMOS, MODERN_ADDITION_DEMOS,
    CAMERA_ADDITION_DEMOS, VFX_ADDITION_DEMOS, SCROLL_ADDITION_DEMOS,
    TACTILE_ADDITION_DEMOS, RETRO_ADDITION_DEMOS, SCIFI_ADDITION_DEMOS,
    PROMO_ADDITION_DEMOS, KINETIC_AD_ADDITION_DEMOS, INFOGRAPHIC_ADDITION_DEMOS, BROADCAST_ADDITION_DEMOS];
  const entries = registries.flatMap(registry => Object.entries(registry));
  assert.ok(registries.every(registry => Object.keys(registry).length > 0));
  assert.equal(DEMO_REGISTRY.size, entries.length, 'registry IDs must not silently overwrite another component');
  for (const [id, Component] of entries) {
    assert.equal(TECHNIQUES.filter(item => item.id === id).length, 1);
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={id} />); });
    try { assert.equal(tree.root.findAllByType(Component).length, 1); }
    finally { act(() => tree.unmount()); }
  }
  for (const id of ['__proto__', 'constructor', 'unknown-demo']) {
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={id} />); });
    try { assert.equal(tree.toJSON(), null); }
    finally { act(() => tree.unmount()); }
  }
});
