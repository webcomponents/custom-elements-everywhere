<h4 id="powjs-handling-data">Handling data</h4>

Powjs is just a low-level template engine.
Connected and disconnected are a big difference in rendering.

PowJS does not process data and the user performs all data processing.

PowJS Process Control issues such as branching, looping, break of loops,
completely terminating, calling named templates, and so on.
Finally, the template is compiled into a mixture of functions and data descriptions.

PowJS force to trim white space at both ends of the text node in the template.
You can use <code>{{' '}}someting{{' '}}</code> if you want.

<h4 id="powjs-handling-events">Handling events</h4>

The PowJS component can create, trigger, and listen for events,
and all code is written by the user.
