// Types
import { PaginatedResponse } from '~/api/types/Pagination'

export interface ModelEndpoints<T> {
  getList(): Promise<PaginatedResponse<T>>
  getSingle(id: number): Promise<T>
}
