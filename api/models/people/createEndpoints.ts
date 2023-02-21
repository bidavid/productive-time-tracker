// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { PaginatedResponse, PaginationFilters } from '../../types/Pagination'
import { Person } from './Person'
import { PersonModelEndpoints } from '~/api/models/people/PersonModelEndpoints'

// Every endpoint factory has to return ModelEndpoints type
export default (axios: NuxtAxiosInstance): PersonModelEndpoints => ({
  // Return types can now be omitted but let's keep them
  getList(
    params: Partial<PaginationFilters> = {}
  ): Promise<PaginatedResponse<Person>> {
    return axios.$get('people', {
      params
    })
  },

  getSingle(id: number): Promise<Person> {
    return axios.$get(`people/${id}`)
  }
})
