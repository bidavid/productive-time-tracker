// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { ModelEnum } from './enums/ModelEnum'
import { ApiService } from './types/ApiService'

// Module factories
import OrganizationMembershipsEndpointFactory from './models/organization-memberships/createEndpoints'

let instance: ApiService

export const createApiService = (axios: NuxtAxiosInstance) => {
  if (!instance) {
    instance = {
      [ModelEnum.OrganizationMemberships]: OrganizationMembershipsEndpointFactory(axios)

    }
  }

  return instance
}
