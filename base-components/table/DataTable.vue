<template>
  <div class="w-full max-w-full overflow-x-auto">
    <!--    TOOLBAR-->
    <TableToolbar
      v-if="toolbarShown"
      :title="title"
      :creatable="creatable"
      :searchable="searchable"
      :loading="loading"
      class="mb-4"
    />

    <table class="w-full bg-white border border-gray-400 table-auto">
      <thead>
        <tr class="border-t border-b border-gray-400 bg-purple-600 text-white">
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
            class="border-b last:border-0 border-gray-400 transition-colors cursor-pointer hover:bg-purple-200"
            @click.stop="onItemClick(item, index)"
          >
            <!--You can override the whole row-->
            <slot name="row" :item="item" :index="index">
              <td
                v-for="header in mappedHeaders"
                :key="`data-cell-${header.id}`"
              >
                {{ get(item, `${header.key}`) || '-' }}
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
import get from 'lodash/get'
import { v4 as uuidv4 } from 'uuid'
import { replaceItems } from '~/utility-functions/array-manipulation'

// Types
import { ModelEnum } from '~/api/models/enums/ModelEnum'
import { Pagination } from '~/api/types/Pagination'

// TODO: PAGINATION COMPONENT
// TODO: IMPLEMENT SEARCH
// TODO: PUSH FILTERS TO QUERY, USE UNIQUE KEYS FOR EACH TABLES TO DETERMINE WHICH QUERY BELONGS TO WHICH TABLE
// TODO: SHOULD WORK BOTH WITH ASSIGNED MODEL AND WITH ARRAY OF ITEMS TO DISPLAY

// Components
import TableToolbar from '~/base-components/table/TableToolbar.vue'

interface HeaderItem {
  title: string
  key: string
}

const defaultLimit = 15

export default Vue.extend({
  components: {
    TableToolbar
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

    return {
      loading: false,
      mappedHeaders,
      items: [],
      meta: null as Pagination | null,
      filters: {
        keyword: null as string | null,
        page: 1,
        limit: this.limit || defaultLimit
      },
      fetchItemsDebounced: null as null | ReturnType<typeof debounce>
    }
  },

  async fetch() {
    if (!this.assignedModel) {
      this.$nuxt.error({ message: 'assignedModel has to be defined' })
    }

    this.fetchItemsDebounced = debounce(this.fetchItems, 350)
    // Do not debounce initial fetch, it cannot be awaited (won't wait for us on SSR and initial render result in empty table)
    await this.fetchItems()
  },

  computed: {
    toolbarShown(): boolean {
      return !!(this.title || this.searchable || this.creatable)
    },
    paginationShown(): boolean {
      return !!this.meta
    }
  },

  // beforeDestroy() {
  //   this.fetchItemsDebounced?.cancel?.()
  // },

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
      this.$set(this, 'meta', fetchedMeta)
    },

    onItemClick(item: unknown, index: number) {
      this.$emit('item-click', { item, index })
    }
  }
})
</script>
<style scoped>
th,
td {
  @apply px-4 py-3 text-left;
}

th:last-child,
td:last-child {
  @apply text-right;
}
</style>