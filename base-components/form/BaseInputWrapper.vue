<template>
  <div class="text-body-2 text-gray-600">
    <label v-if="label" :for="inputId" class="block mb-1">{{ label }}</label>
    <div>
      <slot />
    </div>
    <p
      v-show="charMaxLength || charMaxLength == 0"
      class="font-medium text-gray-800 text-caption text-right mt-1"
    >
      {{ charMaxLength }}
    </p>
    <strong v-show="errorMessage" class="block font-normal mt-1">{{
      errorMessage
    }}</strong>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: {
      type: String,
      default: null
    },
    errorMessage: {
      type: String,
      default: null
    },
    charMaxLength: {
      type: [Number, String],
      default: null
    },
    inputId: {
      type: String,
      default: null
    }
  }
})
</script>
