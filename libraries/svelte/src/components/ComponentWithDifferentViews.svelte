<div id="ce-with-different-views">
    <button on:click={toggle}>Toggle views</button>
    {#if showWC}
        <ce-with-children></ce-with-children>
    {:else}
        <div>Dummy view</div>
    {/if}
</div>

<script>
  let showWC = true;

  export function toggle() {
    showWC = !showWC;
  }
</script>
