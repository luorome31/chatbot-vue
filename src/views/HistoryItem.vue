<template>
    <div class="container w-full h-10 p-2 rounded-lg flex items-center justify-start hover:bg-slate-300">
        <i class="bi bi-chat-left-text text-2xl mr-2"></i>
        {{ title }}
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    'title': {
        type: String,
        default: "New conversation"
    },
    'sessionId': {
        type: Number,
        default: 0,
    },
})
const title = ref(null);
title.value = props.title;
const sessionId = ref(null);
sessionId.value = props.sessionId;

const modifyTitle = (newTitle)=>{
    title.value = newTitle;
}

const modifySessionId = (propSessionId)=>{
    sessionId.value = propSessionId;
}
const getSessionId = computed(()=>{
    return sessionId.value;
})

defineExpose([modifyTitle,modifySessionId,getSessionId]);
</script>

<style lang="scss" scoped></style>