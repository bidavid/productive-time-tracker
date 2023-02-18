// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { OrganizationMembership } from './types'
import { ProductiveApiPromise } from '~/api/types/ResponseTypes'
import { PaginatedResponse } from '~/api/types/Pagination'

// Utility functions
import { buildRequest } from '~/api/utilities/buildRequest'

export const OrganizationMembershipsEndpointFactory = (axios: NuxtAxiosInstance) => ({
  async getList (): ProductiveApiPromise<PaginatedResponse<OrganizationMembership>> {
    return await buildRequest<PaginatedResponse<OrganizationMembership>>(axios.get('/auth/password/forgot'))
  },

  async getSingle (organizationMembershipId: number): ProductiveApiPromise<OrganizationMembership> {
    return await buildRequest<OrganizationMembership>(axios.$get(`organization_memberships/${organizationMembershipId}`))
  }
})
