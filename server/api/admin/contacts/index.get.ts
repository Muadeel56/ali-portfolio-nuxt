export default defineEventHandler(async () => {
  const sql = getDb()
  return sql`SELECT * FROM contacts ORDER BY "createdAt" DESC`
})
