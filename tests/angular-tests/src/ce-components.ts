import { Component } from '@angular/core';
import 'ce-without-children';
import 'ce-with-children';

@Component({
  template: `
    <div>
      <ce-without-children id="wc"></ce-without-children>
    </div>
  `
})
export class ComponentWithoutChildren {
}

@Component({
  template: `
    <div>
      <ce-with-children id="wc"></ce-with-children>
    </div>
  `
})
export class ComponentWithChildren {
}

@Component({
  template: `
    <div>
      <ce-with-children id="wc"></ce-with-children>
    </div>
  `
})
export class ComponentWithChildrenRerender {
}
