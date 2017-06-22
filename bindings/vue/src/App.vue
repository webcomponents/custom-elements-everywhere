<template>
  <div id="app">
    <x-element
      :boolean.prop="boolean"
      :number.prop="number"
      :string.prop="string"
      :array.prop="array"
      :object.prop="object"
      :undefined-boolean="undefinedBoolean"
      :undefined-number="undefinedNumber"
      :undefined-string="undefinedString"
      :undefined-array="undefinedArray"
      :undefined-object="undefinedObject"
    ></x-element>
  </div>
</template>

<script>
import './element';

export default {
  name: 'app',
  data () {
    return {
      boolean: true,
      number: 42,
      string: 'Vue',
      array: ['V', 'u', 'e'],
      object: { org: 'vuejs', repo: 'vue' },
      undefinedBoolean: true,
      undefinedNumber: 42,
      undefinedString: 'Vue',
      undefinedArray: ['V', 'u', 'e'],
      undefinedObject: { org: 'vuejs', repo: 'vue' },
    }
  }
}
</script>
