import 'angular';

import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews,
  ComponentWithProps,
  ComponentWithInheritance,
  ComponentWithImperativeEvent,
  ComponentWithDeclarativeEvent
} from './components';

export default angular.module('ce-tests', [])
.component('compNoChildren', ComponentWithoutChildren)
.component('compWithChildren', ComponentWithChildren)
.component('compWithChildrenRerender', ComponentWithChildrenRerender)
.component('compWithDifferentViews', ComponentWithDifferentViews)
.component('compWithProps', ComponentWithProps)
.component('compWithInheritance', ComponentWithInheritance)
.component('compWithImperativeEvent', ComponentWithImperativeEvent)
.component('compWithDeclarativeEvent', ComponentWithDeclarativeEvent)
.name;
