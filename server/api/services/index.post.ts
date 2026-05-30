export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { title, desc, tags, priceLabel, price } = body

  if (!title || !price) {
    throw createError({ statusCode: 400, statusMessage: 'Title and price are required.' })
  }

  // Persist to your database here.
  // For now, returns the created service echoed back.
  const service = {
    id: Date.now(),
    num: String(Math.floor(Math.random() * 90) + 10),
    title,
    desc: desc ?? '',
    tags: tags ?? [],
    priceLabel: priceLabel ?? 'Starting from',
    price,
  }

  return { success: true, data: service }
})
