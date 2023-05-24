// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    modules: [
      'nuxt-swiper',
      [
        '@pinia/nuxt',
        {
          autoImports: ['defineStore', 'acceptHMRUpdate'],
        },
      ]
    ],
    swiper: {
      // Swiper options
      //----------------------
      // prefix: 'Swiper',
      styleLang: 'css',
      modules: ['autoplay','navigation', 'pagination', 'effect-fade'],
    },
    app:{
      head:{
        link:[
          {
            href:'https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css',
            rel: 'stylesheet'
          }
        ]
      }
    }
})
