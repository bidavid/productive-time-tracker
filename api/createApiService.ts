// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { ModelEnum } from './models/enums/ModelEnum'
import { ApiService } from './types/ApiService'

// Model factories
import OrganizationMembershipsEndpointFactory from './models/organization-memberships/createEndpoints'
import PeopleEndpointFactory from './models/people/createEndpoints'
import TimeEntriesEndpointFactory from './models/time-entries/createEndpoints'

let instance: ApiService

export const createApiService = (axios: NuxtAxiosInstance) => {
  if (!instance) {
    instance = {
      [ModelEnum.OrganizationMemberships]:
        OrganizationMembershipsEndpointFactory(axios),
      [ModelEnum.People]: PeopleEndpointFactory(axios),
      [ModelEnum.TimeEntries]: TimeEntriesEndpointFactory(axios)
    }
  }

  return instance
}
