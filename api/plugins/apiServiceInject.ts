// Factories
import { Plugin } from '@nuxt/types'
import { ApiService } from '../types/ApiService'
import { createApiService } from '../createApiService'

// We have to use module augmentation
declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiService
  }
}

declare module '@nuxt/types' {
  interface Context {
    $api: ApiService
  }
}

const ApiServiceInjectPlugin: Plugin = ({ $axios }, inject) => {
  inject('api', createApiService($axios))
}

export default ApiServiceInjectPlugin
