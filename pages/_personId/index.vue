<template>
  <div>
    <nuxt-link to="/" class="flex items-center space-x-3 text-blue-600 group">
      <em class="icon-caret-left" />
      <span class="group-hover:underline">Back to memberships</span>
    </nuxt-link>
    <DataTable
      :title="tableTitle"
      :assigned-model="enums.ModelEnum.TimeEntries"
      :headers="tableHeaders"
      :additional-filters="timeEntriesFilters"
      creatable
      class="mt-4"
    >
      <template
        #row="{
          item: {
            attributes: { date, note, time, billable_time, cost, currency }
          }
        }"
      >
        <td>
          <time class="whitespace-nowrap">{{ formatDate(date) || '-' }}</time>
        </td>
        <td>
          {{ note || '-' }}
        </td>
        <td>
          <time class="whitespace-nowrap">{{
            formatMinutesToHoursAndMinutes(time) || '-'
          }}</time>
        </td>
        <td>
          <time class="whitespace-nowrap">{{
            formatMinutesToHoursAndMinutes(billable_time) || '-'
          }}</time>
        </td>
        <td class="whitespace-nowrap">
          {{ formatCurrency(cost, currency) || '-' || '-' }}
        </td>
      </template>
    </DataTable>
  </div>
</template>

<script lang="ts">
// Classes
import Vue from 'vue'

// Components
import DataTable from '~/base-components/table/DataTable.vue'

// Enums
import { ModelEnum } from '~/api/models/enums/ModelEnum'

// Utilities
import {
  formatCurrency,
  formatDate,
  formatMinutesToHoursAndMinutes
} from '~/utility-functions/formatters'
import { TimeEntryFilters } from '~/api/models/time-entries/TimeEntry'

export default Vue.extend({
  name: 'TimeEntries',

  components: {
    DataTable
  },

  async asyncData({ $api, params, error }) {
    try {
      const person = await $api.people.getSingle(+params.personId)

      return {
        person
      }
    } catch (e) {
      error({
        message: 'An error occured while fetching Person details'
      })
    }
  },

  data() {
    return {
      enums: {
        ModelEnum
      },

      tableHeaders: [
        {
          key: 'date',
          title: 'Date'
        },
        {
          key: 'note',
          title: 'Note'
        },

        {
          key: 'time',
          title: 'Time'
        },

        {
          key: 'billable_time',
          title: 'Billable time'
        },

        {
          key: 'cost',
          title: 'Cost'
        }
      ]
    }
  },

  computed: {
    tableTitle(): string {
      const { first_name, last_name } = this.person.data.attributes
      return `${first_name} ${last_name}'s time entries`
    },
    timeEntriesFilters(): TimeEntryFilters {
      const { personId } = this.$route.params
      return {
        person_id: [+personId]
      }
    }
  },

  methods: {
    formatCurrency,
    formatDate,
    formatMinutesToHoursAndMinutes
  }
})
</script>
