<script setup>
import {ref, useTemplateRef, onMounted} from 'vue';

import 'wc/ce-with-event';

const eventHandled = ref(false);
const ce = useTemplateRef('ce');

onMounted(() => {
  ce.value.addEventListener('camelEvent', () => eventHandled.value = true)
})

</script>

<template>
  <div id="ce-with-imperative-event-handled">{{ eventHandled.toString() }}</div>
  <ce-with-event id="ce-with-imperative-event" ref="ce">
    Imperative
  </ce-with-event>
</template>