<template>
    <div class="container h-screen flex flex-col">
        <div class="flex flex-col justify-start items-center w-auto h-3/5 p-2 bg-white space-y-3">
            <button class="w-full h-15 shadow-md bg-slate-950 rounded-lg text-white p-2 text-center text-2xl">
                <i class="bi bi-file text-2xl mr-2"></i>
                New Chat
            </button>
            <div class="flex flex-col p-1 justify-center items-center w-full h-auto text-slate-600 space-y-3">
                <div class="container w-full h-10 p-2 rounded-lg flex items-center justify-start hover:bg-slate-300">
                    <i class="bi bi-chat-left-text text-2xl mr-2"></i>
                    New Chat
                </div>
                <div class="container w-full h-10 p-2 rounded-lg flex items-center justify-start hover:bg-slate-300">
                    <i class="bi bi-chat-left-text text-2xl mr-2"></i>
                    New Chat
                </div>
                <div class="container w-full h-10 p-2 rounded-lg flex items-center justify-start hover:bg-slate-300">
                    <i class="bi bi-chat-left-text text-2xl mr-2"></i>
                    New Chat
                </div>
            </div>
        </div>

        <div class="flex flex-col w-full h-2/5 p-5 border-t-slate-300 border-t-2 bg-white space-y-3">
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
            <div
                class="container w-full h-20 p-2 rounded-lg flex items-center justify-start text-slate-600 hover:cursor-pointer">
                <i class="bi bi-box-arrow-right text-2xl mr-2"></i>
                Log out
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped></style>