<script setup>
import 'wc/ce-with-properties'

const bool = true;
const num = 42;
const str = 'custom';
const arr = ['c', 'u', 's', 't', 'o', 'm'];
const obj = {org: 'webcomponents', repo: 'custom-elements-everywhere'}
const camelCaseObj = {label: 'passed'}
</script>

<template>
  <ce-with-properties
      id="ce-with-properties"
      :bool.prop="bool"
      :num.prop="num"
      :str.prop="str"
      :arr.prop="arr"
      :obj.prop="obj"
      :camelCaseObj.prop="camelCaseObj"
  ></ce-with-properties>
</template>