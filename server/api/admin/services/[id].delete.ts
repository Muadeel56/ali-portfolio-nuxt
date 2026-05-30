export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const sql = getDb()

  const existing = await sql`SELECT id FROM services WHERE id = ${id}`
  if (!existing.length) throw createError({ statusCode: 404, statusMessage: 'Service not found.' })

  await sql`DELETE FROM services WHERE id = ${id}`
  return { success: true }
})
