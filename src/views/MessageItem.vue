<template>
    <div class="space-y-2">
        <div class=""><i class="bi bi-robot text-2xl" :class="avatar"></i></div>
        <div class="container bg-slate-100 p-5 rounded-2xl w-fit max-w-full ">
            {{ message }}
            <!-- <slot></slot> -->
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
//一个消息的具体的属性值（待用）
const props = defineProps(['message', 'is_user', 'file', 'image', 'is_received', 'avatar']);
const is_user = props.is_user;
const avatar = computed(() => {
    return is_user ? 'bi bi-arrow-through-heart-fill' : 'bi bi-robot';
});




</script>

<style lang="scss" scoped></style>