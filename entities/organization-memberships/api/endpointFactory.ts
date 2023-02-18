// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { OrganizationMembership } from './types'
import { PaginatedResponse } from '~/api/types/Pagination'

export const OrganizationMembershipsEndpointFactory = (axios: NuxtAxiosInstance) => ({
  getList (): Promise<PaginatedResponse<OrganizationMembership>> {
    return axios.$get('organization_memberships')
  },

  getSingle (organizationMembershipId: number): Promise<OrganizationMembership> {
    return axios.$get(`organization_memberships/${organizationMembershipId}`)
  }
})
