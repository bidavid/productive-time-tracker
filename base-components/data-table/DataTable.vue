<template>
  <div class="w-full max-w-full overflow-x-auto">
    <!--    TOOLBAR-->
    <div
      v-if="toolbarShown"
      class="flex items-center justify-between space-x-4 mb-3"
    >
      <strong class="block font-medium text-title-3">{{ title }}</strong>
      <button
        v-if="creatable"
        :disabled="loading"
        class="px-3 py-2 bg-blue-500 text-white flex items-center space-x-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <em class="icon-plus text-lg" />
        <span>Create</span>
      </button>
    </div>

    <table class="w-full bg-white border border-gray-400">
      <thead>
        <tr class="border-t border-b border-gray-400">
          <th
            v-for="header in mappedHeaders"
            :key="`header-cell-${header.id}`"
            class="font-normal"
          >
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- In case you need multiple rows per item-->
        <template v-if="$scopedSlots.body">
          <slot name="body" :items="items" />
        </template>
        <template v-else>
          <tr
            v-for="(item, index) in items"
            :key="item.id"
            class="border-b last:border-0 border-gray-400 transition-colors cursor-pointer hover:bg-blue-100"
          >
            <!--You can override the whole row-->
            <slot name="row" :item="item" :index="index">
              <td
                v-for="header in mappedHeaders"
                :key="`data-cell-${header.id}`"
              >
                {{ get(item, header.key) || '-' }}
              </td>
            </slot>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'

// Utilities
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import { v4 as uuidv4 } from 'uuid'
import { replaceItems } from '~/utility-functions/array-manipulation'

// Types
import { ModelEnum } from '~/api/enums/ModelEnum'
import { Pagination } from '~/api/types/Pagination'

interface HeaderItem {
  title: string
  key: string
}

const defaultLimit = 15

// TODO: PAGINATION COMPONENT
// TODO: SEARCH COMPONENT

export default Vue.extend({
  props: {
    // General
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
    headers: {
      type: Array as PropType<HeaderItem[]>,
      required: true,
      default() {
        return []
      }
    },
    assignedModel: {
      type: String as PropType<ModelEnum>,
      required: true,
      default: null
    },
    limit: {
      type: Number,
      default: defaultLimit
    }
  },

  data() {
    // We need ids to iterate headers in template, for keys
    const mappedHeaders = this.headers.map((h) => ({ ...h, id: uuidv4() }))

    const defaultMeta: Pagination = Object.freeze({
      current_page: 1,
      total_pages: 1,
      total_count: 0,
      page_size: this.limit || defaultLimit
    })

    const meta = cloneDeep(defaultMeta)

    return {
      loading: false,
      mappedHeaders,
      items: [],
      defaultMeta,
      meta,
      fetchItemsDebounced: null as null | ReturnType<typeof debounce>
    }
  },

  async fetch() {
    if (!this.assignedModel) {
      this.$nuxt.error({ message: 'assignedModel has to be defined' })
    }

    this.fetchItemsDebounced = debounce(this.fetchItems, 350)
    // Do not debounce initial fetch, it cannot be awaited (won't wait for us on SSR)
    await this.fetchItems()
  },

  computed: {
    toolbarShown() {
      return !!(this.title || this.creatable)
    }
  },

  beforeDestroy() {
    this.fetchItemsDebounced?.cancel?.()
  },

  methods: {
    get,

    startLoading() {
      this.loading = true
    },

    stopLoading() {
      this.loading = false
    },

    async fetchItems() {
      try {
        this.startLoading()

        const { data, meta } = await this.$api[this.assignedModel].getList()

        replaceItems(this.items, data)
        this.refreshPagination(meta)
      } catch (e) {
        this.$toast?.error?.(
          `An error occured while fetching ${this.assignedModel} items`
        )
      } finally {
        this.stopLoading()
      }
    },

    refreshPagination(fetchedMeta: Pagination) {
      const { meta, defaultMeta } = this

      if (!fetchedMeta) {
        meta.current_page = defaultMeta.current_page
        meta.total_pages = defaultMeta.total_pages
        meta.total_count = defaultMeta.total_count
      } else {
        meta.current_page = fetchedMeta.current_page
        meta.total_pages = fetchedMeta.total_pages
        meta.total_count = fetchedMeta.total_count
      }
    }
  }
})
</script>
<style scoped>
th,
td {
  @apply px-4 py-3 text-left;
}
</style>
