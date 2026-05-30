<template>
  <div>
    <h1 class="page-title">Contact submissions</h1>
    <div class="contacts-list">
      <div v-for="c in contacts" :key="c.id" class="contact-card">
        <div class="contact-header">
          <span class="contact-name">{{ c.name }}</span>
          <span class="contact-date">{{ formatDate(c.createdAt) }}</span>
        </div>
        <a :href="`mailto:${c.email}`" class="contact-email">{{ c.email }}</a>
        <p v-if="c.service" class="contact-service">Service: {{ c.service }}</p>
        <p class="contact-message">{{ c.message }}</p>
      </div>
      <p v-if="!contacts.length" class="empty">No contact submissions yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

interface Contact {
  id: number
  name: string
  email: string
  service: string
  message: string
  createdAt: string
}

const contacts = ref<Contact[]>([])
onMounted(async () => {
  contacts.value = await $fetch<Contact[]>('/api/admin/contacts')
})
const formatDate = (s: string) => new Date(s).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
</script>

<style scoped>
.page-title {
  font-family: var(--serif);
  font-size: 1.75rem;
  color: var(--text);
  margin: 0 0 var(--space-06);
}

.contacts-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-04);
}

.contact-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: var(--space-05);
}

.contact-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--space-02);
}

.contact-name {
  font-family: var(--sans);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
}

.contact-date {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--muted);
}

.contact-email {
  font-size: 0.85rem;
  color: var(--gold);
  text-decoration: none;
  display: block;
  margin-bottom: var(--space-02);
}

.contact-service {
  font-size: 0.8rem;
  color: var(--text-dim);
  margin: 0 0 var(--space-02);
  font-family: var(--sans);
}

.contact-message {
  font-size: 0.88rem;
  color: var(--text);
  margin: 0;
  line-height: 1.6;
  white-space: pre-wrap;
  font-family: var(--sans);
}

.empty {
  color: var(--muted);
  font-size: 0.9rem;
  font-family: var(--sans);
}
</style>
