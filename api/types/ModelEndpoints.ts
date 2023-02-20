// Types
import { PaginatedResponse, PaginationFilters } from './Pagination'
import { DeepPartial } from '~/utilities/types/DeepPartial'

export interface ModelEndpoints<ModelType, CustomModelFilters = {}> {
  getList(
    params?: Partial<PaginationFilters & CustomModelFilters>
  ): Promise<PaginatedResponse<ModelType>>

  getSingle(id: number): Promise<ModelType>

  create?(payload: DeepPartial<ModelType>): Promise<ModelType>
}
