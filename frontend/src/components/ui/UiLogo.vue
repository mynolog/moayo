<template>
  <div>
    <div :class="`font-righteous ${className}`">Moayo</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  className: {
    type: String,
    default: '',
  },
});
</script>
