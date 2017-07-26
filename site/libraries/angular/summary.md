React passes all data to Custom Elements in the form of HTML attributes. For
primitive data this is fine, but the system breaks down when passing rich data
like objects or arrays. In these instances you end up with an attribute values
of <code>"[object Object]"</code> which is not useable.

Because React implements its own synthetic event system, it cannot listen for
DOM events coming from Custom Elements without the use of a workaround.
Developers will need to reference their Custom Elements using a <code>ref</code>
and manually attach event listeners with <code>addEventListener</code>. This
makes working with Custom Elements cumbersome.
