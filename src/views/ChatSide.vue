<template>
    <div class="container h-screen flex flex-col w-[15%]">
        <div class="flex flex-col justify-start items-center w-auto h-3/5 p-2 bg-white space-y-3">
            <button @click="addChat"
                class="w-full h-15 shadow-md bg-slate-950 rounded-lg text-white p-2 text-center text-2xl">
                <i class="bi bi-file text-2xl mr-2"></i>
                New Chat
            </button>
            <div class="overflow-y-auto lex flex-col p-1 justify-center items-center w-full h-auto text-slate-600 space-y-3 ">
                <div>
                    <HistoryItem v-for="item in historyItem" :key="item.sessionId" :title="item.title"
                        :session-id="item.sessionId" @click="$emit('change-history', item.sessionId)"></HistoryItem>
                </div>
            </div>

        </div>

        <div class="flex flex-col w-full h-2/5 p-5 border-t-slate-300 border-t-2 bg-white space-y-3 ">
            <div
                class="container w-full h-20 p-2 rounded-lg flex items-center justify-start text-slate-600 hover:cursor-pointer">
                <i class="bi bi-trash text-2xl mr-2"></i>
                Clear conversation
            </div>
            <div
                class="container w-full h-20 p-2 rounded-lg flex items-center justify-start text-slate-600 hover:cursor-pointer">
                <i class="bi bi-person-circle text-2xl mr-2"></i>
                My account
            </div>
            <div @click="getHistoryList"
                class="container w-full h-20 p-2 rounded-lg flex items-center justify-start text-slate-600 hover:cursor-pointer">
                <i class="bi bi-box-arrow-right text-2xl mr-2"></i>
                Log out
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import HistoryItem from './HistoryItem.vue';
import axios from 'axios';
// import {modifyTitle,modifySessionId} from './HistoryItem.vue'
const historyItem = ref([]);
// historyItem.value.push({ title: "hello", sessionId: 1 });
// historyItem.value.push({ title: "平凡的世界", sessionId: 2 });

const emit = defineEmits(['add-chat', 'change-history'])
function addChat() {
    //发送网络请求，获取sessionId

    const newItem = {}
    emit('add-chat');
    historyItem.value.unshift(newItem);
}
// const getHistoryList = ()=>{
//     axios.get("http://127.0.0.1:3000/session_list").then(
//         res=>{
//             console.log(res.data.data);
//             for(let i=0;i<res.data.data.session_list.length;i++){
//                 historyItem.value.push(res.data.data.session_list[i]);
//             }
//         }
//     )
// }
onMounted(() => {
    axios.get("http://127.0.0.1:3000/session_list").then(
        res => {
            console.log(res.data.data);
            for (let i = 0; i < res.data.data.session_list.length; i++) {
                historyItem.value.push(res.data.data.session_list[i]);
            }
        }
    )
})

const addSessionIdAndTitle = ({title,sessionId})=>{
    historyItem.value[0].sessionId = sessionId;
    historyItem.value[0].title = title;
}
defineExpose({addSessionIdAndTitle})
</script>


<style scoped>
/* 针对Chrome, Safari和Opera */
::-webkit-scrollbar {
    display: block;
}

/* 针对IE和Edge */
.no-scrollbar {
    -ms-overflow-style: auto;
}

/* 针对Firefox */
.no-scrollbar {
    scrollbar-width: auto;
}
</style>