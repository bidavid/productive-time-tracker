// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { PaginatedResponse, PaginationFilters } from '../../types/Pagination'
import { ModelEndpoints } from '../../types/ModelEndpoints'
import { Service } from './Service'

// Every endpoint factory has to return ModelEndpoints type
export default (axios: NuxtAxiosInstance): ModelEndpoints<Service> => ({
  // Return types can now be omitted but let's keep them
  getList(
    params: Partial<PaginationFilters> = {}
  ): Promise<PaginatedResponse<Service>> {
    return axios.$get('services', {
      params
    })
  },

  getSingle(id: number): Promise<Service> {
    return axios.$get(`services/${id}`)
  }
})
