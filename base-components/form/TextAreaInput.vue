<template>
  <BaseInputWrapper
    :input-id="inputId"
    :label="label"
    :error-message="errorMessage"
    :character-max-length="characterMaxLength"
    :current-length="characterLength"
  >
    <textarea
      :id="inputId"
      v-model="computedValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :autofocus="autofocus"
      rows="3"
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
    },
    characterLength(): number {
      if (!this.computedValue) {
        return 0
      }

      return (this.computedValue as string).length || 0
    }
  }
})
</script>
