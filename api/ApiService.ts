// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { ModelTypeEnum } from './enums/ModelType'
import { ApiService } from '~/api/types/ApiService'

// Module factories
import OrganizationMembershipsEndpointFactory from '~/api/models/organization-memberships/createEndpoints'

let instance: ApiService

export const createApiService = (axios: NuxtAxiosInstance) => {
  if (!instance) {
    instance = {
      [ModelTypeEnum.OrganizationMemberships]: OrganizationMembershipsEndpointFactory(axios)
    }
  }

  return instance
}
