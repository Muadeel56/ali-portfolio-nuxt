
export default defineEventHandler((event) => {
  deleteCookie(event, COOKIE_NAME, { path: '/' })
  return { success: true }
})
