<template>
  <div id="app">
    <x-count>{{count}}</x-count>
    <x-count-with-shadow>{{count}}</x-count-with-shadow>
  </div>
</template>

<script>
import './counters';

export default {
  name: 'app',
  data () {
    return {
      count: 1
    }
  },
  mounted () {
    this.interval = setInterval(() =>
      this.count += 1, 1000);
  },
  destroyed () {
    clearInterval(this.interval);
  }
}
</script>
