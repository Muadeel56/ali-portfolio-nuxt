
export default defineEventHandler(async (event) => {
  const user = await verifyToken(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized.' })
  }
  return { email: user.email }
})
