<script setup>

import ChatInput from './views/ChatInput.vue';
import ChatMain from './views/ChatMain.vue';
import ChatSide from './views/ChatSide.vue';
import sendQuestion from './views/ChatMain.vue';
import { ref } from 'vue';
const chatMain = ref(null);
function sendMessage(message){
    chatMain.value.sendQuestion(message);
}
function addChat(sessionId){
    chatMain.value.addChat(sessionId);
}
function changeHistory(sessionId){
    chatMain.value.changeHistory(sessionId);
}
function loadFile(){
    chatMain.value.loadFile();
}
</script>
<template>
    <div class="bg-white">
        <div class="container mx-auto flex flex-row h-screen font-serif">
            <ChatSide @add-chat="addChat" @change-history="changeHistory"/>
            <div class="h-screen w-[85%] flex flex-col">
                <div class="h-[90%] overflow-y-auto scroll-smooth" id="content-show">
                    <div class="mx-32 mt-10">
                        <ChatMain ref="chatMain"/>
                    </div>
                </div>
                <ChatInput @send-message="sendMessage" @load-file="loadFile"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
