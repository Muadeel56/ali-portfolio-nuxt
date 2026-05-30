<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="seclabel">
    <span class="seclabel__text">{{ text }}</span>
    <span class="seclabel__line" aria-hidden="true" />
  </div>
</template>
