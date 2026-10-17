import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';

test('magnetic tracking stays fast on vertical movement and at the center; only leaving uses spring return', (t) => {
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(<InteractiveDemo techniqueId="magnetic-hover" />); });
  t.after(() => { act(() => tree.unmount()); });
  const area = tree.root.findByType('div');
  const button = () => tree.root.findByType('button');
  const move = (clientX: number, clientY: number) => {
    act(() => area.props.onMouseMove({
      clientX, clientY,
      currentTarget: { getBoundingClientRect: () => ({ left: 20, top: 10, width: 200, height: 160 }) },
    }));
  };

  // Center is (120, 90). A zero X offset is still tracking, not a mouse leave.
  move(120, 130);
  assert.equal(button().props.style.transform, 'translate(0px, 16.8px)');
  assert.equal(button().props.style.transition, 'transform 0.05s ease-out');
  move(120, 90);
  assert.equal(button().props.style.transform, 'translate(0px, 0px)');
  assert.equal(button().props.style.transition, 'transform 0.05s ease-out');
  move(150, 110);
  assert.equal(button().props.style.transform, 'translate(12.6px, 8.4px)');
  assert.equal(button().props.style.transition, 'transform 0.05s ease-out');

  act(() => area.props.onMouseLeave());
  assert.equal(button().props.style.transform, 'translate(0px, 0px)');
  assert.equal(button().props.style.transition, 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)');
  move(120, 50);
  assert.equal(button().props.style.transform, 'translate(0px, -16.8px)');
  assert.equal(button().props.style.transition, 'transform 0.05s ease-out');
});
