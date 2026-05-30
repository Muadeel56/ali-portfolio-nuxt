<template>
  <div>
    <h1 class="page-title">Dashboard</h1>
    <div v-if="pending" class="loading">Loading…</div>
    <template v-else>
      <div class="stats-grid">
        <NuxtLink to="/admin/services" class="stat-card">
          <div class="stat-num">{{ stats.services }}</div>
          <div class="stat-label">Services</div>
        </NuxtLink>
        <NuxtLink to="/admin/videos" class="stat-card">
          <div class="stat-num">{{ stats.videos }}</div>
          <div class="stat-label">Videos</div>
        </NuxtLink>
        <NuxtLink to="/admin/contacts" class="stat-card">
          <div class="stat-num">{{ stats.contacts }}</div>
          <div class="stat-label">Contact submissions</div>
        </NuxtLink>
      </div>
      <div class="quick-links">
        <NuxtLink to="/admin/services" class="quick-link">Manage services →</NuxtLink>
        <NuxtLink to="/admin/videos" class="quick-link">Upload video →</NuxtLink>
        <NuxtLink to="/admin/contacts" class="quick-link">View contacts →</NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data, pending } = await useAsyncData('dashboard-stats', async () => {
  const [services, videos, contacts] = await Promise.all([
    $fetch<any[]>('/api/admin/services'),
    $fetch<any[]>('/api/admin/videos'),
    $fetch<any[]>('/api/admin/contacts'),
  ])
  return { services: services.length, videos: videos.length, contacts: contacts.length }
}, { server: false, default: () => ({ services: 0, videos: 0, contacts: 0 }) })

const stats = computed(() => data.value ?? { services: 0, videos: 0, contacts: 0 })
</script>

<style scoped>
.page-title {
  font-family: var(--serif);
  font-size: 1.75rem;
  color: var(--text);
  margin: 0 0 var(--space-06);
}

.loading {
  color: var(--muted);
  font-family: var(--sans);
  font-size: 0.9rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--space-04);
  margin-bottom: var(--space-07);
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: var(--space-05) var(--space-05);
  text-decoration: none;
  transition: border-color var(--transition-base);
}

.stat-card:hover {
  border-color: var(--gold);
}

.stat-num {
  font-family: var(--serif);
  font-size: 2.5rem;
  color: var(--gold);
  line-height: 1;
}

.stat-label {
  font-family: var(--sans);
  font-size: 0.85rem;
  color: var(--text-dim);
  margin-top: var(--space-02);
}

.quick-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-02);
}

.quick-link {
  font-family: var(--sans);
  font-size: 0.9rem;
  color: var(--gold);
  text-decoration: none;
  opacity: 0.8;
  transition: opacity var(--transition-base);
}

.quick-link:hover {
  opacity: 1;
}
</style>
