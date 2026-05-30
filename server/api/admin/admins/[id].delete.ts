export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const sql = getDb()

  const [{ count }] = await sql`SELECT COUNT(*) as count FROM admins`
  if (Number(count) <= 1) {
    throw createError({ statusCode: 400, statusMessage: 'Cannot delete the last admin account.' })
  }

  const result = await sql`DELETE FROM admins WHERE id = ${id} RETURNING id`
  if (!result.length) {
    throw createError({ statusCode: 404, statusMessage: 'Admin not found.' })
  }
  return { success: true }
})
