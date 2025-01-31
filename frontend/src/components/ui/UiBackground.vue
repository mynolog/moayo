<template>
  <div class="h-screen w-full relative">
    <!-- 배경화면 딤 처리 -->
    <div
      class="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      :style="{
        backgroundImage: `url(${backgroundImageClass})`,
        filter: 'brightness(60%)',
        zIndex: -1,
      }"
    ></div>
    <div :class="`w-full h-full flex flex-col relative z-10 ${className}`">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  backgroundImageClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
});
</script>
