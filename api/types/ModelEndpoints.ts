// Types
import { PaginatedResponse, PaginationFilters } from './Pagination'
import { DeepPartial } from '~/utilities/types/DeepPartial'

export interface ModelEndpoints<ModelType, CustomModelFilters = {}> {
  getList(
    params?: Partial<PaginationFilters & CustomModelFilters>
  ): Promise<PaginatedResponse<ModelType>>

  getSingle(id: string): Promise<ModelType>

  create(payload: { data: DeepPartial<ModelType> }): Promise<ModelType>

  update(
    id: string,
    payload: { data: DeepPartial<ModelType> }
  ): Promise<ModelType>

  delete(id: string): Promise<ModelType>
}
