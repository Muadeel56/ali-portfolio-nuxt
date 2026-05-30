<script setup>
import { navLinks } from '~/data/navLinks.js'

const router = useRouter()
const route = useRoute()
const timeLine = ref('')
const isScrolled = ref(false)

const SCROLL_THRESHOLD = 80

const updateTime = () => {
  const now = new Date()
  timeLine.value = now.toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Karachi',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

let timer

const onScroll = () => {
  isScrolled.value = window.scrollY >= SCROLL_THRESHOLD
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  clearInterval(timer)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="nav"
    :class="isScrolled ? 'nav--scrolled' : 'nav--transparent'"
  >
    <button type="button" class="nav__logo" @click="router.push('/')">Ali's Portfolio</button>

    <ul class="nav__links">
      <li v-for="link in navLinks" :key="link.id">
        <button
          type="button"
          class="nav__link"
          :class="{ 'nav__link--active': route.path === link.path }"
          @click="router.push(link.path)"
        >
          {{ link.label }}
        </button>
      </li>
    </ul>

    <div class="nav__right">
      <div class="nav__time">
        <b>Karachi · PKT</b>
        {{ timeLine }} — Available
      </div>
      <AppButton variant="outline" class="btn--compact" @click="router.push('/contact')">
        Book a Session
      </AppButton>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 72px;
  padding: 0 clamp(1.5rem, 5.5vw, 5rem);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  transition:
    background 200ms ease,
    border-color 200ms ease,
    backdrop-filter 200ms ease;
}

.nav--transparent {
  background: transparent;
  border-bottom: 1px solid transparent;
}

.nav--scrolled {
  background: rgba(8, 8, 8, 0.92);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.nav__logo {
  justify-self: start;
  font-family: var(--serif);
  font-style: italic;
  font-weight: 700;
  font-size: 22px;
  line-height: 1;
  color: var(--gold);
  letter-spacing: 0.01em;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: color 200ms ease;
  background: none;
  border: none;
  padding: 0;
}

.nav__logo:hover {
  color: var(--gold-light);
}

.nav__links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 40px;
  align-items: center;
  justify-self: center;
}

.nav__link {
  font-family: var(--sans);
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-dim);
  text-decoration: none;
  cursor: pointer;
  transition: color 200ms ease;
  position: relative;
  padding: 4px 0;
  border: none;
  background: none;
}

.nav__link:hover,
.nav__link--active {
  color: var(--gold);
}

.nav__link--active::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 1px;
  background: var(--gold);
}

.nav__right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  justify-self: end;
}

.nav__time {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  line-height: 1.4;
  text-align: right;
}

.nav__time b {
  color: var(--text-dim);
  font-weight: 500;
  display: block;
  font-size: 9px;
}

@media (max-width: 900px) {
  .nav {
    display: none;
  }
}
</style>
