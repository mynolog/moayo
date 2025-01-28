<template>
  <input
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :class="`py-2 px-3 rounded-xl border-2 border-gray-400 focus:border-gray-800 outline-none  ${className}`"
    @input="handleInputChange"
  />
</template>

<script setup lang="ts">
const { modelValue, type, placeholder } = defineProps({
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
  className: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const handleInputChange = (e: Event) => {
  const $input = e.target as HTMLInputElement;
  emit('update:modelValue', $input.value);
};
</script>
