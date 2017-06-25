import { h, render } from 'preact';
import expect from 'expect';
import { Root } from './root';

let app;
describe('root', function() {

  beforeEach(function() {
    app = document.createElement('div');
    document.body.appendChild(app);
  });

  afterEach(function() {
    app.innerHTML = '';
  });

  it('renders without problems', function() {
    let root = render(<Root />, app);
    expect(root).toExist();
  });

  it('can display a Custom Element with children created during connectedCallback', function() {
    let root = render(<Root />, app);
    let wc = app.querySelector('x-foo');
    expect(wc).toExist();
    let heading = wc.querySelector('h1');
    expect(heading).toExist();
    expect(heading.textContent).toEqual('Hello from x-foo');
  });

});
