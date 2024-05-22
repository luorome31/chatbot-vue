<template>
    <div>
        <div>
            <TopBar ref="topBar" @model-change="modelChange" @plugin-change="pluginChange"></TopBar>
        </div>
        <div class="mx-32 flex flex-col space-y-5 w-auto h-auto items-start justify-start">
            <div class="space-y-2">
                <MessageItem v-for="msg in conversation" :message="msg.message" :is_user="msg.isUser"></MessageItem>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, nextTick, watchEffect, watch } from 'vue';
import MessageItem from './MessageItem.vue';
import TopBar from './TopBar.vue';
import axios from 'axios';
//历史对话记录
const conversation = ref([]);
//用户选择的文件、用户输入的消息、模型
const selectedFile = ref(null);
const userInput = ref(null);
const model = ref("GPT-3.5");
const plugin = ref("");
//会话Id
const sessionId = ref(null);
defineEmits(['new_session']);
//测试值
conversation.value = [
    { message: "Hello", isUser: true },
    { message: "Hi there!", isUser: false },
    { message: "How can I help you?", isUser: false },
    { message: "I have a question.", isUser: true },
    { message: "Sure, what's your question?", isUser: false },
    { message: "Can you help me with Vue?", isUser: true },
    { message: "Of course! I'm an expert in Vue. What do you need help with?", isUser: false }
];
let offset = 0;

const topBar = ref(null);

const chatResponse = (messageContainer, question,url_image) => {
    messageContainer.value = "";
    const eventSource = new EventSource('http://127.0.0.1:5000/reader/chat?query=' + question); // 建立与服务器的EventSource连接
    eventSource.onmessage = async function (event) {
        const data = JSON.parse(event.data);
        console.log(data)
        const result = data.content;
        if(data.type==1){
            messageContainer.value += result;
        }else if(data.type==2){
            url_image.value = result;
        }
        if (data.isEnd == true) {
            eventSource.close();
        }
        await nextTick();
        const contentShow = document.getElementById('content-show');
        contentShow.scrollTop = contentShow.scrollHeight;
    };
}
const newChat = (messageContainer, question,url_image) => {
    messageContainer.value = "";
    const eventSource = new EventSource('http://127.0.0.1:5000/reader/new_chat?query=' + question); // 建立与服务器的EventSource连接
    eventSource.onmessage = async function (event) {
        const data = JSON.parse(event.data);
        console.log(data)
        // res.data.data.session_list[i]
        if(data.sessionId!==undefined){
            sessionId.value = sessionId;
            const title = data.title;
            emit('new_session', { title, sessionId });
        }
        const result = data.content;
        if(data.type==1){
            messageContainer.value += result;
        }else if(data.type==2){
            url_image.value = result;
        }
        if (data.isEnd == true) {
            eventSource.close();
        }
        await nextTick();
        const contentShow = document.getElementById('content-show');
        contentShow.scrollTop = contentShow.scrollHeight;
    };
}

const sendQuestion = async (question) => {
    userInput.value = question;
    const flowMessage = ref("Please wait a moment...");
    const imageUrl = ref(null);
    conversation.value.push({ message: question, isUser: true });
    const item = reactive({
        message: flowMessage,
        is_user: false,
        file: "",
        image: imageUrl,
        is_received: false,
        avatar: "bi bi-robot"
    });
    conversation.value.push(item);
    await nextTick();
    const contentShow = document.getElementById('content-show');
    contentShow.scrollTop = contentShow.scrollHeight;
    if(sessionId.value == null){
        newChat(flowMessage, question);
    }else{
        chatResponse(flowMessage, question);
    }
}


watch(sessionId, () => {
    conversation.value = [];
})
const addChat = () => {
    sessionId.value = null;
    conversation.value = [];
}
const changeHistory = (propSessionId) => {
    sessionId.value = propSessionId;
    //发送请求，获取历史记录，建立连接，更新conversation
    axios.get("http://127.0.0.1:3000/history_list?sessionId=" + sessionId.value).then(
        res => {
            console.log(res.data.data);
            for (let i = 0; i < res.data.data.message_list.length; i++) {
                const item = {};
                item.message = res.data.data.message_list[i].message_block[0].content;
                item.isUser = res.data.data.message_list[i].role;
                const chat_item = reactive(item)
                conversation.value.push(chat_item);
            }
        }
    )
}
const loadFile = async (file) => {
    selectedFile.value = file;
}
const cancelFile = () => {
    selectedFile.value = null;
}
const modelChange = (value) => {
    model.value = value;
}
const pluginChange = (value) => {
    plugin.value = value;
}
defineExpose({
    sendQuestion, addChat, changeHistory, loadFile, cancelFile,
})
</script>

<style scoped></style>