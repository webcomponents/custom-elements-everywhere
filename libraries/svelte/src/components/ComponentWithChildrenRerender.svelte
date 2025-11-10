<ce-with-children id="ce-with-children-rerender">{count}</ce-with-children>

<script>
    import { onMount } from 'svelte';
    
    let count = 1;

    onMount(() => {
        count = count + 1;
    });
</script>
