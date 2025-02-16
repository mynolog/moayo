<template>
  <main-layout>
    <div class="w-full h-screen">
      <profile-card />
      <review-container />
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import ProfileCard from '@/components/dashboard/ProfileCard.vue';
import ReviewContainer from '@/components/dashboard/ReviewContainer.vue';
</script>
