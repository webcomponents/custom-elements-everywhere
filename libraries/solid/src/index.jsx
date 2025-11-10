import {render} from 'solid-js/web';
import {
  ComponentWithChildren,
  ComponentWithChildrenRerender, ComponentWithDeclarativeEvent,
  ComponentWithDifferentViews, ComponentWithImperativeEvent,
  ComponentWithoutChildren, ComponentWithProperties
} from "./components";

const App = () => {
  return <>
    <ComponentWithoutChildren />
    <ComponentWithChildren/>
    <ComponentWithChildrenRerender />
    <ComponentWithDifferentViews />
    <ComponentWithProperties />
    <ComponentWithDeclarativeEvent />
    <ComponentWithImperativeEvent />
  </>
}

render(() => <App />, document.getElementById('harness'));