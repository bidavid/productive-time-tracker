<template>
  <div
    v-if="meta"
    class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-center justify-between text-overline"
  >
    <div
      v-if="meta.total_count"
      class="self-stretch sm:self-center flex sm:block justify-between"
    >
      <span
        >{{ fromItems }}-{{ toItems }} from {{ meta.total_count }} items</span
      >
      <transition name="fade">
        <BaseSpinner v-show="loading" class="sm:hidden mr-1" />
      </transition>
    </div>
    <div
      v-if="pagesShown"
      class="flex space-x-1 sm:space-x-2 justify-end flex-shrink-0"
      :class="[{ 'opacity-50 pointer-events-none': loading }]"
    >
      <button
        class="rectangle direction-button"
        :class="{
          'invisible pointer-events-none': !previousPageShown
        }"
        @click="setPage(meta.current_page - 1)"
      >
        <em class="icon-caret-left text-gray-600" />
      </button>
      <template v-for="(page, index) in displayedPages">
        <span
          v-if="page - 1 > displayedPages[index - 1]"
          :key="`page-dots-${page}`"
          class="rectangle leading-6 lg:leading-8 text-center"
        >
          ...
        </span>
        <button
          :key="`page-${page}`"
          :class="{
            'bg-purple-600 text-white rounded-md': meta.current_page === page
          }"
          class="rectangle flex items-center justify-center leading-none"
          @click="setPage(page)"
        >
          {{ page }}
        </button>
      </template>
      <button
        class="rectangle direction-button"
        :class="{
          'invisible pointer-events-none': !nextPageShown
        }"
        @click="setPage(meta.current_page + 1)"
      >
        <em class="icon-caret-right text-gray-600" />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'

// Types
import { Pagination } from '~/api/types/Pagination'

// Components
import BaseSpinner from '~/base-components/BaseSpinner.vue'

export default Vue.extend({
  components: {
    BaseSpinner
  },

  props: {
    meta: {
      type: Object as PropType<Pagination>,
      default: null,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    fromItems() {
      if (!this.meta) {
        return null
      }

      const { current_page, total_count, page_size } = this.meta

      const pageMin = page_size * (current_page - 1) + 1

      if (pageMin + 1 > total_count) {
        return total_count
      }

      return pageMin
    },
    toItems() {
      if (!this.meta) {
        return null
      }

      const { current_page, total_count, page_size } = this.meta

      const pageMax = page_size * current_page

      if (pageMax > total_count) {
        return total_count
      }

      return pageMax
    },
    displayedPages() {
      if (!this.meta) {
        return []
      }

      const { current_page, total_pages } = this.meta

      // Generate number from 1 to total_pages
      if (total_pages <= 7) {
        return [...Array(total_pages).keys()].map((page) => page + 1)
      }

      const pages = []

      for (let page = 1; page <= total_pages; page++) {
        if (page === 1) {
          pages.push(page)
        } // Always show page 1
        if (page === total_pages && page > 1) {
          pages.push(page)
        } // Always show last page

        if (
          page < current_page + 3 && // e.g. page = 2, current_page = 1 -> true
          page > current_page - 3 && // e.g. page = 2, current_page = 1 -> true
          page !== 1 && // e.g. page = 2 -> true
          page !== total_pages // e.g. page = 2, total_pages = 5 -> true
        ) {
          pages.push(page)
        }
      }
      return pages
    },

    pagesShown(): boolean {
      return this.displayedPages.length > 1
    },

    previousPageShown(): boolean {
      if (!this.meta) {
        return false
      }

      return this.meta.current_page > 1
    },

    nextPageShown(): boolean {
      if (!this.meta) {
        return false
      }

      const { total_pages, current_page } = this.meta

      return current_page < total_pages
    }
  },

  methods: {
    setPage(page: number) {
      if (this.loading) {
        return
      }
      this.$emit('set-page', page)
    }
  }
})
</script>

<style scoped>
.rectangle {
  @apply w-6 h-6;
}

/*MEDIA QUERIES*/
@media screen(sm) {
  .rectangle {
    @apply w-8 h-8;
  }
}

.direction-button {
  @apply flex justify-center items-center cursor-pointer;
}
</style>
