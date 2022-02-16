<h4 id="vue-handling-data">Handling data</h4>

By default, Vue passes all data to Custom Elements as attributes. However, Vue
also provides syntax to instruct its bindings to use properties instead. To bind
to a Custom Element property use <code>:foo.prop="bar"</code>.

<h4 id="vue-handling-events">Handling events</h4>

Vue can listen to native DOM events dispatched from Custom Elements. Its
built-in declarative event bindings only support lowercase and kebab case
events. To declaratively listen for events named with capital letters you must
use a custom directive, see [the v-event directive mentioned in #5401](https://github.com/vuejs/core/issues/5401#issuecomment-1041214293).
