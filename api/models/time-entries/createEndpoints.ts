// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { PaginatedResponse } from '../../types/Pagination'
import { ModelEndpoints } from '../../types/ModelEndpoints'
import { TimeEntry } from './TimeEntry'
import { Filters } from '~/api/types/Filters'

// Utilities
import { extractRequestParams } from '~/api/utilities'

// Every endpoint factory has to return ModelEndpoints type
export default (axios: NuxtAxiosInstance): ModelEndpoints<TimeEntry> => ({
  // Return types can now be omitted but let's keep them
  getList(
    params: Partial<Filters> = {}
  ): Promise<PaginatedResponse<TimeEntry>> {
    return axios.$get('time_entries', {
      params: extractRequestParams(params)
    })
  },

  getSingle(id: number): Promise<TimeEntry> {
    return axios.$get(`time_entries/${id}`)
  }
})
