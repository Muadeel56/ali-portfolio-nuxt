export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event) ?? {}

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required.' })
  }
  if (password.length < 8) {
    throw createError({ statusCode: 400, statusMessage: 'Password must be at least 8 characters.' })
  }

  const sql = getDb()
  const existing = await sql`SELECT id FROM admins WHERE email = ${email} LIMIT 1`
  if (existing.length) {
    throw createError({ statusCode: 409, statusMessage: 'An admin with this email already exists.' })
  }

  const hash = await hashPassword(password)
  const [admin] = await sql`
    INSERT INTO admins (email, password_hash) VALUES (${email}, ${hash}) RETURNING id, email, "createdAt"
  `
  return admin
})
