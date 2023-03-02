// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { PersonModelEndpoints } from '~/api/models/people/PersonModelEndpoints'

// Every endpoint factory has to return ModelEndpoints type
export default (axios: NuxtAxiosInstance): PersonModelEndpoints => ({
  // Return types can now be omitted but let's keep them
  getList(params) {
    return axios.$get('people', {
      params
    })
  },

  getSingle(id) {
    return axios.$get(`people/${id}`)
  }
})
