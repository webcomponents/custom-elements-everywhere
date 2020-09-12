<div id="handled">{eventHandled}</div>
<ce-with-event id="wc" bind:this={customElement}></ce-with-event>

<script>
    import { onMount } from 'svelte';
    let eventHandled = false;

    let customElement;
    onMount(() => {
        customElement.addEventListener('camelEvent', () => {
            eventHandled = true;
        });
    });
</script>
