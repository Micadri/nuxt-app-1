export default defineEventHandler(async (event) => {
  // 1. Lire le body de la requête POST
  const body = await readBody(event)

  // Sécurité supplémentaire : vérifier que le body existe bien
  if (!body) {
    throw createError({ statusCode: 400, statusMessage: 'Body manquant' })
  }

  const login = body.login?.trim()
  const pass = body.pass?.trim()

  // 2. Ajout du mot-clé 'if'
  if (!login || !pass) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Champs manquants : login et pass sont obligatoires'
    })
  }

  try {
    // 3. Utilisation des variables nettoyées 'login' et 'pass'
    const [rows] = await db.query(
      'SELECT * FROM users WHERE login = ? AND pass = ?',
      [login, pass]
    )

    if (rows.length > 0) {
      return { message: 'ok' }
    } else {
      return { message: 'pas ok' }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erreur MySQL: ${error.message}`
    })
  }
})