export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return

  const { user, fetchUser } = useAuth()
  if (!user.value) await fetchUser()

  if (!user.value) {
    if (to.path !== '/admin/login') return navigateTo('/admin/login')
    return
  }

  if (to.path === '/admin/login') return navigateTo('/admin/dashboard')
})
