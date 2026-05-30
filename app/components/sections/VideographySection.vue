<script setup>
useScrollReveal('.videography-section .reveal')

const stats = [
  { value: '42', label: 'Films' },
  { value: '09', label: 'Awards' },
  { value: '4K', label: 'Native' },
]

const s3 = 'https://ali-portfolio-vue.s3.ap-south-1.amazonaws.com/ali-portfolio-assets'

const videos = ref([
  { id: 1,  plate: 'Reel A · 01', category: 'Wedding Films',  title: 'Premier Highlight',       sub: '2026 · Cinematic',    src: `${s3}/Premier+highlight+Final.mp4` },
  { id: 2,  plate: 'Reel A · 02', category: 'Wedding Films',  title: 'Kudsiya Song',             sub: '2026 · Cinematic',    src: `${s3}/Kudsiya+Song.mp4` },
  { id: 3,  plate: 'Reel A · 03', category: 'Wedding Films',  title: '2nd Reel',                 sub: '2026 · Cinematic',    src: `${s3}/2nd+Reel-.mp4` },
  { id: 4,  plate: 'Reel B · 04', category: 'Documentary',    title: 'Talha Success Story',      sub: '2026 · Documentary',  src: `${s3}/Talha+Success+Story+final.mp4` },
  { id: 5,  plate: 'Reel B · 05', category: 'Documentary',    title: 'Film',                     sub: '2026 · Documentary',  src: `${s3}/1.mp4` },
  { id: 6,  plate: 'Reel B · 06', category: 'Documentary',    title: 'Dr. Shandana',             sub: '2026 · Documentary',  src: `${s3}/Dr+Shandana+v4.mp4` },
  { id: 7,  plate: 'Reel B · 07', category: 'Documentary',    title: 'Breast Cancer Awareness',  sub: '2026 · Documentary',  src: `${s3}/Breast+Cancer+re.mp4` },
  { id: 8,  plate: 'Reel B · 08', category: 'Documentary',    title: 'Final Film',               sub: '2026 · Documentary',  src: `${s3}/Final+Video.mp4` },
  { id: 9,  plate: 'Reel C · 09', category: 'Commercial',     title: 'Clothing Brand Shoot',     sub: '2026 · Commercial',   src: `${s3}/3.Shoot+for+Clothing+brand+.mp4` },
  { id: 10, plate: 'Reel C · 10', category: 'Commercial',     title: 'Shoot For Khals',          sub: '2026 · Commercial',   src: `${s3}/2.Shoot+For+khals+.mp4` },
  { id: 11, plate: 'Reel C · 11', category: 'Commercial',     title: 'Clothing Brand',           sub: '2026 · Commercial',   src: `${s3}/4.Clothing+Brand+.mp4` },
  { id: 12, plate: 'Reel C · 12', category: 'Commercial',     title: 'Emaaraat Developers',      sub: '2026 · Commercial',   src: `${s3}/5.Emaaraat+Developers+.mp4` },
])

const showreel = ref({
  hud: { left: 'Reel · 2026', leftSub: 'ARRI Alexa Mini · Cooke S4', right: '04:32 · 4K', rightSub: '● Rec · 23.976' },
  title: 'A year, in motion.',
  meta: '2025 – 2026 reel cut',
})

const isPlaying = ref(false)
const activeVideo = ref(null)

const play = (src = null) => {
  activeVideo.value = src
  isPlaying.value = true
}
</script>

<template>
  <section id="videography" class="section videography-section">
    <div class="container">

      <div class="vs__head reveal">
        <div>
          <SectionLabel text="Showreel" />
          <h2 class="vs__heading">Videography</h2>
        </div>
        <div class="vs__head-right">
          <p class="vs__sub">Motion pictures that move people. Each film crafted with intention — from pre-production to the final color grade.</p>
          <div class="vs__stats">
            <div v-for="s in stats" :key="s.label">
              <b>{{ s.value }}</b>
              <span>{{ s.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="vs__player reveal" @click="!isPlaying && play(videos[0].src)">
        <span class="vs__corner vs__corner--tl" aria-hidden="true" />
        <span class="vs__corner vs__corner--br" aria-hidden="true" />

        <div class="vs__hud-top" aria-hidden="true">
          <div class="vs__hud-left">
            <b>{{ showreel.hud.left }}</b>
            {{ showreel.hud.leftSub }}
          </div>
          <div class="vs__hud-right">
            <b>{{ showreel.hud.right }}</b>
            {{ showreel.hud.rightSub }}
          </div>
        </div>

        <Transition name="fade">
          <div v-if="!isPlaying" class="vs__cover">
            <button class="vs__play-btn" aria-label="Play showreel" @click.stop="play">
              <span class="vs__triangle" aria-hidden="true" />
            </button>
            <span class="vs__play-label">Watch Showreel</span>
          </div>
        </Transition>

        <Transition name="fade">
          <video
            v-if="isPlaying"
            class="vs__iframe"
            :src="activeVideo"
            autoplay
            controls
          />
        </Transition>

        <div v-if="!isPlaying" class="vs__hud-bottom" aria-hidden="true">
          <h3 class="vs__reel-title">{{ showreel.title }}</h3>
          <div class="vs__reel-meta">
            <b>Selected works</b>
            {{ showreel.meta }}
          </div>
        </div>
      </div>

      <div class="vs__grid reveal">
        <div
          v-for="video in videos"
          :key="video.id"
          class="vs__card"
          role="button"
          tabindex="0"
          :aria-label="`Play ${video.title}`"
          @click="play(video.src)"
          @keydown.enter="play(video.src)"
        >
          <div class="vs__thumb">
            <span class="vs__plate" aria-hidden="true">← {{ video.plate }}</span>
            <div class="vs__vplay" aria-hidden="true">
              <span class="vs__vtri" />
            </div>
            <span class="vs__pcorner vs__pcorner--tl" aria-hidden="true" />
            <span class="vs__pcorner vs__pcorner--br" aria-hidden="true" />
          </div>
          <div class="vs__vmeta">
            <p class="vs__cat">{{ video.category }}</p>
            <h4 class="vs__vtitle">{{ video.title }}</h4>
            <p class="vs__vsub">{{ video.sub }}</p>
          </div>
        </div>
      </div>

      <div class="vs__foot reveal">
        <span class="vs__count">
          <b>{{ String(videos.length).padStart(2, '0') }}</b>
          &nbsp;/&nbsp; 42 films shown
        </span>
        <button class="btn btn-outline">
          Browse Full Reel <span aria-hidden="true">→</span>
        </button>
      </div>

    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.vs__head {
  display: flex;
  flex-direction: column;
  gap: var(--space-06);
  padding-bottom: var(--space-07);
  border-bottom: 1px solid var(--border);
}

.vs__heading {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: 1.1;
  letter-spacing: -0.005em;
  color: var(--text);
  margin: var(--space-05) 0 0;
}

.vs__sub {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-dim);
  margin: 0;
  max-width: 400px;
}

.vs__stats {
  display: flex;
  gap: var(--space-06);
  margin-top: var(--space-05);
}

.vs__stats div {
  line-height: 1.4;
}

.vs__stats b {
  display: block;
  font-family: var(--serif);
  font-style: italic;
  font-weight: 700;
  font-size: 1.375rem;
  color: var(--gold);
  margin-bottom: 4px;
}

.vs__stats span {
  font-size: 9px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--muted);
}

.vs__player {
  position: relative;
  margin-top: var(--space-07);
  aspect-ratio: 16 / 9;
  background: radial-gradient(80% 70% at 50% 40%, #161412 0%, #0f0f0f 60%, #0a0a0a 100%);
  border: 1px solid var(--border);
  overflow: hidden;
  isolation: isolate;
  cursor: pointer;
}

.vs__player::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.012) 0 1px,
    transparent 1px 4px
  );
  pointer-events: none;
  z-index: 1;
}

.vs__player::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(closest-side at 50% 50%, transparent 25%, rgba(0, 0, 0, 0.55) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.45) 100%);
  pointer-events: none;
  z-index: 1;
}

.vs__corner {
  position: absolute;
  width: 36px;
  height: 36px;
  z-index: 4;
  pointer-events: none;
}

.vs__corner--tl {
  top: -1px;
  left: -1px;
  border-top: 1px solid var(--gold);
  border-left: 1px solid var(--gold);
}

.vs__corner--br {
  bottom: -1px;
  right: -1px;
  border-bottom: 1px solid var(--gold);
  border-right: 1px solid var(--gold);
}

.vs__hud-top {
  position: absolute;
  top: 14px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 3;
  pointer-events: none;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-dim);
  line-height: 1.6;
}

.vs__hud-top b {
  display: block;
  color: var(--gold);
  font-weight: 500;
}

.vs__hud-right {
  text-align: right;
}

.vs__hud-bottom {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 3;
  pointer-events: none;
}

.vs__reel-title {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 700;
  font-size: clamp(1rem, 2.5vw, 2rem);
  color: var(--text);
  margin: 0;
  line-height: 1.1;
}

.vs__reel-meta {
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  text-align: right;
  line-height: 1.7;
}

.vs__reel-meta b {
  display: block;
  color: var(--gold);
  font-weight: 500;
}

.vs__cover {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-04);
}

.vs__play-btn {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid var(--gold);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: background 250ms ease;
}

.vs__play-btn::after {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  border: 1px solid rgba(201, 168, 76, 0.3);
  animation: vs-pulse 2.4s ease-in-out infinite;
}

.vs__play-btn:hover {
  background: var(--gold);
}

.vs__play-btn:hover .vs__triangle {
  border-left-color: var(--bg);
}

.vs__triangle {
  width: 0;
  height: 0;
  border-left: 18px solid var(--gold);
  border-top: 11px solid transparent;
  border-bottom: 11px solid transparent;
  margin-left: 5px;
}

@keyframes vs-pulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50%       { transform: scale(1.15); opacity: 0; }
}

.vs__play-label {
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--gold);
  line-height: 1;
}

.vs__iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: 2;
}

.vs__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-07);
  margin-top: var(--space-05);
}

.vs__card {
  cursor: pointer;
  outline: none;
}

.vs__card:focus-visible .vs__thumb {
  outline: 1px solid var(--gold);
  outline-offset: -2px;
}

.vs__thumb {
  position: relative;
  aspect-ratio: 16 / 9;
  background: radial-gradient(80% 60% at 50% 40%, #232120 0%, #1a1a1a 60%, #131313 100%);
  overflow: hidden;
  isolation: isolate;
}

.vs__thumb::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.012) 0 1px,
    transparent 1px 4px
  );
  z-index: 1;
}

.vs__thumb::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(closest-side at 50% 60%, transparent 35%, rgba(0, 0, 0, 0.5) 100%);
  z-index: 1;
}

.vs__vplay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: rgba(8, 8, 8, 0.4);
  transition: background 200ms ease;
}

.vs__card:hover .vs__vplay {
  background: var(--gold);
}

.vs__card:hover .vs__vtri {
  border-left-color: var(--bg);
}

.vs__vtri {
  width: 0;
  height: 0;
  border-left: 10px solid var(--gold);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  margin-left: 3px;
}

.vs__plate {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 8px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #2d2d2d;
  z-index: 3;
}

.vs__pcorner {
  position: absolute;
  width: 18px;
  height: 18px;
  z-index: 3;
  opacity: 0;
  transition: opacity 200ms ease;
  pointer-events: none;
}

.vs__pcorner--tl {
  top: 6px;
  left: 6px;
  border-top: 1px solid var(--gold);
  border-left: 1px solid var(--gold);
}

.vs__pcorner--br {
  bottom: 6px;
  right: 6px;
  border-bottom: 1px solid var(--gold);
  border-right: 1px solid var(--gold);
}

.vs__card:hover .vs__pcorner {
  opacity: 1;
}

.vs__vmeta {
  margin-top: var(--space-03);
}

.vs__cat {
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  line-height: 1;
}

.vs__cat::before {
  content: '';
  width: 16px;
  height: 1px;
  background: var(--gold);
}

.vs__vtitle {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.3;
  color: var(--text);
  margin: var(--space-02) 0 0;
  transition: color 200ms ease;
}

.vs__card:hover .vs__vtitle {
  color: var(--gold);
}

.vs__vsub {
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  margin: var(--space-02) 0 0;
}

.vs__foot {
  margin-top: var(--space-07);
  display: flex;
  flex-direction: column;
  gap: var(--space-04);
  align-items: center;
  text-align: center;
  padding-top: var(--space-05);
  border-top: 1px solid var(--border);
}

.vs__count {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  line-height: 1;
}

.vs__count b {
  color: var(--gold);
  font-weight: 500;
}

@media (min-width: 640px) {
  .vs__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-05);
  }
}

@media (min-width: 768px) {
  .vs__head {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  .vs__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-04);
    margin-top: var(--space-04);
  }

  .vs__corner {
    width: 48px;
    height: 48px;
  }

  .vs__play-btn {
    width: 80px;
    height: 80px;
  }

  .vs__triangle {
    border-left-width: 22px;
    border-top-width: 14px;
    border-bottom-width: 14px;
    margin-left: 6px;
  }

  .vs__hud-top {
    top: 24px;
    left: 24px;
    right: 24px;
    font-size: 10px;
  }

  .vs__hud-bottom {
    bottom: 24px;
    left: 24px;
    right: 24px;
  }

  .vs__pcorner {
    width: 22px;
    height: 22px;
  }

  .vs__foot {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}
</style>
