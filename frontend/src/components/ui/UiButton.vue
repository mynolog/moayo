<template>
  <button
    :type="type"
    :disabled="disabled"
    :title="title"
    :class="`px-3 py-2 text-white bg-soft-blue-900 rounded-lg cursor-auto scale-95
             opacity-95 hover:cursor-pointer hover:opacity-100 hover:scale-100 hover:font-bold
             disabled:bg-gray-400 disabled:cursor-not-allowed
             transition-all duration-200
             ${className}`"
    @click="handleButtonClick"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const { type, disabled, title, label, className } = defineProps({
  type: {
    type: String as () => 'submit' | 'reset' | 'button',
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click']);

const handleButtonClick = () => {
  emit('click');
};
</script>
