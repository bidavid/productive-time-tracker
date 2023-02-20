<template>
  <div>
    <TextInput
      v-model="text"
      label="Nesto"
      placeholder="unesi nesto"
      :validation-object="get($v, 'text')"
      disabled
    />
  </div>
</template>

<script lang="ts">
// Classes
import Vue from 'vue'

// Components
import get from 'lodash/get'
import { required, maxLength } from 'vuelidate/lib/validators'
import TextInput from '~/base-components/form/TextInput.vue'

// Enums
import { ModelEnum } from '~/api/models/enums/ModelEnum'

// Utilities
import { formatDate } from '~/utilities/functions/formatters'

export default Vue.extend({
  name: 'OrganizationMemberships',
  components: {
    TextInput
  },

  data() {
    return {
      enums: {
        ModelEnum
      },

      text: null,

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

  mounted() {
    this.$v.$touch()
  },

  methods: {
    get,
    formatDate
  },

  validations() {
    return {
      text: {
        required,
        maxLength: maxLength(132)
      }
    }
  }
})
</script>
