import 'angular';

import {
  ComponentWithoutChildren,
  ComponentWithChildren,
  ComponentWithChildrenRerender,
  ComponentWithDifferentViews
} from './components';

export default angular.module('ce-tests', [])
.component('compNoChildren', ComponentWithoutChildren)
.component('compWithChildren', ComponentWithChildren)
.component('compWithChildrenRerender', ComponentWithChildrenRerender)
.component('compWithDifferentViews', ComponentWithDifferentViews)
.name;
