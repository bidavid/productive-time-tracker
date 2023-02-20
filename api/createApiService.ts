// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { ModelEnum } from './models/enums/ModelEnum'
import { ApiService } from './types/ApiService'

// Model factories
import OrganizationMembershipsEndpointFactory from './models/organization-memberships/createEndpoints'
import PeopleEndpointFactory from './models/people/createEndpoints'
import TimeEntriesEndpointFactory from './models/time-entries/createEndpoints'
import ServicesEndpointFactory from './models/services/createEndpoints'

let instance: ApiService

export const createApiService = (axios: NuxtAxiosInstance) => {
  if (!instance) {
    instance = {
      [ModelEnum.OrganizationMemberships]:
        OrganizationMembershipsEndpointFactory(axios),
      [ModelEnum.People]: PeopleEndpointFactory(axios),
      [ModelEnum.Services]: ServicesEndpointFactory(axios),
      [ModelEnum.TimeEntries]: TimeEntriesEndpointFactory(axios)
    }
  }

  return instance
}
