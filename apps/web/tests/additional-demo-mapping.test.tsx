import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { ADDITIONAL_DEMOS } from '../src/components/demos/additionalDemos';
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

test('category demo registries cannot shadow one another and every registered ID resolves through the app', () => {
  const registries = [GRID_ADDITION_DEMOS, NAV_ADDITION_DEMOS, PANEL_ADDITION_DEMOS, MODERN_ADDITION_DEMOS,
    CAMERA_ADDITION_DEMOS, VFX_ADDITION_DEMOS, SCROLL_ADDITION_DEMOS,
    TACTILE_ADDITION_DEMOS, RETRO_ADDITION_DEMOS, SCIFI_ADDITION_DEMOS,
    PROMO_ADDITION_DEMOS, KINETIC_AD_ADDITION_DEMOS, INFOGRAPHIC_ADDITION_DEMOS, BROADCAST_ADDITION_DEMOS];
  const entries = registries.flatMap(registry => Object.entries(registry));
  assert.ok(registries.every(registry => Object.keys(registry).length > 0));
  assert.equal(ADDITIONAL_DEMOS.size, entries.length, 'category IDs must not silently overwrite another component');
  for (const [id, Component] of entries) {
    assert.equal(TECHNIQUES.filter(item => item.id === id).length, 1);
    let tree!: ReturnType<typeof create>;
    act(() => { tree = create(<InteractiveDemo techniqueId={id} />); });
    try { assert.equal(tree.root.findAllByType(Component).length, 1); }
    finally { act(() => tree.unmount()); }
  }
  assert.equal(ADDITIONAL_DEMOS.get('__proto__'), undefined);
});
