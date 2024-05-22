<script setup>

import ChatInput from './views/ChatInput.vue';
import ChatMain from './views/ChatMain.vue';
import ChatSide from './views/ChatSide.vue';
import { ref } from 'vue';

const chatMain = ref(null);
const chatInput = ref(null);
const chatSide = ref(null);
function sendMessage(message) {
    chatMain.value.sendQuestion(message);
}
function addChat() {
    chatMain.value.addChat();
}
function changeHistory(sessionId) {
    chatMain.value.changeHistory(sessionId);
}
function loadFile() {
    console.log(chatInput.value.selectedFile);
    chatMain.value.loadFile(chatInput.value.selectedFile);
}
function cancelFile() {
    chatMain.value.cancelFile();
}
function new_session({title,session_Id}){
    
    chatSide.value.addSessionIdAndTitle({title,session_Id});
}
</script>
<template>
    <div class="bg-white">
        <div class="container mx-auto flex flex-row h-screen font-serif">
            <ChatSide  ref="chatSide" @add-chat="addChat" @change-history="changeHistory" />
            <div class="h-screen w-[85%]  flex flex-col">
                <div class="pdfOrder h-[90%] overflow-y-auto scroll-smooth" id="content-show">
                    <ChatMain ref="chatMain" @new_session="new_session"/>
                </div>
                <ChatInput ref="chatInput" 
                @send-message="sendMessage" 
                @load-file="loadFile" 
                @cancel-file="cancelFile"/>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
