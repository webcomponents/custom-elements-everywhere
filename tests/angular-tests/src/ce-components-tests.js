import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import expect from 'expect';
import {
  ComponentWithoutChildren,
  ComponentWithChildren
} from './ce-components';

beforeEach(function() {
  TestBed.configureTestingModule({
    declarations: [
      ComponentWithoutChildren,
      ComponentWithChildren
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
    let root = render(<ComponentWithChildren />, scratch);
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });

  // it('can display a Custom Element with children created during connectedCallback and render additional children inside of it', function() {
  //   let root = render(<ComponentWithChildrenRerender />, scratch);
  //   let wc = root.querySelector('#wc');
  //   expectHasChildren(wc);
  // });

  // it('can display a Custom Element with children created during connectedCallback and handle hiding and showing the element', function() {
  //   let root = render(<ComponentWithDifferentViews />, scratch);
  //   let component = root._component;
  //   let wc = root.querySelector('#wc');
  //   expectHasChildren(wc);
  //   component.toggle();
  //   component.forceUpdate();
  //   let dummy = root.querySelector('#dummy');
  //   expect(dummy).toExist();
  //   expect(dummy.textContent).toEqual('Dummy view');
  //   component.toggle();
  //   component.forceUpdate();
  //   wc = root.querySelector('#wc');
  //   expectHasChildren(wc);
  // });
});
