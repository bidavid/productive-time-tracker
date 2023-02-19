// Types
import { PaginatedResponse } from './Pagination'
import { Filters } from '~/api/types/Filters'

export interface ModelEndpoints<T> {
  getList(params?: Partial<Filters>): Promise<PaginatedResponse<T>>
  getSingle(id: number): Promise<T>
}
