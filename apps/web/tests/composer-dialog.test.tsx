import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { TECHNIQUES } from '@vibe-dictionary/catalog';
import { PromptCartDrawer } from '../src/components/PromptCartDrawer';

test('composer opens a labelled native modal, handles Escape and closes on cleanup', () => {
  let opened = 0, closed = 0;
  const changes: boolean[] = [];
  const render = (isOpen: boolean) => <PromptCartDrawer cart={[TECHNIQUES[0]]} contextNote="CTA" onContextNoteChange={() => {}}
    storageError={null} isOpen={isOpen} onOpenChange={value => changes.push(value)} onRemoveItem={() => {}} onClearCart={() => {}} />;
  let tree!: ReturnType<typeof create>;
  act(() => { tree = create(render(true), { createNodeMock: element => element.type === 'dialog' ? { showModal() { opened++; }, close() { closed++; } } : null }); });
  const dialog = tree.root.findByType('dialog');
  assert.equal(opened, 1);
  assert.equal(dialog.props['aria-modal'], 'true');
  assert.equal(tree.root.findByType('h2').props.id, dialog.props['aria-labelledby']);
  assert.equal(tree.root.findByType('input').props.autoFocus, true);
  let prevented = false;
  act(() => dialog.props.onCancel({ preventDefault() { prevented = true; } }));
  assert.equal(prevented, true);
  assert.deepEqual(changes, [false]);
  assert.ok(tree.root.findAllByType('button').every(button => button.children.length > 0 || button.props['aria-label']));
  act(() => tree.update(render(false)));
  assert.equal(closed, 1);
  assert.equal(tree.root.findAllByType('dialog').length, 0);
  act(() => tree.unmount());
});
