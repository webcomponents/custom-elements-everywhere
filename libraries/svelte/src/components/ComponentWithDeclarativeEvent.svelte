<div id="lowercase">{lowercaseHandled}</div>
<div id="kebab">{kebabHandled}</div>
<div id="camel">{camelHandled}</div>
<div id="caps">{capsHandled}</div>
<div id="pascal">{pascalHandled}</div>
<ce-with-event id="wc"
    on:lowercaseevent={() => lowercaseHandled = true}
    on:kebab-event={() => kebabHandled = true}
    on:camelEvent={() => camelHandled = true}
    on:CAPSevent={() => capsHandled = true}
    on:PascalEvent={() => pascalHandled = true}>
</ce-with-event> 

<script>
    let lowercaseHandled = false;
    let kebabHandled = false;
    let camelHandled = false;
    let capsHandled = false;
    let pascalHandled = false;
</script>
