<template>
  <main-layout>
    <book-tool-bar />
    <book-list />
  </main-layout>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import BookToolBar from '@/components/book/BookToolBar.vue';
import BookList from '@/components/book/BookList.vue';
</script>
