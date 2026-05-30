<script setup>
defineProps({
  variant: {
    type: String,
    default: 'outline',
    validator: (v) => ['primary', 'outline', 'ghost'].includes(v),
  },
  type: {
    type: String,
    default: 'button',
  },
  href: {
    type: String,
    default: null,
  },
  showArrow: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :type="href ? undefined : type"
    :href="href"
    class="btn"
    :class="`btn-${variant}`"
  >
    <slot />
    <span v-if="showArrow" class="btn__arrow" aria-hidden="true">→</span>
  </component>
</template>
