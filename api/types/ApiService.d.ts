// Enums
import { ModelEnum } from '../models/enums/ModelEnum'

// Models
import { OrganizationMembershipModelEndpoints } from '~/api/models/organization-memberships/OrganizationMembershipModelEndpoints'
import { PersonModelEndpoints } from '~/api/models/people/PersonModelEndpoints'
import { ServiceModelEndpoints } from '~/api/models/services/ServiceModelEndpoints'
import { TimeEntryModelEndpoints } from '~/api/models/time-entries/TimeEntryModelEndpoints'

export interface ApiService {
  [ModelEnum.OrganizationMemberships]: OrganizationMembershipModelEndpoints
  [ModelEnum.People]: PersonModelEndpoints
  [ModelEnum.Services]: ServiceModelEndpoints
  [ModelEnum.TimeEntries]: TimeEntryModelEndpoints
}
