export const useAuth = () => {
  const user = useState<{ email: string } | null>('auth:user', () => null)

  const login = async (email: string, password: string) => {
    await $fetch('/api/auth/login', { method: 'POST', body: { email, password } })
    const me = await $fetch<{ email: string }>('/api/auth/me')
    user.value = me
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    await navigateTo('/admin/login')
  }

  const fetchUser = async () => {
    try {
      user.value = await $fetch<{ email: string }>('/api/auth/me')
    }
    catch {
      user.value = null
    }
  }

  const isAdmin = computed(() => !!user.value)

  return { user, isAdmin, login, logout, fetchUser }
}
