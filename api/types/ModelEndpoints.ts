// Types
import { PaginatedResponse, PaginationFilters } from './Pagination'

export interface ModelEndpoints<ReturnModelType, CustomModelFilters = {}> {
  getList(
    params?: Partial<PaginationFilters & CustomModelFilters>
  ): Promise<PaginatedResponse<ReturnModelType>>

  getSingle(id: number): Promise<ReturnModelType>
}
