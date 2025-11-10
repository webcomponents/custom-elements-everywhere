<script setup>
import {ref, onMounted} from 'vue';

import 'wc/ce-with-children'

const count = ref(1);

onMounted(() => {
  count.value++;
})
</script>

<template>
  <ce-with-children id="ce-with-children-rerender">{{ count }}</ce-with-children>
</template>