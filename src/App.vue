<script setup>

import ChatInput from './views/ChatInput.vue';
import ChatMain from './views/ChatMain.vue';
import ChatSide from './views/ChatSide.vue';
</script>

<template>
    <div class="bg-white">
        <div class="container mx-auto flex flex-row h-screen font-serif">
            <ChatSide />
            <div class="h-screen w-[85%] flex flex-col">
                <div class="h-[90%]">
                    <div class="mx-32 mt-10 mb-2">
                        <ChatMain />
                    </div>
                </div>
                <ChatInput />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
