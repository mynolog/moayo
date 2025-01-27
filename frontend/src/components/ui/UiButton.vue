<template>
  <button
    :type="type"
    :disabled="disabled"
    :title="title"
    :class="`px-3 py-2 font-extrabold text-white bg-gray-800 rounded-lg ${className}`"
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
