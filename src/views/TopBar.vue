<template>
    <div class="h-[10%] ml-10 rounded-lg">
        <div class="bg-white w-auto flex text-center items-center shadow-sm justify-between">
            <div class="flex space-x-3 p-2">
                <i class="bi bi-file-earmark-arrow-up-fill text-xl"></i>
                <div>
                    upload-file: {{uploadFile}}
                </div>
            </div>
            <div class="flex space-x-3 p-2">
                <Dropdown :options="options" v-model="selectedOption" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Dropdown from './Dropdown.vue';
import { ref } from 'vue';
const options = [
    { value: 1, label: 'GPT-3.5' },
    { value: 2, label: 'GPT-4o' },
    { value: 3, label: 'dengxi' }
];
const uploadFile = ref(null);
const selectedOption = ref(null);

const setUploadFile = (file) => {
    uploadFile.value = file;
};
defineExpose({ setUploadFile, selectedOption });
</script>

<style lang="scss" scoped></style>