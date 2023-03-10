<template>
  <div class="flex items-center justify-between space-x-4">
    <div class="flex items-center space-x-3">
      <h1 class="block font-medium text-title-3">
        {{ title }}
      </h1>
      <transition name="fade">
        <BaseSpinner v-show="loading" />
      </transition>
    </div>

    <div v-if="actionBarShown" class="flex items-center space-x-3">
      <input
        v-if="searchable"
        v-model="computedKeyword"
        type="text"
        placeholder="Enter search"
      />
      <BaseButton
        v-if="creatable"
        text="Create"
        icon="icon-plus"
        icon-size="text-lg"
        :disabled="loading"
        class="flex-shrink-0"
        @clicked="$emit('creation-clicked')"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

// Utilities
import debounce from 'lodash/debounce'

// Components
import BaseButton from '~/base-components/BaseButton.vue'
import BaseSpinner from '~/base-components/BaseSpinner.vue'

export default Vue.extend({
  components: {
    BaseButton,
    BaseSpinner
  },

  props: {
    title: {
      type: String,
      default: null
    },
    creatable: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      keyword: null as string | null,
      emitSearchDebounced: null as null | ReturnType<typeof debounce>
    }
  },

  computed: {
    actionBarShown() {
      return !!(this.searchable || this.creatable)
    },

    computedKeyword: {
      get(): string | null {
        return this.keyword as string | null
      },
      set(newV: string | null): void {
        const oldV = this.keyword

        if (newV === oldV) {
          return
        }

        this.keyword = newV
        this.emitSearchDebounced?.()
      }
    }
  },

  beforeMount() {
    this.emitSearchDebounced = debounce(this.emitSearch, 350)
  },

  beforeDestroy() {
    this.emitSearchDebounced?.cancel?.()
  },

  methods: {
    // TODO: CREATE ENUM FOR ALL EVENTS
    emitSearch() {
      this.$emit('search-performed', { keyword: this.computedKeyword })
    }
  }
})
</script>
