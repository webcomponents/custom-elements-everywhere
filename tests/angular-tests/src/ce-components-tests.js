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
    let root = fixture.debugElement.nativeElement;
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
    fixture.toggle();
    fixture.detectChanges();
    let dummy = root.querySelector('#dummy');
    expect(dummy).toExist();
    expect(dummy.textContent).toEqual('Dummy view');
    fixture.toggle();
    fixture.detectChanges();
    wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });
});
