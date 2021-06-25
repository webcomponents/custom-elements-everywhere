import { AutonomousCustomElement, h, Attribute, LSCustomElement } from '@lsegurado/ls-element/dist';
import 'ce-with-children';

@AutonomousCustomElement()
export class ComponentWithDifferentViews extends HTMLElement implements LSCustomElement {
  @Attribute() showWC = true;

  public toggle() {
    this.showWC = !this.showWC;
  }

  render() {
    return (
      <>
        {this.showWC ? (
          <ce-with-children id="wc"></ce-with-children>
        ) : (
            <div id="dummy">Dummy view</div>
          )}
      </>
    );
  }
}