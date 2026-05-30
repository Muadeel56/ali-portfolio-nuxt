<template>
  <div class="admin-shell">
    <aside class="admin-sidebar">
      <div class="admin-logo">
        <NuxtLink to="/admin/dashboard">Admin</NuxtLink>
      </div>
      <nav class="admin-nav">
        <NuxtLink to="/admin/dashboard" class="admin-nav-link">Dashboard</NuxtLink>
        <NuxtLink to="/admin/services" class="admin-nav-link">Services</NuxtLink>
        <NuxtLink to="/admin/videos" class="admin-nav-link">Videos</NuxtLink>
        <NuxtLink to="/admin/contacts" class="admin-nav-link">Contacts</NuxtLink>
        <NuxtLink to="/admin/account" class="admin-nav-link">Account</NuxtLink>
      </nav>
      <div class="admin-sidebar-footer">
        <NuxtLink to="/" class="admin-nav-link muted">← View site</NuxtLink>
        <button class="admin-logout-btn" @click="logout">Logout</button>
      </div>
    </aside>
    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { logout } = useAuth()
</script>

<style scoped>
.admin-shell {
  display: flex;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
}

.admin-sidebar {
  width: 220px;
  min-height: 100vh;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: var(--space-06) var(--space-04);
  gap: var(--space-05);
  flex-shrink: 0;
}

.admin-logo a {
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--gold);
  text-decoration: none;
  letter-spacing: 0.04em;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-02);
  flex: 1;
}

.admin-nav-link {
  display: block;
  padding: var(--space-02) var(--space-03);
  border-radius: 6px;
  color: var(--text-dim);
  font-size: 0.9rem;
  font-family: var(--sans);
  text-decoration: none;
  transition: background var(--transition-base), color var(--transition-base);
}

.admin-nav-link:hover,
.admin-nav-link.router-link-active {
  background: rgba(201, 168, 76, 0.08);
  color: var(--gold);
}

.admin-nav-link.muted {
  font-size: 0.8rem;
  color: var(--muted);
}

.admin-sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: var(--space-02);
}

.admin-logout-btn {
  width: 100%;
  padding: var(--space-02) var(--space-03);
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: var(--muted);
  font-size: 0.85rem;
  font-family: var(--sans);
  cursor: pointer;
  text-align: left;
  transition: border-color var(--transition-base), color var(--transition-base);
}

.admin-logout-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.admin-main {
  flex: 1;
  padding: var(--space-07) var(--space-06);
  overflow-y: auto;
}

@media (max-width: 640px) {
  .admin-shell {
    flex-direction: column;
  }
  .admin-sidebar {
    width: 100%;
    min-height: auto;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--space-03) var(--space-04);
    gap: var(--space-03);
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  .admin-nav {
    flex-direction: row;
    flex: unset;
    gap: var(--space-02);
  }
  .admin-sidebar-footer {
    flex-direction: row;
    margin-left: auto;
    gap: var(--space-02);
  }
  .admin-main {
    padding: var(--space-05) var(--space-04);
  }
}
</style>
