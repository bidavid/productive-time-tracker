// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { PaginatedResponse, PaginationFilters } from '../../types/Pagination'
import { OrganizationMembership } from './OrganizationMembership'
import { OrganizationMembershipModelEndpoints } from '~/api/models/organization-memberships/OrganizationMembershipModelEndpoints'

// Every endpoint factory has to return ModelEndpoints type
export default (
  axios: NuxtAxiosInstance
): OrganizationMembershipModelEndpoints => ({
  // Return types can now be omitted but let's keep them
  getList(
    params: Partial<PaginationFilters> = {}
  ): Promise<PaginatedResponse<OrganizationMembership>> {
    return axios.$get('organization_memberships', {
      params
    })
  },

  getSingle(id: number): Promise<OrganizationMembership> {
    return axios.$get(`organization_memberships/${id}`)
  }
})
