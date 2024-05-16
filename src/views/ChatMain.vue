<template>
    <div>
        <div class="flex flex-col space-y-5 w-auto h-auto items-start justify-start">
            <div class="space-y-2">
                <MessageItem v-for="msg in conversation" :message="msg.message" :is_user="msg.isUser"></MessageItem>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue';
import MessageItem from './MessageItem.vue';
const conversation = ref([]);
const chatResponse = (messageContainer, question) => {
    messageContainer.value = "";
    const eventSource = new EventSource('http://127.0.0.1:5000/reader/answer?msg=' + question); // 建立与服务器的EventSource连接
    eventSource.onmessage = async function (event) {
        const data = JSON.parse(event.data);
        console.log(data)
        const result = data.body.result.trim();
        messageContainer.value += result;
        if (data.body.is_end == true) {
            eventSource.close();
        }
        await nextTick();
        const contentShow = document.getElementById('content-show');
        contentShow.scrollTop = contentShow.scrollHeight;
    };
}

const sendQuestion = async (question) => {
    const flowMessage = ref("Please wait a moment...");
    conversation.value.push({ message: question, isUser: true });
    const item = reactive({
        message: flowMessage,
        is_user: false,
        file: "",
        image: "",
        is_received: false,
        avatar: "bi bi-robot"
    });
    conversation.value.push(item);
    await nextTick();
    const contentShow = document.getElementById('content-show');
    contentShow.scrollTop = contentShow.scrollHeight;
    chatResponse(flowMessage, question);
}

defineExpose({
    sendQuestion
})
</script>

<style scoped></style>