// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { EntityTypeEnum } from './enums/EntityType'
import { ApiService } from '~/api/types/ApiService'

// Module factories
import OrganizationMembershipsEndpointFactory from '~/api/models/organization-memberships/createEndpoints'

let instance: ApiService

export const createApiService = (axios: NuxtAxiosInstance) => {
  if (!instance) {
    instance = {
      [EntityTypeEnum.OrganizationMemberships]: OrganizationMembershipsEndpointFactory(axios)
    }
  }

  return instance
}
