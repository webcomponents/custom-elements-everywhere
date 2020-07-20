{#if showWC}
    <ce-with-children id="wc"></ce-with-children>
{:else}
    <div id="dummy">Dummy view</div>
{/if}

<script>
    let showWC = true;
    export function toggle() {
        showWC = !showWC;
    }
</script>
