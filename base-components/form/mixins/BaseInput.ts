import Vue from 'vue'

// Utilities
import { v4 as uuidv4 } from 'uuid'

import {
  DateFormattingOptions,
  formatDate
} from '~/utility-functions/formatters'
import { DayJsGranularityEnum } from '~/validations/enums/DayJsGranularityEnum'

export default Vue.extend({
  props: {
    id: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    validationObject: {
      type: Object,
      default: null
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    charMaxLength: {
      type: [Number, String],
      default: null
    }
  },

  data() {
    const inputId = `${this.id || uuidv4()}-input`
    return {
      inputId
    }
  },

  computed: {
    errorMessage() {
      if (!this.validationObject) {
        return null
      }

      const {
        $error,
        $params,
        required,
        email,
        minLength,
        maxLength,
        minValue,
        maxValue,
        sameAs,
        maxDate,
        minDate
      } = this.validationObject

      const numericFormatter = new Intl.NumberFormat('de-DE')

      const calculateDateFormattingOptions = (
        granularity = DayJsGranularityEnum.Millisecond
      ) => {
        const formattingOptions: DateFormattingOptions = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          fractionalSecondDigits: 3
        }

        // TODO: napisi ovo kako bog zapovjeda..
        if (granularity === DayJsGranularityEnum.Second) {
          delete formattingOptions.fractionalSecondDigits
        } else if (granularity === DayJsGranularityEnum.Minute) {
          delete formattingOptions.fractionalSecondDigits
          delete formattingOptions.second
        } else if (granularity === DayJsGranularityEnum.Hour) {
          delete formattingOptions.fractionalSecondDigits
          delete formattingOptions.second
          delete formattingOptions.minute
        } else if (granularity === DayJsGranularityEnum.Day) {
          delete formattingOptions.fractionalSecondDigits
          delete formattingOptions.second
          delete formattingOptions.minute
          delete formattingOptions.hour
        } else if (granularity === DayJsGranularityEnum.Month) {
          delete formattingOptions.fractionalSecondDigits
          delete formattingOptions.second
          delete formattingOptions.minute
          delete formattingOptions.hour
          delete formattingOptions.day
        } else if (granularity === DayJsGranularityEnum.Year) {
          delete formattingOptions.fractionalSecondDigits
          delete formattingOptions.second
          delete formattingOptions.minute
          delete formattingOptions.hour
          delete formattingOptions.day
          delete formattingOptions.month
        }

        return formattingOptions
      }

      if (!$error) {
        return null
      } else if (required === false) {
        return 'This field is required'
      } else if (email === false) {
        return "Provided email address format is invalid. Enter email address in format: 'name@mail.com'"
      } else if (minLength === false) {
        return `Minimum required length: ${numericFormatter.format(
          $params?.minLength?.min
        )}`
      } else if (minDate === false) {
        const dateFormattingOptions = calculateDateFormattingOptions(
          $params?.minDate?.value?.granularity
        )

        if ($params?.minDate?.value?.inclusive) {
          return `Earliest allowed date is: ${formatDate(
            $params?.minDate?.value?.date,
            dateFormattingOptions
          )}`
        } else {
          return `Date must be later than: ${formatDate(
            $params?.minDate?.value?.date,

            dateFormattingOptions
          )}`
        }
      } else if (maxDate === false) {
        const dateFormattingOptions = calculateDateFormattingOptions(
          $params?.maxDate?.value?.granularity
        )

        if ($params?.maxDate?.value?.inclusive) {
          return `Latest allowed date is: ${formatDate(
            $params?.maxDate?.value?.date,
            dateFormattingOptions
          )}`
        } else {
          return `Date must be earlier than: ${formatDate(
            $params?.maxDate?.value?.date,
            dateFormattingOptions
          )}`
        }
      } else if (maxLength === false) {
        return `Maximum number of characters equals: ${numericFormatter.format(
          $params?.maxLength?.max
        )}`
      } else if (minValue === false) {
        return `Minumum allowed value is: ${numericFormatter.format(
          $params?.minValue?.min
        )}`
      } else if (maxValue === false) {
        return `Maximum allowed value is: ${numericFormatter.format(
          $params?.maxValue?.max
        )}`
      } else if (sameAs === false) {
        const eqValue = $params?.sameAs?.eq?.()
        const formattedValue =
          typeof eqValue === 'number'
            ? numericFormatter.format(eqValue)
            : eqValue

        return `Value has to equal: ${formattedValue}`
      } else {
        return 'New error type. Its message is missing from BaseInput.ts mixin'
      }
    }
  }
})
