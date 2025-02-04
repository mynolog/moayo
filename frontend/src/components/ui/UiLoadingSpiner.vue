<template>
  <div class="w-full h-full flex items-center justify-center">
    <div
      :class="`w-5 h-5 animate-spin border-4 border-t-4 border-gray-300 rounded-full ${className}`"
    ></div>
  </div>
</template>

<script setup lang="ts">
const { className } = defineProps({
  className: {
    type: String,
    default: '',
  },
});
</script>
