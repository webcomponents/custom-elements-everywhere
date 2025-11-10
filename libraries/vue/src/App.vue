<script setup>
import ComponentWithChildren from "./components/ComponentWithChildren.vue";
import ComponentWithoutChildren from "./components/ComponentWithoutChildren.vue";
import ComponentWithChildrenRerender from "./components/ComponentWithChildrenRerender.vue";
import ComponentWithDifferentViews from "./components/ComponentWithDifferentViews.vue";
import ComponentWithProperties from "./components/ComponentWithProperties.vue";
import ComponentWithDeclarativeEvent from "./components/ComponentWithDeclarativeEvent.vue";
import ComponentWithImperativeEvent from "./components/ComponentWithImperativeEvent.vue";
</script>

<template>
  <ComponentWithoutChildren/>
  <ComponentWithChildren/>
  <ComponentWithChildrenRerender/>
  <ComponentWithDifferentViews/>
  <ComponentWithProperties/>
  <ComponentWithDeclarativeEvent/>
  <ComponentWithImperativeEvent/>
</template>