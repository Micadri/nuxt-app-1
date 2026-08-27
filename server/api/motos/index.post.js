export default defineEventHandler(async (e) => {
  const body = await readBody(e) 

  try {
    const [result] = await db.query(
      'INSERT INTO motos (marque, modele, couleur) VALUES (?, ?, ?)',
      [body.marque, body.modele, body.couleur]
    )

    return {
      id: result.insertID,
      modele: body.modele,
      marque: body.marque,
      couleur: body.couleur
    }
  } catch(error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erreur MySQL: ${error.message}`
    })
  }
})