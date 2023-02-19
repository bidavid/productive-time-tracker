/**
 Formats Date strings or Date objects with Intl.DateTimeFormat
 @param date date string coming from api or Date object
 @param format formatting locale
 @param options additional options when it comes to displaying year, month, day, hour, minute, fractionalSecondDigits..
 */

export interface DateFormattingOptions {
  year?: string
  month?: string
  day?: string
  hour?: string
  minute?: string
  second?: string
  fractionalSecondDigits?: number
}

const defaultDateFormattingLocale = 'uk-EN'
const defaultDateFormattingOptions: DateFormattingOptions = Object.freeze({
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
})

function formatDate(
  date: string | Date,
  options: DateFormattingOptions = defaultDateFormattingOptions,
  locale = defaultDateFormattingLocale
): string | null {
  if (!date) {
    return null
  }

  const parameters = [locale || defaultDateFormattingLocale, options].filter(
    Boolean
  )

  // @ts-ignore
  return Intl.DateTimeFormat(...parameters).format(new Date(date))
}

export { formatDate }
