<div id="ce-with-imperative-event-handled">{eventHandled}</div>
<ce-with-event id="ce-with-imperative-event" bind:this={customElement}>Imperative</ce-with-event>

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
