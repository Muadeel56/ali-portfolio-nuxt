export default defineEventHandler(async () => {
  const sql = getDb()
  const rows = await sql`SELECT * FROM services ORDER BY id ASC`
  return rows.map(s => ({ ...s, tags: Array.isArray(s.tags) ? s.tags : JSON.parse(s.tags as string) }))
})
