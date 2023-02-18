// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { OrganizationMembership } from './OrganizationMembership'
import { PaginatedResponse } from '~/api/types/Pagination'
import { ModelEndpoints } from '~/api/types/ModelEndpoints'

export default (axios: NuxtAxiosInstance): ModelEndpoints<OrganizationMembership> => ({
  // Return types can now be omitted but let's keep them
  getList (): Promise<PaginatedResponse<OrganizationMembership>> {
    return axios.$get('organization_memberships')
  },

  getSingle (id: number): Promise<OrganizationMembership> {
    return axios.$get(`organization_memberships/${id}`)
  }
})
