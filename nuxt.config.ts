// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        style: 'background-color: #313338;'
      }
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/icon',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
