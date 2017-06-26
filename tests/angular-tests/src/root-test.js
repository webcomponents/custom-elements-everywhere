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

  it('should have an url', function() {
    let fixture = TestBed.createComponent(Root);
    fixture.detectChanges();
    let heading = fixture.debugElement.query(By.css('h1'));
    expect(heading.textContent).toEqual('Hello from Angular!');
  });

});
