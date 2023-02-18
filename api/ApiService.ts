// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'

// Module factories
import { OrganizationMembershipsEndpointFactory } from '../entities/organization-memberships/api/endpointFactory'

export interface ApiService {
  organizationMemberships: ReturnType<typeof OrganizationMembershipsEndpointFactory>
}

let instance: ApiService

export const createApiService = (axios: NuxtAxiosInstance) => {
  if (!instance) {
    instance = {
      organizationMemberships: OrganizationMembershipsEndpointFactory(axios)
    }
  }

  return instance
}
