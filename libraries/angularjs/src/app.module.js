import 'angular';

import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews,
  ComponentWithProps,
  ComponentWithImperativeEvent,
  ComponentWithDeclarativeEvent
} from './components';

export default angular.module('ce-tests', [])
.component('compNoChildren', ComponentWithoutChildren)
.component('compWithChildren', ComponentWithChildren)
.component('compWithChildrenRerender', ComponentWithChildrenRerender)
.component('compWithDifferentViews', ComponentWithDifferentViews)
.component('compWithProps', ComponentWithProps)
.component('compWithImperativeEvent', ComponentWithImperativeEvent)
.component('compWithDeclarativeEvent', ComponentWithDeclarativeEvent)
.name;
