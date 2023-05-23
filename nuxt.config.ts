// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    modules: ['nuxt-swiper'],
    swiper: {
      // Swiper options
      //----------------------
      // prefix: 'Swiper',
      styleLang: 'css',
      modules: ['autoplay','navigation', 'pagination', 'effect-fade'],
    }
})
