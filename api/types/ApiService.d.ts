// Enums
import { ModelTypeEnum } from '~/api/enums/ModelType'

// Types
import { ModelEndpoints } from '~/api/types/ModelEndpoints'
import { OrganizationMembership } from '~/api/models/organization-memberships/OrganizationMembership'

export interface ApiService {
  [ModelTypeEnum.OrganizationMemberships]: ModelEndpoints<OrganizationMembership>
}
