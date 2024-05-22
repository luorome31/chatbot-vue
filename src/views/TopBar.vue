<template>
    <div class="h-[10%] ml-10 rounded-lg">
        <div class="bg-white w-auto flex text-center items-center shadow-sm justify-between">
            <div class="flex space-x-3 p-2">
                <Dropdown :options="models" v-model="selectedModel" :icon="1" :title="`model`" />
                <Dropdown :options="plugins" v-model="selectedPlugin" :icon="2" :title="`plugin`"/>
                <!-- <button @click="downloadPDF">Save as PDF</button>
                <SaveAsPdfModal :show="showModal" :messages="messages" @close="showModal = false" /> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import Dropdown from './Dropdown.vue';
import { ref, watch } from 'vue';
import SaveAsPdfModal from './SaveAsPdfModal.vue';
import jsPDF from 'jspdf';
const messages = ref([
    { message: "Hello", isUser: true },
    { message: "Hi there!", isUser: false },
    { message: "How can I help you?", isUser: false },
    { message: "I have a question.", isUser: true },
    { message: "Sure, what's your question?", isUser: false },
    { message: "Can you help me with Vue?", isUser: true },
    { message: "Of course! I'm an expert in Vue. What do you need help with?", isUser: false }
]);
const emit = defineEmits(['model-change','plugin-change']);
const showModal = ref(false);
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
const downloadPDF =()=>{
    console.log('downloadPDF')

    const pdf = new jsPDF('', 'pt', 'a4')
    let orderList = document.getElementsByClassName('pdfOrder')
    for (let i = 0, len = orderList.length; i < len; i++) {
        let target = orderList[i]
        target.style.background = '#FFFFFF'
        // 经调试，55%的时候内容显示效果比较好，与模板内容样式也有关系，自己调节一下比较好
        target.style.width = '55%'
        pdf.html(target, function () {
            if (i < len - 1) {
                pdf.addPage()
            }
            if (i === len - 1) {
                pdf.save('PDF存档.pdf')
            }
        })
    }
}

watch(() => selectedModel.value, (value) => {
    emit('model-change', value);
});
watch(() => selectedPlugin.value, (value) => {
    emit('plugin-change', value);
});
defineExpose({ setUploadFile, selectedModel });
</script>

<style lang="scss" scoped></style>