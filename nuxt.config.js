export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cantina-church',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  serverMiddleware: [
    { path: '/api', handler: '~/api/routes.js' }
  ],
  css: [
  ],
  plugins: [
    '~/plugin/api-client.js'
  ],
  components: true,
  buildModules: [
    'bootstrap-vue/nuxt',
  ],
  modules: [
    'bootstrap-vue/nuxt',
  ],
  build: {
  }
}
