import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import expect from 'expect';
import { Root } from './root';

describe('Root', function() {
  // provide our implementations or mocks to the dependency injector
  beforeEach(function() {
    TestBed.configureTestingModule({
      declarations: [Root],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should exist', function() {
    let fixture = TestBed.createComponent(Root);
    fixture.detectChanges();
    expect(fixture).toExist();
  });

  it('should have the correct heading text', function() {
    let fixture = TestBed.createComponent(Root);
    fixture.detectChanges();
    let el = fixture.debugElement.nativeElement;
    let wc = el.querySelector('x-foo');
    expect(wc).toExist();
    let heading = wc.querySelector('h1');
    expect(heading.textContent).toEqual('Hello from x-foo');
  });

});
