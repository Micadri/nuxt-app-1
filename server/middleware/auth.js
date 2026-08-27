// server/middleware/auth.js
export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  // 1. Filtrer : on ne protège QUE les méthodes de modification (POST, PUT, PATCH, DELETE) sur /api/
  const isProtectedMethod = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(event.method)
  const isApiRoute = url.pathname.startsWith('/api/')

  // Si c'est une simple lecture GET, on laisse passer tout le monde
  if (!isApiRoute || !isProtectedMethod) {
    return
  }

  // 2. Extraire le token depuis le header Authorization: Bearer <token>
  const authHeader = getRequestHeader(event, 'authorization')
  const token = authHeader?.split(' ')[1] // Récupère le texte après "Bearer "

  const config = useRuntimeConfig()

  // 3. Vérification du token
  if (!token || token !== config.apiSecretToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Accès refusé : Token d\'API invalide ou manquant.'
    })
  }
})