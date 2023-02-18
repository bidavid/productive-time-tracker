// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { OrganizationMembership } from '~/services/api/modules/organization-memberships/types'
import { ProductiveApiPromise } from '~/services/api/base-types/ResponseTypes'
import { PaginatedResponse } from '~/services/api/base-types/Pagination'

export default (axios: NuxtAxiosInstance) => ({
  getList (): ProductiveApiPromise<PaginatedResponse<OrganizationMembership>> {
    return axios.$get('/auth/password/forgot')
  },

  getSingle (organizationMembershipId: number): ProductiveApiPromise<OrganizationMembership> {
    return axios.$get(`organization_memberships/${organizationMembershipId}`)
  }
})
