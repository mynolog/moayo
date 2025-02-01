<template>
  <div class="w-full h-20 grid grid-cols-[9fr_1fr] gap-2">
    <textarea
      v-model="content"
      placeholder="리뷰를 남겨주세요. 부적절한 내용은 삭제될 수 있습니다."
      class="resize-none p-2 outline-none border-2 border-white focus:border-gray-800"
    ></textarea>
    <ui-button label="등록" className="font-bold"></ui-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UiButton from '../ui/UiButton.vue';

const content = ref('');
</script>
