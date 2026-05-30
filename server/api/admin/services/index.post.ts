export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { title, description, tags, priceLabel, price } = body ?? {}

  if (!title || !description || !price) {
    throw createError({ statusCode: 400, statusMessage: 'title, description, and price are required.' })
  }

  const sql = getDb()
  const [{ count }] = await sql`SELECT COUNT(*) as count FROM services`
  const num = String(Number(count) + 1).padStart(2, '0')
  const tagsArr = Array.isArray(tags) ? tags : (tags ?? '').split(',').map((t: string) => t.trim()).filter(Boolean)

  const [service] = await sql`
    INSERT INTO services (num, title, description, tags, "priceLabel", price)
    VALUES (${num}, ${title}, ${description}, ${JSON.stringify(tagsArr)}, ${priceLabel ?? 'Starting from'}, ${price})
    RETURNING *
  `
  return service
})
