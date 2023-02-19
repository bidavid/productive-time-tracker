<template>
  <div>
    <DataTable
      title="Organization memberships"
      :assigned-model="enums.ModelEnum.OrganizationMemberships"
      :headers="tableHeaders"
    >
      <template #row="{ item, index }">
        <td>{{ `#${index + 1}` }}</td>
        <td>{{ item.name || '-' }}</td>
        <td>
          <time class="whitespace-nowrap">{{
            formatDate(get(item, 'attributes.updated_at')) || '-'
          }}</time>
        </td>
      </template>
    </DataTable>
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
