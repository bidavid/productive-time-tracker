import { ModelEnum } from '~/api/models/enums/ModelEnum'

export interface Pagination {
  current_page: number
  total_pages: number
  total_count: number
  page_size: number
}

export interface IncludedInfo {
  id: number
  type: ModelEnum
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: Pagination
  included: IncludedInfo[]
}

export interface PaginationFilters {
  ['page[number]']: number
  ['page[size]']: number
}
