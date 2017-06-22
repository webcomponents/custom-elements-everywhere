import Ember from 'ember';
import './element';

export default Ember.Component.extend({
  data: {
    boolean: true,
    number: 42,
    string: 'Ember',
    array: ['E', 'm', 'b', 'e', 'r'],
    object: { org: 'emberjs', repo: 'emberjs' },
    undefinedBoolean: true,
    undefinedNumber: 42,
    undefinedString: 'Ember',
    undefinedArray: ['E', 'm', 'b', 'e', 'r'],
    undefinedObject: { org: 'emberjs', repo: 'emberjs' },
  }
});
