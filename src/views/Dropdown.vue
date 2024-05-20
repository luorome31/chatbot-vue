<template>
  <div class="relative inline-block text-left">
    <div>
      <button @click="toggleDropdown" type="button" class="font-mono inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-bold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <i :class="selectedIcon"></i>
        {{ selectedLabel }}
        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div v-if="isOpen" class=" font-mono origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div class="py-1">
        <a v-for="option in options" :key="option.value" @click="selectOption(option)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
          <i class="bi bi-arrow-right-square-fill mr-2"></i>
           {{ option.label }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: [String, Number, Object],
    default: null
  },
  icon: {
    type: Number,
  },
  title: {
    type: String,
  }
});

const emit = defineEmits(['update:modelValue']);
const isOpen = ref(false);
const icon = ref(props.icon);
const title = ref(props.title);
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  emit('update:modelValue', option.label);
  isOpen.value = false;
};

const selectedLabel = computed(() => {
  const selected = props.options.find(option => option.label === props.modelValue);
  return selected ? selected.label : title.value;
});

const selectedIcon = computed(() => {
  return icon.value==1 ? 'bi bi-alexa mr-2' : 'bi bi-plugin mr-2';
});
</script>
