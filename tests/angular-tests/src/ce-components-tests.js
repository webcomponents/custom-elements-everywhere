import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import expect from 'expect';
import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews
} from './ce-components';

beforeEach(function() {
  TestBed.configureTestingModule({
    declarations: [
      ComponentWithoutChildren,
      ComponentWithChildren,
      ComponentWithChildrenRerender,
      ComponentWithDifferentViews
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });
});

describe('no children', function() {
  it('can display a Custom Element with no children', function() {
    let fixture = TestBed.createComponent(ComponentWithoutChildren);
    fixture.detectChanges();
    let el = fixture.debugElement.nativeElement;
    let wc = el.querySelector('ce-without-children');
    expect(wc).toExist();
  });
});

describe('with children', function() {
  function expectHasChildren(wc) {
    expect(wc).toExist();
    let heading = wc.querySelector('h1');
    expect(heading).toExist();
    expect(heading.textContent).toEqual('Test h1');
    let paragraph = wc.querySelector('p');
    expect(paragraph).toExist();
    expect(paragraph.textContent).toEqual('Test p');
  }

  it('can display a Custom Element with children created during connectedCallback', function() {
    let fixture = TestBed.createComponent(ComponentWithChildren);
    fixture.detectChanges();
    let root = fixture.debugElement.nativeElement;
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });

  it('can display a Custom Element with children created during connectedCallback and render additional children inside of it', function(done) {
    let fixture = TestBed.createComponent(ComponentWithChildrenRerender);
    fixture.detectChanges();
    setTimeout(function() {
      fixture.detectChanges();
      let root = fixture.debugElement.nativeElement;
      let wc = root.querySelector('#wc');
      expectHasChildren(wc);
      expect(wc.textContent.includes('2')).toEqual(true);
      done();
    }, 1000);
  });

  it('can display a Custom Element with children created during connectedCallback and handle hiding and showing the element', function() {
    let fixture = TestBed.createComponent(ComponentWithDifferentViews);
    fixture.detectChanges();
    let component = fixture.componentInstance;
    let root = fixture.debugElement.nativeElement;
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
    component.toggle();
    fixture.detectChanges();
    let dummy = root.querySelector('#dummy');
    expect(dummy).toExist();
    expect(dummy.textContent).toEqual('Dummy view');
    component.toggle();
    fixture.detectChanges();
    wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });
});

describe('attributes and properties', function() {
  it('will set boolean properties on a Custom Element that has already been defined and upgraded', function() {
    let root = render(<ComponentWithProperties />, scratch);
    let wc = root.querySelector('#wc');
    expect(wc.bool).toBe(true);
  });

  // it('will set numeric properties on a Custom Element that has already been defined and upgraded', function() {
  //   let root = render(<ComponentWithProperties />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expect(wc.num).toEqual(42);
  // });

  // it('will set string properties on a Custom Element that has already been defined and upgraded', function() {
  //   let root = render(<ComponentWithProperties />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expect(wc.str).toEqual('Preact');
  // });

  // it('will set array properties on a Custom Element that has already been defined and upgraded', function() {
  //   let root = render(<ComponentWithProperties />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expect(wc.arr).toEqual(['P', 'r', 'e', 'a', 'c', 't']);
  // });

  // it('will set object properties on a Custom Element that has already been defined and upgraded', function() {
  //   let root = render(<ComponentWithProperties />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expect(wc.obj).toEqual({ org: 'developit', repo: 'preact' });
  // });

  // it('will set boolean attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = render(<ComponentWithUnregistered />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expect(wc.hasAttribute('bool')).toBe(true);
  // });

  // it('will set numeric attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = render(<ComponentWithUnregistered />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expect(wc.getAttribute('num')).toEqual('42');
  // });

  // it('will set string attributes on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = render(<ComponentWithUnregistered />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expect(wc.getAttribute('str')).toEqual('Preact');
  // });

  // // Related:
  // // https://github.com/developit/preact/issues/678
  // // https://github.com/developit/preact/pull/511
  // it('will set array properties on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = render(<ComponentWithUnregistered />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expect(wc.arr).toEqual(['P', 'r', 'e', 'a', 'c', 't']);
  // });

  // it('will set object properties on a Custom Element that has not already been defined and upgraded', function() {
  //   let root = render(<ComponentWithUnregistered />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expect(wc.obj).toEqual({ org: 'developit', repo: 'preact' });
  // });
});

// describe('events', function() {
//   it('can listen to events from a Custom Element', function() {
//     let root = render(<ComponentWithEvent />, scratch);
//     let component = root._component;
//     let wc = root.querySelector('#wc');
//     let toggle = root.querySelector('#toggle');
//     expect(toggle.textContent).toEqual('false');
//     wc.click();
//     component.forceUpdate();
//     expect(toggle.textContent).toEqual('true');
//   });
// });
