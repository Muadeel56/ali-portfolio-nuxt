<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">Admin Login</h1>
      <form class="login-form" @submit.prevent="submit">
        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="admin@example.com"
            required
            autocomplete="username"
          />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            required
            autocomplete="current-password"
          />
        </div>
        <p v-if="error" class="error-msg">{{ error }}</p>
        <button type="submit" class="submit-btn" :disabled="loading">
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false, middleware: 'admin' })

const { login } = useAuth()
const form = reactive({ email: '', password: '' })
const loading = ref(false)
const error = ref('')

const submit = async () => {
  error.value = ''
  loading.value = true
  try {
    await login(form.email, form.password)
    await navigateTo('/admin/dashboard')
  }
  catch (e: any) {
    error.value = e?.data?.statusMessage ?? 'Login failed.'
  }
  finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-05);
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: var(--space-07) var(--space-06);
}

.login-title {
  font-family: var(--serif);
  font-size: 1.75rem;
  color: var(--gold);
  margin: 0 0 var(--space-06);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-04);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-01);
}

label {
  font-size: 0.85rem;
  color: var(--text-dim);
  font-family: var(--sans);
}

input {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-03) var(--space-03);
  color: var(--text);
  font-family: var(--sans);
  font-size: 0.95rem;
  outline: none;
  transition: border-color var(--transition-base);
}

input:focus {
  border-color: var(--gold);
}

.error-msg {
  color: #e06060;
  font-size: 0.85rem;
  margin: 0;
}

.submit-btn {
  margin-top: var(--space-02);
  padding: var(--space-03) var(--space-04);
  background: var(--gold);
  color: #000;
  border: none;
  border-radius: 8px;
  font-family: var(--sans);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity var(--transition-base);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
