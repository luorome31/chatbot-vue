<template>
    <div class="h-[10%] mx-32 my-2 rounded-lg">

        <div class="bg-slate-100 rounded-xl shadow-md w-auto p-3 flex">
            <div class="text-gray-600 p-3 w-20 justify-center flex">
                <button @click="openFileSelector">
                    <i class="bi bi-file-earmark-arrow-up-fill text-3xl"></i>
                    <input id="loadInput" type="file" @change="loadFile" class="hidden" />
                </button>
            </div>

            <input
                type="text"
                class="w-full p-2 rounded-lg text-gray-600 text-base focus:outline-none"
                placeholder="Type a message..."
                v-model="inputValue"
                @keyup.enter="sendMessage"
            />

            <div class="text-gray-600 p-3 w-20 justify-center flex">
                <button>
                    <i class="bi bi-arrow-right-circle text-3xl"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const loadInput = ref(null);
const inputValue = document.getElementById('loadInput');
const emit = defineEmits(['send-message','load-file'])
const selectedFile = ref(null);
const openFileSelector = () => {
    const input = document.getElementById('loadInput');
    input.click();
};
const loadFile = (e) => {
    const file = e.target.files[0];
    selectedFile.value = file;
    emit('load-file');
};
function sendMessage() {
    emit('send-message', inputValue.value);
    inputValue.value = '';
}
defineExpose({selectedFile});
</script>

<style lang="scss" scoped></style>