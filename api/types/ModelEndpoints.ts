// Types
import { PaginatedResponse, PaginationFilters } from './Pagination'
import { DeepPartial } from '~/utilities/types/DeepPartial'

export interface ModelEndpoints<ModelType, CustomModelFilters = {}> {
  getList(
    params?: Partial<PaginationFilters & CustomModelFilters>
  ): Promise<PaginatedResponse<ModelType>>

  getSingle(id: number): Promise<ModelType>

  create?(payload: { data: DeepPartial<ModelType> }): Promise<ModelType>

  update?(
    id: number,
    payload: { data: DeepPartial<ModelType> }
  ): Promise<ModelType>

  delete?(id: number): Promise<ModelType>
}
