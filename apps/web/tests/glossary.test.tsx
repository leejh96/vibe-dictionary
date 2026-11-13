import assert from 'node:assert/strict';
import test, { type TestContext } from 'node:test';
import React from 'react';
import { act, create, type ReactTestInstance } from 'react-test-renderer';
import {
  DOMAIN_KNOWLEDGE,
  GLOSSARY_LINK_META,
  GLOSSARY_TERMS,
  TECHNIQUES,
  getGlossaryLinksForDomain,
  getGlossaryLinksForTechnique,
  getTechniqueText,
} from '@vibe-dictionary/catalog';
import App from '../src/App';
import { DictionaryNavigation } from '../src/components/DictionaryNavigation';
import { DomainKnowledgeView } from '../src/components/DomainKnowledgeView';
import { FilterBar } from '../src/components/FilterBar';
import { KnowledgeDetail } from '../src/components/knowledge/KnowledgeDetail';
import { GlossaryLoadBoundary, LazyGlossaryView } from '../src/components/LazyGlossaryView';
import { PromptCartDrawer } from '../src/components/PromptCartDrawer';
import { TechniqueCard } from '../src/components/TechniqueCard';
import { LocaleProvider } from '../src/i18n/LocaleContext';

function text(node: ReactTestInstance | string | number): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  return node.children.map(child => text(child as ReactTestInstance | string | number)).join('');
}

function replaceGlobal(t: TestContext, key: string, value: unknown) {
  const original = Object.getOwnPropertyDescriptor(globalThis, key);
  Object.defineProperty(globalThis, key, { configurable: true, value });
  t.after(() => {
    if (original) Object.defineProperty(globalThis, key, original);
    else Reflect.deleteProperty(globalThis, key);
  });
}

function setupAppGlobals(t: TestContext, scrollCalls: ScrollToOptions[] = []) {
  replaceGlobal(t, 'window', {
    scrollY: 180,
    innerHeight: 800,
    addEventListener() {},
    removeEventListener() {},
    scrollTo: (options: ScrollToOptions) => scrollCalls.push(options),
  });
  replaceGlobal(t, 'document', {
    documentElement: { classList: { toggle() {} }, scrollHeight: 2000 },
    activeElement: null,
  });
  replaceGlobal(t, 'localStorage', { getItem: () => null, setItem() {} });
  replaceGlobal(t, 'IntersectionObserver', class { observe() {} disconnect() {} });
  replaceGlobal(t, 'ResizeObserver', class { observe() {} disconnect() {} });
}

test('lazy glossary view shows loading state and resolves all terms; load error boundary localizes and reloads', async t => {
  let tree!: ReturnType<typeof create>;
  act(() => {
    tree = create(
      <LocaleProvider initialLocale="ko">
        <LazyGlossaryView onViewTechnique={() => {}} onViewDomainKnowledge={() => {}} />
      </LocaleProvider>
    );
  });
  try {
    assert.match(text(tree.root.findByProps({ role: 'status' })), /불러오는 중/);
    await act(async () => { await import('../src/components/GlossaryView'); });
    const termButtons = tree.root
      .findByProps({ role: 'region' })
      .findAllByType('button');
    assert.equal(termButtons.length, GLOSSARY_TERMS.length);
  } finally {
    act(() => tree.unmount());
  }

  let reloads = 0;
  replaceGlobal(t, 'window', { location: { reload: () => { reloads += 1; } } });
  t.mock.method(console, 'error', () => {});
  function Failure(): React.ReactNode { throw new Error('glossary chunk failed'); }

  for (const locale of ['ko', 'en'] as const) {
    let errorTree!: ReturnType<typeof create>;
    act(() => {
      errorTree = create(
        <LocaleProvider initialLocale={locale}>
          <GlossaryLoadBoundary>
            <Failure />
          </GlossaryLoadBoundary>
        </LocaleProvider>
      );
    });
    try {
      const alertText = text(errorTree.root.findByProps({ role: 'alert' }));
      assert.match(alertText, locale === 'ko' ? /불러오지 못했습니다/ : /Could not load glossary/);
      act(() => errorTree.root.findByType('button').props.onClick());
    } finally {
      act(() => errorTree.unmount());
    }
  }
  assert.equal(reloads, 2);
});

test('3-section navigation switches to glossary, hides design tabs & composer, and preserves design state', t => {
  const scrollCalls: ScrollToOptions[] = [];
  let tree: ReturnType<typeof create> | undefined;
  t.after(() => { if (tree) act(() => tree!.unmount()); });
  setupAppGlobals(t, scrollCalls);

  act(() => {
    tree = create(
      <LocaleProvider initialLocale="ko">
        <App />
      </LocaleProvider>,
      { createNodeMock: element => element.type === 'header' ? { getBoundingClientRect: () => ({ height: 64 }) } : null }
    );
  });

  const navButtons = () => tree!.root.findByType(DictionaryNavigation).findAllByType('button');
  assert.deepEqual(navButtons().map(text), ['도메인 지식', '디자인·인터랙션', '용어 사전']);
  assert.equal(navButtons()[2].props['aria-pressed'], false);

  // Design state: select first card and enter composer note
  const firstCard = tree!.root.findAllByType(TechniqueCard)[0];
  act(() => firstCard.props.onToggleCart(firstCard.props.item));
  act(() => tree!.root.findByType(PromptCartDrawer).props.onContextNoteChange('결제 버튼'));

  // Header domain tabs visible in design
  const headerDomainGroup = () => tree!.root.findAllByType('header')[0].findAllByType('div').find(d => (d.props.className ?? '').includes('domain-tabs-scroll'))!;
  assert.equal(headerDomainGroup().props['aria-hidden'], undefined);
  assert.doesNotMatch(headerDomainGroup().props.className, /\binvisible\b/);

  // Switch to glossary
  act(() => navButtons()[2].props.onClick());
  assert.equal(tree!.root.findByType(DictionaryNavigation).props.selected, 'glossary');
  assert.equal(navButtons()[2].props['aria-pressed'], true);
  assert.deepEqual(scrollCalls, [{ top: 0, behavior: 'instant' }]);
  assert.equal(headerDomainGroup().props['aria-hidden'], true);
  assert.match(headerDomainGroup().props.className, /\binvisible\b/);
  assert.equal(tree!.root.findAllByType(PromptCartDrawer).length, 0);
  assert.equal(
    tree!.root.findAllByType('button').filter(b => /^조합기 \(/.test(b.props['aria-label'] ?? '')).length,
    0
  );

  // Switch back to design and verify cart & note preserved
  act(() => navButtons()[1].props.onClick());
  assert.equal(tree!.root.findByType(DictionaryNavigation).props.selected, 'design');
  assert.equal(headerDomainGroup().props['aria-hidden'], undefined);
  const composer = tree!.root.findByType(PromptCartDrawer);
  assert.equal(composer.props.contextNote, '결제 버튼');
  assert.equal(composer.props.cart.length, 1);
});

test('glossary supports explicit search label, bilingual search regardless of locale, empty state clear, and prompt copy', async t => {
  const { GlossaryView } = await import('../src/components/GlossaryView');
  const copied: string[] = [];
  let rejectCopy = false;
  replaceGlobal(t, 'navigator', {
    clipboard: {
      writeText: async (value: string) => {
        if (rejectCopy) throw new Error('denied');
        copied.push(value);
      },
    },
  });

  let searchFocused = 0;
  for (const locale of ['ko', 'en'] as const) {
    let tree!: ReturnType<typeof create>;
    act(() => {
      tree = create(
        <LocaleProvider initialLocale={locale}>
          <GlossaryView onViewTechnique={() => {}} onViewDomainKnowledge={() => {}} />
        </LocaleProvider>,
        { createNodeMock: element => element.type === 'input' ? { focus() { searchFocused += 1; } } : null }
      );
    });
    try {
      const searchInput = () => tree.root.findByType('input');
      const searchLabel = tree.root.findByType('label');
      assert.equal(searchInput().props.type, 'search');
      assert.equal(searchLabel.props.htmlFor, searchInput().props.id);

      const liveStatus = () => tree.root.findByProps({ role: 'status', 'aria-live': 'polite' });
      assert.match(text(liveStatus()), new RegExp(`${GLOSSARY_TERMS.length}`));

      // Search KR alias regardless of locale ('결제 두 번 방지' -> idempotency)
      act(() => searchInput().props.onChange({ target: { value: '결제 두 번 방지' } }));
      const idempotency = GLOSSARY_TERMS.find(term => term.id === 'idempotency')!;
      assert.ok(text(tree.root).includes(idempotency.text[locale].definition));
      assert.ok(text(tree.root).includes(idempotency.text[locale].example));
      const termButton = tree.root.findByProps({ role: 'region' }).findAllByType('button')
        .find(button => button.props['aria-pressed'])!;
      const termHeader = tree.root.findByType('article').findByType('header');
      for (const section of [termButton, termHeader]) {
        assert.ok(text(section).includes(idempotency.name[locale]));
        if (locale === 'en') assert.ok(!text(section).includes(idempotency.name.ko));
        else assert.ok(text(section).includes(idempotency.name.en));
      }

      // Search EN term regardless of locale ('skeleton' -> skeleton-loading)
      act(() => searchInput().props.onChange({ target: { value: 'skeleton' } }));
      const skeleton = GLOSSARY_TERMS.find(term => term.id === 'skeleton-loading')!;
      assert.ok(text(tree.root).includes(skeleton.text[locale].name));

      // Category filter narrows results
      const filterGroup = tree.root.findByProps({ role: 'group' });
      const workflowBtn = filterGroup.findAllByType('button').find(b => /워크플로우|Workflow/.test(text(b)))!;
      act(() => workflowBtn.props.onClick());
      assert.match(text(liveStatus()), /\b0\b/);

      // Clear search / reset from empty state
      const emptyBox = tree.root.findAllByProps({ role: 'status' }).find(node => node !== liveStatus())!;
      const clearBtn = emptyBox.findByType('button');
      act(() => clearBtn.props.onClick());
      assert.equal(searchInput().props.value, '');
      assert.match(text(liveStatus()), new RegExp(`${GLOSSARY_TERMS.length}`));

      // Copy prompt success and failure
      rejectCopy = false;
      const firstTerm = GLOSSARY_TERMS[0];
      const copyBtn = () => tree.root.findAllByType('button').find(b => /^(프롬프트 복사|Copy prompt|복사 완료|Copied)$/.test(text(b)))!;
      await act(async () => { await copyBtn().props.onClick(); });
      assert.equal(copied.at(-1), firstTerm.text[locale].promptSnippet);
      assert.match(text(copyBtn()), /복사 완료|Copied/);

      rejectCopy = true;
      await act(async () => { await copyBtn().props.onClick(); });
      assert.match(text(tree.root.findByProps({ role: 'alert' })), /복사하지 못했습니다|Could not copy/);
    } finally {
      act(() => tree.unmount());
    }
  }
  assert.ok(searchFocused > 0);
});

test('glossary links navigate directly to exact technique in Design and exact KnowledgeDetail even with stale filters', async t => {
  const scrollCalls: ScrollToOptions[] = [];
  let tree: ReturnType<typeof create> | undefined;
  t.after(() => { if (tree) act(() => tree!.unmount()); });
  setupAppGlobals(t, scrollCalls);

  act(() => {
    tree = create(
      <LocaleProvider initialLocale="ko">
        <App />
      </LocaleProvider>,
      { createNodeMock: element => element.type === 'header' ? { getBoundingClientRect: () => ({ height: 64 }) } : null }
    );
  });

  // Set non-default state in Design (pixelart + non-all category + search query)
  const filterBar = () => tree!.root.findByType(FilterBar);
  const pixelartTab = tree!.root.findByType('header').findAllByType('button').find(b => text(b).includes('픽셀아트'))!;
  act(() => pixelartTab.props.onClick());
  act(() => filterBar().props.onCategoryChange('sprite'));
  act(() => filterBar().props.onSearchChange('random-query'));

  // Visit Knowledge and set filters that would hide fintech domain knowledge
  const navButtons = () => tree!.root.findByType(DictionaryNavigation).findAllByType('button');
  act(() => navButtons()[0].props.onClick());
  await act(async () => { await import('../src/components/DomainKnowledgeView'); });
  act(() => tree!.root.findByType('input').props.onChange({ target: { value: 'unknown-knowledge-filter' } }));
  act(() => tree!.root.findByProps({ role: 'group' }).findAllByType('button').find(b => text(b).startsWith('교육'))!.props.onClick());

  // Switch to Glossary and pick idempotency (links to fintech domain) and skeleton-loading (links to skeleton-shimmer)
  act(() => navButtons()[2].props.onClick());
  await act(async () => { await import('../src/components/GlossaryView'); });

  const idempotencyBtn = tree!.root.findByProps({ role: 'region' }).findAllByType('button').find(b => text(b).includes('멱등성'))!;
  act(() => idempotencyBtn.props.onClick());

  const idempotency = GLOSSARY_TERMS.find(term => term.id === 'idempotency')!;
  const targetDomainId = idempotency.relatedDomainIds[0];
  const targetDomain = DOMAIN_KNOWLEDGE.find(d => d.id === targetDomainId)!;
  const domainLinkBtn = tree!.root.findAllByType('button').find(b => text(b).includes(targetDomain.text.ko.title))!;
  act(() => domainLinkBtn.props.onClick());

  // Verify landed directly on KnowledgeDetail for targetDomain despite prior filters
  assert.equal(tree!.root.findByType(DictionaryNavigation).props.selected, 'knowledge');
  const detail = tree!.root.findByType(KnowledgeDetail);
  assert.equal(detail.props.item.id, targetDomainId);
  assert.ok(text(tree!.root).includes(targetDomain.text.ko.title));

  // Going back shows unfiltered domain knowledge list
  act(() => detail.props.onBack());
  assert.equal(tree!.root.findAllByType('article').length, DOMAIN_KNOWLEDGE.length);

  // Now go back to Glossary -> click a technique link -> verify Design exact match & category reset
  act(() => navButtons()[2].props.onClick());
  const skeletonTerm = GLOSSARY_TERMS.find(term => term.id === 'skeleton-loading')!;
  const skeletonNavBtn = tree!.root.findByProps({ role: 'region' }).findAllByType('button').find(b => text(b).includes(skeletonTerm.name.ko))!;
  act(() => skeletonNavBtn.props.onClick());

  const targetTechniqueId = skeletonTerm.relatedTechniqueIds[0];
  const targetTechnique = TECHNIQUES.find(tech => tech.id === targetTechniqueId)!;
  const techTitle = getTechniqueText(targetTechnique, 'ko').title;
  const techLinkBtn = tree!.root.findAllByType('button').find(b => text(b).includes(techTitle))!;
  act(() => techLinkBtn.props.onClick());

  assert.equal(tree!.root.findByType(DictionaryNavigation).props.selected, 'design');
  assert.equal(filterBar().props.activeDomain, targetTechnique.domain);
  assert.equal(filterBar().props.selectedCategory, 'all');
  assert.equal(filterBar().props.searchQuery, techTitle);
  const renderedCards = tree!.root.findAllByType(TechniqueCard);
  assert.deepEqual(renderedCards.map(card => card.props.item.id), [targetTechnique.id]);
  act(() => filterBar().props.onSearchChange(''));
  assert.ok(tree!.root.findAllByType(TechniqueCard).length > 1);

  // Also verify DomainKnowledgeView directly resets filters if targetRequest arrives while mounted
  let dkTree!: ReturnType<typeof create>;
  const req1 = { id: 'fintech-wallet-ledger-idempotency-and-hold', key: 1 };
  act(() => {
    dkTree = create(
      <LocaleProvider initialLocale="ko">
        <DomainKnowledgeView onViewTechnique={() => {}} />
      </LocaleProvider>
    );
  });
  try {
    act(() => dkTree.root.findByType('input').props.onChange({ target: { value: '교육' } }));
    act(() => dkTree.root.findByProps({ role: 'group' }).findAllByType('button').find(b => text(b).startsWith('교육'))!.props.onClick());
    act(() => {
      dkTree.update(
        <LocaleProvider initialLocale="ko">
          <DomainKnowledgeView onViewTechnique={() => {}} targetRequest={req1} />
        </LocaleProvider>
      );
    });
    assert.equal(dkTree.root.findByType(KnowledgeDetail).props.item.id, req1.id);
  } finally {
    act(() => dkTree.unmount());
  }
});

test('in-context dialog peek from TechniqueCard and KnowledgeDetail opens showModal, copies prompt, preserves state, and returns focus on Escape/close', async t => {
  const copied: string[] = [];
  replaceGlobal(t, 'navigator', {
    clipboard: { writeText: async (value: string) => { copied.push(value); } },
  });

  // 1. TechniqueCard peek
  const linkedTechniqueId = GLOSSARY_LINK_META.find(term => term.relatedTechniqueIds.length > 0)!.relatedTechniqueIds[0];
  const technique = TECHNIQUES.find(item => item.id === linkedTechniqueId)!;
  const techLinks = getGlossaryLinksForTechnique(technique.id, 2);
  assert.ok(techLinks.length >= 1 && techLinks.length <= 2);

  let modalOpened = 0;
  let modalClosed = 0;
  let triggerFocused = 0;
  let closeBtnFocused = 0;
  const triggerNode = { focus() { triggerFocused += 1; }, isConnected: true };

  let cardTree!: ReturnType<typeof create>;
  act(() => {
    cardTree = create(
      <LocaleProvider initialLocale="ko">
        <TechniqueCard item={technique} isSelected={true} onToggleCart={() => {}} />
      </LocaleProvider>,
      {
        createNodeMock: element => {
          if (element.type === 'dialog') return { showModal() { modalOpened += 1; }, close() { modalClosed += 1; } };
          if (element.type === 'button' && /용어 설명 보기/.test(element.props['aria-label'] ?? '')) return triggerNode;
          if (element.type === 'button' && element.props['aria-label'] === '용어 설명 닫기') return { focus() { closeBtnFocused += 1; } };
          return null;
        },
      }
    );
  });
  try {
    // Initially no dialog
    assert.equal(cardTree.root.findAllByType('dialog').length, 0);
    // Toggle prompt view on card (source state to verify preserved)
    const promptToggleBtn = cardTree.root.findAllByType('button').find(b => b.props.title === '프롬프트 문구 보기')!;
    act(() => promptToggleBtn.props.onClick());
    assert.ok(text(cardTree.root).includes(technique.promptSnippet));

    const peekBtn = cardTree.root.findAllByType('button').find(b => (b.props['aria-label'] ?? '').includes(techLinks[0].name.ko))!;
    act(() => peekBtn.props.onClick({ currentTarget: triggerNode }));
    await act(async () => { await import('../src/components/glossary/GlossaryPeekDialog'); });

    const dialog = cardTree.root.findByType('dialog');
    assert.equal(modalOpened, 1);
    assert.equal(closeBtnFocused, 1);
    assert.equal(dialog.props['aria-modal'], 'true');
    const heading = dialog.findByType('h2');
    assert.equal(heading.props.id, dialog.props['aria-labelledby']);
    assert.ok(text(heading).includes(techLinks[0].name.ko));

    const peekCopyBtn = dialog.findAllByType('button').find(b => /프롬프트 복사/.test(text(b)))!;
    await act(async () => { await peekCopyBtn.props.onClick(); });
    const termData = GLOSSARY_TERMS.find(term => term.id === techLinks[0].id)!;
    assert.equal(copied.at(-1), termData.text.ko.promptSnippet);

    // Close via Escape / onCancel -> closes modal and returns focus to trigger
    let prevented = false;
    act(() => dialog.props.onCancel({ preventDefault() { prevented = true; } }));
    assert.equal(prevented, true);
    assert.equal(modalClosed, 1);
    assert.equal(triggerFocused, 1);
    assert.equal(cardTree.root.findAllByType('dialog').length, 0);
    // Card source state (showing prompt) preserved!
    assert.ok(text(cardTree.root).includes(technique.promptSnippet));
  } finally {
    act(() => cardTree.unmount());
  }

  // 2. KnowledgeDetail peek
  const linkedDomainId = GLOSSARY_LINK_META.find(term => term.relatedDomainIds.length > 0)!.relatedDomainIds[0];
  const domainItem = DOMAIN_KNOWLEDGE.find(item => item.id === linkedDomainId)!;
  const domainLinks = getGlossaryLinksForDomain(domainItem.id, 2);
  assert.ok(domainLinks.length >= 1 && domainLinks.length <= 2);

  let dkOpened = 0;
  let dkClosed = 0;
  let dkTriggerFocused = 0;
  const dkTriggerNode = { focus() { dkTriggerFocused += 1; }, isConnected: true };
  let openedGlossaryId = '';

  let detailTree!: ReturnType<typeof create>;
  act(() => {
    detailTree = create(
      <LocaleProvider initialLocale="en">
        <KnowledgeDetail
          item={domainItem}
          onBack={() => {}}
          onViewTechnique={() => {}}
          onViewGlossaryTerm={id => { openedGlossaryId = id; }}
        />
      </LocaleProvider>,
      {
        createNodeMock: element => {
          if (element.type === 'dialog') return { showModal() { dkOpened += 1; }, close() { dkClosed += 1; } };
          if (element.type === 'h1') return { focus() {} };
          if (element.type === 'button' && /Peek glossary term/.test(element.props['aria-label'] ?? '')) return dkTriggerNode;
          return null;
        },
      }
    );
  });
  try {
    const peekBtn = detailTree.root.findAllByType('button').find(b => (b.props['aria-label'] ?? '').includes(domainLinks[0].name.en))!;
    act(() => peekBtn.props.onClick({ currentTarget: dkTriggerNode }));
    const dialog = detailTree.root.findByType('dialog');
    assert.equal(dkOpened, 1);
    assert.equal(dialog.findByType('h2').props.id, dialog.props['aria-labelledby']);
    assert.equal(text(dialog.findByType('h2')), domainLinks[0].name.en);
    assert.ok(!text(dialog).includes(domainLinks[0].name.ko));

    // Close via explicit close button -> returns focus
    const closeBtn = dialog.findByProps({ 'aria-label': 'Close term peek' });
    act(() => closeBtn.props.onClick());
    assert.equal(dkClosed, 1);
    assert.equal(dkTriggerFocused, 1);
    assert.equal(detailTree.root.findAllByType('dialog').length, 0);

    // Reopen and jump to Glossary
    act(() => peekBtn.props.onClick({ currentTarget: dkTriggerNode }));
    const openGlossaryBtn = detailTree.root.findByType('dialog').findAllByType('button').find(b => text(b).includes('Open in glossary'))!;
    act(() => openGlossaryBtn.props.onClick());
    assert.equal(openedGlossaryId, domainLinks[0].id);
    assert.equal(detailTree.root.findAllByType('dialog').length, 0);
  } finally {
    act(() => detailTree.unmount());
  }
});
