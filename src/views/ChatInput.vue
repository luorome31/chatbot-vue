<template>
    <div class="h-[10%] mx-32 my-2 rounded-lg">
        <div class="bg-slate-100 rounded-xl shadow-md w-auto p-3 flex">
            <div v-if="selectedFile!=null"
                class="p-3 flex max-h-fit max-w-fit bg-slate-300 rounded-lg shrink-0 shadow-md space-x-2 items-center justify-center">
                <div>
                    <div>{{ selectedFileName }}</div>
                </div>
                <div>
                    <button @click="cancelFile">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
            <div class="text-gray-600 p-3 w-20 justify-center flex">
                <button @click="openFileSelector">
                    <i class="bi bi-file-earmark-arrow-up-fill text-3xl"></i>
                    <input id="loadInput" type="file" @change="loadFile" class="hidden" />
                </button>
            </div>

            <input type="text" class="w-full p-2 rounded-lg text-gray-600 text-base focus:outline-none"
                placeholder="Type a message..." v-model="inputValue" @keyup.enter="sendMessage" />

            <div class="text-gray-600 p-3 w-20 justify-center flex">
                <button>
                    <i class="bi bi-arrow-right-circle text-3xl"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
const emit = defineEmits(['send-message', 'load-file','cancel-file'])

//属性：用户输入的消息、用户选择的文件
const inputValue = ref('');
const selectedFile = ref(null);
//计算属性：用户选择的文件名，用于显示
const selectedFileName = computed(()=>{
    return selectedFile.value?.name;
})
//方法：打开文件选择器
const openFileSelector = () => {
    const input = document.getElementById('loadInput');
    input.click();
};
//方法：加载文件
const loadFile = (e) => {
    const file = e.target.files[0];
    selectedFile.value = file;
    emit('load-file');
};
//方法：取消文件
const cancelFile = () => {
    console.log('cancel');
    selectedFile.value = null;
    emit('cancel-file');
};
//方法：发送消息（传递给父组件）
function sendMessage() {
    emit('send-message', inputValue.value);
    inputValue.value = '';
}
defineExpose({ selectedFile });
</script>

<style lang="scss" scoped></style>