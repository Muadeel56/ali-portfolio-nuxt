<script setup>
const router = useRouter()

const scrollTo = (path) => {
  router.push(path)
}
</script>

<template>
  <section id="hero" class="hero section--flush-top">
    <div class="hero__bg" aria-hidden="true" />
    <div class="hero__beam" aria-hidden="true" />

    <div class="grain" aria-hidden="true" />
    <div class="grain grain--fine" aria-hidden="true" />

    <div class="hero__ovl hero__ovl--top" aria-hidden="true" />
    <div class="hero__ovl hero__ovl--bottom" aria-hidden="true" />
    <div class="hero__ovl hero__ovl--left" aria-hidden="true" />
    <div class="hero__ovl hero__ovl--right" aria-hidden="true" />

    <div class="hero__content">
      <p class="hero__label label">Visual Storyteller</p>
      <h1 class="hero__headline heading">
        Frames That
        <span class="hero__headline-accent">Breathe Stories</span>
      </h1>
      <p class="hero__sub sub">
        Photography &amp; Videography that captures emotion, depth, and the quiet beauty between
        moments.
      </p>
      <div class="hero__ctas ctas">
        <AppButton variant="primary" show-arrow @click="scrollTo('/photography')">
          View Work
        </AppButton>
        <AppButton
          variant="ghost"
          class="hero__cta-ghost"
          @click="scrollTo('/contact')"
        >
          Get in Touch
        </AppButton>
        <AppButton
          variant="outline"
          class="hero__cta-outline"
          @click="scrollTo('/contact')"
        >
          Get in Touch
        </AppButton>
      </div>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span class="hero__scroll-label">Scroll</span>
      <span class="hero__scroll-line" />
    </div>

    <div class="hero__corner-l t-mono" aria-hidden="true">
      <b>Reel · 2026</b>
      01 / 12 — Atlantic, dawn
    </div>
    <div class="hero__corner-r" aria-hidden="true">Photography · Videography</div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  min-height: 100dvh;
  background: #0d0d0d;
  overflow: hidden;
  isolation: isolate;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(120% 80% at 28% 38%, rgba(201, 168, 76, 0.16) 0%, transparent 50%),
    radial-gradient(70% 60% at 78% 75%, rgba(201, 168, 76, 0.06) 0%, transparent 55%),
    radial-gradient(140% 120% at 50% 60%, #1a1410 0%, #0d0d0d 45%, #060606 100%);
}

.hero__bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(closest-side at 50% 70%, rgba(0, 0, 0, 0.55) 0%, transparent 55%),
    radial-gradient(closest-side at 50% 35%, rgba(232, 201, 122, 0.04) 0%, transparent 55%);
}

.hero__beam {
  position: absolute;
  top: -200px;
  left: 18%;
  width: 380px;
  height: 1100px;
  background: linear-gradient(180deg, rgba(232, 201, 122, 0.1) 0%, rgba(232, 201, 122, 0) 70%);
  transform: rotate(14deg);
  filter: blur(40px);
  z-index: 1;
  pointer-events: none;
}

.grain {
  position: absolute;
  inset: 0;
  z-index: 2;
  opacity: 0.18;
  mix-blend-mode: overlay;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.85 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  background-size: 220px 220px;
}

.grain--fine {
  opacity: 0.1;
  mix-blend-mode: soft-light;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='2.6' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.7 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  background-size: 180px 180px;
}

.hero__ovl {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 3;
  pointer-events: none;
}

.hero__ovl--top {
  top: 0;
  height: 200px;
  background: linear-gradient(180deg, #080808 0%, rgba(8, 8, 8, 0) 100%);
}

.hero__ovl--bottom {
  bottom: 0;
  height: 250px;
  background: linear-gradient(0deg, #080808 0%, rgba(8, 8, 8, 0) 100%);
}

.hero__ovl--left,
.hero__ovl--right {
  top: 0;
  bottom: 0;
  width: 280px;
}

.hero__ovl--left {
  left: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
}

.hero__ovl--right {
  right: 0;
  left: auto;
  background: linear-gradient(270deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
}

.hero__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 36px));
  z-index: 10;
  width: 100%;
  max-width: 880px;
  text-align: center;
  padding: 0 24px;
}

.hero__label {
  font-family: var(--sans);
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 24px;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  line-height: 1;
}

.hero__label::before,
.hero__label::after {
  content: '';
  width: 32px;
  height: 1px;
  background: var(--gold);
  opacity: 0.85;
}

.hero__headline {
  font-family: var(--serif);
  font-weight: 700;
  font-size: clamp(2.75rem, 10vw, 80px);
  line-height: 1.05;
  letter-spacing: -0.012em;
  margin: 0;
  color: var(--text);
}

.hero__headline-accent {
  display: block;
  font-style: italic;
  color: var(--gold);
  font-weight: 700;
}

.hero__sub {
  font-family: var(--sans);
  font-weight: 400;
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-dim);
  max-width: 480px;
  margin: 24px auto 0;
}

.hero__ctas {
  margin-top: 40px;
  display: inline-flex;
  gap: 16px;
  align-items: center;
}

.hero__cta-outline {
  display: none;
}

.hero__scroll {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  pointer-events: none;
}

.hero__scroll-label {
  font-family: var(--sans);
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
}

.hero__scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(180deg, var(--gold) 0%, rgba(201, 168, 76, 0) 100%);
  position: relative;
  overflow: hidden;
}

.hero__scroll-line::after {
  content: '';
  position: absolute;
  top: -40%;
  left: 0;
  width: 1px;
  height: 40%;
  background: linear-gradient(180deg, rgba(232, 201, 122, 0) 0%, var(--gold-light) 100%);
  animation: scrollPulse 2.4s ease-in-out infinite;
}

.hero__corner-l {
  position: absolute;
  bottom: 40px;
  left: clamp(24px, 5.5vw, 80px);
  z-index: 10;
  line-height: 1.7;
  pointer-events: none;
}

.hero__corner-l b {
  color: var(--text-dim);
  font-weight: 500;
  display: block;
}

.hero__corner-r {
  position: absolute;
  bottom: 40px;
  right: clamp(24px, 5.5vw, 80px);
  z-index: 10;
  font-family: var(--sans);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  text-align: right;
  line-height: 1.7;
  pointer-events: none;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes scrollPulse {
  0%   { top: -40%; opacity: 0; }
  20%  { opacity: 1; }
  80%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.label   { animation: fadeUp 0.8s ease 0.2s both; }
.heading { animation: fadeUp 0.8s ease 0.4s both; }
.sub     { animation: fadeUp 0.8s ease 0.6s both; }
.ctas    { animation: fadeUp 0.8s ease 0.8s both; }

@media (max-width: 900px) {
  .hero__bg {
    background:
      radial-gradient(120% 70% at 30% 35%, rgba(201, 168, 76, 0.18) 0%, transparent 55%),
      radial-gradient(80% 60% at 75% 80%, rgba(201, 168, 76, 0.06) 0%, transparent 55%),
      radial-gradient(140% 120% at 50% 60%, #1a1410 0%, #0d0d0d 45%, #060606 100%);
  }

  .hero__beam,
  .hero__ovl--left,
  .hero__ovl--right,
  .hero__corner-l,
  .hero__corner-r {
    display: none;
  }

  .hero__ovl--bottom {
    height: 240px;
  }

  .hero__content {
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(calc(-50% - 16px));
    max-width: none;
    padding: 0 24px;
  }

  .hero__label {
    font-size: 10px;
    margin-bottom: 20px;
    gap: 12px;
  }

  .hero__label::before,
  .hero__label::after {
    width: 24px;
  }

  .hero__headline {
    font-size: 44px;
    line-height: 1.1;
  }

  .hero__sub {
    font-size: 14px;
    max-width: 320px;
    margin-top: 20px;
  }

  .hero__ctas {
    margin-top: 32px;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 320px;
    margin-inline: auto;
    display: flex;
  }

  .hero__ctas :deep(.btn) {
    width: 100%;
  }

  .hero__cta-ghost {
    display: none;
  }

  .hero__cta-outline {
    display: inline-flex;
  }

  .hero__scroll {
    bottom: 32px;
    gap: 12px;
  }

  .hero__scroll-label {
    font-size: 9px;
  }

  .hero__scroll-line {
    height: 28px;
  }

  .hero__scroll-line::after {
    top: -50%;
    height: 50%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .label, .heading, .sub, .ctas, .hero__scroll-line::after {
    animation: none !important;
  }
}
</style>
