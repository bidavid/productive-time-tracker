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

function formatCurrency(
  amount: number,
  currency = 'EUR',
  fractionDigits = 2
): string | null {
  // eslint-disable-next-line eqeqeq
  if (!amount && amount != 0) {
    return null
  }

  return new Intl.NumberFormat('de-DE', {
    currency,
    currencyDisplay: 'symbol',
    style: 'currency',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(amount)
}

function formatMinutesToHoursAndMinutes(totalMinutes: number): string | null {
  // eslint-disable-next-line eqeqeq
  if (!totalMinutes && totalMinutes != 0) {
    return null
  }

  const padToTwoDigits = (x: number) => x.toString().padStart(2, '0')

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}`
}

export { formatDate, formatCurrency, formatMinutesToHoursAndMinutes }
