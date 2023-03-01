<template>
  <div>
    <nuxt-link to="/" class="flex items-center space-x-3 text-blue-600 group">
      <em class="icon-caret-left" />
      <span class="group-hover:underline">Back to memberships</span>
    </nuxt-link>
    <DataTable
      ref="dataTable"
      :title="tableTitle"
      :assigned-model="enums.ModelEnum.TimeEntries"
      :headers="tableHeaders"
      :additional-filters="timeEntriesFilters"
      creatable
      class="mt-4"
      @item-clicked="openSideModal($event.item)"
      @creation-clicked="openSideModal"
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

    <transition name="fade">
      <TimeEntrySideModal
        v-if="sideModal.opened"
        :edited-item="sideModal.editedItem"
        :person-id="personId"
        @closed="closeSideModal"
        @success="onSuccess"
      />
    </transition>
  </div>
</template>

<script lang="ts">
// Classes
import Vue from 'vue'

import {
  formatCurrency,
  formatDate,
  formatMinutesToHoursAndMinutes
} from '~/utilities/functions/formatters'

// Components
import DataTable from '~/base-components/table/DataTable.vue'
import TimeEntrySideModal from '~/time-entries/TimeEntrySideModal.vue'

// Enums
import { ModelEnum } from '~/api/models/enums/ModelEnum'

// Types
import {
  TimeEntry,
  TimeEntryFilters
} from '~/api/models/time-entries/TimeEntry'

export default Vue.extend({
  name: 'TimeEntries',

  components: {
    TimeEntrySideModal,
    DataTable
  },

  async asyncData({ $api, params, error }) {
    try {
      const person = await $api[ModelEnum.People].getSingle(params.personId)

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

      sideModal: {
        opened: false,
        editedItem: null as null | TimeEntry
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
    personId(): string {
      return this.$route.params.personId
    },
    tableTitle(): string {
      const { first_name, last_name } = this.person.data.attributes
      return `${first_name} ${last_name}'s time entries`
    },
    timeEntriesFilters(): TimeEntryFilters {
      return {
        person_id: [this.personId]
      }
    }
  },

  methods: {
    formatCurrency,
    formatDate,
    formatMinutesToHoursAndMinutes,

    openSideModal(editedItem: TimeEntry) {
      this.sideModal.opened = true

      if (editedItem) {
        this.sideModal.editedItem = editedItem
      }
    },

    closeSideModal() {
      this.sideModal.opened = false
      this.sideModal.editedItem = null
    },

    onSuccess() {
      this.closeSideModal()
      // @ts-ignore
      this.$refs?.dataTable?.fetchItemsDebounced?.()
    }
  }
})
</script>
