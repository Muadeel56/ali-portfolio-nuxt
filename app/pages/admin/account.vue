<template>
  <div>
    <h1 class="page-title">Account</h1>

    <!-- Change password -->
    <div class="form-card">
      <h2 class="form-title">Change password</h2>
      <form class="form" @submit.prevent="changePassword">
        <div class="field">
          <label>Current password</label>
          <input v-model="pw.current" type="password" required autocomplete="current-password" />
        </div>
        <div class="field">
          <label>New password <span class="hint">(min 8 characters)</span></label>
          <input v-model="pw.next" type="password" required autocomplete="new-password" />
        </div>
        <div class="field">
          <label>Confirm new password</label>
          <input v-model="pw.confirm" type="password" required autocomplete="new-password" />
        </div>
        <p v-if="pwError" class="error-msg">{{ pwError }}</p>
        <p v-if="pwSuccess" class="success-msg">Password changed successfully.</p>
        <button type="submit" class="btn-primary" :disabled="pwSaving">
          {{ pwSaving ? 'Saving…' : 'Update password' }}
        </button>
      </form>
    </div>

    <!-- Admin users -->
    <div class="form-card">
      <h2 class="form-title">Admin users</h2>
      <div class="admins-list">
        <div v-for="a in admins" :key="a.id" class="admin-row">
          <div>
            <p class="admin-email">{{ a.email }}</p>
            <p class="admin-date">Added {{ formatDate(a.createdAt) }}</p>
          </div>
          <button
            v-if="admins.length > 1"
            class="btn-danger small"
            :disabled="deleting === a.id"
            @click="deleteAdmin(a.id)"
          >
            {{ deleting === a.id ? '…' : 'Remove' }}
          </button>
        </div>
      </div>

      <h3 class="sub-title">Add admin</h3>
      <form class="form" @submit.prevent="addAdmin">
        <div class="fields-row">
          <div class="field">
            <label>Email</label>
            <input v-model="newAdmin.email" type="email" required placeholder="new@example.com" />
          </div>
          <div class="field">
            <label>Password <span class="hint">(min 8 characters)</span></label>
            <input v-model="newAdmin.password" type="password" required />
          </div>
        </div>
        <p v-if="addError" class="error-msg">{{ addError }}</p>
        <p v-if="addSuccess" class="success-msg">Admin added successfully.</p>
        <button type="submit" class="btn-primary" :disabled="addSaving">
          {{ addSaving ? 'Adding…' : 'Add admin' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

interface Admin { id: number; email: string; createdAt: string }

const admins = ref<Admin[]>([])
const deleting = ref<number | null>(null)

const pw = reactive({ current: '', next: '', confirm: '' })
const pwSaving = ref(false)
const pwError = ref('')
const pwSuccess = ref(false)

const newAdmin = reactive({ email: '', password: '' })
const addSaving = ref(false)
const addError = ref('')
const addSuccess = ref(false)

onMounted(async () => {
  try {
    admins.value = await $fetch<Admin[]>('/api/admin/admins')
  }
  catch (e: any) {
    if (e?.status === 401 || e?.response?.status === 401) await navigateTo('/admin/login')
  }
})

const changePassword = async () => {
  pwError.value = ''
  pwSuccess.value = false
  if (pw.next !== pw.confirm) { pwError.value = 'New passwords do not match.'; return }
  pwSaving.value = true
  try {
    await $fetch('/api/admin/admins/change-password', {
      method: 'POST',
      body: { currentPassword: pw.current, newPassword: pw.next },
    })
    pw.current = ''; pw.next = ''; pw.confirm = ''
    pwSuccess.value = true
  }
  catch (e: any) { pwError.value = e?.data?.statusMessage ?? 'Failed to change password.' }
  finally { pwSaving.value = false }
}

const addAdmin = async () => {
  addError.value = ''
  addSuccess.value = false
  addSaving.value = true
  try {
    const admin = await $fetch<Admin>('/api/admin/admins', {
      method: 'POST',
      body: { email: newAdmin.email, password: newAdmin.password },
    })
    admins.value.push(admin)
    newAdmin.email = ''; newAdmin.password = ''
    addSuccess.value = true
  }
  catch (e: any) { addError.value = e?.data?.statusMessage ?? 'Failed to add admin.' }
  finally { addSaving.value = false }
}

const deleteAdmin = async (id: number) => {
  if (!confirm('Remove this admin?')) return
  deleting.value = id
  try {
    await $fetch(`/api/admin/admins/${id}`, { method: 'DELETE' })
    admins.value = admins.value.filter(a => a.id !== id)
  }
  catch (e: any) { alert(e?.data?.statusMessage ?? 'Failed to remove admin.') }
  finally { deleting.value = null }
}

const formatDate = (s: string) => new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
</script>

<style scoped>
.page-title {
  font-family: var(--serif);
  font-size: 1.75rem;
  color: var(--text);
  margin: 0 0 var(--space-06);
}

.form-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: var(--space-05);
  margin-bottom: var(--space-06);
}

.form-title {
  font-family: var(--sans);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-dim);
  margin: 0 0 var(--space-04);
}

.sub-title {
  font-family: var(--sans);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-dim);
  margin: var(--space-05) 0 var(--space-03);
  padding-top: var(--space-05);
  border-top: 1px solid var(--border);
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-04);
}

.fields-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-04);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-01);
}

label {
  font-size: 0.82rem;
  color: var(--text-dim);
  font-family: var(--sans);
}

.hint { color: var(--muted); font-size: 0.75rem; }

input {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-02) var(--space-03);
  color: var(--text);
  font-family: var(--sans);
  font-size: 0.9rem;
  outline: none;
  transition: border-color var(--transition-base);
}

input:focus { border-color: var(--gold); }

.btn-primary {
  align-self: flex-start;
  padding: var(--space-02) var(--space-05);
  background: var(--gold);
  color: #000;
  border: none;
  border-radius: 8px;
  font-family: var(--sans);
  font-weight: 700;
  font-size: 0.88rem;
  cursor: pointer;
}

.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-danger {
  padding: var(--space-02) var(--space-04);
  background: transparent;
  color: #e06060;
  border: 1px solid #e06060;
  border-radius: 8px;
  font-family: var(--sans);
  font-size: 0.88rem;
  cursor: pointer;
}

.btn-danger.small { padding: 4px 12px; font-size: 0.8rem; }
.btn-danger:disabled { opacity: 0.5; cursor: not-allowed; }

.error-msg { color: #e06060; font-size: 0.85rem; margin: 0; }
.success-msg { color: #60c080; font-size: 0.85rem; margin: 0; }

.admins-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-02);
  margin-bottom: var(--space-02);
}

.admin-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-03) var(--space-04);
  gap: var(--space-04);
}

.admin-email {
  font-family: var(--sans);
  font-size: 0.9rem;
  color: var(--text);
  margin: 0;
}

.admin-date {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--muted);
  margin: 2px 0 0;
}

@media (max-width: 640px) {
  .fields-row { grid-template-columns: 1fr; }
}
</style>
