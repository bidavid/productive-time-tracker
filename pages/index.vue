<template>
  <div>
    <DataTable
      title="Organization memberships"
      :assigned-model="enums.ModelEnum.OrganizationMemberships"
      :headers="tableHeaders"
      @item-click="onItemClick"
    >
      <template #row="{ item, index }">
        <td>{{ `#${index + 1}` }}</td>
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

// Types
import { OrganizationMembership } from '~/api/models/organization-memberships/OrganizationMembership'

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
          key: 'order',
          title: '#'
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
    formatDate,
    onItemClick({ item }: { item: OrganizationMembership }) {
      const personId = item.relationships?.person?.data?.id

      if (!personId) {
        this.$toast.error('personId is not defined')
        return
      }

      this.$router.push({ path: `${personId}`, append: true })
    }
  }
})
</script>
