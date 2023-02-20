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
          :validation-object="$v.form.note"
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
import { maxLength, required } from 'vuelidate/lib/validators'
import { TimeEntry } from '~/api/models/time-entries/TimeEntry'

// Components
import BaseSideModal from '~/base-components/modals/BaseSideModal.vue'
import TextAreaInput from '~/base-components/form/TextAreaInput.vue'
import DateInput from '~/base-components/form/DateInput.vue'

// Utilities
import { maxDate } from '~/validations/additional-validators'
import { ModelEnum } from '~/api/models/enums/ModelEnum'

function createTimeEntryPayload(
  note?: string,
  date?: string,
  personId?: number,
  serviceId?: number
): { data: Partial<TimeEntry> } {
  const payload: { data: Partial<TimeEntry> } = {
    data: {
      type: ModelEnum.TimeEntries
    }
  }

  if (note || date) {
    payload.data.attributes = {
      ...(note && { note }),
      ...(date && { date })
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
    BaseSideModal,
    TextAreaInput,
    DateInput
  },

  props: {
    editedItem: {
      type: Object as PropType<TimeEntry>
    },
    personId: {
      type: Number,
      default: null,
      required: true
    }
  },

  data() {
    const form = {
      note: null as string | null,
      date: null as string | null,
      serviceId: null as number | null,
      personId: null as number | null
    }

    if (this.editedItem) {
      // cloneDeep not needed here
      const { note, date } = this.editedItem.attributes
      const { person, service } = this.editedItem.relationships

      form.note = note || null
      form.date = date || null
      form.personId = person.data!.id
      form.serviceId = service.data!.id
    } else {
      form.personId = this.personId
      // TODO: fetch services
      form.serviceId = 2728168
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
    reset() {
      this.submitting = false
      this.resetForm()
    },

    resetForm() {
      const { form } = this
      form.note = null
      form.date = null
      form.personId = null
      form.serviceId = null

      this.$v?.form?.$reset?.()
    },

    async onConfirm() {
      this.$v?.form?.$touch()

      if (this.$v?.form?.$invalid) {
        return
      }

      this.submitting = true

      let success = false

      if (this.isEditing) {
        success = await this.patchTimeEntry()
      } else {
        success = await this.createTimeEntry()
      }

      if (success) {
        this.onSuccess()
      }

      this.submitting = false
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
        const { note, date, personId, serviceId } = this.form

        const payload = createTimeEntryPayload(
          note!,
          date!,
          personId!,
          serviceId!
        )

        // @ts-ignore how..
        await this.$api[ModelEnum.TimeEntries].create?.(payload)

        this.$toast.success('New Time Entry successfully created')

        return true
      } catch (e) {
        this.$toast.error('An error occured while creating Time Entry')

        return false
      }
    },

    async patchTimeEntry() {
      try {
        const { note, date } = this.form

        const payload = createTimeEntryPayload(note!, date!)

        // @ts-ignore how..
        await this.$api[ModelEnum.TimeEntries].update?.(
          this.editedItem.id,
          payload
        )

        this.$toast.success('Time Entry successfully updated')

        return true
      } catch (e) {
        console.dir(e)
        this.$toast.error('An error occured while updating Time Entry')

        return false
      }
    },

    async onRemove() {
      if (!this.editedItem) {
        return
      }

      try {
        this.submitting = true

        await this.$api[ModelEnum.TimeEntries].delete?.(this.editedItem.id)

        this.$toast.success('Time Entry successfully removed')

        this.onSuccess()
      } catch (e) {
        this.$toast.error('An error occured while deleting Time Entry')
      } finally {
        this.submitting = false
      }
    }
  },

  validations() {
    return {
      form: {
        date: {
          required,
          maxDate: maxDate(new Date(), true)
        },
        note: {
          required,
          maxLength: maxLength(255)
        }
      }
    }
  }
})
</script>
