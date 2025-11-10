<script setup>
import {ref} from 'vue';

import 'wc/ce-with-event';

const lowercaseHandled = ref(false);
const kebabHandled = ref(false);
const camelHandled = ref(false);
const capsHandled = ref(false);
const pascalHandled = ref(false);

</script>

<template>
  <div>lowercase: {{ lowercaseHandled.toString() }}</div>
  <div>kebab-case: {{ kebabHandled.toString() }}</div>
  <div>camelCase: {{ camelHandled.toString() }}</div>
  <div>CAPScase: {{ capsHandled.toString() }}</div>
  <div>PascalCase: {{ pascalHandled.toString() }}</div>
  <ce-with-event
      id="ce-with-declarative-event"
      v-on:lowercaseevent="() => lowercaseHandled = true"
      v-on:kebab-event="() => kebabHandled = true"
      v-on:camelEvent="() => camelHandled = true"
      v-on:CAPSevent="() => capsHandled = true"
      v-on:PascalEvent="() => pascalHandled = true"
  >Declarative</ce-with-event>
</template>