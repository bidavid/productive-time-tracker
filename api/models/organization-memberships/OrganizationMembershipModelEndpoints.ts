import { ModelEndpoints } from '~/api/types/ModelEndpoints'
import { OrganizationMembership } from '~/api/models/organization-memberships/OrganizationMembership'

export type OrganizationMembershipModelEndpoints = Pick<
  ModelEndpoints<OrganizationMembership>,
  'getList' | 'getSingle'
>
