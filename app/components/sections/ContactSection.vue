<script setup>
useScrollReveal('.contact-section .reveal')

const contactInfo = [
  { label: 'Email',     href: 'mailto:czn@email.com',         text: 'czn@email.com'    },
  { label: 'WhatsApp',  href: 'https://wa.me/923000000000',   text: '+92 300 0000000'  },
  { label: 'Instagram', href: 'https://instagram.com/czn.visuals', text: '@czn.visuals' },
]

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/czn.visuals' },
  { label: 'YouTube',   href: 'https://youtube.com'               },
  { label: 'LinkedIn',  href: 'https://linkedin.com'              },
]

const serviceOptions = [
  'Wedding Films',
  'Portrait Photography',
  'Brand & Commercial',
  'Event Coverage',
  'Custom Package',
]

const form = ref({ name: '', email: '', service: '', message: '' })
const focusedField = ref(null)
const status = ref('idle') // idle | sending | success | error

const onFocus  = (field) => { focusedField.value = field }
const onBlur   = ()      => { focusedField.value = null  }
const isFocused = (field) => focusedField.value === field

const submit = async () => {
  if (status.value === 'sending') return
  status.value = 'sending'

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name:    form.value.name,
        email:   form.value.email,
        service: form.value.service,
        message: form.value.message,
      },
    })
    status.value = 'success'
    form.value = { name: '', email: '', service: '', message: '' }
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="section contact-section">
    <div class="container">

      <div class="cs__grid">

        <!-- Left column -->
        <div class="cs__left reveal">
          <SectionLabel text="Contact" />
          <h2 class="cs__heading">
            Let's Create<br /><em>Something</em> Together
          </h2>
          <span class="cs__rule" aria-hidden="true" />

          <p class="cs__body">
            Every great project starts with a conversation. Whether you have a vision or just a feeling — reach out and let's make it real.
          </p>

          <div class="cs__info">
            <div v-for="item in contactInfo" :key="item.label" class="cs__info-item">
              <span class="cs__info-lbl">{{ item.label }}</span>
              <a :href="item.href" class="cs__info-link">{{ item.text }}</a>
            </div>
          </div>

          <div class="cs__socials" aria-label="Follow on social media">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              class="cs__social-link"
              target="_blank"
              rel="noopener noreferrer"
            >{{ social.label }}</a>
          </div>
        </div>

        <!-- Right column — form -->
        <div class="cs__form-wrap reveal">
          <span class="cs__fc cs__fc--tl" aria-hidden="true" />
          <span class="cs__fc cs__fc--tr" aria-hidden="true" />
          <span class="cs__fc cs__fc--bl" aria-hidden="true" />
          <span class="cs__fc cs__fc--br" aria-hidden="true" />

          <div class="cs__form-head">
            <h3 class="cs__form-title">Project Brief</h3>
            <span class="cs__form-meta"><b>Reply</b> within 24h</span>
          </div>
          <div class="cs__form-divider" aria-hidden="true" />

          <Transition name="fade">
            <div v-if="status === 'success'" class="cs__success">
              <span class="cs__success-icon" aria-hidden="true">✓</span>
              <h4 class="cs__success-title">Message sent.</h4>
              <p class="cs__success-body">I'll be in touch within 24 hours.</p>
              <button class="cs__success-reset btn btn-outline" @click="status = 'idle'">
                Send another →
              </button>
            </div>
          </Transition>

          <Transition name="fade">
            <form v-if="status !== 'success'" class="cs__form" novalidate @submit.prevent="submit">

              <div class="cs__field" :class="{ 'is-focused': isFocused('name') }">
                <span class="cs__field-num" aria-hidden="true">01</span>
                <div class="cs__label-row">
                  <label class="cs__field-lbl" for="cs-name">Name</label>
                  <span class="cs__opt" aria-hidden="true">Required</span>
                </div>
                <input
                  id="cs-name"
                  v-model="form.name"
                  type="text"
                  placeholder="Your Name"
                  required
                  autocomplete="name"
                  @focus="onFocus('name')"
                  @blur="onBlur"
                />
              </div>

              <div class="cs__field" :class="{ 'is-focused': isFocused('email') }">
                <span class="cs__field-num" aria-hidden="true">02</span>
                <div class="cs__label-row">
                  <label class="cs__field-lbl" for="cs-email">Email Address</label>
                  <span class="cs__opt" aria-hidden="true">Required</span>
                </div>
                <input
                  id="cs-email"
                  v-model="form.email"
                  type="email"
                  placeholder="Email Address"
                  required
                  autocomplete="email"
                  @focus="onFocus('email')"
                  @blur="onBlur"
                />
              </div>

              <div class="cs__field cs__field--select" :class="{ 'is-focused': isFocused('service') }">
                <span class="cs__field-num" aria-hidden="true">03</span>
                <div class="cs__label-row">
                  <label class="cs__field-lbl" for="cs-service">Service</label>
                  <span class="cs__opt" aria-hidden="true">Optional</span>
                </div>
                <select
                  id="cs-service"
                  v-model="form.service"
                  @focus="onFocus('service')"
                  @blur="onBlur"
                >
                  <option value="" disabled>Select a Service</option>
                  <option v-for="s in serviceOptions" :key="s" :value="s">{{ s }}</option>
                </select>
                <span class="cs__select-arrow" aria-hidden="true" />
              </div>

              <div class="cs__field" :class="{ 'is-focused': isFocused('message') }">
                <span class="cs__field-num" aria-hidden="true">04</span>
                <div class="cs__label-row">
                  <label class="cs__field-lbl" for="cs-message">Message</label>
                  <span class="cs__opt" aria-hidden="true">Required</span>
                </div>
                <textarea
                  id="cs-message"
                  v-model="form.message"
                  rows="4"
                  placeholder="Tell me about your project..."
                  required
                  @focus="onFocus('message')"
                  @blur="onBlur"
                />
              </div>

              <div class="cs__form-foot">
                <p class="cs__privacy">
                  <b>By sending</b> you agree to be contacted about your project. No spam, ever.
                </p>
                <button
                  type="submit"
                  class="btn btn-primary cs__submit"
                  :disabled="status === 'sending'"
                >
                  {{ status === 'sending' ? 'Sending…' : 'Send Message' }}
                  <span v-if="status !== 'sending'" aria-hidden="true">→</span>
                </button>
              </div>

              <Transition name="fade">
                <p v-if="status === 'error'" class="cs__error">
                  Something went wrong — please try again or email directly.
                </p>
              </Transition>

            </form>
          </Transition>
        </div>

      </div>

      <div class="cs__foot reveal">
        <span class="cs__foot-copy">© 2025 CZN Visuals. All Rights Reserved.</span>
        <span class="cs__foot-status">
          <span class="cs__dot" aria-hidden="true" />
          <b>Available</b> · Booking Q1 – Q2 2026
        </span>
        <span class="cs__foot-tagline">Photography · Videography · Visual Storytelling</span>
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

.contact-section {
  position: relative;
  overflow: hidden;
}

.contact-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(50% 60% at 5% 30%, rgba(201, 168, 76, 0.06) 0%, transparent 60%),
    radial-gradient(50% 50% at 100% 90%, rgba(201, 168, 76, 0.04) 0%, transparent 60%);
  pointer-events: none;
}

.contact-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 80%);
}

.contact-section .container {
  position: relative;
  z-index: 1;
}

.cs__grid {
  display: grid;
  gap: var(--space-09);
  align-items: start;
}

.cs__heading {
  font-family: var(--serif);
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: 1.05;
  letter-spacing: -0.005em;
  color: var(--text);
  margin: var(--space-05) 0 0;
}

.cs__heading em {
  font-style: italic;
  color: var(--gold);
}

.cs__rule {
  display: block;
  width: 48px;
  height: 1px;
  background: var(--gold);
  margin-top: var(--space-05);
}

.cs__body {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-dim);
  max-width: 460px;
  margin: var(--space-06) 0 0;
}

.cs__info {
  margin-top: var(--space-07);
  display: flex;
  flex-direction: column;
  gap: var(--space-05);
}

.cs__info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cs__info-lbl {
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  line-height: 1;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.cs__info-lbl::before {
  content: '';
  width: 16px;
  height: 1px;
  background: var(--gold);
}

.cs__info-link {
  font-size: 14px;
  color: var(--text-dim);
  text-decoration: none;
  margin-left: 26px;
  transition: color 200ms ease;
}

.cs__info-link:hover {
  color: var(--gold);
}

.cs__socials {
  margin-top: var(--space-07);
  display: flex;
  align-items: center;
  gap: var(--space-04);
}

.cs__socials::before {
  content: 'Follow';
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--muted);
  padding-right: var(--space-04);
  border-right: 1px solid var(--border);
  line-height: 1;
}

.cs__social-link {
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 4px;
  transition: color 200ms ease, border-color 200ms ease;
  line-height: 1;
}

.cs__social-link:hover {
  color: var(--gold);
  border-bottom-color: var(--gold);
}

.cs__form-wrap {
  background: rgba(17, 17, 17, 0.4);
  border: 1px solid var(--border);
  padding: var(--space-07) var(--space-06);
  position: relative;
  isolation: isolate;
}

.cs__fc {
  position: absolute;
  width: 28px;
  height: 28px;
  pointer-events: none;
  z-index: 1;
}

.cs__fc--tl { top: -1px; left: -1px;   border-top: 1px solid var(--gold); border-left: 1px solid var(--gold);   }
.cs__fc--tr { top: -1px; right: -1px;  border-top: 1px solid var(--gold); border-right: 1px solid var(--gold);  }
.cs__fc--bl { bottom: -1px; left: -1px;  border-bottom: 1px solid var(--gold); border-left: 1px solid var(--gold);   }
.cs__fc--br { bottom: -1px; right: -1px; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold);  }

.cs__form-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--space-02);
}

.cs__form-title {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 700;
  font-size: 1.375rem;
  color: var(--text);
  margin: 0;
  line-height: 1;
}

.cs__form-meta {
  font-size: 9px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--muted);
  line-height: 1;
}

.cs__form-meta b {
  color: var(--gold);
  font-weight: 500;
}

.cs__form-divider {
  height: 1px;
  background: var(--border);
  margin: var(--space-05) 0 var(--space-06);
}

.cs__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-06);
}

.cs__field {
  position: relative;
}

.cs__field-num {
  display: none;
  position: absolute;
  top: 0;
  left: -28px;
  font-family: var(--serif);
  font-style: italic;
  font-size: 11px;
  color: var(--muted);
  line-height: 1;
}

.cs__label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-02);
}

.cs__field-lbl {
  font-weight: 500;
  font-size: 9px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--muted);
  line-height: 1;
  transition: color 200ms ease;
}

.cs__opt {
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  line-height: 1;
}

.cs__field input,
.cs__field select,
.cs__field textarea {
  width: 100%;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--border);
  padding: 12px 0;
  font-family: var(--sans);
  font-size: 14px;
  color: var(--text);
  outline: none;
  transition: border-color 200ms ease;
  border-radius: 0;
  -webkit-appearance: none;
  appearance: none;
}

.cs__field input::placeholder,
.cs__field textarea::placeholder {
  color: var(--muted);
}

.cs__field select {
  color: var(--muted);
  cursor: pointer;
}

.cs__field select option {
  background: #111;
  color: var(--text);
}

.cs__field textarea {
  resize: none;
  min-height: 110px;
}

.cs__field--select {
  position: relative;
}

.cs__select-arrow {
  position: absolute;
  right: 0;
  bottom: 18px;
  width: 8px;
  height: 8px;
  border-right: 1px solid var(--text-dim);
  border-bottom: 1px solid var(--text-dim);
  transform: rotate(45deg);
  pointer-events: none;
}

.cs__field.is-focused .cs__field-lbl {
  color: var(--gold);
}

.cs__field.is-focused input,
.cs__field.is-focused select,
.cs__field.is-focused textarea {
  border-bottom-color: var(--gold);
}

.cs__field.is-focused::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 24px;
  height: 1px;
  background: var(--gold-light);
  box-shadow: 0 0 12px rgba(201, 168, 76, 0.6);
  z-index: 2;
}

.cs__form-foot {
  display: flex;
  flex-direction: column;
  gap: var(--space-04);
  margin-top: var(--space-02);
}

.cs__privacy {
  font-size: 10px;
  letter-spacing: 0.05em;
  color: var(--muted);
  line-height: 1.6;
  margin: 0;
}

.cs__privacy b {
  color: var(--text-dim);
  font-weight: 500;
}

.cs__submit {
  width: 100%;
  justify-content: center;
}

.cs__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cs__error {
  font-size: 12px;
  color: #e05c5c;
  letter-spacing: 0.05em;
  margin: 0;
  text-align: center;
}

.cs__success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-09) var(--space-05);
  gap: var(--space-03);
}

.cs__success-icon {
  font-size: 32px;
  color: var(--gold);
  line-height: 1;
}

.cs__success-title {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--text);
  margin: 0;
}

.cs__success-body {
  font-size: 13px;
  color: var(--text-dim);
  margin: 0;
}

.cs__success-reset {
  margin-top: var(--space-04);
}

.cs__foot {
  margin-top: var(--space-09);
  padding-top: var(--space-06);
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-03);
  text-align: center;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
  line-height: 1.6;
}

.cs__foot-status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
}

.cs__foot-status b {
  color: var(--gold);
  font-weight: 500;
}

.cs__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 12px var(--gold);
  animation: cs-blink 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes cs-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

@media (min-width: 640px) {
  .cs__form-foot {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .cs__submit {
    width: auto;
    flex-shrink: 0;
  }

  .cs__info {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-07) var(--space-09);
  }

  .cs__info-item {
    min-width: 140px;
  }
}

@media (min-width: 768px) {
  .cs__grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-08);
  }

  .cs__info {
    flex-direction: column;
    gap: var(--space-05);
  }

  .cs__form-wrap {
    padding: var(--space-08) var(--space-08);
  }

  .cs__field-num {
    display: block;
  }

  .cs__foot {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

@media (min-width: 900px) {
  .cs__grid {
    gap: var(--space-10);
  }
}
</style>
