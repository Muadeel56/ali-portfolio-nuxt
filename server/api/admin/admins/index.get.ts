export default defineEventHandler(async () => {
  const sql = getDb()
  return sql`SELECT id, email, "createdAt" FROM admins ORDER BY id ASC`
})
