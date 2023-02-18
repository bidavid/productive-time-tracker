// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'

// Module factories
import OrganizationMemberships from './modules/organization-memberships/endpointFactory'

interface ApiService {
  organizationMemberships: ReturnType<typeof OrganizationMemberships>
}

let instance: ApiService

const createApiService = (axios: NuxtAxiosInstance) => {
  if (!instance) {
    instance = {
      organizationMemberships: OrganizationMemberships(axios)
    }
  }

  return instance
}

export default createApiService
