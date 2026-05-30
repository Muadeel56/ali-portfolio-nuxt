<script setup>
const router = useRouter()
useScrollReveal('.services-section .reveal')

const services = ref([
  {
    id: 1, num: '01',
    title: 'Wedding Films',
    desc: 'Full-day coverage with cinematic storytelling. From morning prep to the last dance — captured with two operators, color-graded for screen and print.',
    tags: ['Cinematic highlight reel', 'Full ceremony & reception', 'Drone footage', 'Color graded edit'],
    priceLabel: 'Starting from', price: 'PKR 80,000',
  },
  {
    id: 2, num: '02',
    title: 'Corporate & Brand Films',
    desc: 'Visual narratives that elevate brand identity. From concept to final grade — stills and motion produced together, end-to-end.',
    tags: ['Concept development', 'Multiple revisions', 'Branded delivery', 'Usage rights'],
    priceLabel: 'Starting from', price: 'PKR 50,000',
  },
  {
    id: 3, num: '03',
    title: 'Photography — Weddings & Events',
    desc: 'Full-day photo coverage for weddings, nikkah ceremonies, and events. Quiet, considered direction — delivered as a curated online gallery.',
    tags: ['Full-day coverage', '200+ edited images', 'Online gallery', 'Print-ready files'],
    priceLabel: 'Starting from', price: 'PKR 25,000',
  },
  {
    id: 4, num: '04',
    title: 'Commercial Photography',
    desc: 'Product, lifestyle and editorial stills for brands. Studio or on-location — concept through delivery with full commercial license.',
    tags: ['Product & lifestyle', 'Studio & on-location', 'Commercial license', 'Edited deliverables'],
    priceLabel: 'Starting from', price: 'PKR 35,000',
  },
  {
    id: 5, num: '05',
    title: 'Aerial / Drone Coverage',
    desc: 'Licensed drone operator delivering cinematic 4K aerials for weddings, events, and brand productions. Available standalone or as an add-on.',
    tags: ['Licensed operator', '4K footage', 'Cinematic grading', 'Standalone or add-on'],
    priceLabel: 'Starting from', price: 'PKR 20,000',
  },
])

const active = ref(0)

const toggle = (i) => {
  active.value = active.value === i ? null : i
}

const scrollToContact = () => {
  router.push('/contact')
}
</script>

<template>
  <section id="services" class="section services-section">
    <div class="container">

      <div class="services-section__head reveal">
        <div>
          <SectionLabel text="What I Offer" />
          <h2 class="services-section__heading">Services &amp; <em>Pricing</em></h2>
          <span class="services-section__rule" aria-hidden="true" />
        </div>
        <div class="services-section__meta" aria-hidden="true">
          <div><b>Lahore · PK</b>Studio &amp; on-location</div>
          <div><b>Worldwide</b>Available for travel</div>
          <div><b>2026</b>Booking now open</div>
        </div>
      </div>

      <div class="services-section__list reveal">
        <div
          v-for="(service, i) in services"
          :key="service.id"
          class="services-section__row"
          :class="{ 'is-active': active === i }"
          role="button"
          :aria-expanded="active === i"
          :tabindex="0"
          @click="toggle(i)"
          @keydown.enter.prevent="toggle(i)"
          @keydown.space.prevent="toggle(i)"
        >
          <span class="services-section__num" aria-hidden="true">{{ service.num }}</span>

          <div class="services-section__body">
            <h3 class="services-section__title">
              {{ service.title }}
              <span class="services-section__arrow" aria-hidden="true">→</span>
            </h3>

            <Transition name="slide">
              <div v-if="active === i" class="services-section__expanded">
                <p class="services-section__desc">{{ service.description }}</p>
                <div class="services-section__tags">
                  <span v-for="tag in service.tags" :key="tag" class="services-section__tag">{{ tag }}</span>
                </div>
                <div class="services-section__price-row-mobile">
                  <div>
                    <p class="services-section__price-label">{{ service.priceLabel }}</p>
                    <p class="services-section__price">{{ service.price }}</p>
                  </div>
                  <a class="services-section__enquire" href="#contact" @click.stop="scrollToContact">Enquire →</a>
                </div>
              </div>
            </Transition>
          </div>

          <div class="services-section__right">
            <p class="services-section__price-label">{{ service.priceLabel }}</p>
            <p class="services-section__price">{{ service.price }}</p>
            <a class="services-section__enquire" href="#contact" @click.stop="scrollToContact">Enquire →</a>
          </div>
        </div>
      </div>

      <div class="services-section__banner reveal">
        <span class="bcorner bcorner--tl" aria-hidden="true" />
        <span class="bcorner bcorner--tr" aria-hidden="true" />
        <span class="bcorner bcorner--bl" aria-hidden="true" />
        <span class="bcorner bcorner--br" aria-hidden="true" />

        <span class="services-section__blabel">Custom Packages Available</span>
        <h3 class="services-section__bhead">Have a unique project in mind?</h3>
        <p class="services-section__bsub">
          Multi-day shoots, retainers, hybrid photo + video productions — every brief gets a tailored quote within 24 hours.
        </p>
        <div class="services-section__bbtns">
          <button class="btn btn-primary" @click="scrollToContact">
            Let's Talk <span aria-hidden="true">→</span>
          </button>
          <button class="btn btn-outline">
            Download Rate Card
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.35s ease, opacity 0.3s ease;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 400px;
  opacity: 1;
}

.services-section__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-08);
  margin-bottom: var(--space-08);
}

.services-section__heading {
  font-family: var(--serif);
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: 1.05;
  letter-spacing: -0.005em;
  color: var(--text);
  margin: var(--space-05) 0 0;
}

.services-section__heading em {
  font-style: italic;
  color: var(--gold);
}

.services-section__rule {
  display: block;
  width: 48px;
  height: 1px;
  background: var(--gold);
  margin-top: var(--space-05);
}

.services-section__meta {
  display: none;
  gap: var(--space-06);
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--muted);
  line-height: 1.6;
  text-align: right;
}

.services-section__meta b {
  display: block;
  color: var(--gold);
  font-weight: 500;
  margin-bottom: 4px;
  font-style: normal;
}

.services-section__list {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.services-section__row {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: var(--space-05);
  align-items: start;
  padding: var(--space-07) 0;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  outline: none;
  transition: background 250ms ease, padding 250ms ease;
  position: relative;
}

.services-section__row:last-child {
  border-bottom: 0;
}

.services-section__row:focus-visible {
  outline: 1px solid var(--gold);
  outline-offset: -2px;
}

.services-section__num {
  font-family: var(--serif);
  font-weight: 700;
  font-size: 2.75rem;
  line-height: 1;
  color: var(--border);
  transition: color 250ms ease, transform 250ms ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding-top: 4px;
}

.services-section__num::after {
  content: '';
  display: inline-block;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width 350ms ease;
}

.services-section__title {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 700;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  line-height: 1.1;
  color: var(--text);
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: color 250ms ease;
}

.services-section__arrow {
  font-family: var(--sans);
  font-size: 14px;
  font-style: normal;
  color: var(--gold);
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 250ms ease, transform 250ms ease;
}

.services-section__desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-dim);
  max-width: 480px;
  margin: var(--space-03) 0 0;
}

.services-section__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-02);
  margin-top: var(--space-05);
}

.services-section__tag {
  border: 1px solid var(--border);
  padding: 6px 12px;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-dim);
  line-height: 1.2;
  transition: border-color 200ms ease, color 200ms ease;
}

.services-section__right {
  display: none;
}

.services-section__price-label {
  font-size: 9px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--muted);
  line-height: 1;
  margin: 0;
}

.services-section__price {
  font-family: var(--serif);
  font-weight: 700;
  font-size: 1.375rem;
  color: var(--gold);
  margin: var(--space-02) 0 0;
  line-height: 1;
}

.services-section__enquire {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-dim);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 3px;
  transition: color 200ms ease, border-color 200ms ease;
  line-height: 1;
  margin-top: var(--space-04);
  display: inline-block;
}

.services-section__expanded {
  padding-bottom: var(--space-02);
}

.services-section__price-row-mobile {
  margin-top: var(--space-05);
  padding-top: var(--space-05);
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.services-section__row.is-active .services-section__price-row-mobile {
  border-top-color: rgba(201, 168, 76, 0.2);
}

.services-section__row.is-active,
.services-section__row:hover {
  background: linear-gradient(
    90deg,
    rgba(201, 168, 76, 0.04) 0%,
    rgba(201, 168, 76, 0.02) 40%,
    transparent 100%
  );
}

.services-section__row.is-active .services-section__num,
.services-section__row:hover .services-section__num {
  color: var(--gold);
  transform: translateX(4px);
}

.services-section__row.is-active .services-section__num::after,
.services-section__row:hover .services-section__num::after {
  width: 24px;
}

.services-section__row.is-active .services-section__title,
.services-section__row:hover .services-section__title {
  color: var(--gold);
}

.services-section__row.is-active .services-section__arrow,
.services-section__row:hover .services-section__arrow {
  opacity: 1;
  transform: translateX(0);
}

.services-section__row.is-active .services-section__tag,
.services-section__row:hover .services-section__tag {
  border-color: rgba(201, 168, 76, 0.4);
  color: var(--text);
}

.services-section__row.is-active .services-section__enquire,
.services-section__row:hover .services-section__enquire {
  color: var(--gold);
  border-bottom-color: var(--gold);
}

.services-section__banner {
  margin-top: var(--space-09);
  border: 1px solid rgba(201, 168, 76, 0.3);
  padding: var(--space-09) var(--space-07);
  text-align: center;
  position: relative;
  background: radial-gradient(60% 80% at 50% 50%, rgba(201, 168, 76, 0.05) 0%, transparent 70%);
  overflow: hidden;
  isolation: isolate;
}

.services-section__banner::before {
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

.services-section__banner > * {
  position: relative;
  z-index: 1;
}

.bcorner {
  position: absolute;
  width: 28px;
  height: 28px;
  pointer-events: none;
  z-index: 1;
}
.bcorner--tl { top: -1px; left: -1px; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); }
.bcorner--tr { top: -1px; right: -1px; border-top: 1px solid var(--gold); border-right: 1px solid var(--gold); }
.bcorner--bl { bottom: -1px; left: -1px; border-bottom: 1px solid var(--gold); border-left: 1px solid var(--gold); }
.bcorner--br { bottom: -1px; right: -1px; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); }

.services-section__blabel {
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--gold);
  display: inline-flex;
  align-items: center;
  gap: 14px;
  line-height: 1;
}

.services-section__blabel::before,
.services-section__blabel::after {
  content: '';
  width: 24px;
  height: 1px;
  background: var(--gold);
}

.services-section__bhead {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 700;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.15;
  color: var(--text);
  margin: var(--space-05) auto 0;
  max-width: 640px;
}

.services-section__bsub {
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-dim);
  margin: var(--space-04) auto 0;
  max-width: 440px;
}

.services-section__bbtns {
  display: flex;
  flex-direction: column;
  gap: var(--space-03);
  margin-top: var(--space-06);
  align-items: center;
}

@media (min-width: 640px) {
  .services-section__bbtns {
    flex-direction: row;
    justify-content: center;
  }
}

@media (min-width: 768px) {
  .services-section__meta {
    display: flex;
  }

  .services-section__row {
    grid-template-columns: 80px 1fr auto;
    gap: var(--space-08);
    align-items: center;
  }

  .services-section__right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--space-04);
    text-align: right;
    min-width: 140px;
  }

  .services-section__price-row-mobile {
    display: none;
  }

  .services-section__num {
    font-size: 3.5rem;
  }
}

@media (min-width: 900px) {
  .services-section__banner {
    padding: var(--space-10) var(--space-10);
  }
}
</style>
