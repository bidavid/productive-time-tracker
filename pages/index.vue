<template>
  <div class="p-5 text-body-2 text-gray-600">
    <DataTable
      title="Organization memberships"
      :assigned-model="enums.ModelEnum.OrganizationMemberships"
      :headers="tableHeaders"
      creatable
    >
      <template #row="{ item, index }">
        <td>{{ `#${index + 1}` }}</td>
        <td>{{ item.name || '-' }}</td>
        <td class="whitespace-nowrap">
          {{ formatDate(get(item, 'attributes.updated_at')) || '-' }}
        </td>
      </template>
    </DataTable>

    <a href="/">nesto</a>
    <em class="icon-search" />
  </div>
</template>

<script lang="ts">
// Classes
import Vue from 'vue'

// Components
import get from 'lodash/get'
import DataTable from '~/base-components/table/DataTable.vue'

// Enums
import { ModelEnum } from '~/api/models/enums/ModelEnum'

// Utilities
import { formatDate } from '~/utility-functions/formatters'

export default Vue.extend({
  name: 'OrganizationMemberships',
  components: {
    DataTable
  },

  data() {
    return {
      enums: {
        ModelEnum
      },

      tableHeaders: [
        {
          key: 'orderNumber',
          title: '#'
        },
        {
          key: 'name',
          title: 'Name'
        },
        {
          key: 'updatedAt',
          title: 'Last update'
        }
      ]
    }
  },

  methods: {
    get,
    formatDate
  }
})
</script>
