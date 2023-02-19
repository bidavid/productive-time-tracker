<template>
  <div :style="computedStyle" class="rounded-full animate-spin" />
</template>
<script lang="ts">
import Vue from 'vue/types/index'

export default Vue.extend({
  props: {
    size: {
      type: String,
      default: '1rem'
    },
    borderWidth: {
      type: String,
      default: '2px'
    },
    pathColor: {
      type: String,
      default: '#f0f2f4'
    },
    spinnerColor: {
      type: String,
      default: '#324076'
    }
  },

  computed: {
    computedStyle() {
      return `
        height: ${this.size};
        width:  ${this.size};
        border-width: ${this.borderWidth};
        border-color: ${this.pathColor};
        border-top-color: ${this.spinnerColor};
      `
    }
  }
})
</script>
