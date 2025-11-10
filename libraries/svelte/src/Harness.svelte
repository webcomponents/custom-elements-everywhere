<script module>
  import 'wc/ce-without-children';
  import 'wc/ce-with-children';
  import 'wc/ce-with-properties';
  import 'wc/ce-with-event';

  import ComponentWithoutChildren from './components/ComponentWithoutChildren.svelte';
  import ComponentWithChildren from './components/ComponentWithChildren.svelte';
  import ComponentWithChildrenRerender from './components/ComponentWithChildrenRerender.svelte';
  import ComponentWithDifferentViews from './components/ComponentWithDifferentViews.svelte';
  import ComponentWithProperties from './components/ComponentWithProperties.svelte';
  import ComponentWithImperativeEvent from './components/ComponentWithImperativeEvent.svelte';
  import ComponentWithDeclarativeEvent from './components/ComponentWithDeclarativeEvent.svelte';
</script>


<ComponentWithoutChildren/>
<ComponentWithChildren/>
<ComponentWithChildrenRerender/>
<ComponentWithDifferentViews/>
<ComponentWithProperties/>
<ComponentWithDeclarativeEvent/>
<ComponentWithImperativeEvent />