<template>
  <BaseInputWrapper
    :input-id="inputId"
    :label="label"
    :error-message="errorMessage"
  >
    <input
      :id="inputId"
      v-model="computedValue"
      type="date"
      :placeholder="placeholder"
      :disabled="disabled"
      :autofocus="autofocus"
      class="form-input"
      :class="[errorMessage ? 'border-red-800' : 'border-gray-400']"
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
    }
  },

  computed: {
    computedValue: {
      get(): string | null {
        return this.value
      },

      set(v) {
        this.$emit('input', v || null)
      }
    }
  }
})
</script>
