import React from "react";
import { createRoot } from "react-dom/client";
import * as Component from './components';

const Harness = () => {
  return <>
    <Component.ComponentWithoutChildren />
    <Component.ComponentWithChildren />
    <Component.ComponentWithChildrenRerender />
    <Component.ComponentWithDifferentViews />
    <Component.ComponentWithProperties />
    <Component.ComponentWithDeclarativeEvent />
    <Component.ComponentWithImperativeEvent />
  </>
}

createRoot(document.getElementById("harness")).render(<Harness />);

