<template>
  <div class="text-body-2">
    <DataTable title="Organization memberships" :assigned-model="enums.ModelEnum.OrganizationMemberships" :headers="tableHeaders" creatable />

    <a href="/">nesto</a>
    <em class="icon-search" />
  </div>
</template>

<script lang='ts'>
// Classes
import Vue from 'vue'

// Components
import DataTable from '~/base-components/data-table/DataTable.vue'

// Enums
import { ModelEnum } from '~/api/enums/ModelEnum'

export default Vue.extend({
  name: 'OrganizationMemberships',
  components: {
    DataTable
  },

  data () {
    return {
      enums: {
        ModelEnum
      },

      tableHeaders: [
        {
          key: 'name',
          title: 'Name'
        }
      ]
    }
  }
})
</script>
