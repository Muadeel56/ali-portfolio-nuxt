<template>
  <div>
    <h1 class="page-title">Services</h1>

    <!-- Add / Edit form -->
    <div class="form-card">
      <h2 class="form-title">{{ editing ? 'Edit service' : 'Add service' }}</h2>
      <form class="service-form" @submit.prevent="saveService">
        <div class="fields-row">
          <div class="field">
            <label>Title</label>
            <input v-model="form.title" type="text" required placeholder="Wedding Films" />
          </div>
          <div class="field">
            <label>Price</label>
            <input v-model="form.price" type="text" required placeholder="PKR 80,000" />
          </div>
        </div>
        <div class="field">
          <label>Description</label>
          <textarea v-model="form.description" required rows="3" placeholder="Full-day coverage…" />
        </div>
        <div class="fields-row">
          <div class="field">
            <label>Price label</label>
            <input v-model="form.priceLabel" type="text" placeholder="Starting from" />
          </div>
          <div class="field">
            <label>Tags <span class="hint">(comma-separated)</span></label>
            <input v-model="form.tagsRaw" type="text" placeholder="Drone footage, Color graded edit" />
          </div>
        </div>
        <p v-if="formError" class="error-msg">{{ formError }}</p>
        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="saving">
            {{ saving ? 'Saving…' : editing ? 'Update' : 'Add service' }}
          </button>
          <button v-if="editing" type="button" class="btn-ghost" @click="cancelEdit">Cancel</button>
        </div>
      </form>
    </div>

    <!-- List -->
    <div class="services-list">
      <div v-for="svc in services" :key="svc.id" class="service-row">
        <div class="svc-info">
          <span class="svc-num">{{ svc.num }}</span>
          <div>
            <p class="svc-title">{{ svc.title }}</p>
            <p class="svc-price">{{ svc.priceLabel }} {{ svc.price }}</p>
            <p class="svc-tags">{{ svc.tags.join(' · ') }}</p>
          </div>
        </div>
        <div class="svc-actions">
          <button class="btn-ghost small" @click="startEdit(svc)">Edit</button>
          <button class="btn-danger small" :disabled="deleting === svc.id" @click="deleteService(svc.id)">
            {{ deleting === svc.id ? '…' : 'Delete' }}
          </button>
        </div>
      </div>
      <p v-if="!services.length" class="empty">No services yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

interface Service {
  id: number
  num: string
  title: string
  description: string
  tags: string[]
  priceLabel: string
  price: string
}

const services = ref<Service[]>([])
const editing = ref<Service | null>(null)
const saving = ref(false)
const deleting = ref<number | null>(null)
const formError = ref('')

const emptyForm = () => ({ title: '', description: '', tagsRaw: '', priceLabel: 'Starting from', price: '' })
const form = reactive(emptyForm())

const load = async () => {
  services.value = await $fetch<Service[]>('/api/admin/services')
}

onMounted(load)

const saveService = async () => {
  formError.value = ''
  saving.value = true
  try {
    const payload = {
      title: form.title,
      description: form.description,
      tags: form.tagsRaw.split(',').map(t => t.trim()).filter(Boolean),
      priceLabel: form.priceLabel || 'Starting from',
      price: form.price,
    }
    if (editing.value) {
      await $fetch(`/api/admin/services/${editing.value.id}`, { method: 'PUT', body: payload })
    }
    else {
      await $fetch('/api/admin/services', { method: 'POST', body: payload })
    }
    Object.assign(form, emptyForm())
    editing.value = null
    await load()
  }
  catch (e: any) {
    formError.value = e?.data?.statusMessage ?? 'Failed to save.'
  }
  finally {
    saving.value = false
  }
}

const startEdit = (svc: Service) => {
  editing.value = svc
  form.title = svc.title
  form.description = svc.description
  form.tagsRaw = svc.tags.join(', ')
  form.priceLabel = svc.priceLabel
  form.price = svc.price
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEdit = () => {
  editing.value = null
  Object.assign(form, emptyForm())
}

const deleteService = async (id: number) => {
  if (!confirm('Delete this service?')) return
  deleting.value = id
  try {
    await $fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
    await load()
  }
  finally {
    deleting.value = null
  }
}
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
  padding: var(--space-05) var(--space-05);
  margin-bottom: var(--space-06);
}

.form-title {
  font-family: var(--sans);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-dim);
  margin: 0 0 var(--space-04);
}

.service-form {
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

.hint {
  color: var(--muted);
  font-size: 0.75rem;
}

input, textarea {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-02) var(--space-03);
  color: var(--text);
  font-family: var(--sans);
  font-size: 0.9rem;
  outline: none;
  resize: vertical;
  transition: border-color var(--transition-base);
}

input:focus, textarea:focus {
  border-color: var(--gold);
}

.form-actions {
  display: flex;
  gap: var(--space-03);
  align-items: center;
}

.btn-primary {
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

.btn-ghost {
  padding: var(--space-02) var(--space-04);
  background: transparent;
  color: var(--text-dim);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-family: var(--sans);
  font-size: 0.88rem;
  cursor: pointer;
  transition: border-color var(--transition-base), color var(--transition-base);
}

.btn-ghost:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.btn-ghost.small { padding: 4px 12px; font-size: 0.8rem; }

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

.error-msg {
  color: #e06060;
  font-size: 0.85rem;
  margin: 0;
}

.services-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-03);
}

.service-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: var(--space-04) var(--space-05);
  gap: var(--space-04);
}

.svc-info {
  display: flex;
  gap: var(--space-04);
  align-items: flex-start;
}

.svc-num {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--muted);
  padding-top: 2px;
}

.svc-title {
  font-family: var(--sans);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
}

.svc-price {
  font-size: 0.8rem;
  color: var(--gold);
  margin: 2px 0 0;
  font-family: var(--sans);
}

.svc-tags {
  font-size: 0.75rem;
  color: var(--muted);
  margin: 2px 0 0;
  font-family: var(--sans);
}

.svc-actions {
  display: flex;
  gap: var(--space-02);
  flex-shrink: 0;
}

.empty {
  color: var(--muted);
  font-size: 0.9rem;
  font-family: var(--sans);
}

@media (max-width: 640px) {
  .fields-row { grid-template-columns: 1fr; }
  .service-row { flex-direction: column; align-items: flex-start; }
}
</style>
