<template>
  <ui-navigation />
  <main class="pt-[30px] max-w-[1200px] mx-auto">
    <slot></slot>
  </main>
</template>

<script setup lang="ts">
import UiNavigation from '@/components/ui/UiNavigation.vue';
</script>
