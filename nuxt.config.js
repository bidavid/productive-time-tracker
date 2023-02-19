const { API_BASE_URL, PERSONAL_ACCESS_TOKEN, ORGANIZATION_ID } = process.env

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'productive-time-tracker',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/toast'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vuelidate.js',
    '~/plugins/apiServiceInject.ts'
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/tailwind-preflight.css',
    '~/assets/styles/typography.css',
    '~/assets/styles/global.css',
    '~/assets/icons/icons.css'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: API_BASE_URL,
    headers: {
      // TODO: HARDCODED, CREATE AUTHENTICATION LATER
      common: {
        'Content-type': 'application/vnd.api+json',
        'X-Auth-Token': PERSONAL_ACCESS_TOKEN,
        'X-Organization-Id': ORGANIZATION_ID
      }
    }
  },

  publicRuntimeConfig: { API_BASE_URL },

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue,css,scss,html}'
      }
    }
  },

  toast: {
    position: 'bottom-center',
    duration: 2500,
    keepOnHover: true,
    theme: 'bubble'
  }
}
