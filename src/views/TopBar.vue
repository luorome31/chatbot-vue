<template>
    <div class="h-[10%] ml-10 rounded-lg">
        <div class="bg-white w-auto flex text-center items-center shadow-sm justify-between">
            <div class="flex space-x-3 p-2">
                <Dropdown :options="models" v-model="selectedModel" :icon="1" :title="`model`" />
                <Dropdown :options="plugins" v-model="selectedPlugin" :icon="2" :title="`plugin`"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import Dropdown from './Dropdown.vue';
import { ref, watch } from 'vue';

const emit = defineEmits(['model-change','plugin-change']);
const models = [
    { value: 1, label: 'GPT-3.5' },
    { value: 2, label: 'GPT-4o' },
    { value: 3, label: 'dengxi' }
];
const plugins = [
    { value: 1, label: 'plugin1' },
    { value: 2, label: 'plugin2' },
    { value: 3, label: 'plugin3' }
];
const uploadFile = ref(null);
const selectedModel = ref(null);
const selectedPlugin = ref(null);
const setUploadFile = (file) => {
    uploadFile.value = file;
};
watch(() => selectedModel.value, (value) => {
    emit('model-change', value);
});
watch(() => selectedPlugin.value, (value) => {
    emit('plugin-change', value);
});
defineExpose({ setUploadFile, selectedModel });
</script>

<style lang="scss" scoped></style>