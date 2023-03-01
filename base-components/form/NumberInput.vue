<template>
  <BaseInputWrapper
    :input-id="inputId"
    :label="label"
    :error-message="errorMessage"
  >
    <input
      :id="inputId"
      v-model="computedValue"
      type="number"
      pattern="^\d*(\.\d{0,4})?$"
      :min="min"
      :max="max"
      :placeholder="placeholder"
      :disabled="disabled"
      :autofocus="autofocus"
      class="form-input"
      :class="[errorMessage ? 'border-red-800' : 'border-gray-400']"
      @keypress="handleKeyPress"
    />
  </BaseInputWrapper>
</template>
<script lang="ts">
import Vue from 'vue'

// Components
import BaseInputWrapper from '~/base-components/form/BaseInputWrapper.vue'

// Mixins
import BaseInput from '~/base-components/form/mixins/BaseInput'
export default Vue.extend({
  components: {
    BaseInputWrapper
  },
  mixins: [BaseInput],

  props: {
    value: {
      type: String,
      default: null
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: null
    }
  },

  computed: {
    computedValue: {
      get(): string | null {
        return this.value
      },

      set(v) {
        this.$emit('input', v)
      }
    }
  },

  methods: {
    handleKeyPress(e: KeyboardEvent) {
      const { code, keyCode, which } = e

      const c = +(code ?? keyCode ?? which)

      if (c < 48 || c > 57) {
        e.preventDefault()
      }
    }
  }
})
</script>
