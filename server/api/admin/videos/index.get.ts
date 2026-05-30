export default defineEventHandler(async () => {
  const sql = getDb()
  return sql`SELECT * FROM videos ORDER BY "uploadedAt" DESC`
})
