<template>
  <div>
    <DataTable
      title="Organization memberships"
      :assigned-model="enums.ModelEnum.OrganizationMemberships"
      :headers="tableHeaders"
      @item-clicked="onMembershipClick"
    >
      <template #row="{ item: { attributes, relationships } }">
        <td>
          {{ get(relationships, 'organization.data.id') || '-' }}
        </td>
        <td>
          {{ get(relationships, 'person.data.id') || '-' }}
        </td>

        <td>
          <time class="whitespace-nowrap">{{
            formatDate(get(attributes, 'updated_at')) || '-'
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
import { formatDate } from '~/utilities/functions/formatters'

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
          key: 'organization_id',
          title: 'Organization ID'
        },
        {
          key: 'person_id',
          title: 'Person ID'
        },
        {
          key: 'updated_at',
          title: 'Last update'
        }
      ]
    }
  },

  methods: {
    get,
    formatDate,
    onMembershipClick({ item }: { item: OrganizationMembership }) {
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
