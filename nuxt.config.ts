// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
   runtimeConfig: {
    dbHost: '77.37.35.163', //srv660.hstgr.io
    dbPort: 3306,
    dbUser: 'u868520261_nuxt',
    dbName:'u868520261_nuxt',
    dbPassword: 'NuxtCepegra11!',
    // Clé accessible uniquement côté serveur
    apiSecretToken: process.env.API_SECRET_TOKEN || 'mon-super-token-secret-123'
  }
})
