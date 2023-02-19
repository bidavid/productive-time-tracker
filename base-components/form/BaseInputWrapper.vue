<template>
  <div class="text-body-2 text-gray-600">
    <label
      v-if="label"
      :for="inputId"
      class="text-caption block font-semibold mb-2"
      >{{ label }}</label
    >

    <slot />

    <div class="mt-2 flex items-start justify-between space-x-3 text-overline">
      <strong class="font-normal text-left text-red-800">
        {{ errorMessage }}
      </strong>
      <strong
        v-show="characterMaxLength || characterMaxLength == 0"
        class="flex-shrink-0 font-medium text-right text-gray-800"
      >
        {{ currentLength || 0 }} / {{ characterMaxLength || 0 }}
      </strong>
    </div>
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
    currentLength: {
      type: [Number, String],
      default: null
    },
    characterMaxLength: {
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
