export default defineEventHandler(async () => {
  const sql = getDb()
  return sql`SELECT * FROM services ORDER BY id ASC`
})
