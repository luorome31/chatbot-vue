<template>
    <div class="space-y-2">
      <div><i class="bi bi-robot text-2xl" :class="avatar"></i></div>
      <div class="container bg-slate-100 p-5 rounded-2xl w-fit max-w-full">
        {{ message }}
      </div>
      <div v-if="image">
        <div>
          <div class="flex flex-wrap gap-4">
            <img 
              :src="image" 
              alt="Preview Image"
              class="w-48 cursor-pointer transition-transform duration-200 hover:scale-110" 
              @click="openImageModal" 
            />
          </div>
          <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div class="flex flex-col items-center justify-center">
              <span class="top-2 right-2 text-white text-4xl cursor-pointer" @click="closeImageModal">&times;</span>
              <img :src="image" alt="Modal Image" class="max-w-[60%] max-h-[60%] rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue';
  
  const props = defineProps({
    message: {
      type: String,
      required: true
    },
    is_user: {
      type: Boolean,
      default: false
    },
    file: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    is_received: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      default: 'bi bi-robot'
    }
  });
  
  const isModalOpen = ref(false);
  
  const avatar = computed(() => {
    return props.is_user ? 'bi bi-arrow-through-heart-fill' : 'bi bi-robot';
  });
  
  const openImageModal = () => {
    isModalOpen.value = true;
  };
  
  const closeImageModal = () => {
    isModalOpen.value = false;
  };
  </script>
  
  <style scoped>
  .message {
    margin-bottom: 10px;
  }
  .message img {
    max-width: 100%;
    height: auto;
  }
  </style>
  