<template>
  <div class="flex gap-1 items-center">
    <span
      v-for="n in 5"
      :key="`${n} - ratingPicker`"
      @mouseover="hoverRating = n"
      @mouseleave="hoverRating = 0"
      @click="selectedRating = n"
      class="hover:cursor-pointer text-lg"
    >
      <font-awesome-icon
        :icon="n <= (hoverRating || selectedRating) ? faStarSolid : faStarRegular"
        class="text-soft-blue-600"
      />
    </span>
    <span class="mx-2 font-semibold">{{ selectedRating }}점</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

const selectedRating = ref(0);
const hoverRating = ref(0);
</script>
