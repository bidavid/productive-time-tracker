<template>
  <BaseSideModal
    :title="title"
    confirmable
    :removable="isEditing"
    :loading="submitting"
    @close-clicked="onClose"
    @confirm-clicked="onConfirm"
    @remove-clicked="onRemove"
  >
    <template>
      <div class="grid gap-y-5">
        <TextAreaInput
          v-model="form.note"
          label="Note"
          placeholder="Enter note"
          :disabled="submitting"
          autofocus
          :validation-object="$v.form.note"
        />

        <NumberInput
          v-model="form.time"
          label="Time / mins"
          placeholder="Enter duration in minutes"
          :disabled="submitting"
          :validation-object="$v.form.time"
        />

        <DateInput
          v-model="form.date"
          label="Date"
          placeholder="Pick date"
          :disabled="submitting"
          :validation-object="$v.form.date"
        />
      </div>
    </template>
  </BaseSideModal>
</template>
<script lang="ts">
// Types
import Vue, { PropType } from 'vue'
import { maxLength, required, minValue } from 'vuelidate/lib/validators'
import { TimeEntry } from '~/api/models/time-entries/TimeEntry'
import { DeepPartial } from '~/utilities/types/DeepPartial'

// Enums
import { ModelEnum } from '~/api/models/enums/ModelEnum'

// Components
import BaseSideModal from '~/base-components/modals/BaseSideModal.vue'
import TextAreaInput from '~/base-components/form/TextAreaInput.vue'
import DateInput from '~/base-components/form/DateInput.vue'

// Utilities
import { maxDate } from '~/validations/additional-validators'
import NumberInput from '~/base-components/form/NumberInput.vue'

function createTimeEntryPayload(
  note: string | null,
  date: string | null,
  time: number | null,
  personId?: string | null,
  serviceId?: string | null
): { data: DeepPartial<TimeEntry> } {
  const payload: { data: Partial<TimeEntry> } = {
    data: {
      type: ModelEnum.TimeEntries
    }
  }

  if (note || date) {
    payload.data.attributes = {
      ...(note && { note }),
      ...(date && { date }),
      ...(time && { time: +time })
    }
  }

  if (personId || serviceId) {
    payload.data.relationships = {
      ...(personId && {
        person: {
          data: {
            type: ModelEnum.People,
            id: personId
          }
        }
      }),

      ...(serviceId && {
        service: {
          data: {
            type: ModelEnum.Services,
            id: serviceId
          }
        }
      })
    }
  }

  return payload
}

export default Vue.extend({
  components: {
    NumberInput,
    BaseSideModal,
    TextAreaInput,
    DateInput
  },

  props: {
    editedItem: {
      type: Object as PropType<TimeEntry>,
      default: null
    },
    personId: {
      type: String,
      default: null,
      required: true
    }
  },

  data() {
    const form = {
      note: null as string | null,
      date: null as string | null,
      time: null as number | null,
      serviceId: null as string | null,
      personId: null as string | null
    }

    if (this.editedItem) {
      // cloneDeep not needed here
      const { note, date, time } = this.editedItem.attributes
      const { person, service } = this.editedItem.relationships

      form.note = note || null
      form.date = date || null
      form.time = time || null

      form.personId = person.data!.id
      form.serviceId = service.data!.id
    } else {
      form.personId = this.personId
      // TODO: FETCH SERVICES
      form.serviceId = this.$config.SERVICE_ID.toString()
    }
    return {
      submitting: false,
      form
    }
  },

  computed: {
    isEditing(): boolean {
      return !!this.editedItem
    },
    title(): string {
      return `${this.isEditing ? 'Edit/Remove' : 'Create'} Time Entry`
    }
  },

  methods: {
    startSubmitting() {
      this.submitting = true
    },
    stopSubmitting() {
      this.submitting = false
    },
    reset() {
      this.stopSubmitting()
      this.resetForm()
    },

    resetForm() {
      const { form } = this
      form.note = null
      form.date = null
      form.time = null
      form.personId = null
      form.serviceId = null

      this.$v?.form?.$reset?.()
    },

    async onConfirm() {
      this.$v?.form?.$touch()

      if (this.$v?.form?.$invalid) {
        return
      }

      this.startSubmitting()

      let success = false

      if (this.isEditing) {
        success = await this.patchTimeEntry()
      } else {
        success = await this.createTimeEntry()
      }

      if (success) {
        this.onSuccess()
      }

      this.stopSubmitting()
    },

    onClose() {
      this.reset()
      this.$emit('closed')
    },

    onSuccess() {
      this.reset()
      this.$emit('success')
    },

    async createTimeEntry() {
      try {
        const { note, date, time, personId, serviceId } = this.form

        const payload = createTimeEntryPayload(
          note,
          date,
          time,
          personId,
          serviceId
        )

        await this.$api[ModelEnum.TimeEntries].create(payload)

        this.$toast.success('New Time Entry successfully created')

        return true
      } catch (e) {
        this.$toast.error('An error occured while creating Time Entry')

        return false
      }
    },

    async patchTimeEntry() {
      try {
        const { note, date, time } = this.form

        const payload = createTimeEntryPayload(note, date, time)

        await this.$api[ModelEnum.TimeEntries].update(
          this.editedItem.id,
          payload
        )

        this.$toast.success('Time Entry successfully updated')

        return true
      } catch (e) {
        this.$toast.error('An error occured while updating Time Entry')

        return false
      }
    },

    async onRemove() {
      if (!this.editedItem) {
        return
      }

      try {
        this.startSubmitting()

        await this.$api[ModelEnum.TimeEntries].delete(this.editedItem.id)

        this.$toast.success('Time Entry successfully removed')

        this.onSuccess()
      } catch (e) {
        this.$toast.error('An error occured while removing Time Entry')
      } finally {
        this.stopSubmitting()
      }
    }
  },

  validations() {
    return {
      form: {
        note: {
          required,
          maxLength: maxLength(255)
        },
        date: {
          required,
          maxDate: maxDate(new Date(), true)
        },
        time: {
          required,
          minValue: minValue(0)
        }
      }
    }
  }
})
</script>
