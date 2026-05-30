export default defineEventHandler(async (event) => {
  const { currentPassword, newPassword } = await readBody(event) ?? {}

  if (!currentPassword || !newPassword) {
    throw createError({ statusCode: 400, statusMessage: 'currentPassword and newPassword are required.' })
  }
  if (newPassword.length < 8) {
    throw createError({ statusCode: 400, statusMessage: 'New password must be at least 8 characters.' })
  }

  const user = await verifyToken(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized.' })

  const sql = getDb()
  const [admin] = await sql`SELECT id, password_hash FROM admins WHERE email = ${user.email} LIMIT 1`
  if (!admin || !(await verifyPassword(currentPassword, admin.password_hash))) {
    throw createError({ statusCode: 401, statusMessage: 'Current password is incorrect.' })
  }

  const hash = await hashPassword(newPassword)
  await sql`UPDATE admins SET password_hash = ${hash} WHERE id = ${admin.id}`
  return { success: true }
})
