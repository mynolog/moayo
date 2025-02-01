<template>
  <div class="w-full h-full flex flex-col items-start mt-1 gap-3">
    <p class="text-sm">{{ reviewContent }}</p>
    <span class="text-xs text-gray-500">{{ reviewAuthor }}</span>
  </div>
</template>

<script setup lang="ts">
const {} = defineProps({
  reviewContent: {
    type: String,
    default: '',
  },
  reviewAuthor: {
    type: String,
    required: true,
  },
});
</script>
