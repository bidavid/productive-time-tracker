import { helpers } from 'vuelidate/lib/validators'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { DayJsGranularityEnum } from '~/validations/enums/DayJsGranularityEnum'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

const minDate = (
  param: Date | string,
  inclusive = false,
  granularity = DayJsGranularityEnum.Day
) =>
  helpers.withParams(
    {
      type: 'minDate',
      value: {
        date: param,
        inclusive,
        granularity
      }
    },
    (v: string | null | Date) => {
      if (!v) {
        return !helpers.req(v)
      }
      if (!param) {
        return true
      }
      const formattedValue = dayjs(v)
      const formattedParam = dayjs(param)

      const isValid = inclusive
        ? formattedValue.isSameOrAfter(formattedParam, granularity)
        : formattedValue.isAfter(formattedParam, granularity)

      return !helpers.req(v) || isValid
    }
  )

const maxDate = (
  param: Date | string,
  inclusive = false,
  granularity = DayJsGranularityEnum.Day
) =>
  helpers.withParams(
    {
      type: 'maxDate',
      value: {
        date: param,
        inclusive,
        granularity
      }
    },
    (v: string | null | Date) => {
      if (!v) {
        return !helpers.req(v)
      }
      if (!param) {
        return true
      }
      const formattedValue = dayjs(v)
      const formattedParam = dayjs(param)

      const isValid = inclusive
        ? formattedValue.isSameOrBefore(formattedParam, granularity)
        : formattedValue.isBefore(formattedParam, granularity)

      return !helpers.req(v) || isValid
    }
  )

export { minDate, maxDate }
