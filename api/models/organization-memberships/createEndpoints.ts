// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { OrganizationMembershipModelEndpoints } from '~/api/models/organization-memberships/OrganizationMembershipModelEndpoints'

// Every endpoint factory has to return ModelEndpoints type
export default (
  axios: NuxtAxiosInstance
): OrganizationMembershipModelEndpoints => ({
  // Return types can now be omitted but let's keep them
  getList(params) {
    return axios.$get('organization_memberships', {
      params
    })
  },

  getSingle(id) {
    return axios.$get(`organization_memberships/${id}`)
  }
})
