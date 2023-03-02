// Types
import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { ServiceModelEndpoints } from '~/api/models/services/ServiceModelEndpoints'

// Every endpoint factory has to return ModelEndpoints type
export default (axios: NuxtAxiosInstance): ServiceModelEndpoints => ({
  // Return types can now be omitted but let's keep them
  getList(params) {
    return axios.$get('services', {
      params
    })
  },

  getSingle(id) {
    return axios.$get(`services/${id}`)
  }
})
