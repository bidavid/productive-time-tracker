// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { PaginatedResponse, PaginationFilters } from '../../types/Pagination'
import { ModelEndpoints } from '../../types/ModelEndpoints'
import { TimeEntry, TimeEntryFilters } from './TimeEntry'

// Every endpoint factory has to return ModelEndpoints type
export default (axios: NuxtAxiosInstance): ModelEndpoints<TimeEntry> => ({
  // Return types can now be omitted but let's keep them
  getList(
    params: Partial<PaginationFilters & TimeEntryFilters> = {}
  ): Promise<PaginatedResponse<TimeEntry>> {
    return axios.$get('time_entries', {
      params
    })
  },

  getSingle(id: number): Promise<TimeEntry> {
    return axios.$get(`time_entries/${id}`)
  },

  create(payload): Promise<TimeEntry> {
    return axios.$post('time_entries', payload)
  }
})
