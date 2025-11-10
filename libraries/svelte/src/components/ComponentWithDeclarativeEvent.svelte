<div>lowercase: {lowercaseHandled}</div>
<div>kebab-case: {kebabHandled}</div>
<div>camelCase: {camelHandled}</div>
<div>CAPScase: {capsHandled}</div>
<div>PascalCase: {pascalHandled}</div>
<ce-with-event
        id="ce-with-declarative-event"
        on:lowercaseevent={() => lowercaseHandled = true}
        on:kebab-event={() => kebabHandled = true}
        on:camelEvent={() => camelHandled = true}
        on:CAPSevent={() => capsHandled = true}
        on:PascalEvent={() => pascalHandled = true}
>Declarative
</ce-with-event>

<script>
  let lowercaseHandled = false;
  let kebabHandled = false;
  let camelHandled = false;
  let capsHandled = false;
  let pascalHandled = false;
</script>
