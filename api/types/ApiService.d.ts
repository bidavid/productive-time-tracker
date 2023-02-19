// Enums
import { ModelEnum } from '../models/enums/ModelEnum'

// Types
import { ModelEndpoints } from './ModelEndpoints'
import { OrganizationMembership } from '../models/organization-memberships/OrganizationMembership'
import { Person } from '../models/people/Person'
import { TimeEntry } from '../models/time-entries/TimeEntry'

export interface ApiService {
  [ModelEnum.OrganizationMemberships]: ModelEndpoints<OrganizationMembership>
  [ModelEnum.People]: ModelEndpoints<Person>
  [ModelEnum.TimeEntries]: ModelEndpoints<TimeEntry>
}
