<template>
    <div>
        <div>
            <TopBar ref="topBar" @model-change="modelChange" @plugin-change="pluginChange"></TopBar>
        </div>
        <div class="mx-32 flex flex-col space-y-5 w-auto h-auto items-start justify-start">
            <div id="content-show" class="space-y-2">
                <MessageItem v-for="msg in conversation" :key="msg.id" :message="msg.message" :is_user="msg.isUser" :image="msg.image">
                </MessageItem>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, nextTick, watch } from 'vue';
import MessageItem from './MessageItem.vue';
import TopBar from './TopBar.vue';
import axios from 'axios';

const conversation = ref([]);
const selectedFile = ref(null);
const userInput = ref(null);
const model = ref("GPT-3.5");
const plugin = ref("");
const sessionId = ref(null);
const emit = defineEmits(['new_session']);

const topBar = ref(null);

const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const newChat = (new_messageContainer, question, url_image) => {
    new_messageContainer.value = "";
    let session_Id = null;
    let title = null;
    const eventSource = new EventSource('http://127.0.0.1:5000/reader/new_chat?query=' + question, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    eventSource.onmessage = async function (event) {
        const data = JSON.parse(event.data);
        if (data.sessionId !== undefined) {
            console.log(data.sessionId);
            sessionId.value = data.sessionId;
            console.log(":" + sessionId.value)
            title = data.title;
            session_Id = data.sessionId;
            emit('new_session', { title, session_Id });
        }
        const result = data.content;
        if (data.type == 1) {
            new_messageContainer.value += result;

        } else if (data.type == 2) {
            url_image.value = result;
        }
        if (data.isEnd == true) {
            eventSource.close();
        }
        await nextTick();
        const contentShow = document.getElementById('content-show');
        contentShow.scrollTop = contentShow.scrollHeight;
    };
};

const chatResponse = (messageContainer, question, url_image) => {
    messageContainer.value = "";
    const eventSource = new EventSource('http://127.0.0.1:5000/reader/chat?query=' + question, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    eventSource.onmessage = async function (event) {
        const data = JSON.parse(event.data);
        const result = data.content;
        if (data.type == 1) {
            messageContainer.value += result;
        } else if (data.type == 2) {
            url_image.value = result;
        }
        if (data.isEnd == true) {
            eventSource.close();
        }
        await nextTick();
        const contentShow = document.getElementById('content-show');
        contentShow.scrollTop = contentShow.scrollHeight;
    };
};

const sendQuestion = async (question) => {
    userInput.value = question;
    const flowMessage = ref("Please wait a moment...");
    const imageUrl = ref(null);
    conversation.value.push({ id: generateUniqueId(), message: question, isUser: true });
    const item = reactive({
        id: generateUniqueId(),
        message: flowMessage,
        isUser: false,
        file: "",
        image: imageUrl,
        is_received: false,
        avatar: "bi bi-robot"
    });
    conversation.value.push(item);
    await nextTick();
    const contentShow = document.getElementById('content-show');
    contentShow.scrollTop = contentShow.scrollHeight;
    if (sessionId.value == null) {
        newChat(flowMessage, question, imageUrl);
    } else {
        chatResponse(flowMessage, question, imageUrl);
    }
};

// watch(sessionId, () => {
//     conversation.value = [];
// });

const addChat = () => {
    sessionId.value = null;
    conversation.value = [];
};

const changeHistory = (propSessionId) => {
    sessionId.value = propSessionId;
    axios.get("http://127.0.0.1:3000/history_list?sessionId=" + sessionId.value).then(
        res => {
            for (let i = 0; i < res.data.data.message_list.length; i++) {
                const item = {};
                item.message = res.data.data.message_list[i].message_block[0].content;
                item.isUser = res.data.data.message_list[i].role;
                const chat_item = reactive(item);
                conversation.value.push(chat_item);
            }
        }
    );
};

const loadFile = async (file) => {
    selectedFile.value = file;
};

const cancelFile = () => {
    selectedFile.value = null;
};

const modelChange = (value) => {
    model.value = value;
};

const pluginChange = (value) => {
    plugin.value = value;
};

defineExpose({
    sendQuestion, addChat, changeHistory, loadFile, cancelFile,
});
</script>

<style scoped></style>
