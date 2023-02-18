export interface Pagination {
  current_page: number
  total_pages: number
  total_count: number
  page_size: number
  max_page_size: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: Pagination
}
