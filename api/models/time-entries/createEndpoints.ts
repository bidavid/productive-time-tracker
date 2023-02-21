// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { PaginatedResponse, PaginationFilters } from '../../types/Pagination'
import { TimeEntry, TimeEntryFilters } from './TimeEntry'
import { TimeEntryModelEndpoints } from '~/api/models/time-entries/TimeEntryModelEndpoints'

// Every endpoint factory has to return ModelEndpoints type
export default (axios: NuxtAxiosInstance): TimeEntryModelEndpoints => ({
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
  },

  update(id: number, payload): Promise<TimeEntry> {
    return axios.$patch(`time_entries/${id}`, payload)
  },

  delete(id: number): Promise<TimeEntry> {
    return axios.$delete(`time_entries/${id}`)
  }
})
