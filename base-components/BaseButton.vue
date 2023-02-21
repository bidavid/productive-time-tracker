<template>
  <button
    :type="type"
    :disabled="computedDisabled"
    :class="[backgroundColor, textColor, borderColor]"
    class="px-3 py-2 flex items-center space-x-2 rounded disabled:opacity-50 disabled:cursor-not-allowed border"
    @click="$emit('clicked')"
  >
    <em v-if="icon" :class="[icon, iconSize]" />
    <span>{{ text }}</span>
  </button>
</template>
<script lang="ts">
import Vue from 'vue'

// Defaults
const defaultBackgroundColor = 'bg-purple-600'
const defaultBorderColor = 'border-purple-600'
const defaultTextColor = 'text-white'

export default Vue.extend({
  props: {
    loading: {
      type: Boolean,
      default: false
    },

    text: {
      type: String,
      default: null,
      required: true
    },

    type: {
      type: String,
      default: 'button'
    },

    disabled: {
      type: Boolean,
      default: false
    },

    // icomoon class, for example icon="icon-search"
    icon: {
      type: String,
      default: null
    },

    // use tailwind font size class
    iconSize: {
      type: String,
      default: 'text-lg'
    },

    // use tailwind background color class
    backgroundColor: {
      type: String,
      default: defaultBackgroundColor
    },

    // use tailwind border color class
    borderColor: {
      type: String,
      default: defaultBorderColor
    },

    // use tailwind text color class
    textColor: {
      type: String,
      default: defaultTextColor
    }
  },

  computed: {
    computedDisabled() {
      return this.disabled || this.loading
    }
  }
})
</script>
