import { SignJWT, jwtVerify } from 'jose'
import { getCookie } from 'h3'
import type { H3Event } from 'h3'

const COOKIE_NAME = 'admin_token'
const EXPIRY = '7d'

function getSecret(config: ReturnType<typeof useRuntimeConfig>) {
  return new TextEncoder().encode(config.jwtSecret as string)
}

export async function signToken(payload: Record<string, string>, config: ReturnType<typeof useRuntimeConfig>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(getSecret(config))
}

export async function verifyToken(event: H3Event): Promise<{ email: string } | null> {
  const config = useRuntimeConfig()
  const token = getCookie(event, COOKIE_NAME)
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecret(config))
    return payload as { email: string }
  }
  catch {
    return null
  }
}

export { COOKIE_NAME }
