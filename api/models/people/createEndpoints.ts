// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { PaginatedResponse } from '../../types/Pagination'
import { ModelEndpoints } from '../../types/ModelEndpoints'
import { Person } from './Person'
import { Filters } from '~/api/types/Filters'

// Utilities
import { extractRequestParams } from '~/api/utilities'

// Every endpoint factory has to return ModelEndpoints type
export default (axios: NuxtAxiosInstance): ModelEndpoints<Person> => ({
  // Return types can now be omitted but let's keep them
  getList(params: Partial<Filters> = {}): Promise<PaginatedResponse<Person>> {
    return axios.$get('time_entries', {
      params: extractRequestParams(params)
    })
  },

  getSingle(id: number): Promise<Person> {
    return axios.$get(`time_entries/${id}`)
  }
})
