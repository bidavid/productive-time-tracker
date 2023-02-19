export interface Filters {
  page: number
  limit: number
}

export interface ApiRequestParams {
  ['page[number]']: number
  ['page[size]']: number
}
