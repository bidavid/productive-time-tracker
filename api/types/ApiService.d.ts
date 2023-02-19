// Enums
import { ModelEnum } from '../models/enums/ModelEnum'

// Types
import { ModelEndpoints } from './ModelEndpoints'
import { OrganizationMembership } from '../models/organization-memberships/OrganizationMembership'

export interface ApiService {
  [ModelEnum.OrganizationMemberships]: ModelEndpoints<OrganizationMembership>
}
