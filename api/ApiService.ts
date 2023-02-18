// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'

// Module factories
import OrganizationMembershipsEndpointFactory from '../organization-memberships/api/endpointFactory'

interface ApiService {
  organizationMemberships: ReturnType<typeof OrganizationMembershipsEndpointFactory>
}

let instance: ApiService

const createApiService = (axios: NuxtAxiosInstance) => {
  if (!instance) {
    instance = {
      organizationMemberships: OrganizationMembershipsEndpointFactory(axios)
    }
  }

  return instance
}

export default createApiService
