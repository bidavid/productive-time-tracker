// Enums
import { ModelEnum } from '../models/enums/ModelEnum'

// Types
import { ModelEndpoints } from './ModelEndpoints'

// Models
import { OrganizationMembership } from '../models/organization-memberships/OrganizationMembership'
import { Person } from '../models/people/Person'
import { TimeEntry, TimeEntryFilters } from '../models/time-entries/TimeEntry'
import { Service } from '../models/services/Service'

export interface ApiService {
  [ModelEnum.OrganizationMemberships]: ModelEndpoints<OrganizationMembership>
  [ModelEnum.People]: ModelEndpoints<Person>
  [ModelEnum.Services]: ModelEndpoints<Service>
  [ModelEnum.TimeEntries]: ModelEndpoints<TimeEntry, TimeEntryFilters>
}
