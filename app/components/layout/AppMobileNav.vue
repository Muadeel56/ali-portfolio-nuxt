<script setup>
import { navLinks } from '~/data/navLinks.js'

const router = useRouter()
const route = useRoute()
const isOpen = ref(false)
const timeLine = ref('')

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

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const navigate = (path) => {
  router.push(path)
  close()
}

const onKeydown = (e) => {
  if (e.key === 'Escape' && isOpen.value) close()
}

watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  clearInterval(timer)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="mobile-nav" :class="{ 'mobile-nav--open': isOpen }">
    <nav class="mobile-nav__bar">
      <button type="button" class="mobile-nav__logo" @click="navigate('/')">Ali's Portfolio</button>

      <button
        type="button"
        class="mobile-nav__hamburger"
        :class="{ 'mobile-nav__hamburger--open': isOpen }"
        :aria-expanded="isOpen"
        aria-controls="mobile-menu"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
        @click="toggle"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>

    <Transition name="menu">
      <div v-if="isOpen" id="mobile-menu" class="mobile-nav__menu">
        <p class="mobile-nav__eyebrow">Menu · 05</p>

        <ul class="mobile-nav__links">
          <li v-for="link in navLinks" :key="link.id">
            <button
              type="button"
              class="mobile-nav__link"
              :class="{ 'mobile-nav__link--active': route.path === link.path }"
              @click="navigate(link.path)"
            >
              {{ link.label }}
            </button>
          </li>
        </ul>

        <div class="mobile-nav__cta-wrap">
          <AppButton variant="outline" class="mobile-nav__cta" show-arrow @click="navigate('/contact')">
            Book a Session
          </AppButton>
          <div class="mobile-nav__foot">
            <span><b>Karachi</b> · {{ timeLine }}</span>
            <span>Available · Q3 26</span>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.mobile-nav {
  display: none;
}

@media (max-width: 900px) {
  .mobile-nav {
    display: block;
  }
}

.mobile-nav__bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 110;
  height: 64px;
  padding: 0 24px;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobile-nav__logo {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 700;
  font-size: 20px;
  line-height: 1;
  color: var(--gold);
  letter-spacing: 0.01em;
  white-space: nowrap;
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.mobile-nav__hamburger {
  width: 24px;
  height: 14px;
  position: relative;
  cursor: pointer;
  background: transparent;
  border: 0;
  padding: 0;
}

.mobile-nav__hamburger span {
  position: absolute;
  left: 0;
  width: 24px;
  height: 1px;
  background: var(--gold);
  transition: all 250ms ease;
}

.mobile-nav__hamburger span:nth-child(1) {
  top: 0;
}

.mobile-nav__hamburger span:nth-child(2) {
  top: 7px;
}

.mobile-nav__hamburger span:nth-child(3) {
  top: 14px;
}

.mobile-nav__hamburger--open span:nth-child(1) {
  top: 7px;
  transform: rotate(45deg);
}

.mobile-nav__hamburger--open span:nth-child(2) {
  opacity: 0;
}

.mobile-nav__hamburger--open span:nth-child(3) {
  top: 7px;
  transform: rotate(-45deg);
}

.mobile-nav__menu {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 109;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  background: var(--bg);
  overflow: hidden;
}

.mobile-nav__menu::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 255, 255, 0.018) 1px,
    transparent 0
  );
  background-size: 24px 24px;
  pointer-events: none;
}

.mobile-nav__eyebrow {
  margin: 24px 0 0;
  font-family: var(--sans);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--gold);
  display: inline-flex;
  align-items: center;
  gap: 12px;
  align-self: flex-start;
  position: relative;
  z-index: 2;
}

.mobile-nav__eyebrow::after {
  content: '';
  width: 32px;
  height: 1px;
  background: var(--gold);
}

.mobile-nav__links {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  position: relative;
  z-index: 2;
}

.mobile-nav__link {
  font-family: var(--sans);
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.2em;
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

.mobile-nav__link:hover,
.mobile-nav__link--active {
  color: var(--gold);
}

.mobile-nav__link--active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 1px;
  background: var(--gold);
}

.mobile-nav__cta-wrap {
  padding: 24px 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-top: 1px solid var(--border);
  position: relative;
  z-index: 2;
}

.mobile-nav__cta {
  width: 100%;
}

.mobile-nav__foot {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
}

.mobile-nav__foot b {
  color: var(--text-dim);
  font-weight: 500;
}

.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 250ms ease,
    transform 250ms ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
