// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  ssr: true,

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/wanderlust',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    apiSecretKey: process.env.API_SECRET_KEY || 'wanderlust_super_secret_dev_key_2026',
    public: {
      appName: 'Wanderlust',
    },
  },

  css: ['~/assets/css/main.css'],
});
