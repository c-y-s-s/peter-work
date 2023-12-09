<script setup lang="ts">
const props = defineProps({
  showCakeNav: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div>
    <cakeNav v-if="props.showCakeNav" />
    <slot />
  </div>
</template>
