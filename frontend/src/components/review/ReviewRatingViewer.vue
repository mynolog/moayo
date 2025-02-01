<template>
  <div class="flex gap-1 items-start">
    <span v-for="n in 5" :key="`${n} - ratingViewer`">
      <font-awesome-icon
        :icon="n <= reviewRating ? faStarSolid : faStarRegular"
        class="text-soft-blue-600"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const { reviewRating } = defineProps({
  reviewRating: {
    type: Number,
    required: true,
  },
});
</script>
