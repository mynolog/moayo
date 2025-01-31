<template>
  <nav class="sticky top-10 grid grid-cols-2 mb-5 items-center bg-background p-2 z-20">
    <ul class="flex gap-5">
      <book-filter-tab />
    </ul>
    <div class="ml-auto">
      <book-search-tab />
    </div>
  </nav>
</template>

<script setup lang="ts">
import BookFilterTab from './BookFilterTab.vue';
import BookSearchTab from './BookSearchTab.vue';
</script>
