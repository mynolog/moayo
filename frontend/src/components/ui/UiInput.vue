<template>
  <label class="flex flex-col space-y-1">
    <span class="text-sm text-gray-500">{{ label }}</span>
    <input
      ref="inputRef"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :class="`py-2 px-3 rounded-sm border-2 border-white focus:border-gray-800 outline-none transition-all duration-200 ${className}`"
      @input="handleInputChange"
    />
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { modelValue, type, placeholder, label } = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String as () => 'text' | 'email' | 'password' | 'submit',
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
});

const inputRef = ref<HTMLInputElement | null>(null);

defineExpose({
  focus: () => {
    inputRef.value?.focus();
  },
});

const emit = defineEmits(['update:modelValue']);

const handleInputChange = (e: Event) => {
  const $input = e.target as HTMLInputElement;
  emit('update:modelValue', $input.value);
};
</script>
