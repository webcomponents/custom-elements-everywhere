import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import expect from 'expect';
import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews,
  ComponentWithProperties,
  ComponentWithUnregistered,
  ComponentWithEvent
} from './components';

beforeEach(function() {
  TestBed.configureTestingModule({
    declarations: [
      ComponentWithoutChildren,
      ComponentWithChildren,
      ComponentWithChildrenRerender,
      ComponentWithDifferentViews,
      ComponentWithProperties,
      ComponentWithUnregistered,
      ComponentWithEvent
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
    let shadowRoot = wc.shadowRoot;
    let heading = shadowRoot.querySelector('h1');
    expect(heading).toExist();
    expect(heading.textContent).toEqual('Test h1');
    let paragraph = shadowRoot.querySelector('p');
    expect(paragraph).toExist();
    expect(paragraph.textContent).toEqual('Test p');
  }

  it('can display a Custom Element with children in a Shadow Root', function() {
    let fixture = TestBed.createComponent(ComponentWithChildren);
    fixture.detectChanges();
    let root = fixture.debugElement.nativeElement;
    let wc = root.querySelector('#wc');
    expectHasChildren(wc);
  });

  it('can display a Custom Element with children in a Shadow Root and pass in Light DOM children', function(done) {
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

  it('can display a Custom Element with children in a Shadow Root and handle hiding and showing the element', function() {
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
  it('will pass boolean data as either an attribute or a property', function() {
    let fixture = TestBed.createComponent(ComponentWithProperties);
    fixture.detectChanges();
    let root = fixture.debugElement.nativeElement;
    let wc = root.querySelector('#wc');
    let data = wc.bool || wc.hasAttribute('bool');
    expect(data).toBe(true);
  });

  it('will pass numeric data as either an attribute or a property', function() {
    let fixture = TestBed.createComponent(ComponentWithProperties);
    fixture.detectChanges();
    let root = fixture.debugElement.nativeElement;
    let wc = root.querySelector('#wc');
    let data = wc.num || wc.getAttribute('num');
    expect(data).toEqual(42);
  });

  it('will pass string data as either an attribute or a property', function() {
    let fixture = TestBed.createComponent(ComponentWithProperties);
    fixture.detectChanges();
    let root = fixture.debugElement.nativeElement;
    let wc = root.querySelector('#wc');
    let data = wc.str || wc.getAttribute('str');
    expect(data).toEqual('Angular');
  });

  it('will pass array data as a property', function() {
    let fixture = TestBed.createComponent(ComponentWithProperties);
    fixture.detectChanges();
    let root = fixture.debugElement.nativeElement;
    let wc = root.querySelector('#wc');
    let data = wc.arr;
    expect(data).toEqual(['A', 'n', 'g', 'u', 'l', 'a', 'r']);
  });

  it('will set object properties on a Custom Element that has already been defined and upgraded', function() {
    let fixture = TestBed.createComponent(ComponentWithProperties);
    fixture.detectChanges();
    let root = fixture.debugElement.nativeElement;
    let wc = root.querySelector('#wc');
    let data = wc.obj;
    expect(data).toEqual({ org: 'angular', repo: 'angular' });
  });
});

describe('events', function() {
  it('can listen to a lowercase DOM event dispatched by a Custom Element', function() {
    let fixture = TestBed.createComponent(ComponentWithEvent);
    fixture.detectChanges();
    let root = fixture.debugElement.nativeElement;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#lowercase');
    expect(handled.textContent).toEqual('false');
    wc.click();
    fixture.detectChanges();
    expect(handled.textContent).toEqual('true');
  });

  it('can listen to a kebab-case DOM event dispatched by a Custom Element', function() {
    let fixture = TestBed.createComponent(ComponentWithEvent);
    fixture.detectChanges();
    let root = fixture.debugElement.nativeElement;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#kebab');
    expect(handled.textContent).toEqual('false');
    wc.click();
    fixture.detectChanges();
    expect(handled.textContent).toEqual('true');
  });

  it('can listen to a camelCase DOM event dispatched by a Custom Element', function() {
    let fixture = TestBed.createComponent(ComponentWithEvent);
    fixture.detectChanges();
    let root = fixture.debugElement.nativeElement;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#camel');
    expect(handled.textContent).toEqual('false');
    wc.click();
    fixture.detectChanges();
    expect(handled.textContent).toEqual('true');
  });

  it('can listen to a CAPScase DOM event dispatched by a Custom Element', function() {
    let fixture = TestBed.createComponent(ComponentWithEvent);
    fixture.detectChanges();
    let root = fixture.debugElement.nativeElement;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#caps');
    expect(handled.textContent).toEqual('false');
    wc.click();
    fixture.detectChanges();
    expect(handled.textContent).toEqual('true');
  });

  it('can listen to a PascalCase DOM event dispatched by a Custom Element', function() {
    let fixture = TestBed.createComponent(ComponentWithEvent);
    fixture.detectChanges();
    let root = fixture.debugElement.nativeElement;
    let wc = root.querySelector('#wc');
    let handled = root.querySelector('#pascal');
    expect(handled.textContent).toEqual('false');
    wc.click();
    fixture.detectChanges();
    expect(handled.textContent).toEqual('true');
  });
});
