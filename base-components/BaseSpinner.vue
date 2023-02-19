<template>
  <div class="rounded-full">
    <div :style="computedStyle" class="rounded-full animate-spin" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    size: {
      type: String,
      default: '1rem'
    },
    borderWidth: {
      type: String,
      default: '3px'
    },
    pathColor: {
      type: String,
      default: '#d1d5db'
    },
    spinnerColor: {
      type: String,
      default: '#7c3aed'
    }
  },

  computed: {
    computedStyle() {
      return `
        height:${this.size};
        width: ${this.size};
        border-width:${this.borderWidth};
        border-color:${this.pathColor};
        border-top-color:${this.spinnerColor};
      `
    }
  }
})
</script>
