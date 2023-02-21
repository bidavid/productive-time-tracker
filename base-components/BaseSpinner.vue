<template>
  <div class="rounded-full">
    <div :style="computedStyle" class="rounded-full animate-spin" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

// Defaults
const defaultSize = '1rem'
const defaultBorderWidth = '3px'
// purple-600
const defaultBorderColor = '#7c3aed'
// gray-300
const defaultBorderTopColor = '#d1d5db'

// We cannot use tailwind classes here, because tailwind 2.x doesn't support applying colors to individual borders.
// And if we applied border-purple-600 with border-top-color:'#d1d5db', border-top-color would get overriden, so this is the simplest solution

export default Vue.extend({
  props: {
    size: {
      type: String,
      default: defaultSize
    },
    borderWidth: {
      type: String,
      default: defaultBorderWidth
    },
    spinnerColor: {
      type: String,
      default: defaultBorderColor
    },
    pathColor: {
      type: String,
      default: defaultBorderTopColor
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
