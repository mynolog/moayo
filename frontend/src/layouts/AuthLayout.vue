<template>
  <ui-background class="flex flex-col" :backgroundImageClass="backgroundImageClass">
    <div class="w-full h-screen flex flex-col justify-center items-center mb-20 gap-2">
      <slot></slot>
    </div>
  </ui-background>
</template>

<script setup lang="ts">
import UiBackground from '@/components/ui/UiBackground.vue';

const backgroundImageClass = '/images/auth-background.jpg';
</script>
