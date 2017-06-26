import { TestBed } from '@angular/core/testing';
import expect from 'expect';
import { Root } from './root';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Root]
    });
  });

  it('should have an url', () => {
    let fixture = TestBed.createComponent(Root);
    fixture.detectChanges();
    expect(fixture.debugElement.componentInstance.url).toEqual('https://github.com/preboot/angular2-webpack');
  });

});
