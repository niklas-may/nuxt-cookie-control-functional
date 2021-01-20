export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Nuxt Cookie Control Functional',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  components: false,
  buildModules: [
    [
      '@/modules/nuxt-cookie-control',
      {
        css: false,
        cssPolyfill: false,
        colors: false,
        locales: ['de'],
        blockIframe: true,
        controlButton: false,
      },
    ],
  ],

}
