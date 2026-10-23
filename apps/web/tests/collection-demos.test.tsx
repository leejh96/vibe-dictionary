import assert from 'node:assert/strict';
import test, { type TestContext } from 'node:test';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { DOMAIN_CATEGORIES, TECHNIQUES, getTechniqueText, searchTechniques } from '@vibe-dictionary/catalog';
import { InteractiveDemo } from '../src/components/demos/InteractiveDemos';
import { LocaleProvider, useLocale } from '../src/i18n/LocaleContext';
import { COLLECTION_IDS, COLLECTION_REGISTRIES } from './helpers/collection';

test('collection adds exactly five unique, bilingual, searchable designs to each category', () => {
  const entries=COLLECTION_REGISTRIES.flatMap(registry=>Object.keys(registry));
  assert.equal(entries.length,125);
  assert.equal(COLLECTION_IDS.size,125);
  for(const [domain,categories] of Object.entries(DOMAIN_CATEGORIES)) {
    for(const category of categories.filter(category=>category.id!=='all')) {
      const items=TECHNIQUES.filter(item=>COLLECTION_IDS.has(item.id)&&item.domain===domain&&item.category===category.id);
      assert.equal(items.length,5,`${domain}/${category.id}`);
      for(const item of items) for(const locale of ['ko','en'] as const) {
        const text=getTechniqueText(item,locale);
        assert.equal(searchTechniques({query:text.title})[0]?.item.id,item.id);
      }
    }
  }
});

test('input and drag filters include the collection demos with those actual controls', () => {
  const inputIds = new Set(searchTechniques({ trigger: 'input' }).map(({ item }) => item.id));
  for (const id of ['scratch-mask-reveal-card', 'balanced-headline-wrap', 'password-rule-checklist', 'dirty-note-save-state', 'ly-overview-detail-chart']) {
    assert.ok(inputIds.has(id), id);
    if (id !== 'dirty-note-save-state') assert.ok(!searchTechniques({ trigger: 'click' }).some(({ item }) => item.id === id), id);
  }
  assert.ok(searchTechniques({ trigger: 'drag' }).some(({ item }) => item.id === 'pointer-numeric-scrubber'));
  for (const id of ['sentiment-radio-segments', 'two-axis-coordinate-pad']) {
    assert.ok(inputIds.has(id), id);
    assert.ok(searchTechniques({ trigger: 'click' }).some(({ item }) => item.id === id), id);
  }
});

for(const id of COLLECTION_IDS) {
  test(`${id} renders in both languages with isolated SVG references`, t=>{
    for(const locale of ['ko','en'] as const) {
      let tree!: ReturnType<typeof create>;
      act(()=>{tree=create(<LocaleProvider initialLocale={locale}><InteractiveDemo techniqueId={id}/><InteractiveDemo techniqueId={id}/></LocaleProvider>);});
      t.after(()=>act(()=>tree.unmount()));
      const groups=tree.root.findAll(node=>node.props.className?.split(' ').includes('cx-stage'));
      assert.equal(groups.length,2);
      assert.ok(groups.every(group=>group.props['aria-label']?.length>0));
      const ids=tree.root.findAll(node=>typeof node.type==='string'&&node.props.id).map(node=>node.props.id);
      assert.equal(ids.length,new Set(ids).size,'instance IDs must not collide');
      for(const node of tree.root.findAll(node=>typeof node.type==='string')) {
        for(const value of Object.values(node.props)) if(typeof value==='string') {
          for(const match of value.matchAll(/url\(#([^)]*)\)/g)) assert.ok(ids.includes(match[1]),`${id}: unresolved ${match[1]}`);
          assert.doesNotMatch(value,/NaN|Infinity/);
        }
      }
      if(locale==='en') assert.doesNotMatch(JSON.stringify(tree.toJSON()),/[가-힣]/);
    }
  });
}

function render(t: TestContext,id:string) {
  let tree!:ReturnType<typeof create>;
  let setLocale!:ReturnType<typeof useLocale>['setLocale'];
  function Probe(){setLocale=useLocale().setLocale;return <InteractiveDemo techniqueId={id}/>;}
  act(()=>{tree=create(<LocaleProvider><Probe/></LocaleProvider>);});
  t.after(()=>act(()=>tree.unmount()));
  return {tree,english:()=>act(()=>setLocale('en'))};
}

test('saved note compares the current value to its last local snapshot', t=>{
  const {tree}=render(t,'dirty-note-save-state');
  const input=tree.root.findByType('textarea');const button=tree.root.findByType('button');
  assert.equal(button.props.disabled,true);
  act(()=>input.props.onChange({target:{value:'draft'}}));assert.equal(button.props.disabled,false);
  act(()=>button.props.onClick());assert.equal(button.props.disabled,true);
  act(()=>input.props.onChange({target:{value:'revised'}}));assert.equal(button.props.disabled,false);
  act(()=>input.props.onChange({target:{value:'draft'}}));assert.equal(button.props.disabled,true);
});

test('password conditions update independently without storing input', t=>{
  const {tree}=render(t,'password-rule-checklist'); const input=tree.root.findByType('input');
  const width=()=>tree.root.findByType('i').props.style.width;
  assert.equal(width(),'0%');
  act(()=>input.props.onChange({target:{value:'abcdefgh'}}));assert.ok(Math.abs(parseFloat(width())-100/3)<.001);
  act(()=>input.props.onChange({target:{value:'Abcdefg1'}}));assert.equal(width(),'100%');
  act(()=>input.props.onChange({target:{value:''}}));assert.equal(width(),'0%');
});

test('chunk progress completes five chunks then resets', t=>{
  const {tree}=render(t,'chunked-progress-feedback');const button=tree.root.findByType('button');
  for(let i=1;i<=5;i++){act(()=>button.props.onClick());assert.match(tree.root.findByType('output').children.join(''),new RegExp(`${i}개 완료`));}
  act(()=>button.props.onClick());assert.match(tree.root.findByType('output').children.join(''),/0개 완료/);
});

test('reaction choice toggles off and survives a locale switch', t=>{
  const {tree,english}=render(t,'toggle-reaction-picker');const buttons=()=>tree.root.findAllByType('button');
  act(()=>buttons()[1].props.onClick());english();
  assert.equal(buttons()[1].props['aria-pressed'],true);assert.equal(buttons()[1].props['aria-label'],'Love');
  act(()=>buttons()[1].props.onClick());assert.ok(buttons().every(button=>button.props['aria-pressed']===false));
});

test('coordinate controls preserve the other axis and pointer input uses local bounds', t=>{
  const {tree}=render(t,'two-axis-coordinate-pad');const inputs=()=>tree.root.findAllByType('input');
  act(()=>inputs()[0].props.onChange({target:{value:'25'}}));assert.deepEqual(inputs().map(input=>input.props.value),[25,50]);
  act(()=>inputs()[1].props.onChange({target:{value:'75'}}));assert.deepEqual(inputs().map(input=>input.props.value),[25,75]);
  act(()=>tree.root.findByProps({className:'cx-pad'}).props.onPointerDown({clientX:150,clientY:75,currentTarget:{getBoundingClientRect:()=>({left:100,top:50,width:200,height:100})}}));
  assert.deepEqual(inputs().map(input=>input.props.value),[25,25]);
});

test('numeric scrubber clamps keyboard and drag input and cancels capture', t=>{
  const {tree}=render(t,'pointer-numeric-scrubber');const slider=tree.root.findByProps({role:'slider'});
  const key=(key:string)=>act(()=>slider.props.onKeyDown({key,preventDefault(){}}));
  key('End');key('ArrowRight');assert.equal(slider.props['aria-valuenow'],100);
  key('Home');key('ArrowLeft');assert.equal(slider.props['aria-valuenow'],0);
  key('ArrowUp');assert.equal(slider.props['aria-valuenow'],1);
  act(()=>slider.props.onPointerDown({clientX:10,pointerId:1,currentTarget:{setPointerCapture(){}}}));
  act(()=>slider.props.onPointerMove({clientX:50}));assert.equal(slider.props['aria-valuenow'],21);
  act(()=>slider.props.onPointerCancel());act(()=>slider.props.onPointerMove({clientX:100}));assert.equal(slider.props['aria-valuenow'],21);
});

test('column visibility removes headers and every matching cell together', t=>{
  const {tree}=render(t,'ly-column-visibility-table');const checks=tree.root.findAllByType('input');
  act(()=>checks[0].props.onChange({target:{checked:false}}));assert.equal(tree.root.findAllByType('th').length,2);assert.equal(tree.root.findAllByType('td').length,6);
  act(()=>checks[1].props.onChange({target:{checked:false}}));assert.equal(tree.root.findAllByType('th').length,1);assert.equal(tree.root.findAllByType('td').length,3);
  act(()=>checks[0].props.onChange({target:{checked:true}}));assert.equal(tree.root.findAllByType('td').length,6);
});

test('crossfilter summary restores the full total when selection clears', t=>{
  const {tree}=render(t,'ly-crossfilter-summary-bars');const buttons=tree.root.findAllByType('button');
  assert.equal(tree.root.findByType('output').children.join(''),'합계 149');
  act(()=>buttons[1].props.onClick());assert.equal(tree.root.findByType('output').children.join(''),'합계 67');
  act(()=>buttons[1].props.onClick());assert.equal(tree.root.findByType('output').children.join(''),'합계 149');
});

test('overview chart keeps a seven-point window at both boundaries', t=>{
  const {tree}=render(t,'ly-overview-detail-chart');const input=tree.root.findByType('input');
  const points=()=>tree.root.findAllByType('polyline')[0].props.points;
  const initial=points();assert.equal(initial.split(' ').length,7);
  act(()=>input.props.onChange({target:{value:'7'}}));assert.equal(points().split(' ').length,7);assert.notEqual(points(),initial);
  act(()=>input.props.onChange({target:{value:'0'}}));assert.equal(points(),initial);
});
