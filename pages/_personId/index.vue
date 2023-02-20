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
      <BaseSideModal
        v-if="sideModal.opened"
        :title="sideModalTitle"
        confirmable
        :removable="isEditing"
        :loading="sideModal.submitting"
        @close-clicked="closeSideModal"
        @confirm-clicked="onConfirm"
      >
        <template>
          <div class="grid gap-y-4">
            <TextInput
              v-model="sideModal.form.note"
              label="Note"
              placeholder="Enter note"
              :disabled="sideModal.submitting"
              :validation-object="$v.sideModal.form.note"
            />

            <input v-model="sideModal.form.date" type="date" />
          </div>
        </template>
      </BaseSideModal>
    </transition>
  </div>
</template>

<script lang="ts">
// Classes
import Vue from 'vue'

// Components
import { maxLength, required } from 'vuelidate/lib/validators'
import DataTable from '~/base-components/table/DataTable.vue'
import BaseSideModal from '~/base-components/modals/BaseSideModal.vue'

// Enums
import { ModelEnum } from '~/api/models/enums/ModelEnum'

// Utilities
import {
  formatCurrency,
  formatDate,
  formatMinutesToHoursAndMinutes
} from '~/utilities/functions/formatters'

// Types
import {
  TimeEntry,
  TimeEntryFilters
} from '~/api/models/time-entries/TimeEntry'
import TextInput from '~/base-components/form/TextInput.vue'

export default Vue.extend({
  name: 'TimeEntries',

  components: {
    TextInput,
    BaseSideModal,
    DataTable
  },

  async asyncData({ $api, params, error }) {
    try {
      const person = await $api[ModelEnum.People].getSingle(+params.personId)

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
      ],

      sideModal: {
        opened: false,
        submitting: false,
        editedItem: null as TimeEntry | null,

        form: {
          date: null as string | null,
          note: null as string | null,
          serviceId: null as number | null,
          personId: null as number | null
        }
      }
    }
  },

  computed: {
    personId(): number {
      return +this.$route.params.personId
    },
    tableTitle(): string {
      const { first_name, last_name } = this.person.data.attributes
      return `${first_name} ${last_name}'s time entries`
    },
    isEditing(): boolean {
      return !!this.sideModal.editedItem
    },
    sideModalTitle(): string {
      return `${this.isEditing ? 'Edit/Remove' : 'Create'} Time Entry`
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
      if (editedItem) {
        this.loadEditedItem(editedItem)
      } else {
        const { form } = this.sideModal

        form.personId = this.personId
        // TODO: fetch services
        form.serviceId = 2728168
      }

      this.sideModal.opened = true
    },

    loadEditedItem(editedItem: TimeEntry) {
      this.sideModal.editedItem = editedItem

      const { form } = this.sideModal

      // cloneDeep not needed here
      const { note, date } = editedItem.attributes
      const { person, service } = editedItem.relationships

      form.date = date || null
      form.note = note || null
      form.personId = person.data!.id
      form.serviceId = service.data!.id
    },

    closeSideModal() {
      const { sideModal } = this
      sideModal.opened = false
      sideModal.submitting = false
      sideModal.editedItem = null

      this.resetSideModalForm()
    },

    resetSideModalForm() {
      const { form } = this.sideModal
      form.date = null
      form.note = null
      form.personId = null
      form.serviceId = null

      this.$v?.sideModal?.form?.$reset?.()
    },

    async onConfirm() {
      this.$v?.sideModal?.form?.$touch()

      if (this.$v?.sideModal?.form?.$invalid) {
        return
      }

      this.sideModal.submitting = true

      let success = false

      if (this.isEditing) {
        success = await this.patchTimeEntry()
      } else {
        success = await this.createTimeEntry()
      }

      if (success) {
        this.closeSideModal()
        // @ts-ignore
        this.$refs?.dataTable?.fetchItemsDebounced?.()
      }

      this.sideModal.submitting = false
    },

    async createTimeEntry() {
      try {
        const { personId, serviceId, note, date } = this.sideModal.form

        const payload = {
          type: ModelEnum.TimeEntries,
          attributes: {
            note,
            date
          },
          relationships: {
            person: {
              data: {
                type: ModelEnum.People,
                id: personId
              }
            },
            service: {
              data: {
                type: ModelEnum.Services,
                id: serviceId
              }
            }
          }
        }

        // const payload = {
        //   note,
        //   date,
        //   person_id: personId,
        //   service_id: serviceId
        // }

        // @ts-ignore how..
        await this.$api[ModelEnum.TimeEntries].create?.({ data: payload })

        this.$toast.success('New Time Entry successfully created')
        return true
      } catch (e) {
        console.dir(e)
        this.$toast.error('An error occured while creating Time Entry')
        return false
      }
    }
  },

  validations() {
    return {
      sideModal: {
        form: {
          date: {
            required
          },
          note: {
            required,
            maxLength: maxLength(255)
          }
        }
      }
    }
  }
})
</script>
