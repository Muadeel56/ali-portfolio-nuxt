
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { email, password } = body ?? {}

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required.' })
  }

  const sql = getDb()
  const [admin] = await sql`SELECT id, email, password_hash FROM admins WHERE email = ${email} LIMIT 1`

  if (!admin || !(await verifyPassword(password, admin.password_hash))) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials.' })
  }

  const token = await signToken({ email: admin.email }, config)

  setCookie(event, COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return { success: true }
})
