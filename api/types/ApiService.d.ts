// Enums
import { EntityTypeEnum } from '~/api/enums/EntityType'

// Types
import { ModelEndpoints } from '~/api/types/ModelEndpoints'
import { OrganizationMembership } from '~/api/models/organization-memberships/OrganizationMembership'

export interface ApiService {
  [EntityTypeEnum.OrganizationMemberships]: ModelEndpoints<OrganizationMembership>
}
