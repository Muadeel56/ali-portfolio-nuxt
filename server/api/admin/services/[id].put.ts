export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)
  const { title, description, tags, priceLabel, price } = body ?? {}

  if (!title || !description || !price) {
    throw createError({ statusCode: 400, statusMessage: 'title, description, and price are required.' })
  }

  const sql = getDb()
  const existing = await sql`SELECT id FROM services WHERE id = ${id}`
  if (!existing.length) throw createError({ statusCode: 404, statusMessage: 'Service not found.' })

  const tagsArr = Array.isArray(tags) ? tags : (tags ?? '').split(',').map((t: string) => t.trim()).filter(Boolean)

  const [service] = await sql`
    UPDATE services
    SET title = ${title}, description = ${description}, tags = ${sql.json(tagsArr)},
        "priceLabel" = ${priceLabel ?? 'Starting from'}, price = ${price}
    WHERE id = ${id}
    RETURNING *
  `
  return service
})
