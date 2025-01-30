<template>
  <main-layout>
    <h2>도서 상세 페이지: {{ isbn13 }}</h2>
  </main-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

const route = useRoute();
const isbn13 = route.params.isbn13;
</script>
