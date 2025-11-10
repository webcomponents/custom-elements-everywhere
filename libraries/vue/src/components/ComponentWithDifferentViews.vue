<script setup>
import {ref} from 'vue';

import 'wc/ce-with-children';

const showWC = ref(true);

</script>

<template>
  <div id="ce-with-different-views">
    <button @click="() => showWC = !showWC">Toggle views</button>
    <ce-with-children v-if="showWC"></ce-with-children>
    <div v-else>Dummy view</div>
  </div>
</template>