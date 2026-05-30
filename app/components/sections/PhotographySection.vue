<script setup>
useScrollReveal('.photography-section .reveal')

const categories = ['All', 'Wedding', 'Portrait', 'Landscape', 'Commercial']

const photos = ref([
  { id: 1, category: 'Wedding',    type: 'wide',   plate: '01', iso: 'ISO 400 · ƒ2.8', title: 'The morning veil',     info: 'Lahore · Available light'   },
  { id: 2, category: 'Portrait',   type: 'tall',   plate: '02', iso: 'ISO 200 · ƒ1.8', title: 'Hold the silence',     info: 'Studio · 85mm · Digital'    },
  { id: 3, category: 'Wedding',    type: 'square', plate: '03', iso: 'ISO 800 · ƒ2.0', title: 'First glance',         info: 'Nikkah ceremony · Karachi'  },
  { id: 4, category: 'Commercial', type: 'square', plate: '04', iso: 'ISO 100 · ƒ4.0', title: 'Brass & smoke',        info: 'Studio strobes'             },
  { id: 5, category: 'Landscape',  type: 'wide',   plate: '05', iso: 'ISO 1600 · ƒ1.4', title: 'Before the monsoon', info: 'Lahore · Long exposure'     },
  { id: 6, category: 'Portrait',   type: 'square', plate: '06', iso: 'ISO 400 · ƒ2.0', title: 'Quiet hours',         info: 'Natural light'              },
  { id: 7, category: 'Wedding',    type: 'square', plate: '07', iso: 'ISO 1600 · ƒ1.8', title: 'Under the chandelier', info: 'Wedding hall · Islamabad' },
  { id: 8, category: 'Landscape',  type: 'square', plate: '08', iso: 'ISO 800 · ƒ5.6', title: 'Golden hour',         info: 'Margalla Hills · Islamabad' },
])

const activeFilter = ref('All')

const filtered = computed(() =>
  activeFilter.value === 'All'
    ? photos.value
    : photos.value.filter((p) => p.category === activeFilter.value),
)

const categoryCount = (cat) =>
  cat === 'All'
    ? photos.value.length
    : photos.value.filter((p) => p.category === cat).length

const lightboxOpen = ref(false)
const lightboxPhoto = ref(null)

const openLightbox = (photo) => {
  lightboxPhoto.value = photo
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const onKeydown = (e) => {
  if (e.key === 'Escape') closeLightbox()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <section id="photography" class="section photography-section">
    <div class="container">

      <!-- Header -->
      <div class="photography-section__head reveal">
        <div>
          <SectionLabel text="Portfolio" />
          <h2 class="photography-section__heading"><em>Photography</em></h2>
          <p class="photography-section__meta">
            Selected stills from <b>2019–2026</b> · 35mm · Medium format · Digital
          </p>
        </div>

        <div class="photography-section__filters" role="group" aria-label="Filter by category">
          <button
            v-for="cat in categories"
            :key="cat"
            class="photography-section__chip"
            :class="{ 'is-active': activeFilter === cat }"
            :aria-pressed="activeFilter === cat"
            @click="activeFilter = cat"
          >
            {{ cat }}
            <span class="photography-section__chip-count" aria-hidden="true">
              {{ String(categoryCount(cat)).padStart(2, '0') }}
            </span>
          </button>
        </div>
      </div>

      <Transition name="grid-fade" mode="out-in">
        <div :key="activeFilter" class="photography-section__grid reveal">
          <div
            v-for="photo in filtered"
            :key="photo.id"
            class="photography-section__tile"
            :class="`t-${photo.type}`"
            role="button"
            :tabindex="0"
            :aria-label="`Open ${photo.title}`"
            @click="openLightbox(photo)"
            @keydown.enter.prevent="openLightbox(photo)"
            @keydown.space.prevent="openLightbox(photo)"
          >
            <span class="photography-section__plate-no" aria-hidden="true">← Plate {{ photo.plate }}</span>
            <span class="photography-section__iso" aria-hidden="true">{{ photo.iso }}</span>

            <svg
              class="photography-section__ico"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              aria-hidden="true"
            >
              <rect x="6" y="16" width="52" height="36" rx="2" />
              <path d="M22 16l4-6h12l4 6" />
              <circle cx="32" cy="34" r="11" />
              <circle cx="32" cy="34" r="6" />
              <circle cx="49" cy="22" r="1.5" fill="currentColor" />
            </svg>

            <span class="tile-corner tile-corner--tl" aria-hidden="true" />
            <span class="tile-corner tile-corner--br" aria-hidden="true" />

            <div class="photography-section__ovl" aria-hidden="true">
              <div class="photography-section__tile-meta">
                <p class="photography-section__tile-cat">{{ photo.category }}</p>
                <p class="photography-section__tile-title">{{ photo.title }}</p>
                <p class="photography-section__tile-info">{{ photo.info }}</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <div class="photography-section__foot reveal">
        <span class="photography-section__count">
          <b>{{ String(filtered.length).padStart(2, '0') }}</b>
          &nbsp;/&nbsp; {{ photos.length }} plates shown
        </span>
        <button class="btn btn-outline">
          View Full Archive <span aria-hidden="true">→</span>
        </button>
      </div>

    </div>
  </section>

  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="lightboxOpen"
        class="photography-lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="lightboxPhoto?.title"
        @click="closeLightbox"
      >
        <button
          class="photography-lightbox__close"
          aria-label="Close lightbox"
          @click="closeLightbox"
        >
          ✕
        </button>

        <div class="photography-lightbox__frame" @click.stop>
          <span class="lb-corner lb-corner--tl" aria-hidden="true" />
          <span class="lb-corner lb-corner--tr" aria-hidden="true" />
          <span class="lb-corner lb-corner--bl" aria-hidden="true" />
          <span class="lb-corner lb-corner--br" aria-hidden="true" />

          <svg
            class="photography-lightbox__ico"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            stroke-width="0.75"
            aria-hidden="true"
          >
            <rect x="6" y="16" width="52" height="36" rx="2" />
            <path d="M22 16l4-6h12l4 6" />
            <circle cx="32" cy="34" r="11" />
            <circle cx="32" cy="34" r="6" />
            <circle cx="49" cy="22" r="1.5" fill="currentColor" />
          </svg>

          <div class="photography-lightbox__meta">
            <p class="photography-lightbox__cat">{{ lightboxPhoto?.category }}</p>
            <h3 class="photography-lightbox__title">{{ lightboxPhoto?.title }}</h3>
            <p class="photography-lightbox__info">
              {{ lightboxPhoto?.info }} · {{ lightboxPhoto?.iso }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.grid-fade-enter-active,
.grid-fade-leave-active {
  transition: opacity 0.25s ease;
}
.grid-fade-enter-from,
.grid-fade-leave-to {
  opacity: 0;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.photography-section__head {
  display: flex;
  flex-direction: column;
  gap: var(--space-07);
  padding-bottom: var(--space-07);
  border-bottom: 1px solid var(--border);
}

.photography-section__heading {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: 1.1;
  letter-spacing: -0.005em;
  margin: var(--space-05) 0 0;
  color: var(--text);
}

.photography-section__meta {
  font-size: 13px;
  color: var(--text-dim);
  line-height: 1.5;
  margin: var(--space-03) 0 0;
}

.photography-section__meta b {
  color: var(--gold);
  font-weight: 500;
}

.photography-section__filters {
  display: flex;
  gap: var(--space-02);
  flex-wrap: wrap;
  align-items: center;
}

.photography-section__chip {
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-dim);
  background: transparent;
  border: 1px solid var(--border);
  padding: 8px 14px;
  cursor: pointer;
  transition: border-color 200ms ease, color 200ms ease, background 200ms ease;
  line-height: 1;
  border-radius: 0;
  display: inline-flex;
  align-items: center;
  gap: var(--space-02);
}

.photography-section__chip:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.photography-section__chip.is-active {
  background: var(--gold);
  border-color: var(--gold);
  color: var(--bg);
}

.photography-section__chip-count {
  opacity: 0.55;
  font-size: 9px;
}

.photography-section__chip.is-active .photography-section__chip-count {
  opacity: 0.7;
}

.photography-section__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: var(--space-07);
}

.photography-section__tile {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: radial-gradient(80% 60% at 50% 40%, #232120 0%, #1a1a1a 60%, #131313 100%);
  color: #2a2a2a;
  cursor: pointer;
  isolation: isolate;
  outline: none;
}

.photography-section__tile:focus-visible {
  outline: 1px solid var(--gold);
  outline-offset: -2px;
}

.photography-section__tile::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.012) 0 1px,
    transparent 1px 4px
  );
  z-index: 1;
  pointer-events: none;
}

.photography-section__tile::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(closest-side at 50% 60%, transparent 35%, rgba(0, 0, 0, 0.5) 100%);
  z-index: 1;
  pointer-events: none;
}

.photography-section__ico {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  color: #2a2a2a;
  z-index: 2;
}

.photography-section__plate-no {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 8px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #2d2d2d;
  z-index: 2;
}

.photography-section__iso {
  display: none;
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #2d2d2d;
  z-index: 2;
}

.tile-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  z-index: 4;
  opacity: 0;
  transition: opacity 250ms ease;
  pointer-events: none;
}
.tile-corner--tl {
  top: 6px;
  left: 6px;
  border-top: 1px solid var(--gold);
  border-left: 1px solid var(--gold);
}
.tile-corner--br {
  bottom: 6px;
  right: 6px;
  border-bottom: 1px solid var(--gold);
  border-right: 1px solid var(--gold);
}

.photography-section__tile:hover .tile-corner,
.photography-section__tile:focus-visible .tile-corner {
  opacity: 1;
}

.photography-section__ovl {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 45%, rgba(8, 8, 8, 0.88) 100%);
  opacity: 0;
  transition: opacity 250ms ease;
  z-index: 3;
  display: flex;
  align-items: flex-end;
  padding: 14px;
}

.photography-section__tile:hover .photography-section__ovl,
.photography-section__tile:focus-visible .photography-section__ovl {
  opacity: 1;
}

.photography-section__tile-cat {
  font-weight: 500;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 6px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.photography-section__tile-cat::before {
  content: '';
  width: 12px;
  height: 1px;
  background: var(--gold);
}

.photography-section__tile-title {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2;
  color: var(--text);
  margin: 0;
}

.photography-section__tile-info {
  display: none;
  margin-top: 6px;
  font-size: 9px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.photography-section__foot {
  margin-top: var(--space-07);
  display: flex;
  flex-direction: column;
  gap: var(--space-04);
  align-items: center;
  text-align: center;
  padding-top: var(--space-05);
  border-top: 1px solid var(--border);
}

.photography-section__count {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  line-height: 1;
}

.photography-section__count b {
  color: var(--gold);
  font-weight: 500;
}

.photography-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(5, 5, 5, 0.96);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-07);
}

.photography-lightbox__close {
  position: absolute;
  top: var(--space-06);
  right: var(--space-06);
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-dim);
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 200ms ease, color 200ms ease;
  border-radius: 0;
}

.photography-lightbox__close:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.photography-lightbox__frame {
  max-width: 560px;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: radial-gradient(80% 60% at 50% 40%, #232120 0%, #1a1a1a 60%, #131313 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-06);
  border: 1px solid var(--border);
  position: relative;
}

.lb-corner {
  position: absolute;
  width: 24px;
  height: 24px;
  pointer-events: none;
}
.lb-corner--tl { top: -1px; left: -1px; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); }
.lb-corner--tr { top: -1px; right: -1px; border-top: 1px solid var(--gold); border-right: 1px solid var(--gold); }
.lb-corner--bl { bottom: -1px; left: -1px; border-bottom: 1px solid var(--gold); border-left: 1px solid var(--gold); }
.lb-corner--br { bottom: -1px; right: -1px; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); }

.photography-lightbox__ico {
  width: 56px;
  height: 56px;
  color: #3a3a3a;
}

.photography-lightbox__meta {
  text-align: center;
  padding: 0 var(--space-07);
}

.photography-lightbox__cat {
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 var(--space-03);
}

.photography-lightbox__title {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: 1.5rem;
  color: var(--text);
  margin: 0 0 var(--space-02);
}

.photography-lightbox__info {
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin: 0;
}

@media (min-width: 768px) {
  .photography-section__head {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  .photography-section__filters {
    align-items: flex-end;
  }

  .photography-section__grid {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 260px;
    gap: 16px;
  }

  .photography-section__tile {
    aspect-ratio: auto;
  }

  .photography-section__tile.t-wide {
    grid-column: span 2;
  }

  .photography-section__tile.t-tall {
    grid-row: span 2;
  }

  .photography-section__ico {
    width: 64px;
    height: 64px;
  }

  .photography-section__plate-no {
    top: 16px;
    left: 16px;
    font-size: 9px;
  }

  .photography-section__iso {
    display: block;
  }

  .tile-corner {
    width: 24px;
    height: 24px;
  }
  .tile-corner--tl { top: 8px; left: 8px; }
  .tile-corner--br { bottom: 8px; right: 8px; }

  .photography-section__ovl {
    padding: 24px 28px;
  }

  .photography-section__tile-cat {
    font-size: 10px;
    margin-bottom: 8px;
    gap: 10px;
  }
  .photography-section__tile-cat::before {
    width: 16px;
  }

  .photography-section__tile-title {
    font-size: 18px;
  }

  .photography-section__tile-info {
    display: block;
  }

  .photography-section__foot {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

@media (min-width: 900px) {
  .photography-section__grid {
    grid-auto-rows: 280px;
    gap: 16px;
  }
}
</style>
