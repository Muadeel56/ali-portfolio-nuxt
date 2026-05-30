<script setup>
const router = useRouter()

useScrollReveal('.about-section .reveal')

const scrollTo = (id) => {
  router.push({ path: '/', hash: `#${id}` })
}
</script>

<template>
  <section id="about" class="section about-section">
    <div class="about-section__inner about-grid">
      <div class="about-section__media reveal">
        <div class="about-section__frame-wrap">
          <div class="about-section__image">
            <svg
              class="about-section__icon"
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
            <span class="about-section__caption">— Plate · Self portrait</span>
            <span class="about-section__corner about-section__corner--tl" aria-hidden="true" />
            <span class="about-section__corner about-section__corner--br" aria-hidden="true" />
          </div>

          <div class="about-section__badge">
            <p class="about-section__badge-num">5+</p>
            <p class="about-section__badge-lbl">Years</p>
          </div>
        </div>
      </div>

      <div class="about-section__text reveal">
        <SectionLabel text="About" />

        <h2 class="about-section__heading">
          Frames That
          <em>Feel</em>
        </h2>

        <span class="about-section__rule" aria-hidden="true" />

        <p class="about-section__body">
          I'm a photographer and videographer with a deep passion for visual storytelling. Every
          frame I capture is intentional — a blend of technical precision and raw emotion.
        </p>
        <p class="about-section__body">
          Whether it's a wedding, a brand campaign, or a cinematic short — I bring a director's eye
          and a documentarian's patience to every project.
        </p>

        <div class="about-section__stats">
          <span class="about-section__stat">150+ Weddings</span>
          <span class="about-section__stat-sep" aria-hidden="true">·</span>
          <span class="about-section__stat">80+ Events</span>
          <span class="about-section__stat-sep" aria-hidden="true">·</span>
          <span class="about-section__stat">5+ Years</span>
        </div>

        <div class="about-section__ctas">
          <AppButton variant="outline" show-arrow @click="scrollTo('photography')">
            See My Work
          </AppButton>
          <AppButton variant="ghost" @click="scrollTo('contact')">Download Rate Card</AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
  padding-block: clamp(80px, 12vw, 160px);
}

.about-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60% 60% at 75% 30%, rgba(201, 168, 76, 0.04) 0%, transparent 60%),
    radial-gradient(80% 60% at 10% 90%, rgba(201, 168, 76, 0.025) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.about-section__inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.about-section__media {
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-section__frame-wrap {
  position: relative;
  width: 100%;
  max-width: 480px;
}

.about-section__image {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  background: radial-gradient(80% 60% at 50% 40%, #222020 0%, #1a1a1a 60%, #131313 100%);
  overflow: hidden;
}

.about-section__image::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.012) 0 1px,
    transparent 1px 4px
  );
  pointer-events: none;
}

.about-section__image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(closest-side at 50% 60%, transparent 35%, rgba(0, 0, 0, 0.5) 100%);
  pointer-events: none;
}

.about-section__icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 88px;
  height: 88px;
  color: #2a2a2a;
}

.about-section__caption {
  position: absolute;
  bottom: 24px;
  left: 24px;
  font-family: var(--sans);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #2d2d2d;
  z-index: 2;
}

.about-section__corner {
  position: absolute;
  width: 48px;
  height: 48px;
  pointer-events: none;
  z-index: 3;
}

.about-section__corner--tl {
  top: -1px;
  left: -1px;
  border-top: 1px solid var(--gold);
  border-left: 1px solid var(--gold);
}

.about-section__corner--br {
  bottom: -1px;
  right: -1px;
  border-bottom: 1px solid var(--gold);
  border-right: 1px solid var(--gold);
}

.about-section__badge {
  position: absolute;
  bottom: -24px;
  right: -24px;
  background: var(--gold);
  padding: 20px 28px;
  text-align: center;
  color: var(--bg);
  z-index: 4;
  box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.6);
  min-width: 96px;
}

.about-section__badge-num {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 700;
  font-size: 32px;
  line-height: 1;
  color: var(--bg);
  margin: 0;
}

.about-section__badge-lbl {
  font-family: var(--sans);
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--bg);
  margin: 6px 0 0;
  line-height: 1;
}

.about-section__heading {
  font-family: var(--serif);
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 52px);
  line-height: 1.1;
  letter-spacing: -0.005em;
  margin: 24px 0 0;
  color: var(--text);
}

.about-section__heading em {
  display: block;
  font-style: italic;
  color: var(--gold);
  font-weight: 700;
}

.about-section__rule {
  display: block;
  width: 48px;
  height: 1px;
  background: var(--gold);
  margin-top: 24px;
}

.about-section__body {
  font-family: var(--sans);
  font-weight: 400;
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-dim);
  max-width: 420px;
  margin: 24px 0 0;
}

.about-section__body + .about-section__body {
  margin-top: 16px;
}

.about-section__stats {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  border-top: 1px solid var(--border);
  padding-top: 32px;
  margin-top: 40px;
  max-width: 480px;
}

.about-section__stat {
  font-family: var(--sans);
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-dim);
  white-space: nowrap;
}

.about-section__stat-sep {
  color: var(--gold);
  font-size: 14px;
  line-height: 1;
}

.about-section__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .about-section__media {
    margin-bottom: 16px;
  }

  .about-section__corner {
    width: 40px;
    height: 40px;
  }

  .about-section__caption {
    bottom: 16px;
    left: 16px;
    font-size: 9px;
  }

  .about-section__icon {
    width: 72px;
    height: 72px;
  }

  .about-section__badge {
    bottom: -20px;
    right: -8px;
    padding: 16px 22px;
    box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.6);
  }

  .about-section__badge-num {
    font-size: 28px;
  }

  .about-section__badge-lbl {
    font-size: 9px;
  }

  .about-section__heading {
    font-size: 38px;
  }

  .about-section__stats {
    gap: 8px 10px;
    padding-top: 28px;
  }

  .about-section__stat {
    font-size: 10px;
  }

  .about-section__ctas {
    flex-direction: column;
  }

  .about-section__ctas :deep(.btn) {
    width: 100%;
    justify-content: center;
  }
}
</style>
