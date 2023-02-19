// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { PaginatedResponse, PaginationFilters } from '../../types/Pagination'
import { ModelEndpoints } from '../../types/ModelEndpoints'
import { Person } from './Person'

// Every endpoint factory has to return ModelEndpoints type
export default (axios: NuxtAxiosInstance): ModelEndpoints<Person> => ({
  // Return types can now be omitted but let's keep them
  getList(
    params: Partial<PaginationFilters> = {}
  ): Promise<PaginatedResponse<Person>> {
    return axios.$get('time_entries', {
      params
    })
  },

  getSingle(id: number): Promise<Person> {
    return axios.$get(`time_entries/${id}`)
  }
})
