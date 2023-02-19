// Types
import { PaginatedResponse } from './Pagination'

export interface ModelEndpoints<T> {
  getList(): Promise<PaginatedResponse<T>>
  getSingle(id: number): Promise<T>
}
