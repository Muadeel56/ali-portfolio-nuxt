
export default defineEventHandler(async (event) => {
  if (!getRequestURL(event).pathname.startsWith('/api/admin')) return

  const user = await verifyToken(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized.' })
  }
})
